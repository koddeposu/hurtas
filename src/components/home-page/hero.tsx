"use client";

import HeroSlideImage1 from "@/assets/hero/desktop/hero-1.webp";
import HeroSlideImage2 from "@/assets/hero/desktop/hero-2.webp";
import HeroSlideImage3 from "@/assets/hero/desktop/hero-3.webp";

import HeroMobilSlideImage1 from "@/assets/hero/mobil/hero-1.webp";
import HeroMobilSlideImage2 from "@/assets/hero/mobil/hero-2.webp";
import HeroMobilSlideImage3 from "@/assets/hero/mobil/hero-3.webp";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { handleCall, handleWhatsApp } from "@/lib/analytics/googleAds";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    id: 1,
    title: "Hürtaş ile Güçlü Altyapı Çözümleri",
    desc: "Beton boru, parke taşı, bordür ve altyapı elemanlarında dayanıklı üretim, düzenli sevkiyat ve güvenilir tedarik sağlıyoruz.",
    image: HeroSlideImage1,
    mobilImage: HeroMobilSlideImage1,
  },
  {
    id: 2,
    title: "Şantiye ve Belediye Projelerine Uygun Beton Ürünleri",
    desc: "Yol, çevre düzenleme ve altyapı ihtiyaçları için standartlara uygun beton elemanları zamanında teslim ediyoruz.",
    image: HeroSlideImage2,
    mobilImage: HeroMobilSlideImage2,
  },
  {
    id: 3,
    title: "Üretimden Teslimata Planlı Beton Elemanı Tedariki",
    desc: "Projenizin ihtiyacına göre doğru ürün, doğru adet ve doğru sevkiyat planıyla iş akışınızı hızlandırıyoruz.",
    image: HeroSlideImage3,
    mobilImage: HeroMobilSlideImage3,
  },
];

const FEATURES = [
  "Dayanıklı Beton Üretimi",
  "Planlı Sevkiyat",
  "Altyapı ve Çevre Düzenleme Ürünleri",
];

const MARQUEE_ITEMS = [
  "Beton Boru",
  "Parke Taşı",
  "Bordür",
  "Menhol",
  "Yağmur Oluğu",
  "Altyapı Elemanları",
  "Şantiye Tedariki",
  "Planlı Sevkiyat",
];

export const Hero4 = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const activeSlide = SLIDES[current];

  useEffect(() => {
    if (!api) return;

    const updateCurrentSlide = () => {
      setCurrent(api.selectedScrollSnap());
    };

    updateCurrentSlide();
    api.on("select", updateCurrentSlide);
    api.on("reInit", updateCurrentSlide);

    return () => {
      api.off("select", updateCurrentSlide);
      api.off("reInit", updateCurrentSlide);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 6500);

    return () => window.clearInterval(timer);
  }, [api]);

  return (
    <section className="relative overflow-hidden lg:mt-[184px]">
      <style>{`
        @keyframes hero-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }

        .hero-zoom {
          animation: hero-zoom 6.5s ease-out forwards;
          will-change: transform;
        }

        @keyframes hero-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .hero-marquee {
          animation: hero-marquee 30s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-marquee {
            animation: none;
          }
        }
      `}</style>
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(2,6,23,0.16),transparent_38%)]" />

      <div className="relative h-[calc(100svh_-_5.3rem_-_env(safe-area-inset-bottom))] min-h-[calc(100svh_-_5.3rem_-_env(safe-area-inset-bottom))] max-h-[calc(100svh_-_5.3rem_-_env(safe-area-inset-bottom))] lg:h-[600px] lg:min-h-0 xl:h-[711px]">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="absolute inset-0 h-full w-full [&>[data-slot=carousel-content]]:h-full"
        >
          <CarouselContent className="h-full -ml-0">
            {SLIDES.map((slide, index) => {
              const isActive = index === current;

              return (
                <CarouselItem key={slide.id} className="h-full basis-full pl-0">
                  <div className="relative h-full overflow-hidden">
                    <div
                      className={`absolute inset-0 hidden md:block ${
                        isActive ? "hero-zoom" : ""
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        preload={index === 0}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        loading={index === 0 ? "eager" : "lazy"}
                        quality={80}
                        placeholder="blur"
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#152f51]/88 via-[#152f51]/58 to-slate-950/24" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(21,47,81,0.16),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.18),transparent_40%)]" />
                    </div>

                    <div
                      className={`absolute inset-0 md:hidden ${
                        isActive ? "hero-zoom" : ""
                      }`}
                    >
                      <Image
                        src={slide.mobilImage}
                        alt={slide.title}
                        fill
                        preload={index === 0}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        loading={index === 0 ? "eager" : "lazy"}
                        quality={80}
                        placeholder="blur"
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#152f51]/90 via-[#152f51]/62 to-slate-950/36" />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 pb-18 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#dbe7f3] backdrop-blur md:inline-flex">
              <span className="h-2 w-2 rounded-full bg-[#152f51] shadow-[0_0_14px_rgba(21,47,81,0.9)]" />
              <span>Hürtaş</span>
              <span className="h-1 w-1 rounded-full bg-[#dbe7f3]/70" />
              <span>Beton Elemanları</span>
            </div>

            <h1 className="mt-5 max-w-2xl overflow-hidden text-2xl font-semibold leading-tight tracking-tight text-white line-clamp-3 md:text-4xl lg:h-auto lg:line-clamp-none">
              {activeSlide.title}
            </h1>

            <p className="mt-4 max-w-2xl overflow-hidden text-sm font-medium leading-7 text-slate-200 line-clamp-3 sm:text-base lg:h-auto lg:line-clamp-none">
              {activeSlide.desc}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="cursor-pointer rounded-lg bg-[#152f51] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#10243d] sm:text-sm ads-whatsapp"
              >
                WhatsApp
              </button>
              <button
                type="button"
                onClick={handleCall}
                className="cursor-pointer rounded-lg bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-900 transition-colors hover:bg-[#f4f7fb] sm:text-sm ads-phone-call"
              >
                Hemen Ara
              </button>
              <Link
                href="/prefabrik-evler"
                prefetch={false}
                className="rounded-lg border border-white/50 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10 sm:text-sm"
              >
                Ürünleri İncele
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {FEATURES.map((item) => (
                <div
                key={item}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-slate-100"
              >
                  <CheckCircle2 className="h-4 w-4 text-[#dbe7f3]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          className="absolute left-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur transition-colors hover:bg-black/40 sm:left-6 lg:h-13 lg:w-13"
          aria-label="Önceki slayt"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => api?.scrollNext()}
          className="absolute right-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur transition-colors hover:bg-black/40 sm:right-6 lg:h-13 lg:w-13"
          aria-label="Sonraki slayt"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {SLIDES.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 cursor-pointer rounded-full transition-all ${
                index === current ? "w-10 bg-[#152f51]" : "w-4 bg-white/70"
              }`}
              aria-label={`${index + 1}. slayta git`}
            />
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-white/15 bg-[#0d1f36]/90 py-3 text-white shadow-[0_-18px_48px_-32px_rgba(15,23,42,0.8)] backdrop-blur"
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0d1f36] to-transparent sm:w-28" />
          <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0d1f36] to-transparent sm:w-28" />
          <div className="hero-marquee flex w-max items-center whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.18em] text-slate-100 sm:text-xs"
              >
                <span className="mx-4 h-1.5 w-1.5 rounded-full bg-[#d6a94a] sm:mx-6" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
