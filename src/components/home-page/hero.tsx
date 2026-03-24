"use client";

import HeroSlideImage1 from "@/assets/hero/desktop/d-hero-1.webp";
import HeroSlideImage2 from "@/assets/hero/desktop/d-hero-2.webp";
import HeroSlideImage3 from "@/assets/hero/desktop/d-hero-3.webp";

import HeroMobilSlideImage1 from "@/assets/hero/mobil/m-hero-1.webp";
import HeroMobilSlideImage2 from "@/assets/hero/mobil/m-hero-2.webp";
import HeroMobilSlideImage3 from "@/assets/hero/mobil/m-hero-3.webp";

import { handleCall, handleWhatsApp } from "@/lib/analytics/googleAds";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    id: 1,
    title: "Sakarya'dan Türkiye'ye Prefabrik Ev Çözümü",
    desc: "Modern mimari, çelik konstrüksiyon gücü ve hızlı teslim avantajını tek projede buluşturuyoruz.",
    image: HeroSlideImage1,
    mobilImage: HeroMobilSlideImage1,
  },
  {
    id: 2,
    title: "2+1, 3+1 ve Villa Tipi Modeller",
    desc: "İhtiyacınıza uygun plan, doğru metraj ve net üretim takvimiyle prefabrik yapılar tasarlıyoruz.",
    image: HeroSlideImage2,
    mobilImage: HeroMobilSlideImage2,
  },
  {
    id: 3,
    title: "Keşiften Montaja Tek Ekip",
    desc: "Projelendirme, üretim, sevkiyat ve montaj süreci CT Prefabrik koordinasyonuyla üçlü değil tek akış halinde ilerler.",
    image: HeroSlideImage3,
    mobilImage: HeroMobilSlideImage3,
  },
];

const FEATURES = [
  "Deprem Yönetmeliğine Uygun",
  "30-45 Günde Teslim",
  "TSE Onaylı Malzeme",
];

export const Hero4 = () => {
  const [current, setCurrent] = useState(0);
  const activeSlide = SLIDES[current];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden lg:mt-80 xl:mt-50">
      <style>{`
        @keyframes hero-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }

        .hero-zoom {
          animation: hero-zoom 6.5s ease-out forwards;
          will-change: transform;
        }
      `}</style>
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(2,6,23,0.16),transparent_38%)]" />

      <div className="relative h-[calc(100svh_-_5.3rem_-_env(safe-area-inset-bottom))] min-h-[calc(100svh_-_5.3rem_-_env(safe-area-inset-bottom))] max-h-[calc(100svh_-_5.3rem_-_env(safe-area-inset-bottom))] lg:h-[600px] xl:h-[711px] lg:min-h-0">
        <div
          key={activeSlide.id}
          className="absolute inset-0 w-full transition-opacity duration-700"
        >
          <div className="absolute inset-0 hero-zoom hidden md:flex">
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              preload
              fetchPriority="high"
              loading="eager"
              quality={80}
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-slate-950/36" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.14),transparent_10%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.1),transparent_38%)]" />
          </div>

          <div className="absolute inset-0 hero-zoom md:hidden">
            <Image
              src={activeSlide.mobilImage}
              alt={activeSlide.title}
              fill
              preload
              fetchPriority="high"
              loading="eager"
              quality={80}
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/48 to-slate-950/36" />
          </div>
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-24 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-emerald-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_14px_rgba(22,91,57,0.9)]" />
              CT Prefabrik Üretim Güvencesi
            </div>

            <h1 className="mt-5  max-w-2xl overflow-hidden text-2xl font-semibold leading-tight tracking-tight text-white line-clamp-3  md:text-4xl lg:h-auto lg:line-clamp-none ">
              {activeSlide.title}
            </h1>

            <p className="mt-4  max-w-2xl overflow-hidden text-sm font-medium leading-7 text-slate-200 line-clamp-3  sm:text-base lg:h-auto lg:line-clamp-none">
              {activeSlide.desc}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="cursor-pointer rounded-xl bg-secondary px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#1d7048] sm:text-sm ads-whatsapp"
              >
                WhatsApp
              </button>
              <button
                type="button"
                onClick={handleCall}
                className="cursor-pointer rounded-xl bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-900 transition-colors hover:bg-emerald-50 sm:text-sm ads-phone-call"
              >
                Hemen Ara
              </button>
              <Link
                href="/prefabrik-evler"
                prefetch={false}
                className="rounded-xl border border-white/50 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10 sm:text-sm"
              >
                Modelleri İncele
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {FEATURES.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-slate-100"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-2 backdrop-blur">
          <button
            type="button"
            onClick={() =>
              setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white transition-colors hover:bg-white/15"
            aria-label="Önceki slayt"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`h-2 rounded-full transition-all ${
                index === current ? "w-9 bg-secondary" : "w-3 bg-white/60"
              }`}
            />
          ))}

          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white transition-colors hover:bg-white/15"
            aria-label="Sonraki slayt"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
