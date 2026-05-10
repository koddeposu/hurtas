"use client";

import AboutImage from "@/assets/hakkimizda-2.jpg";
import BlogImage from "@/assets/hero/home-page-5.webp";
import BrandsImage from "@/assets/hero/home-page-4.webp";
import ContactImage from "@/assets/hero/desktop/hero-2.webp";
import GalleryImage from "@/assets/hero/home-page-3.webp";
import TSEImage from "@/assets/hero/home-page-1.webp";
import Image, { type StaticImageData } from "next/image";

interface PageHeroData {
  eyebrow: string;
  title: string;
  description: string;
  image: StaticImageData;
}

const HERO_BY_PATH: Record<string, PageHeroData> = {
  "/hakkimizda": {
    eyebrow: "Kurumsal",
    title: "Hürtaş Beton Elemanları",
    description:
      "Altyapı, üst yapı ve çevre düzenleme projeleri için dayanıklı beton ürünleri üretiyor; ürün seçimi ve sevkiyat planını netleştiriyoruz.",
    image: AboutImage,
  },
  "/arge": {
    eyebrow: "Kurumsal",
    title: "Arge",
    description:
      "Beton elemanlarında üretim kalitesi, ürün geliştirme ve saha ihtiyaçlarına uygun çözüm yaklaşımımız.",
    image: AboutImage,
  },
  "/iletisim": {
    eyebrow: "İletişim",
    title: "Projeniz İçin Bize Ulaşın",
    description:
      "Beton boru, parke taşı, bordür ve saha ürünleri için ürün, adet ve sevkiyat detaylarını birlikte planlayalım.",
    image: ContactImage,
  },
  "/blog": {
    eyebrow: "Blog",
    title: "Beton Ürünleri Rehberi",
    description:
      "Altyapı ve üst yapı beton elemanları için ürün seçimi, saha kullanımı ve tedarik planlamasına dair içerikler.",
    image: BlogImage,
  },
  "/projelerimiz": {
    eyebrow: "Galeri",
    title: "Ürün ve Saha Galerisi",
    description:
      "Beton elemanlarımızın sahadaki kullanım alanlarını, üretim detaylarını ve tamamlanan uygulama görsellerini inceleyin.",
    image: GalleryImage,
  },
  "/calistigimiz-markalar": {
    eyebrow: "Kurumsal",
    title: "Çalıştığımız Markalar",
    description:
      "Belediye, şantiye ve saha projelerinde beton elemanı tedariki için düzenli, takip edilebilir ve güven veren iş birlikleri kuruyoruz.",
    image: BrandsImage,
  },
  "/tse-onayli-belgeler": {
    eyebrow: "Belgeler",
    title: "TSE Onaylı Belgeler",
    description:
      "Beton ürünlerinde standartlara uygun üretim yaklaşımımızı ve kalite belgelerimizi bu sayfada topluyoruz.",
    image: TSEImage,
  },
  "/katalog": {
    eyebrow: "Katalog",
    title: "Hürtaş Beton Kataloğu",
    description:
      "Beton ürün gruplarını, kullanım alanlarını ve proje tedariki için öne çıkan ürün bilgilerini katalog üzerinden inceleyin.",
    image: BlogImage,
  },
};

function getHeroData(pathname: string) {
  if (
    pathname === "/" ||
    pathname.startsWith("/tum-urunler") ||
    pathname.startsWith("/urun-detay")
  ) {
    return null;
  }

  if (pathname.startsWith("/blog/")) {
    return HERO_BY_PATH["/blog"];
  }

  return HERO_BY_PATH[pathname] ?? null;
}

export function PageHero({ pathname }: { pathname: string }) {
  const data = getHeroData(pathname);

  if (!data) {
    return null;
  }

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0d1f36] text-white">
      <div className="relative h-[320px] min-h-[320px] w-full sm:h-[380px] lg:h-[430px]">
        <Image
          src={data.image}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f36]/96 via-[#152f51]/74 to-slate-950/20" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,54,0.15)_0%,rgba(13,31,54,0.76)_100%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#f4d78d] backdrop-blur">
              <span className="h-px w-9 bg-[#d6a94a]" aria-hidden="true" />
              {data.eyebrow}
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {data.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-200 sm:text-base">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
