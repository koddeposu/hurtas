"use client";

import { HomeProductCard } from "@/components/home-page/home-product-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DBProductPreview } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HomepageCategorySliderProps {
  title: string;
  accent: string;
  seoLabel: string;
  description: string;
  href: string;
  products: DBProductPreview[];
}

export function HomepageCategorySlider({
  title,
  accent,
  seoLabel,
  description,
  href,
  products,
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
      <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-lg border border-secondary/15 bg-secondary/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-secondary">
            {seoLabel}
          </span>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 md:text-4xl">
            <span className="text-secondary">{accent}</span> {title}
          </h2>
          <p className="mt-3 max-w-lg text-sm font-medium leading-6 text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={href}
            prefetch={false}
            className="rounded-lg border border-slate-300 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 transition-colors hover:border-secondary hover:text-secondary"
          >
            Tümünü Gör
          </Link>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="absolute  -left-7 md:-left-10 top-1/2 z-20 inline-flex  -translate-y-1/2 items-center justify-center   text-black  transition-colors hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:scale-110"
          aria-label={`${title} önceki`}
        >
          <ChevronLeft
            className="w-14 h-14 lg:w-20 lg:h-20"
            strokeWidth={0.8}
          />
        </button>

        <button
          type="button"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="absolute  -right-7 md:-right-10 top-1/2 z-20 inline-flex  -translate-y-1/2 items-center justify-center text-slate-700  transition-colors  hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:scale-110"
          aria-label={`${title} sonraki`}
        >
          <ChevronRight
            strokeWidth={0.8}
            className="w-14 h-14 lg:w-20 lg:h-20"
          />
        </button>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
          }}
          className="w-full px-6 sm:px-8"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-full md:basis-1/2 xl:basis-1/4"
              >
                <HomeProductCard product={product} />
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
                className={`block h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
