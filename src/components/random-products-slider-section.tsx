import { getRandomProductsPreview } from "@/actions/productActions";
import { HomepageCategorySlider } from "@/components/home-page/homepage-category-slider";

export async function RandomProductsSliderSection() {
  const products = await getRandomProductsPreview(10);

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
          href="/prefabrik-evler"
          products={products}
        />
      </div>
    </section>
  );
}
