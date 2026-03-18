"use client";

import Logo from "@/assets/logo.webp";
import { handleCall, handleWhatsApp } from "@/lib/analytics/googleAds";
import {
  ChevronDown,
  Clock3,
  FileText,
  Mail,
  MapPin,
  Menu,
  PhoneCall,
  Send,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface NavbarProps {
  categories?: Category[];
}

const COMPANY = {
  phoneDisplay: "+90 537 518 30 06",
  phoneHref: "+905375183006",
  email: "info@ctprefabrik.com",
  address: "Soğucak, Kervan/1 Sokak No: 2/4, Söğütlü / Sakarya",
  workHours: "Pzt - Cmt 09:00 - 18:00",
};

const CORPORATE_LINKS = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

const NAV_LINKS = [
  { href: "/projelerimiz", label: "Projelerimiz" },
  { href: "/blog", label: "Blog" },
];

const Navbar = ({ categories = [] }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCorporateOpen, setIsMobileCorporateOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [showCompactNavbar, setShowCompactNavbar] = useState(false);
  const [mainNavbarHeight, setMainNavbarHeight] = useState(260);
  const pathname = usePathname();
  const lastScrollYRef = useRef(0);
  const isAtTopRef = useRef(true);
  const showCompactNavbarRef = useRef(false);
  const tickingRef = useRef(false);
  const scrollFrameRef = useRef<number | null>(null);
  const mainNavbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const updateMainNavbarHeight = () => {
      if (!mainNavbarRef.current) return;

      const nextHeight = Math.round(
        mainNavbarRef.current.getBoundingClientRect().height,
      );

      if (nextHeight > 0) {
        setMainNavbarHeight(nextHeight);
      }
    };

    updateMainNavbarHeight();
    window.addEventListener("resize", updateMainNavbarHeight);

    return () => {
      window.removeEventListener("resize", updateMainNavbarHeight);
    };
  }, []);

  useEffect(() => {
    const updateNavbarState = () => {
      const currentY = window.scrollY;
      const pageTop = currentY <= mainNavbarHeight;
      const deltaY = currentY - lastScrollYRef.current;
      const nextCompactState = pageTop
        ? false
        : deltaY < -6
          ? true
          : deltaY > 6
            ? false
            : showCompactNavbarRef.current;

      if (pageTop !== isAtTopRef.current) {
        isAtTopRef.current = pageTop;
        setIsAtTop(pageTop);
      }

      if (nextCompactState !== showCompactNavbarRef.current) {
        showCompactNavbarRef.current = nextCompactState;
        setShowCompactNavbar(nextCompactState);
      }

      lastScrollYRef.current = currentY;
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      scrollFrameRef.current = window.requestAnimationFrame(updateNavbarState);
    };

    updateNavbarState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [mainNavbarHeight]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const showMainNavbar = isAtTop;
  const showCompact = !isAtTop && showCompactNavbar;
  const mobilePanelTopClass = "top-[5.25rem]";

  const isExactActive = (href: string) => pathname === href;
  const isSectionActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isCorporateActive = CORPORATE_LINKS.some((item) =>
    isSectionActive(item.href),
  );
  const isProductsActive = pathname.startsWith("/prefabrik-evler");

  return (
    <>
      <header
        ref={mainNavbarRef}
        className={`fixed inset-x-0 top-0 z-50 hidden transition-transform duration-300 lg:block ${
          showMainNavbar
            ? "translate-y-0"
            : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="w-full bg-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.45)]">
          <div className="flex min-h-11 flex-wrap items-center justify-center gap-x-6 gap-y-2 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-100 sm:justify-between sm:px-6">
            <Link
              href="/iletisim"
              prefetch={false}
              className="inline-flex items-center gap-2 transition-colors hover:text-emerald-300"
            >
              <Send className="h-3.5 w-3.5 text-secondary" />
              Ücretsiz Teklif Alın
            </Link>
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-emerald-300"
            >
              <PhoneCall className="h-3.5 w-3.5 text-secondary" />
              {COMPANY.phoneDisplay}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-emerald-300"
            >
              <Mail className="h-3.5 w-3.5 text-secondary" />
              {COMPANY.email}
            </a>
            <Link
              href="/iletisim"
              prefetch={false}
              className="inline-flex items-center gap-2 transition-colors hover:text-emerald-300"
            >
              <MapPin className="h-3.5 w-3.5 text-secondary" />
              Söğütlü / Sakarya
            </Link>
          </div>

          <div className="grid gap-5 bg-white px-4 py-5 sm:px-6 xl:grid-cols-[auto_1fr_1fr_1fr] xl:items-center xl:gap-8">
            <Link
              href="/"
              prefetch={false}
              className="inline-flex items-center gap-4 self-start"
              onClick={closeMobileMenu}
            >
              <span className="inline-flex rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <Image
                  src={Logo}
                  alt="CT Prefabrik"
                  priority
                  className="h-12 w-auto"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-xl font-black uppercase tracking-tight text-primary">
                  CT Prefabrik
                </span>
                <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                  Çelik Yapı ve Yaşam Alanları
                </span>
              </span>
            </Link>

            <div className="grid gap-3 sm:grid-cols-2 xl:col-span-3 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 px-4 py-3">
                <p className="inline-flex items-center gap-2 text-lg font-bold text-slate-900">
                  <PhoneCall className="h-4 w-4 text-secondary" />
                  Telefon
                </p>
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="mt-1 block text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                >
                  {COMPANY.phoneDisplay}
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200/80 px-4 py-3">
                <p className="inline-flex items-center gap-2 text-lg font-bold text-slate-900">
                  <MapPin className="h-4 w-4 text-secondary" />
                  Lokasyon
                </p>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {COMPANY.address}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 px-4 py-3 sm:col-span-2 xl:col-span-1">
                <p className="inline-flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Clock3 className="h-4 w-4 text-secondary" />
                  Çalışma Saatleri
                </p>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {COMPANY.workHours}
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-h-16 items-center gap-2 bg-secondary px-4 sm:px-6">
            <nav className="hidden items-center gap-2 lg:flex">
              <Link
                href="/"
                prefetch={false}
                className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.03em] transition-colors ${
                  isExactActive("/")
                    ? "bg-white text-secondary"
                    : "text-white hover:bg-white/15"
                }`}
              >
                Ana Sayfa
              </Link>

              <div className="group relative">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.03em] transition-colors ${
                    isCorporateActive
                      ? "bg-white text-secondary"
                      : "text-white group-hover:bg-white/15"
                  }`}
                >
                  Kurumsal
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="invisible absolute left-0 top-full z-50 w-56 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    {CORPORATE_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        prefetch={false}
                        className={`block border-b border-slate-100 px-4 py-3 text-sm font-semibold transition-colors last:border-b-0 ${
                          isSectionActive(item.href)
                            ? "bg-slate-50 text-primary"
                            : "text-slate-700 hover:bg-slate-50 hover:text-secondary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group relative">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.03em] transition-colors ${
                    isProductsActive
                      ? "bg-white text-secondary"
                      : "text-white group-hover:bg-white/15"
                  }`}
                >
                  Prefabrik Evler
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    <Link
                      href="/prefabrik-evler"
                      prefetch={false}
                      className={`block border-b border-slate-100 px-4 py-3 text-sm font-semibold transition-colors ${
                        pathname === "/prefabrik-evler"
                          ? "bg-slate-50 text-primary"
                          : "text-slate-700 hover:bg-slate-50 hover:text-secondary"
                      }`}
                    >
                      Tüm Modeller
                    </Link>
                    {categories.map((item) => (
                      <Link
                        key={item.id}
                        href={`/prefabrik-evler/${item.slug}`}
                        prefetch={false}
                        className={`block border-b border-slate-100 px-4 py-3 text-sm font-semibold transition-colors last:border-b-0 ${
                          pathname === `/prefabrik-evler/${item.slug}`
                            ? "bg-slate-50 text-primary"
                            : "text-slate-700 hover:bg-slate-50 hover:text-secondary"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.03em] transition-colors ${
                    isSectionActive(item.href)
                      ? "bg-white text-secondary"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="hidden rounded-xl bg-secondary px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1d7048] sm:inline-flex"
              >
                WhatsApp
              </button>
              <Link
                href="/katalog"
                prefetch={false}
                className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-slate-900"
              >
                Katalog
              </Link>
            </div>
          </div>
        </div>
      </header>

      <header
        className={`fixed inset-x-0 top-0 z-50 translate-y-0 transition-transform duration-300 ${
          showCompact
            ? "lg:pointer-events-auto lg:translate-y-0"
            : "lg:pointer-events-none lg:-translate-y-[140%]"
        }`}
      >
        <div className="flex min-h-[5.25rem] w-full items-center gap-3 border-b border-slate-200 bg-white/95 px-4 shadow-[0_12px_34px_-26px_rgba(15,23,42,0.9)] backdrop-blur sm:px-6">
          <Link
            href="/"
            prefetch={false}
            className="inline-flex items-center gap-3"
            onClick={closeMobileMenu}
          >
            <span className="inline-flex rounded-xl border border-slate-200 bg-white p-1.5">
              <Image src={Logo} alt="CT Prefabrik" className="h-9 w-auto" />
            </span>
            <span className="text-sm font-black uppercase tracking-[0.08em] text-slate-900 sm:text-base">
              CT <span className="text-primary">Prefabrik</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            <Link
              href="/"
              prefetch={false}
              className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-colors ${
                isExactActive("/")
                  ? "bg-primary text-white"
                  : "text-slate-700 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              Ana Sayfa
            </Link>

            <div className="group relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-colors ${
                  isCorporateActive
                    ? "bg-primary text-white"
                    : "text-slate-700 group-hover:bg-primary/5 group-hover:text-primary"
                }`}
              >
                Kurumsal
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-56 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  {CORPORATE_LINKS.map((item) => (
                    <Link
                      key={`compact-corporate-${item.href}`}
                      href={item.href}
                      prefetch={false}
                      className={`block border-b border-slate-100 px-4 py-3 text-sm font-semibold transition-colors last:border-b-0 ${
                        isSectionActive(item.href)
                          ? "bg-slate-50 text-primary"
                          : "text-slate-700 hover:bg-slate-50 hover:text-secondary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="group relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-colors ${
                  isProductsActive
                    ? "bg-primary text-white"
                    : "text-slate-700 group-hover:bg-primary/5 group-hover:text-primary"
                }`}
              >
                Prefabrik Evler
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  <Link
                    href="/prefabrik-evler"
                    prefetch={false}
                    className={`block border-b border-slate-100 px-4 py-3 text-sm font-semibold transition-colors ${
                      pathname === "/prefabrik-evler"
                        ? "bg-slate-50 text-primary"
                        : "text-slate-700 hover:bg-slate-50 hover:text-secondary"
                    }`}
                  >
                    Tüm Modeller
                  </Link>
                  {categories.map((item) => (
                    <Link
                      key={`compact-category-${item.id}`}
                      href={`/prefabrik-evler/${item.slug}`}
                      prefetch={false}
                      className={`block border-b border-slate-100 px-4 py-3 text-sm font-semibold transition-colors last:border-b-0 ${
                        pathname === `/prefabrik-evler/${item.slug}`
                          ? "bg-slate-50 text-primary"
                          : "text-slate-700 hover:bg-slate-50 hover:text-secondary"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV_LINKS.map((item) => (
              <Link
                key={`compact-nav-${item.href}`}
                href={item.href}
                prefetch={false}
                className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-colors ${
                  isSectionActive(item.href)
                    ? "bg-primary text-white"
                    : "text-slate-700 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleCall}
              className="hidden rounded-xl bg-secondary px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] text-white transition-colors hover:bg-[#1d7048] lg:inline-flex"
            >
              Ara
            </button>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              onClick={toggleMobileMenu}
              className="rounded-xl border border-slate-300 p-2 text-slate-700 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={closeMobileMenu}
            className="absolute inset-0 bg-black/45"
          />

          <div
            className={`absolute right-3 w-[calc(100%-1.5rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:right-5 ${mobilePanelTopClass}`}
          >
            <div className="grid">
              <Link
                href="/"
                prefetch={false}
                onClick={closeMobileMenu}
                className={`border-b border-slate-100 px-4 py-3 text-sm font-extrabold uppercase tracking-[0.1em] ${
                  isExactActive("/") ? "text-primary" : "text-slate-800"
                }`}
              >
                Ana Sayfa
              </Link>

              <div className="border-b border-slate-100 px-4 py-3">
                <button
                  type="button"
                  onClick={() => setIsMobileCorporateOpen((prev) => !prev)}
                  className="mb-2 inline-flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-slate-500"
                >
                  Kurumsal
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isMobileCorporateOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMobileCorporateOpen ? (
                  <div className="grid gap-1.5">
                    {CORPORATE_LINKS.map((item) => (
                      <Link
                        key={`mobile-corporate-${item.href}`}
                        href={item.href}
                        prefetch={false}
                        onClick={closeMobileMenu}
                        className={`text-sm font-semibold transition-colors ${
                          isSectionActive(item.href)
                            ? "text-primary"
                            : "text-slate-700 hover:text-secondary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="border-b border-slate-100 px-4 py-3">
                <button
                  type="button"
                  onClick={() => setIsMobileCategoriesOpen((prev) => !prev)}
                  className="mb-2 inline-flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-slate-500"
                >
                  Prefabrik Evler
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isMobileCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMobileCategoriesOpen ? (
                  <div className="grid gap-1.5">
                    <Link
                      href="/prefabrik-evler"
                      prefetch={false}
                      onClick={closeMobileMenu}
                      className={`text-sm font-semibold transition-colors ${
                        pathname === "/prefabrik-evler"
                          ? "text-primary"
                          : "text-slate-700 hover:text-secondary"
                      }`}
                    >
                      Tüm Modeller
                    </Link>
                    {categories.map((item) => (
                      <Link
                        key={`mobile-category-${item.id}`}
                        href={`/prefabrik-evler/${item.slug}`}
                        prefetch={false}
                        onClick={closeMobileMenu}
                        className={`text-sm font-semibold transition-colors ${
                          pathname === `/prefabrik-evler/${item.slug}`
                            ? "text-primary"
                            : "text-slate-700 hover:text-secondary"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              {NAV_LINKS.map((item) => (
                <Link
                  key={`mobile-nav-${item.href}`}
                  href={item.href}
                  prefetch={false}
                  onClick={closeMobileMenu}
                  className={`border-b border-slate-100 px-4 py-3 text-sm font-semibold transition-colors last:border-b-0 ${
                    isSectionActive(item.href)
                      ? "text-primary"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/katalog"
                prefetch={false}
                onClick={closeMobileMenu}
                className="border-t border-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50"
              >
                <span className="inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Katalog
                </span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  handleWhatsApp();
                }}
                className="bg-secondary px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#1d7048]"
              >
                WhatsApp ile Yaz
              </button>

              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  handleCall();
                }}
                className="bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-slate-800"
              >
                Hemen Ara
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
