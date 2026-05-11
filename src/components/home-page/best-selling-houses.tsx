import { DBProductPreview } from "@/types/product";
import { ALL_PRODUCTS_PATH } from "@/lib/productRoutes";
import type { RouteCategory } from "@/lib/productRoutes";
import { HomepageCategorySlider } from "./homepage-category-slider";
import { getDictionary } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";

interface BestSellingHousesProps {
  favorites: DBProductPreview[];
  categories?: RouteCategory[];
}

export async function BestSellingHouses({
  favorites,
  categories = [],
}: BestSellingHousesProps) {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <HomepageCategorySlider
      title={dict.sliders.featured.title}
      accent={dict.sliders.featured.accent}
      seoLabel={dict.sliders.featured.seoLabel}
      description={dict.sliders.featured.description}
      href={ALL_PRODUCTS_PATH}
      products={favorites}
      categories={categories}
    />
  );
}
