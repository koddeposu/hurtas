import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  HardHat,
  Ruler,
  Shield,
} from "lucide-react";

const STEPS = [
  {
    id: "01",
    title: "Keşif ve Arsa Analizi",
    description:
      "Arsa durumunuza en uygun tek katlı, dubleks prefabrik veya çelik ev modelini belirlemek için yerinde değerlendirme yapıyoruz.",
    icon: ClipboardCheck,
  },
  {
    id: "02",
    title: "Projelendirme ve Fiyatlandırma",
    description:
      "Bütçenize uygun prefabrik ev fiyatları, net malzeme listesi ve şeffaf sözleşme ile sürpriz maliyetleri tamamen ortadan kaldırıyoruz.",
    icon: Ruler,
  },
  {
    id: "03",
    title: "Fabrika Üretimi ve Kalite",
    description:
      "Hafif çelik ve prefabrik yapı elemanlarını, yüksek yalıtım standartlarında ve uzun ömürlü kullanım için fabrikamızda üretiyoruz.",
    icon: Shield,
  },
  {
    id: "04",
    title: "Montaj ve Anahtar Teslim",
    description:
      "Uzman saha ekibimizle profesyonel kurulumu tamamlıyor, hayalinizdeki evi söz verdiğimiz tarihte anahtar teslim sunuyoruz.",
    icon: HardHat,
  },
];

export function ProcessJourney() {
  return (
    <section aria-labelledby="prefabrik-surec-baslik" className="bg-white ">
      <div className="mx-auto max-w-7xl ">
        {/* SEO Odaklı Üst Başlık ve İçerik */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            <span>CT Prefabrik Güvencesi</span>
          </div>

          <h2
            id="prefabrik-surec-baslik"
            className="mt-5 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl "
          >
            Anahtar Teslim Prefabrik ve Çelik Ev Yapım Süreci
          </h2>

          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-md">
            <strong>CT Prefabrik</strong> olarak;{" "}
            <strong>tek katlı prefabrik ev</strong>,{" "}
            <strong>dubleks prefabrik villa</strong> ve{" "}
            <strong>hafif çelik ev</strong> projelerinizin her aşamasını tek
            merkezden yönetiyoruz. Yüksek yalıtımlı ve uzun ömürlü yapıları söz
            verdiğimiz tarihte güvenle teslim ediyoruz.
          </p>
        </div>

        {/* Adımlar - Semantik Liste (ol, li, article) */}
        <ol className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLastStep = index === STEPS.length - 1;

            return (
              <li key={step.id} className="relative group">
                <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-6 transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary/40 hover:-translate-y-1">
                  {/* İkon ve Numara */}
                  <header className="mb-3 flex items-center justify-between sm:mb-5">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12"
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                    <span
                      className="text-xl font-bold text-slate-200 transition-colors group-hover:text-primary/20 sm:text-2xl sm:font-black"
                      aria-hidden="true"
                    >
                      {step.id}
                    </span>
                  </header>

                  {/* Adım Başlığı ve Açıklaması */}
                  <h3 className="mb-2 text-sm font-semibold leading-snug text-slate-900 sm:mb-3 sm:text-xl sm:font-bold">
                    {step.title}
                  </h3>
                  <p className="flex-grow text-[11px] font-normal leading-5 text-slate-600 sm:text-sm sm:font-medium sm:leading-relaxed">
                    {step.description}
                  </p>
                </article>

                {/* Masaüstü Ok İşareti (Botlar görmezden gelir) */}
                {!isLastStep && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-slate-300"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
