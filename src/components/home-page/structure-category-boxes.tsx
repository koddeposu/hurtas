import CategoryImage1 from "@/assets/hero/home-page-1.webp";
import CategoryImage2 from "@/assets/hero/home-page-2.webp";
import { ArrowRight, Building2, Layers3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STRUCTURE_CATEGORIES = [
  {
    title: "Altyapı Elemanları",
    description:
      "Beton boru, menhol ve saha altyapısı.",
    action: "Altyapı Elemanlarını İncele",
    icon: Layers3,
    image: CategoryImage1,
    matchers: ["Altyapı", "Alt Yapı", "Tek Kat"],
  },
  {
    title: "Üst Yapı Elemanları",
    description:
      "Parke taşı, bordür ve yüzey çözümleri.",
    action: "Üst Yapı Elemanlarını İncele",
    icon: Building2,
    image: CategoryImage2,
    matchers: ["Üst Yapı", "Üstyapı", "Çift Kat"],
  },
];

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

interface StructureCategoryBoxesProps {
  categories?: CategoryItem[];
}

function getCategoryHref(categories: CategoryItem[], matchers: string[]) {
  const matchedCategory = categories.find((category) =>
    matchers.some((matcher) => category.name.includes(matcher)),
  );

  return matchedCategory
    ? `/prefabrik-evler/${matchedCategory.slug}`
    : "/prefabrik-evler";
}

export function StructureCategoryBoxes({
  categories = [],
}: StructureCategoryBoxesProps) {
  return (
    <section className="px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-2">
        {STRUCTURE_CATEGORIES.map((item) => {
          const Icon = item.icon;
          const href = getCategoryHref(categories, item.matchers);

          return (
            <Link
              key={item.title}
              href={href}
              prefetch={false}
              aria-label={`${item.title} ürünlerini incele`}
              className="group block overflow-hidden rounded-[3px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a94a] focus-visible:ring-offset-2"
            >
              <article className="relative overflow-hidden border border-slate-300 bg-[#152f51] shadow-[0_18px_40px_-34px_rgba(15,23,42,0.6)]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  quality={60}
                  className="object-cover opacity-45 transition-transform duration-500 group-hover:scale-[1.04]"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#152f51]/96 via-[#152f51]/78 to-[#152f51]/28" />

                <div className="relative flex min-h-32 flex-col justify-between gap-4 p-4 sm:min-h-32 sm:flex-row sm:items-center sm:p-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] bg-[#d6a94a] text-[#152f51]">
                      <Icon className="h-5 w-5" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#f4d78d]">
                        Beton Ürünleri
                      </p>
                      <h2 className="mt-1 text-lg font-black tracking-tight text-white sm:text-xl">
                        {item.title}
                      </h2>
                      <p className="mt-1 line-clamp-1 text-xs font-medium text-slate-200 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex min-h-12 w-fit shrink-0 items-center justify-center gap-2 rounded-[2px] border border-white/30 bg-white/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.1em] text-white transition-colors group-hover:border-[#d6a94a] group-hover:text-[#f4d78d] sm:text-xs">
                    {item.action}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
