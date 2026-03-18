import { getCategories } from "@/actions/categoryActions";
import { getProductsWithImages } from "@/actions/productActions";
import { PRODUCTS_FAQS } from "@/components/page-faq-content";
import ProductsClient from "@/components/ProductClient";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Prefabrik Ev Modelleri ve Fiyatları | CT Prefabrik",
  description:
    "CT Prefabrik'in prefabrik ev modellerini ve fiyatlarını inceleyin. 1+1, 2+1, 3+1 seçenekleri, tek katlı ve 2 katlı prefabrik evler. Anahtar teslim, TSE onaylı.",
  keywords: [
    "prefabrik ev modelleri",
    "prefabrik ev fiyatları",
    "anahtar teslim prefabrik ev",
    "1+1 prefabrik ev",
    "2+1 prefabrik ev",
    "3+1 prefabrik ev",
    "tek katlı prefabrik ev",
    "çift katlı prefabrik ev",
    "2 katlı prefabrik ev",
    "villa tipi prefabrik ev",
    "CT Prefabrik",
    "CT Prefabrik Ev",
    "ctprefabrik ev",
    "ctprefabrik",
  ],
  openGraph: {
    title: "Prefabrik Ev Modelleri | CT Prefabrik",
    description:
      "Yüzlerce prefabrik ev modeli arasından sizin için en uygun olanı seçin.",
    images: [
      {
        url: "https://ctprefabrik.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CT Prefabrik Ürünleri",
      },
    ],
    type: "website",
    url: "https://ctprefabrik.com/prefabrik-evler",
  },
  alternates: {
    canonical: "https://ctprefabrik.com/prefabrik-evler",
  },
};

const ProductsPage = async () => {
  const [products, categories] = await Promise.all([
    getProductsWithImages(),
    getCategories(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PRODUCTS_FAQS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <main className="flex items-center justify-center flex-col">
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#49202d]"></div>
            </div>
          }
        >
          <ProductsClient products={products} categories={categories} />
        </Suspense>
      </main>
    </>
  );
};

export default ProductsPage;
