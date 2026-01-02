import ProductsClient from "@/components/ProductClient";
import { Suspense } from "react";

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
