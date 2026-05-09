import AboutImage from "@/assets/who-we-are.webp";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "Tüm Ürünler", href: "/prefabrik-evler" },
  { label: "Beton Boru", href: "/prefabrik-evler?q=Beton%20Boru" },
  { label: "Parke Taşı", href: "/prefabrik-evler?q=Parke%20Ta%C5%9F%C4%B1" },
  { label: "Bordür", href: "/prefabrik-evler?q=Bord%C3%BCr" },
];

export function HomepageAboutSection() {
  return (
    <section
      aria-labelledby="homepage-about-heading"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0d1f36] text-white"
    >
      <Image
        src={AboutImage}
        alt=""
        fill
        sizes="100vw"
        quality={60}
        className="absolute inset-0 object-cover opacity-[0.24]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,54,0.98)_0%,rgba(13,31,54,0.9)_58%,rgba(13,31,54,0.78)_100%)] lg:bg-[linear-gradient(90deg,rgba(13,31,54,0.98)_0%,rgba(13,31,54,0.9)_46%,rgba(13,31,54,0.68)_100%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center lg:px-8 lg:py-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#d6a94a]/35 bg-[#d6a94a]/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#f4d78d] sm:text-[10px]">
            Hürtaş Beton Elemanları
          </div>

          <h2
            id="homepage-about-heading"
            className="mt-4 max-w-3xl text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
          >
            Projenize uygun beton ürünlerine hızlı ulaşın.
          </h2>

          <p className="mt-3 max-w-xl overflow-hidden text-sm font-medium leading-6 text-slate-200 line-clamp-2 sm:line-clamp-none lg:text-base lg:leading-7">
            Altyapı ve üst yapı projeleri için beton boru, parke taşı, bordür,
            menhol ve saha düzenleme ürünlerinde dayanıklı üretim, net planlama
            ve zamanında teslim yaklaşımıyla çalışıyoruz.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
            <Link
              href="/prefabrik-evler"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-lg bg-[#d6a94a] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#152f51] transition-colors hover:bg-[#bf943b] sm:px-5 sm:py-3 sm:text-xs"
            >
              Ürünleri İncele
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/hakkimizda"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-lg border border-white/35 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10 sm:px-5 sm:py-3 sm:text-xs"
            >
              Hakkımızda
            </Link>
          </div>
        </div>

        <aside className="hidden rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur lg:block">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f4d78d]">
            Ürünlere Hızlı Geçiş
          </p>

          <div className="mt-3 divide-y divide-white/10">
            {PRODUCT_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                prefetch={false}
                className="flex items-center justify-between gap-3 py-3 text-sm font-black text-white transition-colors first:pt-0 last:pb-0 hover:text-[#f4d78d]"
              >
                {item.label}
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
