"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { usePathname } from "next/navigation";
import BottomBar from "./bottomBar";

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  title: string | null;
  slug: string;
  order: number;
}

interface ClientLayoutProps {
  children: React.ReactNode;
  categories?: Category[];
}

export default function ClientLayout({
  children,
  categories = [],
}: ClientLayoutProps) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const hideLayout = pathname.startsWith("/katalog");
  const hideLayout2 = pathname.startsWith("/iletisim");

  return (
    <>
      <div className="fixed w-full h-screen -z-10  opacity-10 blur-in-sm " />
      <Navbar categories={categories} />

      <main
        className={`relative overflow-hidden ${
          isHomepage ? "" : "pt-16 lg:pt-[13rem]"
        }`}
      >
        <PageHero pathname={pathname} />
        <div
          className={`w-full ${hideLayout && "h-screen"} ${!hideLayout2 && "px-5 pb-5"}`}
        >
          {children}
        </div>
      </main>
      <BottomBar />

      {!hideLayout && (
        <section className="flex justify-center">
          <div className="w-full">
            <Footer categories={categories} />
          </div>
        </section>
      )}
    </>
  );
}
