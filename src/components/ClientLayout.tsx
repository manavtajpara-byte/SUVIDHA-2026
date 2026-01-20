'use client';

import React from 'react';
import { StateProvider, useAppState } from "@/context/StateContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UtilityBar from "@/components/UtilityBar";
import Chatbot from "@/components/Chatbot";
import ToastContainer from "@/components/Toast";
import SessionTimeout from "@/components/SessionTimeout";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import VoiceAssistant from "@/components/VoiceAssistant";
import OfflineIndicator from "@/components/OfflineIndicator";
import EmergencyBroadcast from "@/components/EmergencyBroadcast";

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { toasts, removeToast } = useAppState();

    return (
        <>
            <UtilityBar />
            <Header />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
            <Chatbot />
            <VoiceAssistant />
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
