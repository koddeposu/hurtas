import { getCategories } from "@/actions/categoryActions";
import { getRandomProductsPreview } from "@/actions/productActions";
import { HomepageCategorySlider } from "@/components/home-page/homepage-category-slider";
import { getDictionary } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import { ALL_PRODUCTS_PATH } from "@/lib/productRoutes";

export async function RandomProductsSliderSection() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
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
          title={dict.sliders.random.title}
          accent={dict.sliders.random.accent}
          seoLabel={dict.sliders.random.seoLabel}
          description={dict.sliders.random.description}
          href={ALL_PRODUCTS_PATH}
          products={products}
          categories={categories}
        />
      </div>
    </section>
  );
}
