"use client";

import { HomeProductCard } from "@/components/home-page/home-product-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DBProductPreview } from "@/types/product";
import type { RouteCategory } from "@/lib/productRoutes";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HomepageCategorySliderProps {
  title: string;
  accent: string;
  seoLabel: string;
  description: string;
  href: string;
  products: DBProductPreview[];
  categories?: RouteCategory[];
}

export function HomepageCategorySlider({
  title,
  accent,
  seoLabel,
  description,
  href,
  products,
  categories = [],
}: HomepageCategorySliderProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelectedIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };

    updateState();
    api.on("select", updateState);
    api.on("reInit", updateState);

    return () => {
      api.off("select", updateState);
      api.off("reInit", updateState);
    };
  }, [api]);

  if (!products.length) {
    return null;
  }

  return (
    <section className="font-[family-name:var(--font-poppins)]">
      <div className="mb-5 border-y border-slate-200 bg-[#f6f8fb] px-4 py-5 sm:px-5 lg:mb-6 lg:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#d6a94a]" aria-hidden="true" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
                {seoLabel}
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 md:text-4xl">
              <span className="text-[#152f51]">{accent}</span> {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-10 items-center rounded-[2px] border border-slate-300 bg-white px-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-600">
              {products.length} Ürün
            </span>
            <Link
              href={href}
              prefetch={false}
              className="inline-flex h-10 items-center gap-2 rounded-[2px] bg-[#152f51] px-4 text-[11px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#10243d]"
            >
              Tümünü Gör
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        {snapCount > 1 ? (
          <>
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className="absolute left-0 top-1/2 z-20 inline-flex h-16 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] border border-[#152f51]/20 bg-[#152f51] text-white shadow-[0_18px_34px_-24px_rgba(15,23,42,0.7)] transition-colors hover:bg-[#d6a94a] hover:text-[#152f51] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 sm:h-20 sm:w-10"
              aria-label={`${accent} ${title} önceki ürünler`}
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className="absolute right-0 top-1/2 z-20 inline-flex h-16 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] border border-[#152f51]/20 bg-[#152f51] text-white shadow-[0_18px_34px_-24px_rgba(15,23,42,0.7)] transition-colors hover:bg-[#d6a94a] hover:text-[#152f51] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 sm:h-20 sm:w-10"
              aria-label={`${accent} ${title} sonraki ürünler`}
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.8} />
            </button>
          </>
        ) : null}

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
          }}
          className="w-full px-9 sm:px-12"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-full sm:basis-1/2 xl:basis-1/4"
              >
                <HomeProductCard product={product} categories={categories} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {snapCount > 1 ? (
          <div
            className="mt-5 flex items-center justify-center gap-2 md:hidden"
            aria-hidden="true"
          >
            {Array.from({ length: snapCount }).map((_, index) => (
              <span
                key={`${title}-dot-${index}`}
                className={`block h-2 transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-6 rounded-[2px] bg-primary"
                    : "w-2 rounded-[2px] bg-slate-300"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
