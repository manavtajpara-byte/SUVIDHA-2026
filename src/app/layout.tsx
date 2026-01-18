import type { Metadata } from "next";
import "./globals.css";
import { StateProvider } from "@/context/StateContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "SUVIDHA - Unified Government Services",
  description: "Touch-optimized kiosk for Electricity, Gas, and Municipal services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StateProvider>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
        </StateProvider>
      </body>
    </html>
  );
}
