'use client';

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout = pathname.startsWith("/katalog");
  const hideLayout2 = pathname.startsWith("/iletisim");

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden">
        <div className={`w-full ${hideLayout && "h-screen"} ${!hideLayout2 && "p-5"}`}>
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
    </>
  );
}
