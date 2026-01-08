import { getCategories, getCategoryBySlug } from "@/actions/categoryActions";
import { getProductsWithImages } from "@/actions/productActions";
import ProductsClient from "@/components/ProductClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categoryData = await getCategoryBySlug(categorySlug);

  if (!categoryData) {
    return {
      title: "Kategori Bulunamadı",
    };
  }

  const title = `${categoryData.name} Prefabrik Evler | CT Prefabrik`;
  const description = `CT Prefabrik ${categoryData.name.toLowerCase()} prefabrik ev modelleri ve fiyatları. TSE onaylı, anahtar teslim prefabrik evler.`;

  return {
    title,
    description,
    keywords: [
      `${categoryData.name.toLowerCase()} prefabrik ev`,
      `${categoryData.name.toLowerCase()} prefabrik ev fiyatları`,
      "prefabrik ev modelleri",
      "anahtar teslim prefabrik ev",
      "CT Prefabrik",
    ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: "https://ctprefabrik.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `CT Prefabrik - ${categoryData.name}`,
        },
      ],
      type: "website",
      url: `https://ctprefabrik.com/prefabrik-evler/${categorySlug}`,
    },
    alternates: {
      canonical: `https://ctprefabrik.com/prefabrik-evler/${categorySlug}`,
    },
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { category: categorySlug } = await params;

  // Fetch category by slug
  const categoryData = await getCategoryBySlug(categorySlug);

  if (!categoryData) {
    notFound();
  }

  // Fetch products for this category and all categories for filter UI
  const [products, categories] = await Promise.all([
    getProductsWithImages(categoryData.id),
    getCategories(),
  ]);

  return (
    <main className="flex items-center justify-center flex-col">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#49202d]"></div>
          </div>
        }
      >
        <ProductsClient
          products={products}
          categories={categories}
          activeCategory={categorySlug}
        />
      </Suspense>
    </main>
  );
};

export default CategoryPage;
