import { getProductsPreview } from "@/actions/productActions";
import { HomepageCategorySlider } from "./homepage-category-slider";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

interface HomepageProductSlidersProps {
  categories: CategoryItem[];
}

function getCategory(categories: CategoryItem[], matcher: string) {
  return categories.find((category) => category.name.includes(matcher)) ?? null;
}

export async function HomepageProductSliders({
  categories,
}: HomepageProductSlidersProps) {
  const singleFloorCategory = getCategory(categories, "Tek Kat");
  const doubleFloorCategory = getCategory(categories, "Çift Kat");
  const steelHouseCategory = getCategory(categories, "Çelik");

  const [singleFloorProducts, doubleFloorProducts, steelHouseProducts] =
    await Promise.all([
      singleFloorCategory
        ? getProductsPreview(singleFloorCategory.id, 8)
        : Promise.resolve([]),
      doubleFloorCategory
        ? getProductsPreview(doubleFloorCategory.id, 8)
        : Promise.resolve([]),
      steelHouseCategory
        ? getProductsPreview(steelHouseCategory.id, 8)
        : Promise.resolve([]),
    ]);

  return (
    <>
      {singleFloorProducts.length > 0 ? (
        <section className="flex justify-center py-5 lg:pt-7">
          <div className="max-w-[1280px] w-full">
            <HomepageCategorySlider
              title="Prefabrik Evler"
              accent="Tek Katlı"
              seoLabel="Tek Katlı Prefabrik Ev Modelleri"
              description="Tek katlı prefabrik ev modellerimizi metraj, oda dağılımı ve yaşam ihtiyacınıza göre tek tek inceleyin."
              href={
                singleFloorCategory
                  ? `/prefabrik-evler/${singleFloorCategory.slug}`
                  : "/prefabrik-evler"
              }
              products={singleFloorProducts}
            />
          </div>
        </section>
      ) : null}

      {doubleFloorProducts.length > 0 ? (
        <section className="flex justify-center py-5 lg:pt-5">
          <div className="max-w-[1280px] w-full">
            <HomepageCategorySlider
              title="Prefabrik Evler"
              accent="Çift Katlı"
              seoLabel="Çift Katlı Prefabrik Ev Modelleri"
              description="Geniş aileler ve villa tipi planlama ihtiyaçları için çift katlı prefabrik ev seçeneklerini kaydırarak inceleyin."
              href={
                doubleFloorCategory
                  ? `/prefabrik-evler/${doubleFloorCategory.slug}`
                  : "/prefabrik-evler"
              }
              products={doubleFloorProducts}
            />
          </div>
        </section>
      ) : null}

      {steelHouseProducts.length > 0 ? (
        <section className="flex justify-center py-5 lg:pt-5">
          <div className="max-w-[1280px] w-full">
            <HomepageCategorySlider
              title="Evler"
              accent="Çelik"
              seoLabel="Çelik Ev Modelleri ve Fiyatları"
              description="Çelik yapı gücü, modern cephe dili ve uzun ömürlü yaşam kurgusunu bir araya getiren modeller burada."
              href={
                steelHouseCategory
                  ? `/prefabrik-evler/${steelHouseCategory.slug}`
                  : "/prefabrik-evler"
              }
              products={steelHouseProducts}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
