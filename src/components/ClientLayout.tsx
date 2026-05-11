"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { stripLocaleFromPathname } from "@/lib/i18n";
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

interface ProductSearchItem {
  id: string;
  name: string;
  href: string;
  categoryLabel: string | null;
  categoryHrefs: string[];
  imageUrl: string | null;
  imageAlt: string;
  searchText: string;
}

interface ClientLayoutProps {
  children: React.ReactNode;
  categories?: Category[];
  productSearchItems?: ProductSearchItem[];
}

export default function ClientLayout({
  children,
  categories = [],
  productSearchItems = [],
}: ClientLayoutProps) {
  const rawPathname = usePathname();
  const pathname = stripLocaleFromPathname(rawPathname);
  const isHomepage = pathname === "/";

  const hideLayout = pathname.startsWith("/katalog");
  const hideLayout2 = pathname.startsWith("/iletisim");

  return (
    <>
      <div className="fixed w-full h-screen -z-10  opacity-10 blur-in-sm " />
      <Navbar categories={categories} productSearchItems={productSearchItems} />

      <main
        className={`relative overflow-hidden ${
          isHomepage ? "" : "pt-16 lg:pt-[13rem]"
        }`}
      >
        <PageHero pathname={pathname} />
        <div className={`w-full ${!hideLayout2 && "px-5 pb-5"}`}>
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
