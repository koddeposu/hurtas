import { getFavoritesPreviewForHomepage } from "@/actions/favoriteActions";
import { BestSellingHouses } from "./best-selling-houses";

export async function HomepageFavoritesSection() {
  const favorites = await getFavoritesPreviewForHomepage(3);

  if (!favorites.length) {
    return null;
  }

  return (
    <section className="flex justify-center pt-8 md:pt-0 lg:pg-0">
      <div className="max-w-[1280px] w-full">
        <BestSellingHouses favorites={favorites} />
      </div>
    </section>
  );
}
