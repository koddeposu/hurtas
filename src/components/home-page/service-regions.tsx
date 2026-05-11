import { ArrowUpRight, Building2, MapPinned, Truck } from "lucide-react";
import { ALL_PRODUCTS_PATH } from "@/lib/productRoutes";
import Link from "next/link";

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
    <section className="relative overflow-hidden rounded-[3px] border border-slate-300  bg-[#eeeff4]  my-10 mx-auto max-w-[1440px]">
      {/* Hafif Arka Plan Deseni */}

      <div className="relative grid gap-8 px-5 py-8 md:px-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
        {/* SOL KOLON: Metinler, Etiketler ve Butonlar */}
        <div className="flex flex-col justify-center max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-[2px] border border-secondary/20 bg-secondary/10 px-3 py-2 w-max text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
            <MapPinned className="h-3.5 w-3.5" />
            Hizmet Ağımız
          </div>

          <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
            İstanbul ve Marmara&apos;da <br />
            <span className="text-primary">Planlı Beton Ürün Tedariki</span>
          </h2>

          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
            Hürtaş Beton olarak <strong>beton boru</strong>,{" "}
            <strong>baca elemanları</strong>, <strong>bordür taşı</strong>,{" "}
            <strong>parke taşı</strong> ve saha beton ürünlerinde proje bazlı
            tedarik ve sevkiyat planı oluşturuyoruz.
          </p>

          {/* Şehir Etiketleri (Daha kompakt) */}
          <div className="mt-6 flex flex-wrap gap-2">
            {FOCUS_CITIES.map((city) => (
              <span
                key={city}
                className={`rounded-[2px] border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  city === "Sakarya"
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-slate-300 bg-white/60 text-slate-600"
                }`}
              >
                {city}
              </span>
            ))}
          </div>

          {/* Aksiyon Butonları */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={ALL_PRODUCTS_PATH}
              className="inline-flex items-center gap-2 rounded-[2px] bg-primary px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
            >
              Ürünleri İncele
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 rounded-[2px] border border-slate-300 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
            >
              Teklif Al
            </Link>
          </div>
        </div>

        {/* SAĞ KOLON: Kompakt Bölge Kartları */}
        <div className="grid gap-4 sm:grid-cols-2 content-center">
          {/* Vurgulu Ana Kart (2 Kolon Kaplar) */}
          <article className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-[3px] border border-[#d6a94a]/30 bg-[#152f51] p-5 text-white shadow-lg">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-white/10">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">
                Beton Ürünleri Tedarik Merkezi
              </h3>
              <p className="mt-1 text-sm font-medium leading-relaxed text-white/80">
                Ürün seçimi, teklif ve sevkiyat planında saha ihtiyacını net
                okuyarak süreci hızlandırıyoruz.
              </p>
            </div>
          </article>

          {/* Yan Yana Duran 2 Alt Kart */}
          <article className="rounded-[3px] border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] bg-slate-100 text-primary mb-3">
              <MapPinned className="h-5 w-5" />
            </div>
            <h3 className="text-base font-black tracking-tight text-slate-900">
              Marmara Bölgesi
            </h3>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-600">
              Kocaeli, Düzce, Bursa, İstanbul ve çevresinde planlı sevkiyat ve
              sevkiyat.
            </p>
          </article>

          <article className="rounded-[3px] border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] bg-slate-100 text-primary mb-3">
              <Building2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-black tracking-tight text-slate-900">
              Türkiye Geneli
            </h3>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-600">
              Beton ürün taleplerini proje, adet ve sevkiyat planına göre
              değerlendiriyoruz.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
