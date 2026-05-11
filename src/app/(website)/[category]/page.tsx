import { getCategories, getCategoryBySlug } from "@/actions/categoryActions";
import { getProductsWithImages } from "@/actions/productActions";
import ProductsClient from "@/components/ProductClient";
import {
  getDictionary,
  getLocalizedCategoryDisplayName,
  getLocalizedCategoryField,
  getMetadataAlternates,
  SITE_URL,
} from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import { getCategoryHref } from "@/lib/productRoutes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const categoryData = await getCategoryBySlug(categorySlug);

  if (!categoryData || categoryData.parentId) {
    return {
      title: dict.seo.categoryNotFoundTitle,
    };
  }

  const title =
    getLocalizedCategoryField(categoryData, "title", locale) ??
    `${getLocalizedCategoryDisplayName(categoryData, locale)} | ${dict.common.companyName}`;
  const description =
    getLocalizedCategoryField(categoryData, "description", locale) ??
    `${dict.common.companyName} ${getLocalizedCategoryDisplayName(
      categoryData,
      locale,
    )} ${dict.common.productCount}.`;
  const path = `/${categoryData.slug}`;
  const url = getMetadataAlternates(path, locale).canonical;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${dict.common.companyName} - ${getLocalizedCategoryDisplayName(categoryData, locale)}`,
        },
      ],
      type: "website",
      url,
      locale: dict.seo.locale,
    },
    alternates: getMetadataAlternates(path, locale),
  };
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category: categorySlug } = await params;
  const queryParams = await searchParams;
  const searchQuery = typeof queryParams.q === "string" ? queryParams.q : "";
  const categoryData = await getCategoryBySlug(categorySlug);

  if (!categoryData || categoryData.parentId) {
    notFound();
  }

  const [products, categories] = await Promise.all([
    getProductsWithImages(categoryData.id),
    getCategories(),
  ]);
  const currentHref = getCategoryHref(categories, categoryData);

  if (currentHref !== `/${categorySlug}`) {
    notFound();
  }

  return (
    <main className="flex items-center justify-center flex-col">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#49202d]" />
          </div>
        }
      >
        <ProductsClient
          products={products}
          categories={categories}
          activeCategory={categorySlug}
          searchQuery={searchQuery}
        />
      </Suspense>
    </main>
  );
};

export default CategoryPage;
