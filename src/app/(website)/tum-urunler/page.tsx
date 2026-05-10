import { getCategories } from "@/actions/categoryActions";
import { getProductsWithImages } from "@/actions/productActions";
import ProductsClient from "@/components/ProductClient";
import { Metadata } from "next";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: "Tüm Ürünler | Hürtaş Beton",
  description:
    "Hürtaş Beton altyapı, üst yapı ve çevre düzenleme ürünlerini kategori bazında inceleyin.",
  openGraph: {
    title: "Tüm Ürünler | Hürtaş Beton",
    description:
      "Beton boru, parke taşı, bordür, menhol ve saha ürünlerini Hürtaş Beton ürün kataloğunda inceleyin.",
    images: [
      {
        url: "https://ctprefabrik.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hürtaş Beton Ürünleri",
      },
    ],
    type: "website",
    url: "https://ctprefabrik.com/tum-urunler",
  },
  alternates: {
    canonical: "https://ctprefabrik.com/tum-urunler",
  },
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;
  const searchQuery = typeof params.q === "string" ? params.q : "";
  const [products, categories] = await Promise.all([
    getProductsWithImages(),
    getCategories(),
  ]);

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
          searchQuery={searchQuery}
        />
      </Suspense>
    </main>
  );
};

export default ProductsPage;
