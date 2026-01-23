'use client';

import React, { useEffect } from 'react';
import { StateProvider, useAppState } from "@/context/StateContext";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import UtilityBar from "@/components/UtilityBar";
import Chatbot from "@/components/Chatbot";
import ToastContainer from "@/components/Toast";
import SessionTimeout from "@/components/SessionTimeout";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import OfflineIndicator from "@/components/OfflineIndicator";
import EmergencyBroadcast from "@/components/EmergencyBroadcast";
import HardwareBridge from "@/components/HardwareBridge";
import SahayakAvatar from "@/components/SahayakAvatar";
import { usePathname, useRouter } from 'next/navigation';

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { toasts, removeToast, isLoggedIn } = useAppState();
    const pathname = usePathname();
    const router = useRouter();

    const isAuthPage = pathname === '/login' || pathname === '/register';

    useEffect(() => {
        // Simple Route Protection
        if (!isLoggedIn && !isAuthPage && pathname !== '/privacy' && pathname !== '/terms') {
            router.push('/login');
        }
    }, [isLoggedIn, isAuthPage, pathname, router]);

    return (
        <>
            {!isAuthPage && <Sidebar />}
            {/* UtilityBar kept but Header removed as Sidebar replaces nav */}
            {!isAuthPage && <div className="hidden-mobile"><UtilityBar /></div>}

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {children}
            </main>

            {!isAuthPage && <Footer />}

            {!isAuthPage && <Chatbot />}
            {!isAuthPage && <SahayakAvatar />}

            <OfflineIndicator />
            <EmergencyBroadcast />
            <ToastContainer toasts={toasts} onClose={removeToast} />
            <SessionTimeout timeoutMinutes={5} warningMinutes={1} />
            <KeyboardShortcuts />
        </>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <StateProvider>
            <LayoutContent>{children}</LayoutContent>
        </StateProvider>
    );
}
