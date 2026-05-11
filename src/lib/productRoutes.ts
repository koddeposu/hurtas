import {
  DEFAULT_LOCALE,
  getLocalizedCategoryDisplayName,
  type Locale,
} from "@/lib/i18n";

export const ALL_PRODUCTS_PATH = "/tum-urunler";
export const PRODUCT_DETAIL_PREFIX = "/urun-detay";
export const PRODUCT_ITEM_SEGMENT = "item";

export type RouteCategory = {
  id: string;
  parentId: string | null;
  name: string;
  nameEn?: string | null;
  nameAr?: string | null;
  title?: string | null;
  titleEn?: string | null;
  titleAr?: string | null;
  slug: string;
  order?: number;
};

export type RouteProduct = {
  slug: string;
  order?: number | null;
  categoryId?: string | null;
  categoryIds?: string[];
  category?: RouteCategory | null;
  categories?: RouteCategory[];
};

function getCategoryMap(categories: RouteCategory[]) {
  return new Map(categories.map((category) => [category.id, category]));
}

export function getProductDetailHref(slug: string) {
  return `${PRODUCT_DETAIL_PREFIX}/${slug}`;
}

export function getCategoryDisplayName(
  category: Pick<
    RouteCategory,
    "name" | "nameEn" | "nameAr" | "title" | "titleEn" | "titleAr"
  >,
  locale: Locale = DEFAULT_LOCALE,
) {
  return getLocalizedCategoryDisplayName(category, locale);
}

function getProductItemSlug(product: RouteProduct) {
  const order = typeof product.order === "number" ? product.order : 0;
  return order > 0 ? `${order}-${product.slug}` : product.slug;
}

function getProductPrimaryCategory(
  product: RouteProduct,
  categories: RouteCategory[],
) {
  if (product.category) return product.category;

  const categoryId = product.categoryId ?? product.categoryIds?.[0];
  if (categoryId) {
    return categories.find((category) => category.id === categoryId) ?? null;
  }

  return product.categories?.[0] ?? null;
}

export function getProductCategoryDetailHref(
  product: RouteProduct,
  categories: RouteCategory[] = [],
) {
  const productSlug = getProductItemSlug(product);
  const primaryCategory = getProductPrimaryCategory(product, categories);

  if (!primaryCategory) {
    return `${PRODUCT_DETAIL_PREFIX}/${productSlug}`;
  }

  const categorySource =
    categories.length > 0
      ? categories
      : [
          ...(product.categories ?? []),
          primaryCategory,
        ];

  return `${getCategoryHref(categorySource, primaryCategory)}/${PRODUCT_ITEM_SEGMENT}/${productSlug}`;
}

export function getCategoryHref(
  categories: RouteCategory[],
  category: RouteCategory,
) {
  const categoryMap = getCategoryMap(categories);
  const segments: string[] = [];
  const visited = new Set<string>();
  let current: RouteCategory | undefined = category;

  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    segments.unshift(current.slug);
    current = current.parentId
      ? categoryMap.get(current.parentId)
      : undefined;
  }

  return `/${segments.join("/")}`;
}

export function getCategoryHrefBySlug(
  categories: RouteCategory[],
  slug: string,
) {
  const category = categories.find((item) => item.slug === slug);
  return category ? getCategoryHref(categories, category) : ALL_PRODUCTS_PATH;
}

export function getTopLevelCategories(categories: RouteCategory[]) {
  return categories.filter((category) => !category.parentId);
}

export function getChildCategories(
  categories: RouteCategory[],
  parentId: string,
) {
  return categories.filter((category) => category.parentId === parentId);
}

export function isCategoryPathActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
