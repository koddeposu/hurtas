import { getCategories } from "@/actions/categoryActions";
import { getRandomProductsPreview } from "@/actions/productActions";
import { HomepageCategorySlider } from "@/components/home-page/homepage-category-slider";
import { ALL_PRODUCTS_PATH } from "@/lib/productRoutes";

export async function RandomProductsSliderSection() {
  const [products, categories] = await Promise.all([
    getRandomProductsPreview(10),
    getCategories(),
  ]);

  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-10 flex justify-center lg:mt-12">
      <div className="w-full max-w-[1280px]">
        <HomepageCategorySlider
          title="Ürünler"
          accent="Öne Çıkan"
          seoLabel="Ürünlerimizden Seçmeler"
          description="Hürtaş Beton ürünleri arasından rastgele seçilen modelleri inceleyin."
          href={ALL_PRODUCTS_PATH}
          products={products}
          categories={categories}
        />
      </div>
    </section>
  );
}
