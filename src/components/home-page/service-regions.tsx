import { ArrowUpRight, Building2, MapPinned, Truck } from "lucide-react";
import Link from "next/link";

const REGIONS = [
  {
    title: "Sakarya Prefabrik Ev",
    description:
      "Keşif, teklif ve uygulama planlamasında en güçlü operasyon akışımızı Sakarya genelinde kuruyoruz.",
    tone: "border-primary/20 bg-[linear-gradient(135deg,rgba(73,32,45,0.08),rgba(255,255,255,0.96))]",
  },
  {
    title: "Marmara Bölgesi",
    description:
      "Kocaeli, Düzce, Bursa, İstanbul, Yalova ve çevresinde planlı sevkiyat ve montaj koordinasyonu sağlıyoruz.",
    tone: "border-slate-200 bg-white",
  },
  {
    title: "Türkiye Geneli Kurulum",
    description:
      "Tek katlı prefabrik ev, çift katlı prefabrik ev ve çelik ev projelerini Türkiye'nin farklı şehirlerine ulaştırıyoruz.",
    tone: "border-slate-200 bg-white",
  },
];

const FOCUS_CITIES = [
  "Sakarya",
  "Kocaeli",
  "Düzce",
  "Bursa",
  "İstanbul",
  "Ankara",
  "İzmir",
  "Balıkesir",
];

export function ServiceRegions() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#e0e8ea]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(22,91,57,0.09),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(73,32,45,0.08),transparent_24%)]" />

      <div className="relative grid gap-8 px-5 py-7 md:px-7 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-10">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-secondary/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
            <MapPinned className="h-3.5 w-3.5" />
            Hizmet Verdiğimiz Bölgeler
          </div>

          <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-[2rem]">
            Tüm Türkiye&apos;ye Hizmet,
            <br />
            <span className="text-primary">Sakarya Prefabrik Ev</span>
            <br />
            Çözümlerinde Güçlü Saha Planlaması
          </h2>

          <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
            CT Prefabrik olarak{" "}
            <strong>tüm Türkiye&apos;ye prefabrik ev</strong> hizmeti sunuyor,
            sevkiyat ve kurulum sürecini proje tipine göre planlıyoruz.
            Özellikle <strong>Sakarya prefabrik ev</strong> taleplerinde daha
            hızlı keşif, daha net teklif akışı ve daha yakın saha koordinasyonu
            ile ilerliyoruz.
          </p>

          <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
            <strong>Tek katlı prefabrik ev</strong>,{" "}
            <strong>çift katlı prefabrik ev</strong> ve{" "}
            <strong>çelik ev</strong> çözümlerimiz için Sakarya başta olmak
            üzere Marmara ağırlıklı güçlü operasyon kuruyor, Türkiye geneline de
            ihtiyaca uygun teslim ve montaj planı hazırlıyoruz.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {FOCUS_CITIES.map((city) => (
              <span
                key={city}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] ${
                  city === "Sakarya"
                    ? "border-primary/20 bg-primary text-white"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {city}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/prefabrik-evler"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-primary/90"
            >
              Modelleri İncele
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/iletisim"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-slate-700 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50"
            >
              Bölgeniz İçin Teklif Alın
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-secondary/15 bg-secondary p-6 text-white shadow-[0_24px_70px_-42px_rgba(22,91,57,0.55)] lg:row-span-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12">
              <Truck className="h-5 w-5" />
            </div>

            <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-100/80">
              Operasyon Vurgusu
            </p>
            <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight">
              Sakarya Merkezli
              <br />
              Hızlı Planlama,
              <br />
              Türkiye Geneli
              <br />
              Uygulama
            </h3>

            <p className="mt-4 text-sm font-medium leading-7 text-emerald-50/90">
              Sakarya&apos;da daha yakın saha takibi kuruyor, Türkiye&#39;nin
              farklı illerinde ise proje kapsamına göre sevkiyat, montaj ve
              teslim planını önceden netleştiriyoruz.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/70">
                  Ana Pazar
                </p>
                <p className="mt-2 text-lg font-black">Sakarya Prefabrik Ev</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/70">
                  Hizmet Alanı
                </p>
                <p className="mt-2 text-lg font-black">Tüm Türkiye</p>
              </div>
            </div>
          </article>

          {REGIONS.map((region) => (
            <article
              key={region.title}
              className={`rounded-[1.5rem] border p-5 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.18)] ${region.tone}`}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/4 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-black tracking-tight text-slate-900">
                {region.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                {region.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
