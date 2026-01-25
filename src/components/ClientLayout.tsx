'use client';

import React, { useEffect } from 'react';
import { StateProvider, useAppState } from "@/context/StateContext";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";
import ToastContainer from "@/components/Toast";
import SessionTimeout from "@/components/SessionTimeout";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import OfflineIndicator from "@/components/OfflineIndicator";
import EmergencyBroadcast from "@/components/EmergencyBroadcast";
import { usePathname, useRouter } from 'next/navigation';

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { toasts, removeToast, isLoggedIn, fontSize, highContrast } = useAppState();
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
        <div
            id="main-content"
            style={{
                fontSize: `${fontSize}px`,
                filter: highContrast ? 'contrast(1.5) grayscale(0.5)' : 'none',
                background: highContrast ? '#000' : 'var(--background)',
                color: highContrast ? '#fff' : 'inherit',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {!isAuthPage && <Sidebar />}

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {children}
            </main>

            {!isAuthPage && <Footer />}

            {!isAuthPage && <Chatbot />}

            <OfflineIndicator />
            <EmergencyBroadcast />
            <ToastContainer toasts={toasts} onClose={removeToast} />
            <SessionTimeout timeoutMinutes={5} warningMinutes={1} />
            <KeyboardShortcuts />
        </div>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <StateProvider>
            <LayoutContent>{children}</LayoutContent>
        </StateProvider>
    );
}
