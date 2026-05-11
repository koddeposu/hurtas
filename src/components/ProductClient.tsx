"use client";

import { ProductCard } from "@/components/ProductCard";
import {
  useDictionary,
  useLocale,
  useLocalizedPath,
} from "@/components/i18n-provider";
import {
  formatMessage,
  getDateLocale,
  getLocalizedImageAlt,
  getLocalizedCategoryField,
  getLocalizedProductDescription,
  getLocalizedProductMetaDescription,
  getLocalizedProductName,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";
import {
  ALL_PRODUCTS_PATH,
  getCategoryDisplayName,
  getCategoryHref,
} from "@/lib/productRoutes";
import { DBCategory, DBProduct } from "@/types/product";
import {
  ArrowUpRight,
  ChevronRight,
  Factory,
  Filter,
  Home,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProjectGalleryModal = dynamic(
  () =>
    import("./ModalSliderImage").then((module) => module.ProjectGalleryModal),
  {
    ssr: false,
  },
);

interface ProductsClientProps {
  products: DBProduct[];
  categories: DBCategory[];
  activeCategory?: string;
  searchQuery?: string;
}

type CategoryKey = "all" | "single" | "double" | "steel";
type RoomKey = "1+1" | "2+1" | "3+1" | "4+1";
type ExtendedCategoryKey =
  | CategoryKey
  | "room-1-1"
  | "room-2-1"
  | "room-3-1"
  | "room-4-1";

const CURRENT_YEAR = new Date().getFullYear();

function includesRoom(value: string | undefined, room: RoomKey) {
  if (!value) return false;
  const normalized = value.toLowerCase();
  const target = room.toLowerCase();
  return (
    normalized.includes(target) ||
    normalized.includes(target.replace("+", "-")) ||
    normalized.includes(target.replace("+", " + "))
  );
}

function getCategoryKey(
  categoryName?: string,
  categorySlug?: string,
): ExtendedCategoryKey {
  if (!categoryName && !categorySlug) return "all";

  if (includesRoom(categorySlug, "1+1") || includesRoom(categoryName, "1+1")) {
    return "room-1-1";
  }
  if (includesRoom(categorySlug, "2+1") || includesRoom(categoryName, "2+1")) {
    return "room-2-1";
  }
  if (includesRoom(categorySlug, "3+1") || includesRoom(categoryName, "3+1")) {
    return "room-3-1";
  }
  if (includesRoom(categorySlug, "4+1") || includesRoom(categoryName, "4+1")) {
    return "room-4-1";
  }

  if (categoryName?.includes("Tek Kat")) return "single";
  if (categoryName?.includes("Çift Kat") || categoryName?.includes("Dubleks")) {
    return "double";
  }
  if (categoryName?.includes("Çelik")) return "steel";
  return "all";
}

function normalizeSearchValue(value: string | null | undefined, locale: Locale) {
  return (value ?? "").toLocaleLowerCase(getDateLocale(locale)).trim();
}

function productMatchesQuery(product: DBProduct, query: string, locale: Locale) {
  const searchableText = [
    getLocalizedProductName(product, locale),
    product.name,
    product.nameEn,
    product.nameAr,
    product.slug,
    product.area,
    product.room,
    product.floor,
    product.bath,
    product.height,
    product.price,
    product.oldPrice,
    getLocalizedProductDescription(product, locale),
    getLocalizedProductMetaDescription(product, locale),
    product.description,
    product.descriptionEn,
    product.descriptionAr,
    product.metaDescription,
    product.metaDescriptionEn,
    product.metaDescriptionAr,
    product.category ? getCategoryDisplayName(product.category, locale) : null,
    product.category?.name,
    product.category?.nameEn,
    product.category?.nameAr,
    product.category?.title,
    product.category?.titleEn,
    product.category?.titleAr,
    product.category?.slug,
    ...(product.categories?.flatMap((item) => [
      getCategoryDisplayName(item, locale),
      item.name,
      item.nameEn,
      item.nameAr,
      item.title,
      item.titleEn,
      item.titleAr,
      item.slug,
    ]) ?? []),
  ]
    .map((item) => normalizeSearchValue(item, locale))
    .join(" ");

  return searchableText.includes(query);
}

function getRoomPageContent(room: RoomKey, dict: Dictionary) {
  return {
    eyebrow: formatMessage(dict.products.rooms.eyebrow, { room }),
    title: formatMessage(dict.products.rooms.title, { room }),
    description: dict.products.rooms.description,
  };
}

function getPageContent(
  dict: Dictionary,
  categoryName?: string,
  categorySlug?: string,
) {
  const categoryKey = getCategoryKey(categoryName, categorySlug);

  if (categoryKey === "room-1-1") return getRoomPageContent("1+1", dict);
  if (categoryKey === "room-2-1") return getRoomPageContent("2+1", dict);
  if (categoryKey === "room-3-1") return getRoomPageContent("3+1", dict);
  if (categoryKey === "room-4-1") return getRoomPageContent("4+1", dict);

  if (categoryKey === "single") {
    return dict.products.infrastructure;
  }

  if (categoryKey === "double") {
    return dict.products.superstructure;
  }

  if (categoryKey === "steel") {
    return dict.products.projectSupply;
  }

  return {
    ...dict.products.defaults,
    seoTitle: formatMessage(dict.products.defaults.seoTitle, {
      year: CURRENT_YEAR,
    }),
  };
}

function ProductSidebarMenu({
  categories,
  activeCategory,
  onNavigate,
}: {
  categories: DBCategory[];
  activeCategory?: string;
  onNavigate?: () => void;
}) {
  const locale = useLocale();
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();
  const quickLinks = [
    {
      label: dict.products.all,
      href: ALL_PRODUCTS_PATH,
      active: !activeCategory,
      icon: Home,
    },
  ];

  return (
    <aside>
      <div className="border border-[#223955] bg-[#0d1f36] text-white shadow-[0_24px_54px_-42px_rgba(13,31,54,0.75)]">
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1 bg-[#d6a94a]" aria-hidden="true" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
                  {dict.products.menu}
                </p>
                <h2 className="mt-1 text-lg font-black uppercase tracking-tight">
                  {dict.common.concreteProducts}
                </h2>
            </div>
          </div>
        </div>

          <nav className="p-3" aria-label={dict.products.categories}>
          <p className="px-2 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {dict.products.quickSelection}
          </p>
          <div className="space-y-1">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={localizedPath(item.href)}
                  onClick={onNavigate}
                  className={`group flex min-h-11 items-center justify-between border px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition-colors ${
                    item.active
                      ? "border-[#d6a94a] bg-[#d6a94a] text-[#0d1f36]"
                      : "border-white/10 bg-[#132945] text-slate-200 hover:border-white/25 hover:bg-[#183456] hover:text-white"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>

          <div className="my-4 h-px bg-white/10" />

          <p className="px-2 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {dict.products.categories}
          </p>
          <div className="space-y-1">
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;
              const categoryLabel = getCategoryDisplayName(category, locale);

              return (
                <Link
                  key={category.id}
                  href={localizedPath(getCategoryHref(categories, category))}
                  onClick={onNavigate}
                  className={`group flex min-h-11 items-center justify-between border px-3 py-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "border-[#d6a94a] bg-[#d6a94a] text-[#0d1f36]"
                      : "border-white/10 bg-transparent text-slate-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Factory className="h-4 w-4 shrink-0" />
                    <span className="min-w-0 break-words leading-snug">
                      {categoryLabel}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}

function SeoFooter({
  title,
  description,
  eyebrow,
}: {
  title?: string;
  description?: string;
  eyebrow: string;
}) {
  if (!title && !description) return null;

  return (
    <section className="mt-60 border-t border-slate-200 pt-8">
      <div className="max-w-3xl">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
          {eyebrow}
        </p>
        {title ? (
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#152f51] md:text-3xl">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}

const ProductsClient = ({
  products,
  categories,
  activeCategory,
  searchQuery = "",
}: ProductsClientProps) => {
  const locale = useLocale();
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();
  const [selectedProduct, setSelectedProduct] = useState<DBProduct | null>(
    null,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const normalizedSearchQuery = normalizeSearchValue(searchQuery, locale);
  const visibleProducts = normalizedSearchQuery
    ? products.filter((product) =>
        productMatchesQuery(product, normalizedSearchQuery, locale),
      )
    : products;

  const activeCategoryItem = activeCategory
    ? categories.find((category) => category.slug === activeCategory)
    : undefined;
  const activeCategoryName = activeCategoryItem?.name;
  const activeCategoryDisplayName = activeCategoryItem
    ? getCategoryDisplayName(activeCategoryItem, locale)
    : undefined;
  const activeCategoryLabel = activeCategoryItem
    ? getCategoryDisplayName(activeCategoryItem, locale)
    : undefined;

  const content = getPageContent(dict, activeCategoryName, activeCategory);
  const headerEyebrow =
    (activeCategoryItem
      ? getLocalizedCategoryField(activeCategoryItem, "name", locale)
      : undefined) ?? content.eyebrow;
  const headerTitle =
    (activeCategoryItem
      ? getLocalizedCategoryField(activeCategoryItem, "title", locale)
      : undefined) ??
    activeCategoryDisplayName ??
    content.title;
  const headerDescription =
    (activeCategoryItem
      ? getLocalizedCategoryField(activeCategoryItem, "description", locale)
      : undefined) ??
    (activeCategoryItem ? undefined : content.description);
  const bottomTitle = activeCategoryItem
    ? getLocalizedCategoryField(activeCategoryItem, "subtitle", locale)
    : undefined;
  const bottomDescription = activeCategoryItem
    ? getLocalizedCategoryField(activeCategoryItem, "subdescription", locale)
    : undefined;
  const hasBottomContent = Boolean(bottomTitle || bottomDescription);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="w-full max-w-[1280px]">
      {selectedProduct ? (
        <ProjectGalleryModal
          projects={selectedProduct.images.map((image, index) => ({
            id: index,
            img: image.url,
            title: getLocalizedImageAlt(image, locale),
          }))}
          isOpen
          onClose={() => setSelectedProduct(null)}
        />
      ) : null}

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-[90] bg-[#0d1f36] text-white lg:hidden">
          <div className="flex h-full flex-col">
            <div className="flex min-h-16 items-center justify-between border-b border-white/10 px-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
                  {dict.products.menu}
                </p>
                <p className="mt-1 text-sm font-black uppercase tracking-[0.08em] text-white">
                  {dict.products.chooseCategory}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white"
                aria-label={dict.products.closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
              <ProductSidebarMenu
                categories={categories}
                activeCategory={activeCategory}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      ) : null}

      <section className="pb-20">
        <section className="pb-10 pt-14 lg:pb-12 lg:pt-18">
          <div className="relative py-2">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-secondary">
                {headerEyebrow}
              </p>
              <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                {headerTitle}
              </h1>
              {headerDescription ? (
                <p className="mx-auto mt-3 max-w-5xl text-sm font-medium leading-7 text-slate-600">
                  {headerDescription}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <div className="mb-5 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex min-h-14 w-full items-center justify-between border border-[#152f51] bg-[#0d1f36] px-4 text-left text-white shadow-[0_18px_38px_-30px_rgba(13,31,54,0.8)]"
          >
            <span className="flex min-w-0 items-center gap-3">
              <Filter className="h-5 w-5 shrink-0 text-[#d6a94a]" />
              <span>
                <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#d6a94a]">
                  {dict.products.menu}
                </span>
                <span className="block text-sm font-black uppercase tracking-[0.08em]">
                  {dict.products.openCategories}
                </span>
              </span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0" />
          </button>
        </div>

        <div className="grid gap-7 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-start">
          <div className="hidden lg:block">
            <ProductSidebarMenu
              categories={categories}
              activeCategory={activeCategory}
            />
          </div>

          <div className="min-w-0">
            {visibleProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-slate-300 bg-white px-6 py-20">
                <div className="mb-6 flex h-20 w-20 items-center justify-center border border-slate-200 bg-slate-100">
                  <Filter size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {dict.products.notFound}
                </h3>
                <p className="mt-2 max-w-md text-center text-slate-500">
                  {normalizedSearchQuery
                    ? formatMessage(dict.products.notFoundSearch, {
                        query: searchQuery,
                      })
                    : activeCategoryLabel
                      ? formatMessage(dict.products.notFoundCategory, {
                          category: activeCategoryLabel,
                        })
                      : dict.products.notAdded}
                </p>
                <Link
                  href={localizedPath(ALL_PRODUCTS_PATH)}
                  className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                >
                  {dict.products.seeAll}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categories={categories}
                    fullscreenChange={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {hasBottomContent ? (
          <SeoFooter
            title={bottomTitle}
            description={bottomDescription}
            eyebrow={dict.products.seoEyebrow}
          />
        ) : null}
      </section>
    </div>
  );
};

export default ProductsClient;
