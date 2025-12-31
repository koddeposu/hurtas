'use client';

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import "./styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  const pathname = usePathname();

  // Navbar & Footer GÖRÜNMEYECEK sayfalar
  const hideLayout =
    pathname.startsWith("/katalog")
  const hideLayout2 =
    pathname.startsWith("/iletisim")


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <Navbar />

        <main className="relative overflow-hidden">
          <div className={` w-full ${hideLayout && "h-screen"} ${!hideLayout2 && "p-5"} `}>
            {children}
          </div>
        </main>

        {!hideLayout && (
          <section className="flex justify-center">
            <div className="w-full">
              <Footer />
            </div>
          </section>
        )}

      </body>
    </html>
  );
}
