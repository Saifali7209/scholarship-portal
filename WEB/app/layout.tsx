import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import { DemoBanner } from "../components/layout/DemoBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scholarship IIC | National Merit & Award Portal",
  description:
    "National digital scholarship application and institutional verification platform. Apply online, verify credentials, and track disbursements.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-full flex flex-col antialiased font-sans bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <AppProvider>
          <DemoBanner />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
