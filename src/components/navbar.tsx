"use client";

import Logo from "@/assets/ana-logo.webp";
import { handleCall, handleWhatsApp } from "@/lib/analytics/googleAds";
import { CONTACT_INFO } from "@/lib/contact";
import {
  ALL_PRODUCTS_PATH,
  getCategoryDisplayName,
  getCategoryHref,
  getChildCategories,
  getTopLevelCategories,
  isCategoryPathActive,
} from "@/lib/productRoutes";
import {
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PhoneCall,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  title: string | null;
  slug: string;
  order: number;
}

interface NavbarProps {
  categories?: Category[];
  productSearchItems?: ProductSearchItem[];
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

const COMPANY = {
  phoneDisplay: CONTACT_INFO.primaryPhone.display,
  phoneHref: CONTACT_INFO.primaryPhone.href,
  mobileDisplay: CONTACT_INFO.mobilePhone.display,
  mobileHref: CONTACT_INFO.mobilePhone.href,
  email: CONTACT_INFO.email,
  location: CONTACT_INFO.address.short,
};

const CORPORATE_LINKS = [
  { href: "/calistigimiz-markalar", label: "Çalıştığımız Markalar" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/arge", label: "Arge" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/tse-onayli-belgeler", label: "TSE Onaylı Belgeler" },
];

const NAV_LINKS = [
  { href: "/galeri", label: "Galeri" },
  { href: "/blog", label: "Blog" },
];

function normalizeSearchValue(value: string | null | undefined) {
  return (value ?? "")
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

const Navbar = ({ categories = [], productSearchItems = [] }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCorporateOpen, setIsMobileCorporateOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(true);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState("all");
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [showCompactNavbar, setShowCompactNavbar] = useState(false);
  const [showMobileNavbar, setShowMobileNavbar] = useState(true);
  const [mainNavbarHeight, setMainNavbarHeight] = useState(260);
  const pathname = usePathname();
  const router = useRouter();
  const lastScrollYRef = useRef(0);
  const isAtTopRef = useRef(true);
  const showCompactNavbarRef = useRef(false);
  const showMobileNavbarRef = useRef(true);
  const tickingRef = useRef(false);
  const scrollFrameRef = useRef<number | null>(null);
  const mainNavbarRef = useRef<HTMLElement | null>(null);
  const isMobileMenuOpenRef = useRef(false);
  const productSearchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    showMobileNavbarRef.current = true;
    const frame = window.requestAnimationFrame(() => {
      setIsMobileMenuOpen(false);
      setShowMobileNavbar(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!productSearchRef.current) return;
      if (productSearchRef.current.contains(event.target as Node)) return;

      setIsProductSearchOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

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
      const isMobileViewport = window.innerWidth < 1024;
      const nextMobileVisibleState = isMobileViewport
        ? isMobileMenuOpenRef.current
          ? true
          : currentY <= 8
            ? true
            : deltaY < -6
              ? true
              : deltaY > 6
                ? false
                : showMobileNavbarRef.current
        : true;

      if (pageTop !== isAtTopRef.current) {
        isAtTopRef.current = pageTop;
        setIsAtTop(pageTop);
      }

      if (nextCompactState !== showCompactNavbarRef.current) {
        showCompactNavbarRef.current = nextCompactState;
        setShowCompactNavbar(nextCompactState);
      }

      if (nextMobileVisibleState !== showMobileNavbarRef.current) {
        showMobileNavbarRef.current = nextMobileVisibleState;
        setShowMobileNavbar(nextMobileVisibleState);
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
  const categoryLinks = categories.map((item) => ({
    ...item,
    href: getCategoryHref(categories, item),
    label: getCategoryDisplayName(item),
    children: getChildCategories(categories, item.id).map((child) => ({
      ...child,
      href: getCategoryHref(categories, child),
      label: getCategoryDisplayName(child),
    })),
  }));
  const topLevelCategoryLinks = getTopLevelCategories(categories).map((item) => ({
    ...item,
    href: getCategoryHref(categories, item),
    label: getCategoryDisplayName(item),
    children: getChildCategories(categories, item.id).map((child) => ({
      ...child,
      href: getCategoryHref(categories, child),
      label: getCategoryDisplayName(child),
    })),
  }));
  const normalizedProductSearchQuery = normalizeSearchValue(productSearchQuery);
  const productSearchResults = useMemo(() => {
    if (!normalizedProductSearchQuery) return [];

    return productSearchItems
      .filter((item) => {
        const matchesQuery = normalizeSearchValue(
          `${item.name} ${item.searchText}`,
        ).includes(normalizedProductSearchQuery);
        const matchesCategory =
          selectedProductCategory === "all" ||
          item.categoryHrefs.some(
            (href) =>
              href === selectedProductCategory ||
              href.startsWith(`${selectedProductCategory}/`),
          );

        return matchesQuery && matchesCategory;
      })
      .slice(0, 6);
  }, [
    normalizedProductSearchQuery,
    productSearchItems,
    selectedProductCategory,
  ]);
  const shouldShowProductSearchResults =
    isProductSearchOpen && normalizedProductSearchQuery.length > 0;
  const handleProductSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = productSearchQuery.trim();
    const nextPath =
      selectedProductCategory === "all"
        ? ALL_PRODUCTS_PATH
        : selectedProductCategory;
    const query = new URLSearchParams();

    if (trimmedQuery) {
      query.set("q", trimmedQuery);
    }

    const queryString = query.toString();
    setIsProductSearchOpen(false);
    router.push(queryString ? `${nextPath}?${queryString}` : nextPath);
  };

  const isExactActive = (href: string) => pathname === href;
  const isSectionActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isCorporateActive = CORPORATE_LINKS.some((item) =>
    isSectionActive(item.href),
  );
  const pathSegments = pathname.split("/").filter(Boolean);
  const isBlogSlugPage =
    pathSegments[0] === "blog" && pathSegments.length === 2;
  const renderCategoryNavItems = (compact = false) =>
    topLevelCategoryLinks.map((item) => {
      const isActive = isCategoryPathActive(pathname, item.href);
      const linkClass = compact
        ? `inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-colors ${
            isActive
              ? "bg-[#152f51] text-white"
              : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51] group-hover:bg-[#f4f7fb] group-hover:text-[#152f51]"
          }`
        : `inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.03em] transition-colors ${
            isActive
              ? "bg-white text-[#152f51]"
              : "text-white hover:bg-white/15 group-hover:bg-white/15"
          }`;

      return (
        <div key={`nav-category-${compact ? "compact" : "main"}-${item.id}`} className="group relative">
          <Link href={item.href} prefetch={false} className={linkClass}>
            <span>{item.label}</span>
            {item.children.length > 0 ? (
              <ChevronDown className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
            ) : null}
          </Link>

          {item.children.length > 0 ? (
            <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
              <div className={`overflow-hidden border border-slate-200 bg-white shadow-xl ${
                compact ? "rounded-xl" : "rounded-2xl"
              }`}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className={`block border-b border-slate-100 px-4 py-3 text-sm font-semibold transition-colors ${
                    pathname === item.href
                      ? "bg-[#f4f7fb] text-[#152f51]"
                      : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
                  }`}
                >
                  Tüm {item.label}
                </Link>
                {item.children.map((child) => (
                  <Link
                    key={`nav-child-${compact ? "compact" : "main"}-${child.id}`}
                    href={child.href}
                    prefetch={false}
                    className={`block border-b border-slate-100 px-4 py-3 text-sm font-semibold transition-colors last:border-b-0 ${
                      pathname === child.href
                        ? "bg-[#f4f7fb] text-[#152f51]"
                        : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      );
    });

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
          <div className="bg-[#0d1f36] px-4 py-2 text-xs font-semibold text-slate-100 sm:px-6">
            <div className="mx-auto flex min-h-8 max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-2">
              <a
                href={`tel:${COMPANY.phoneHref}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <PhoneCall className="h-3.5 w-3.5 text-[#9fb4cc]" />
                {COMPANY.phoneDisplay}
              </a>
              <a
                href={`tel:${COMPANY.mobileHref}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <PhoneCall className="h-3.5 w-3.5 text-[#9fb4cc]" />
                {COMPANY.mobileDisplay}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-[#9fb4cc]" />
                {COMPANY.email}
              </a>
              <Link
                href="/iletisim"
                prefetch={false}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <MapPin className="h-3.5 w-3.5 text-[#9fb4cc]" />
                {COMPANY.location}
              </Link>
            </div>
          </div>

          <div className="mx-auto flex max-w-7xl items-center gap-8 bg-white px-4 py-5 sm:px-6">
            <Link
              href="/"
              prefetch={false}
              className="inline-flex shrink-0 items-center gap-4"
              onClick={closeMobileMenu}
            >
              <span className="inline-flex  p-2 ">
                <Image
                  src={Logo}
                  alt="Hürtaş logosu"
                  preload
                  fetchPriority="high"
                  loading="eager"
                  width={80}
                  height={48}
                  quality={40}
                  sizes="80px"
                  className="h-12 w-auto"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-xl font-black uppercase tracking-tight text-[#152f51]">
                  Hürtaş
                </span>
                <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Beton Elemanları
                </span>
              </span>
            </Link>

            <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-3">
              <div ref={productSearchRef} className="relative min-w-0 flex-1">
                <form
                  onSubmit={handleProductSearch}
                  className="flex min-w-0 overflow-hidden rounded-[3px] border border-[#152f51]/15 bg-white shadow-[0_16px_36px_-32px_rgba(21,47,81,0.65)]"
                >
                  <label htmlFor="desktop-product-category" className="sr-only">
                    Ürün kategorisi
                  </label>
                  <select
                    id="desktop-product-category"
                    value={selectedProductCategory}
                    onChange={(event) => {
                      setSelectedProductCategory(event.target.value);
                      setIsProductSearchOpen(true);
                    }}
                    className="w-44 shrink-0 border-r border-[#152f51]/15 bg-[#f4f7fb] px-3 text-sm font-bold text-[#152f51] outline-none transition-colors hover:bg-[#e9eff6] "
                  >
                    <option value="all">Tüm Ürünler</option>
                    {categoryLinks.map((item) => (
                      <option
                        key={`desktop-search-${item.id}`}
                        value={item.href}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="desktop-product-search" className="sr-only">
                    Ürün ara
                  </label>
                  <div className="relative min-w-0 flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f839d]" />
                    <input
                      id="desktop-product-search"
                      type="search"
                      value={productSearchQuery}
                      onChange={(event) => {
                        setProductSearchQuery(event.target.value);
                        setIsProductSearchOpen(true);
                      }}
                      onFocus={() => setIsProductSearchOpen(true)}
                      placeholder="Ürün ara..."
                      className="h-12 w-full min-w-0 px-10 text-sm font-semibold text-[#152f51] outline-none placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center bg-[#152f51] text-white transition-colors hover:bg-[#10243d]"
                    aria-label="Ürün ara"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </form>

                {shouldShowProductSearchResults ? (
                  <div className="absolute left-0 right-0 top-full z-[70] mt-2 overflow-hidden rounded-[3px] border border-slate-200 bg-white shadow-[0_24px_70px_-34px_rgba(15,23,42,0.45)]">
                    {productSearchResults.length > 0 ? (
                      <div className="max-h-[420px] overflow-y-auto py-2">
                        {productSearchResults.map((item) => (
                          <Link
                            key={`desktop-product-result-${item.id}`}
                            href={item.href}
                            prefetch={false}
                            onClick={() => setIsProductSearchOpen(false)}
                            className="group flex items-center gap-3 border-b border-slate-100 px-3 py-3 transition-colors last:border-b-0 hover:bg-[#f4f7fb]"
                          >
                            <span className="relative h-14 w-16 shrink-0 overflow-hidden rounded-[2px] bg-slate-100">
                              {item.imageUrl ? (
                                <Image
                                  src={item.imageUrl}
                                  alt={item.imageAlt}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              ) : (
                                <span className="flex h-full w-full items-center justify-center text-slate-400">
                                  <Search className="h-4 w-4" />
                                </span>
                              )}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-black text-slate-900 group-hover:text-[#152f51]">
                                {item.name}
                              </span>
                              {item.categoryLabel ? (
                                <span className="mt-1 block truncate text-xs font-bold text-slate-500">
                                  {item.categoryLabel}
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-5 text-sm font-semibold text-slate-500">
                        Bu aramaya uygun ürün bulunamadı.
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-[2px] bg-[#d6a94a] px-4 text-xs font-black uppercase tracking-[0.12em] text-[#152f51] transition-colors hover:bg-[#bf943b] ads-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>
              <Link
                href="/iletisim"
                prefetch={false}
                className="inline-flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-[2px] bg-[#152f51] px-4 text-xs font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#10243d]"
              >
                <Mail className="h-4 w-4" />
                İletişim
              </Link>
            </div>
          </div>

          <div className="flex min-h-16 items-center justify-center bg-[#152f51] px-4 sm:px-6">
            <nav className="hidden items-center justify-center gap-2 lg:flex">
              <Link
                href="/"
                prefetch={false}
                className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.03em] transition-colors ${
                  isExactActive("/")
                    ? "bg-white text-[#152f51]"
                    : "text-white hover:bg-white/15"
                }`}
              >
                Ana Sayfa
              </Link>

              <Link
                href={ALL_PRODUCTS_PATH}
                prefetch={false}
                className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.03em] transition-colors ${
                  pathname === ALL_PRODUCTS_PATH
                    ? "bg-white text-[#152f51]"
                    : "text-white hover:bg-white/15"
                }`}
              >
                Tüm Ürünler
              </Link>

              {renderCategoryNavItems()}

              <div className="group relative">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.03em] transition-colors ${
                    isCorporateActive
                      ? "bg-white text-[#152f51]"
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
                            ? "bg-[#f4f7fb] text-[#152f51]"
                            : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
                        }`}
                      >
                        {item.label}
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
                      ? "bg-white text-[#152f51]"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
          showMobileNavbar
            ? "translate-y-0"
            : "-translate-y-full pointer-events-none"
        } ${
          showCompact
            ? "lg:pointer-events-auto lg:translate-y-0"
            : "lg:pointer-events-none lg:-translate-y-[140%]"
        }`}
      >
        <div className="flex min-h-[5.25rem] w-full items-center gap-3 border-b border-slate-200 bg-white/95 px-4 shadow-[0_12px_34px_-26px_rgba(15,23,42,0.9)] backdrop-blur sm:px-5 m">
          <Link
            href="/"
            prefetch={false}
            className="inline-flex items-center gap-3"
            onClick={closeMobileMenu}
          >
            <span className="inline-flex ">
              <Image
                src={Logo}
                alt="Hürtaş logosu"
                width={60}
                height={36}
                quality={40}
                sizes="60px"
                className="h-9 w-auto"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-black uppercase tracking-[0.08em] text-slate-900 sm:text-base">
                Hürtaş
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:text-[10px]">
                Beton Elemanları
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            <Link
              href="/"
              prefetch={false}
              className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-colors ${
                isExactActive("/")
                  ? "bg-[#152f51] text-white"
                  : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
              }`}
            >
              Ana Sayfa
            </Link>

            <Link
              href={ALL_PRODUCTS_PATH}
              prefetch={false}
              className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-colors ${
                pathname === ALL_PRODUCTS_PATH
                  ? "bg-[#152f51] text-white"
                  : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
              }`}
            >
              Tüm Ürünler
            </Link>

            {renderCategoryNavItems(true)}

            <div className="group relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-colors ${
                  isCorporateActive
                    ? "bg-[#152f51] text-white"
                    : "text-slate-700 group-hover:bg-[#f4f7fb] group-hover:text-[#152f51]"
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
                          ? "bg-[#f4f7fb] text-[#152f51]"
                          : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
                      }`}
                    >
                      {item.label}
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
                    ? "bg-[#152f51] text-white"
                    : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/iletisim"
              prefetch={false}
              className="hidden rounded-xl bg-[#152f51] px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] text-white transition-colors hover:bg-[#10243d] lg:inline-flex"
            >
              İletişim
            </Link>
            {isBlogSlugPage ? (
              <button
                type="button"
                onClick={handleCall}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#152f51] px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] text-white transition-colors hover:bg-[#10243d] lg:hidden ads-phone-call"
              >
                <PhoneCall className="h-4 w-4" />
                Bizi Arayın
              </button>
            ) : (
              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                onClick={toggleMobileMenu}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#152f51]/30 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#152f51] shadow-[0_12px_28px_-20px_rgba(21,47,81,0.55)] transition-all hover:bg-[#f4f7fb] lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-4.5 w-4.5" />
                ) : (
                  <Menu className="h-4.5 w-4.5" />
                )}
                <span>{isMobileMenuOpen ? "Kapat" : "Menü"}</span>
              </button>
            )}
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

          <aside className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-hidden border-l border-slate-200 bg-white shadow-[0_24px_80px_-28px_rgba(15,23,42,0.35)] pb-24">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <Link
                href="/"
                prefetch={false}
                onClick={closeMobileMenu}
                className="inline-flex items-center gap-3"
              >
                <Image
                  src={Logo}
                  alt="Hürtaş logosu"
                  width={52}
                  height={31}
                  quality={40}
                  sizes="52px"
                  className="h-8 w-auto"
                />
                <span className="leading-tight">
                  <span className="block text-sm font-black uppercase tracking-[0.08em] text-slate-900">
                    Hürtaş
                  </span>
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Beton Elemanları
                  </span>
                </span>
              </Link>

              <button
                type="button"
                aria-label="Menüyü kapat"
                onClick={closeMobileMenu}
                className="rounded-xl border border-slate-200 p-2 text-slate-700 transition-colors hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="mt-4 grid gap-3">
                <Link
                  href="/"
                  prefetch={false}
                  onClick={closeMobileMenu}
                  className={`rounded-2xl border px-4 py-3 text-sm font-extrabold uppercase tracking-[0.1em] transition-all duration-200 ${
                    isExactActive("/")
                      ? "border-[#152f51] bg-[#152f51] text-white"
                      : "border-slate-200 bg-white text-slate-800 hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Ana Sayfa
                </Link>

                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setIsMobileCorporateOpen((prev) => !prev)}
                    className="inline-flex w-full items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-slate-500"
                  >
                    Kurumsal
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isMobileCorporateOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isMobileCorporateOpen ? (
                    <div className="mt-3 grid gap-2">
                      {CORPORATE_LINKS.map((item) => (
                        <Link
                          key={`mobile-corporate-${item.href}`}
                          href={item.href}
                          prefetch={false}
                          onClick={closeMobileMenu}
                          className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                            isSectionActive(item.href)
                              ? "bg-[#f4f7fb] text-[#152f51]"
                              : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setIsMobileCategoriesOpen((prev) => !prev)}
                    className="inline-flex w-full items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-slate-500"
                  >
                    Beton Ürünleri
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isMobileCategoriesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isMobileCategoriesOpen ? (
                    <div className="mt-3 grid gap-2">
                      <Link
                        href={ALL_PRODUCTS_PATH}
                        prefetch={false}
                        onClick={closeMobileMenu}
                        className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                          pathname === ALL_PRODUCTS_PATH
                            ? "bg-[#f4f7fb] text-[#152f51]"
                            : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
                        }`}
                      >
                        Tüm Ürünler
                      </Link>
                      {topLevelCategoryLinks.map((item) => (
                        <div key={`mobile-category-${item.id}`}>
                          <Link
                            href={item.href}
                            prefetch={false}
                            onClick={closeMobileMenu}
                            className={`block rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                              isCategoryPathActive(pathname, item.href)
                                ? "bg-[#f4f7fb] text-[#152f51]"
                                : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
                            }`}
                          >
                            {item.label}
                          </Link>
                          {item.children.length > 0 ? (
                            <div className="mt-1 grid gap-1 pl-3">
                              {item.children.map((child) => (
                                <Link
                                  key={`mobile-category-child-${child.id}`}
                                  href={child.href}
                                  prefetch={false}
                                  onClick={closeMobileMenu}
                                  className={`block rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                                    pathname === child.href
                                      ? "bg-[#f4f7fb] text-[#152f51]"
                                      : "text-slate-600 hover:bg-[#f4f7fb] hover:text-[#152f51]"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                    Diğer Sayfalar
                  </p>
                  <div className="mt-3 grid gap-2">
                    {NAV_LINKS.map((item) => (
                      <Link
                        key={`mobile-nav-${item.href}`}
                        href={item.href}
                        prefetch={false}
                        onClick={closeMobileMenu}
                        className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                          isSectionActive(item.href)
                            ? "bg-[#f4f7fb] text-[#152f51]"
                            : "text-slate-700 hover:bg-[#f4f7fb] hover:text-[#152f51]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
