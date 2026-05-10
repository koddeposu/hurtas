import { DBProductPreview } from "@/types/product";
import { ALL_PRODUCTS_PATH } from "@/lib/productRoutes";
import type { RouteCategory } from "@/lib/productRoutes";
import { HomepageCategorySlider } from "./homepage-category-slider";

interface BestSellingHousesProps {
  favorites: DBProductPreview[];
  categories?: RouteCategory[];
}

export function BestSellingHouses({
  favorites,
  categories = [],
}: BestSellingHousesProps) {
  return (
    <HomepageCategorySlider
      title="Ürünler"
      accent="Öne Çıkan"
      seoLabel="Seçili Beton Ürünleri"
      description="Altyapı, üst yapı ve çevre düzenleme projeleri için öne çıkan beton ürünlerini keşfedin."
      href={ALL_PRODUCTS_PATH}
      products={favorites}
      categories={categories}
    />
  );
}
