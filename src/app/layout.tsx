import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "SUVIDHA Kiosk | Digital India Initiative",
  description: "Official Government of India Citizen Service Kiosk. Access Electricity, Gas, Municipal services and more.",
  keywords: ["government", "services", "india", "digital india", "bill payment", "certificate"],
  authors: [{ name: "Ministry of Electronics & IT" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1e3a8a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
