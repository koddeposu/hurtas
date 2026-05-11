import { getCategories } from "@/actions/categoryActions";
import { getProductsWithImages } from "@/actions/productActions";
import ProductsClient from "@/components/ProductClient";
import { getDictionary, getMetadataAlternates, SITE_URL } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import { Metadata } from "next";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.seo.productsTitle,
    description: dict.seo.productsDescription,
    openGraph: {
      title: dict.seo.productsTitle,
      description: dict.seo.productsDescription,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: dict.seo.productsTitle,
        },
      ],
      type: "website",
      url: getMetadataAlternates("/tum-urunler", locale).canonical,
      locale: dict.seo.locale,
    },
    alternates: getMetadataAlternates("/tum-urunler", locale),
  };
}

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
