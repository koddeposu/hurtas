import { getCategories, getCategoryBySlug } from "@/actions/categoryActions";
import { getProductsWithImages } from "@/actions/productActions";
import ProductsClient from "@/components/ProductClient";
import { getCategoryHref } from "@/lib/productRoutes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ q?: string }>;
}

function getFilledText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: parentSlug, subcategory: categorySlug } = await params;
  const [parentCategory, categoryData] = await Promise.all([
    getCategoryBySlug(parentSlug),
    getCategoryBySlug(categorySlug),
  ]);

  if (
    !parentCategory ||
    !categoryData ||
    categoryData.parentId !== parentCategory.id
  ) {
    return {
      title: "Kategori Bulunamadı",
    };
  }

  const title =
    getFilledText(categoryData.title) ?? `${categoryData.name} | Hürtaş Beton`;
  const description =
    getFilledText(categoryData.description) ??
    `Hürtaş Beton ${categoryData.name.toLocaleLowerCase("tr-TR")} ürünlerini inceleyin.`;
  const url = `https://www.hurtasbeton.com/${parentCategory.slug}/${categoryData.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "https://www.hurtasbeton.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `Hürtaş Beton - ${categoryData.name}`,
        },
      ],
      type: "website",
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category: parentSlug, subcategory: categorySlug } = await params;
  const queryParams = await searchParams;
  const searchQuery = typeof queryParams.q === "string" ? queryParams.q : "";
  const [parentCategory, categoryData, categories] = await Promise.all([
    getCategoryBySlug(parentSlug),
    getCategoryBySlug(categorySlug),
    getCategories(),
  ]);

  if (
    !parentCategory ||
    !categoryData ||
    categoryData.parentId !== parentCategory.id
  ) {
    notFound();
  }

  const currentHref = getCategoryHref(categories, categoryData);

  if (currentHref !== `/${parentSlug}/${categorySlug}`) {
    notFound();
  }

  const products = await getProductsWithImages(categoryData.id);

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
