"use client";

import AboutImage from "@/assets/hakkimizda-2.jpg";
import BlogImage from "@/assets/hero/home-page-5.webp";
import BrandsImage from "@/assets/hero/home-page-4.webp";
import ContactImage from "@/assets/hero/desktop/hero-2.webp";
import GalleryImage from "@/assets/hero/home-page-3.webp";
import TSEImage from "@/assets/hero/home-page-1.webp";
import { useDictionary } from "@/components/i18n-provider";
import Image, { type StaticImageData } from "next/image";

const HERO_IMAGES: Record<string, StaticImageData> = {
  "/hakkimizda": AboutImage,
  "/arge": AboutImage,
  "/iletisim": ContactImage,
  "/blog": BlogImage,
  "/galeri": GalleryImage,
  "/calistigimiz-markalar": BrandsImage,
  "/tse-onayli-belgeler": TSEImage,
  "/katalog": BlogImage,
};

function getHeroData(
  pathname: string,
  data: Record<
    string,
    {
      eyebrow: string;
      title: string;
      description: string;
    }
  >,
) {
  if (
    pathname === "/" ||
    pathname.startsWith("/tum-urunler") ||
    pathname.startsWith("/urun-detay")
  ) {
    return null;
  }

  const path = pathname.startsWith("/blog/") ? "/blog" : pathname;
  const content = data[path as keyof typeof data];
  const image = HERO_IMAGES[path];

  if (content && image) {
    return {
      ...content,
      image,
    };
  }

  return null;
}

export function PageHero({ pathname }: { pathname: string }) {
  const dict = useDictionary();
  const data = getHeroData(pathname, dict.pageHero);

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
