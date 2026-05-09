import { getProductsPreview } from "@/actions/productActions";
import { HomepageCategorySlider } from "./homepage-category-slider";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

interface HomepageProductSlidersProps {
  categories: CategoryItem[];
  group?: "core" | "environment";
}

function getCategory(categories: CategoryItem[], matchers: string[]) {
  return (
    categories.find((category) =>
      matchers.some((matcher) => category.name.includes(matcher)),
    ) ?? null
  );
}

export async function HomepageProductSliders({
  categories,
  group = "core",
}: HomepageProductSlidersProps) {
  const infrastructureCategory = getCategory(categories, [
    "Altyapı",
    "Alt Yapı",
    "Tek Kat",
  ]);
  const superstructureCategory = getCategory(categories, [
    "Üst Yapı",
    "Üstyapı",
    "Çift Kat",
  ]);
  const environmentCategory = getCategory(categories, [
    "Çevre",
    "Bahçe",
    "Çelik",
  ]);

  if (group === "environment") {
    const environmentProducts = environmentCategory
      ? await getProductsPreview(environmentCategory.id, 8)
      : [];

    return (
      <>
        {environmentProducts.length > 0 ? (
          <section className="flex justify-center py-5 lg:pt-5">
            <div className="max-w-[1280px] w-full">
              <HomepageCategorySlider
                title="Ürünleri"
                accent="Çevre Düzenleme"
                seoLabel="Çevre Düzenleme Ürünleri"
                description="Bahçe, yol, kaldırım ve saha düzenlemelerinde kullanılan tamamlayıcı beton ürünlerini bir arada görün."
                href={
                  environmentCategory
                    ? `/prefabrik-evler/${environmentCategory.slug}`
                    : "/prefabrik-evler"
                }
                products={environmentProducts}
              />
            </div>
          </section>
        ) : null}
      </>
    );
  }

  const [infrastructureProducts, superstructureProducts] = await Promise.all([
    infrastructureCategory
      ? getProductsPreview(infrastructureCategory.id, 8)
      : Promise.resolve([]),
    superstructureCategory
      ? getProductsPreview(superstructureCategory.id, 8)
      : Promise.resolve([]),
  ]);

  return (
    <>
      {infrastructureProducts.length > 0 ? (
        <section className="flex justify-center py-5 lg:pt-7">
          <div className="max-w-[1280px] w-full">
            <HomepageCategorySlider
              title="Elemanları"
              accent="Altyapı"
              seoLabel="Altyapı Beton Ürünleri"
              description="Beton boru, menhol, baca ve altyapı projeleri için ihtiyaç duyulan dayanıklı beton ürünlerini inceleyin."
              href={
                infrastructureCategory
                  ? `/prefabrik-evler/${infrastructureCategory.slug}`
                  : "/prefabrik-evler"
              }
              products={infrastructureProducts}
            />
          </div>
        </section>
      ) : null}

      {superstructureProducts.length > 0 ? (
        <section className="flex justify-center py-5 lg:pt-5">
          <div className="max-w-[1280px] w-full">
            <HomepageCategorySlider
              title="Elemanları"
              accent="Üst Yapı"
              seoLabel="Üst Yapı Beton Ürünleri"
              description="Parke taşı, bordür ve saha kaplama çözümleriyle üst yapı projeleriniz için uygun ürünleri keşfedin."
              href={
                superstructureCategory
                  ? `/prefabrik-evler/${superstructureCategory.slug}`
                  : "/prefabrik-evler"
              }
              products={superstructureProducts}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
