import { DBProductPreview } from "@/types/product";
import { HomepageCategorySlider } from "./homepage-category-slider";

interface BestSellingHousesProps {
  favorites: DBProductPreview[];
}

export function BestSellingHouses({ favorites }: BestSellingHousesProps) {
  return (
    <HomepageCategorySlider
      title="Ürünler"
      accent="Öne Çıkan"
      seoLabel="Seçili Beton Ürünleri"
      description="Altyapı, üst yapı ve çevre düzenleme projeleri için öne çıkan beton ürünlerini keşfedin."
      href="/prefabrik-evler"
      products={favorites}
    />
  );
}
