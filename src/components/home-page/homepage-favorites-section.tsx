import { getFavoritesPreviewForHomepage } from "@/actions/favoriteActions";
import { BestSellingHouses } from "./best-selling-houses";

export async function HomepageFavoritesSection() {
  const favorites = await getFavoritesPreviewForHomepage(8);

  if (!favorites.length) {
    return null;
  }

  return (
    <section className="flex justify-center mt-10 md:mt-40  md:pt-0 lg:pg-0">
      <div className="max-w-[1280px] w-full">
        <BestSellingHouses favorites={favorites} />
      </div>
    </section>
  );
}
