'use client';

import type { Metadata } from "next";
import "./globals.css";
import { StateProvider, useAppState } from "@/context/StateContext";
import Header from "@/components/Header";
import UtilityBar from "@/components/UtilityBar";
import Chatbot from "@/components/Chatbot";
import ToastContainer from "@/components/Toast";
import SessionTimeout from "@/components/SessionTimeout";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { toasts, removeToast } = useAppState();

  return (
    <>
      <UtilityBar />
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Chatbot />
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <SessionTimeout timeoutMinutes={5} warningMinutes={1} />
      <KeyboardShortcuts />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StateProvider>
          <LayoutContent>{children}</LayoutContent>
        </StateProvider>
      </body>
    </html>
  );
}
