import { getCategories } from "@/actions/categoryActions";
import { getFavoritesPreviewForHomepage } from "@/actions/favoriteActions";
import { BestSellingHouses } from "./best-selling-houses";

export async function HomepageFavoritesSection() {
  const [favorites, categories] = await Promise.all([
    getFavoritesPreviewForHomepage(8),
    getCategories(),
  ]);

  if (!favorites.length) {
    return null;
  }

  return (
    <section className="flex justify-center mt-10 md:mt-24  md:pt-0 lg:pg-0">
      <div className="max-w-[1280px] w-full">
        <BestSellingHouses favorites={favorites} categories={categories} />
      </div>
    </section>
  );
}
