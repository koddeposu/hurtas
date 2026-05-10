import { getCategories, getCategoryBySlug } from "@/actions/categoryActions";
import { getProductsWithImages } from "@/actions/productActions";
import ProductsClient from "@/components/ProductClient";
import { getCategoryHref } from "@/lib/productRoutes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
}

function getFilledText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categoryData = await getCategoryBySlug(categorySlug);

  if (!categoryData || categoryData.parentId) {
    return {
      title: "Kategori Bulunamadı",
    };
  }

  const title =
    getFilledText(categoryData.title) ?? `${categoryData.name} | Hürtaş Beton`;
  const description =
    getFilledText(categoryData.description) ??
    `Hürtaş Beton ${categoryData.name.toLocaleLowerCase("tr-TR")} ürünlerini inceleyin.`;
  const url = `https://ctprefabrik.com/${categoryData.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "https://ctprefabrik.com/og-image.png",
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
