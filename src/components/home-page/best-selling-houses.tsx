import { DBProductPreview } from "@/types/product";
import { HomepageCategorySlider } from "./homepage-category-slider";

interface BestSellingHousesProps {
  favorites: DBProductPreview[];
}

export function BestSellingHouses({ favorites }: BestSellingHousesProps) {
  return (
    <HomepageCategorySlider
      title="Prefabrik Evlerimiz"
      accent="En Çok Tercih Edilen"
      seoLabel="Popüler Modeller"
      description="Yüzlerce aileye yuva olan, en çok incelenen prefabrik ev modellerimizi keşfedin."
      href="/prefabrik-evler"
      products={favorites}
    />
  );
}
