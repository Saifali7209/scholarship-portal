import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IICC Scholarships | India Islamic Cultural Centre",
  description:
    "Official Merit-cum-Means Scholarship Portal of the India Islamic Cultural Centre (IICC), New Delhi. 200 structured fellowships for talented Indian students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col antialiased font-sans bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <AppProvider>
          <DemoBanner />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
