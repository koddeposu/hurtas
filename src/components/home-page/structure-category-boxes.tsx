import { ArrowRight, Building2, Layers3 } from "lucide-react";

const STRUCTURE_CATEGORIES = [
  {
    title: "Üst Yapı Elemanları",
    description:
      "Parke taşı, bordür ve saha düzenleme ürünleriyle projelerinizde düzenli ve dayanıklı yüzey çözümleri.",
    action: "Tüm üst yapı elemanlarını gör",
    icon: Building2,
    tone: "navy",
  },
  {
    title: "Alt Yapı Elemanları",
    description:
      "Beton boru, menhol ve altyapı elemanlarıyla belediye, yol ve şantiye projeleri için güvenilir üretim.",
    action: "Tüm alt yapı elemanlarını gör",
    icon: Layers3,
    tone: "gold",
  },
];

export function StructureCategoryBoxes() {
  return (
    <section className="mt-6 px-4 sm:px-6 md:mt-8 lg:mt-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
        {STRUCTURE_CATEGORIES.map((item) => {
          const Icon = item.icon;
          const isGold = item.tone === "gold";

          return (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-lg border p-5 shadow-[0_20px_48px_-36px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 md:p-6 ${
                isGold
                  ? "border-[#d6a94a]/35 bg-[#fffaf0]"
                  : "border-[#152f51]/15 bg-[#f4f7fb]"
              }`}
            >
              <div className="flex min-h-52 flex-col justify-between gap-8 sm:min-h-48">
                <div className="flex items-start gap-4">
                  <span
                    className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                      isGold
                        ? "bg-[#d6a94a] text-[#152f51]"
                        : "bg-[#152f51] text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="min-w-0">
                    <p
                      className={`text-xs font-black uppercase tracking-[0.18em] ${
                        isGold ? "text-[#9b7430]" : "text-[#6f839d]"
                      }`}
                    >
                      Beton Ürünleri
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-[#152f51]">
                      {item.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-xs font-black uppercase tracking-[0.12em] transition-colors ${
                    isGold
                      ? "bg-[#152f51] text-white hover:bg-[#10243d]"
                      : "bg-[#d6a94a] text-[#152f51] hover:bg-[#bf943b]"
                  }`}
                >
                  {item.action}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
