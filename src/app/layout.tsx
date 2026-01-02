import ClientLayout from "@/components/ClientLayout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sakarya CT Prefabrik Evler",
    template: "%s | Sakarya CT Prefabrik Evler",
  },
  description: "Prefabrik ev, çelik ev ve konteyner çözümleri! Hızlı kurulum, modern tasarımlar, Sakarya CT Prefabrik 20 yıllık deneyim. Ücretsiz keşif +90 537 518 30 06.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
