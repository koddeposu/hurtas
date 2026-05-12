"use client";

import { useDictionary, useLocalizedPath } from "@/components/i18n-provider";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ALL_PRODUCTS_PATH } from "@/lib/productRoutes";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ReviewSlide {
  id: string;
  href: string;
  rating: number;
}

const REVIEW_SLIDES: ReviewSlide[] = [
  {
    id: "review-1",
    href: `${ALL_PRODUCTS_PATH}?q=Beton%20Boru`,
    rating: 5,
  },
  {
    id: "review-2",
    href: `${ALL_PRODUCTS_PATH}?q=Parke%20Ta%C5%9F%C4%B1`,
    rating: 4,
  },
  {
    id: "review-3",
    href: `${ALL_PRODUCTS_PATH}?q=Bord%C3%BCr`,
    rating: 5,
  },
  {
    id: "review-4",
    href: `${ALL_PRODUCTS_PATH}?q=Menhol`,
    rating: 4,
  },
  {
    id: "review-5",
    href: `${ALL_PRODUCTS_PATH}?q=Ya%C4%9Fmur%20Olu%C4%9Fu`,
    rating: 5,
  },
  {
    id: "review-6",
    href: ALL_PRODUCTS_PATH,
    rating: 4,
  },
];

const AVERAGE_RATING = (
  REVIEW_SLIDES.reduce((total, review) => total + review.rating, 0) /
  REVIEW_SLIDES.length
).toFixed(1);

export function HomepageReviewsSlider() {
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
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

  if (!REVIEW_SLIDES.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="reviews-heading"
      className="font-[family-name:var(--font-poppins)]"
    >
      <div className="border-y border-slate-200 bg-[#f8fafc] px-4 py-3 sm:px-5 lg:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="h-px w-7 bg-[#d6a94a]" aria-hidden="true" />
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                {dict.reviews.label}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-start lg:justify-end">
            <div className="inline-flex h-8 items-center gap-1.5 rounded-[2px] border border-slate-200 bg-white px-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-slate-600">
              <Star className="h-3 w-3 fill-[#d6a94a] text-[#d6a94a]" />
              {AVERAGE_RATING} / 5 {dict.reviews.satisfaction}
            </div>

            {snapCount > 1 ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => api?.scrollPrev()}
                  disabled={!canScrollPrev}
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[2px] border border-[#152f51]/20 bg-white text-[#152f51] transition-colors hover:bg-[#152f51] hover:text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                  aria-label={dict.reviews.prev}
                >
                  <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
                </button>

                <button
                  type="button"
                  onClick={() => api?.scrollNext()}
                  disabled={!canScrollNext}
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[2px] border border-[#152f51]/20 bg-white text-[#152f51] transition-colors hover:bg-[#152f51] hover:text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                  aria-label={dict.reviews.next}
                >
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative mt-3">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent>
              {REVIEW_SLIDES.map((review, index) => {
                const content =
                  dict.reviews.slides[index] ?? dict.reviews.slides[0];

                return (
                  <CarouselItem
                    key={review.id}
                    className="basis-full md:basis-1/2 xl:basis-1/4"
                  >
                    <figure className="relative flex h-full min-h-36 flex-col rounded-[3px] border border-slate-200 bg-white p-3 shadow-[0_12px_26px_-26px_rgba(15,23,42,0.22)] transition-colors hover:border-slate-300 sm:p-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={localizedPath(review.href)}
                          prefetch={false}
                          className="inline-flex min-h-7 items-center rounded-[2px] border border-[#152f51]/10 bg-[#152f51]/5 px-2 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-[#152f51] transition-colors hover:bg-[#152f51]/10"
                        >
                          {content.productName}
                        </Link>
                        <Quote className="h-5 w-5 shrink-0 rotate-180 text-slate-200" />
                      </div>

                      <blockquote className="mt-3 flex-1">
                        <p className="line-clamp-2 text-xs font-medium leading-5 text-slate-600">
                          &ldquo;{content.comment}&rdquo;
                        </p>
                      </blockquote>

                      <figcaption className="mt-3 border-t border-slate-200 pt-2.5">
                        <div className="flex items-center justify-between">
                          <cite className="not-italic text-xs font-black text-slate-900">
                            {content.customerName}
                          </cite>
                          <span className="text-[11px] font-bold text-slate-500">
                            {content.city}
                          </span>
                        </div>
                        <div
                          className="mt-1.5 flex items-center gap-0.5 text-[#d6a94a]"
                          aria-label={dict.reviews.stars.replace(
                            "{rating}",
                            String(review.rating),
                          )}
                        >
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={`${review.id}-star-${i}`}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? "fill-current"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </figcaption>
                    </figure>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
