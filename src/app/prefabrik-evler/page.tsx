import ProductsClient from "@/components/ProductClient";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: 'Prefabrik Ev Modelleri | Tüm Ürünler',
  description: 'CT Prefabrik\'in tüm prefabrik ev modellerini inceleyin. Farklı oda sayıları, kat seçenekleri ve fiyat aralıklarında yüzlerce model. TSE onaylı, 10 yıl garantili.',
  keywords: [
    'prefabrik ev modelleri',
    'prefabrik ev kataloğu',
    'prefabrik ev fiyatları',
    '2 katlı prefabrik',
    '3 oda prefabrik ev',
    'tek katlı prefabrik',
    'villa tipi prefabrik',
  ],
  openGraph: {
    title: 'Prefabrik Ev Modelleri | CT Prefabrik',
    description: 'Yüzlerce prefabrik ev modeli arasından sizin için en uygun olanı seçin.',
    images: [
      {
        url: 'https://ctprefabrik.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CT Prefabrik Ürünleri',
      },
    ],
    type: 'website',
    url: 'https://ctprefabrik.com/prefabrik-evler',

  },
  alternates: {
    canonical: 'https://ctprefabrik.com/prefabrik-evler',
  },
};

const ProductsPage = () => {
  return (
    <main className="flex items-center justify-center flex-col">
      {/* useSearchParams kullanan bileşeni Suspense ile sarmalıyoruz */}
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#49202d]"></div>
        </div>
      }>
        <ProductsClient />
      </Suspense>
    </main>
  );
};

export default ProductsPage;
