import {
  BadgeCheck,
  ClipboardCheck,
  HardHat,
  Ruler,
  Shield,
} from "lucide-react";

const STEPS = [
  {
    id: "01",
    title: "Keşif ve İhtiyaç Analizi",
    description:
      "Arsa durumu, kullanım senaryosu, oda ihtiyacı ve yaşam alışkanlıklarını analiz ederek tek katlı, dubleks veya çelik ev için doğru yönü belirliyoruz.",
    icon: ClipboardCheck,
  },
  {
    id: "02",
    title: "Planlama ve Fiyatlandırma",
    description:
      "Prefabrik ev fiyatları, malzeme kapsamı, metrekare alternatifleri ve uygulama takvimi tek teklif akışı içinde netleşiyor.",
    icon: Ruler,
  },
  {
    id: "03",
    title: "Üretim ve Kalite Kontrol",
    description:
      "Yapı bileşenlerini kontrollü üretim sürecinden geçiriyor, montaja hazır her parçayı teknik standartlar ve kalite adımlarıyla doğruluyoruz.",
    icon: Shield,
  },
  {
    id: "04",
    title: "Montaj ve Teslim",
    description:
      "Deneyimli saha ekibimiz, projeyi planlanan sürede kurup kullanıma hazır hale getiriyor; teslim sonrasında da süreci sahipsiz bırakmıyoruz.",
    icon: HardHat,
  },
];

export function ProcessJourney() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(22,91,57,0.05),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(73,32,45,0.04),transparent_28%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 py-8 md:px-8 lg:px-10 lg:py-10">
        <div className="rounded-[1rem] border border-slate-300 bg-white/92 p-5 shadow-[0_22px_52px_-42px_rgba(15,23,42,0.2)] md:p-7 lg:p-8">
          <div className="grid gap-6 border-b border-slate-300/80 pb-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-lg border border-secondary/20 bg-secondary/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
                <BadgeCheck className="h-4 w-4" />
                Prefabrik Ev Süreci
              </div>

              <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
                Keşiften Montaja
                <br />
                <span className="text-primary">Planlı ve Net Bir Süreç</span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600">
                CT Prefabrik olarak <strong>tek katlı prefabrik ev</strong>,{" "}
                <strong>dubleks prefabrik ev</strong> ve{" "}
                <strong>çelik ev</strong> projelerinde keşif, planlama, üretim
                ve montaj adımlarını tek merkezden yönetiyoruz. Böylece süreç
                daha okunur, daha kontrollü ve daha güvenilir ilerliyor.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[0.85rem] border border-slate-300 bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
                  Hizmet Alanı
                </p>
                <p className="mt-2 text-lg font-black tracking-tight text-slate-900">
                  Tek Katlı
                  <br />
                  Dubleks
                  <br />
                  Çelik Ev
                </p>
              </div>

              <div className="rounded-[0.85rem] border border-slate-300 bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
                  Süreç Yapısı
                </p>
                <p className="mt-2 text-lg font-black tracking-tight text-secondary">
                  Keşif
                  <br />
                  Üretim
                  <br />
                  Montaj
                </p>
              </div>

              <div className="rounded-[0.85rem] border border-slate-300 bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
                  Odak Noktası
                </p>
                <p className="mt-2 text-lg font-black tracking-tight text-slate-900">
                  Şeffaf
                  <br />
                  Takvim
                  <br />
                  Kalite
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.id}
                  className="group rounded-[0.95rem] border border-slate-300 bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-400 hover:shadow-[0_20px_42px_-30px_rgba(15,23,42,0.22)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-black tracking-tight text-primary/70">
                      {step.id}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-black leading-snug tracking-tight text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                    {step.description}
                  </p>

                  <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-secondary via-primary/70 to-transparent" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
