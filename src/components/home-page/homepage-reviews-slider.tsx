"use client";

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
  productName: string;
  href: string;
  customerName: string;
  city: string;
  rating: number;
  comment: string;
}

const REVIEW_SLIDES: ReviewSlide[] = [
  {
    id: "review-1",
    productName: "Beton Boru",
    href: `${ALL_PRODUCTS_PATH}?q=Beton%20Boru`,
    customerName: "Murat K.",
    city: "Kocaeli",
    rating: 5,
    comment:
      "Altyapı hattı için beton boru tedarikinde ölçü, adet ve sevkiyat planı net ilerledi. Şantiye programımız aksamadı.",
  },
  {
    id: "review-2",
    productName: "Parke Taşı",
    href: `${ALL_PRODUCTS_PATH}?q=Parke%20Ta%C5%9F%C4%B1`,
    customerName: "Ayşe Y.",
    city: "Tekirdağ",
    rating: 4,
    comment:
      "Saha düzenlemesi için parke taşı siparişi verdik. Ürün kalitesi ve sevkiyat zamanlaması proje akışına uydu.",
  },
  {
    id: "review-3",
    productName: "Bordür",
    href: `${ALL_PRODUCTS_PATH}?q=Bord%C3%BCr`,
    customerName: "Zehra A.",
    city: "Bursa",
    rating: 5,
    comment:
      "Bordür ürünlerinde ihtiyacımızı hızlı netleştirdiler. Üretim ve teslim süreci beklediğimizden daha düzenli geçti.",
  },
  {
    id: "review-4",
    productName: "Menhol Elemanları",
    href: `${ALL_PRODUCTS_PATH}?q=Menhol`,
    customerName: "Hasan D.",
    city: "Sakarya",
    rating: 4,
    comment:
      "Menhol ve altyapı elemanlarında teknik sorularımıza hızlı dönüş aldık. Doğru ürün seçimi konusunda ekip yardımcı oldu.",
  },
  {
    id: "review-5",
    productName: "Yağmur Oluğu",
    href: `${ALL_PRODUCTS_PATH}?q=Ya%C4%9Fmur%20Olu%C4%9Fu`,
    customerName: "Elif T.",
    city: "Balıkesir",
    rating: 5,
    comment:
      "Drenaj hattı için gerekli ürünleri tek kalemde planladık. Paketleme ve teslimat tarafında düzenli bilgi verildi.",
  },
  {
    id: "review-6",
    productName: "Saha Beton Elemanları",
    href: ALL_PRODUCTS_PATH,
    customerName: "Mehmet S.",
    city: "Yalova",
    rating: 4,
    comment:
      "Farklı beton ürünlerini aynı sevkiyat planında toparlayabildik. Satış ekibinin takip disiplini bize zaman kazandırdı.",
  },
];

const AVERAGE_RATING = (
  REVIEW_SLIDES.reduce((total, review) => total + review.rating, 0) /
  REVIEW_SLIDES.length
).toFixed(1);

export function HomepageReviewsSlider() {
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
      <div className="border-y border-slate-200 bg-[#f6f8fb] px-4 py-4 sm:px-5 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#d6a94a]" aria-hidden="true" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
                Müşteri Yorumları
              </span>
            </div>
            <h2
              id="reviews-heading"
              className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl"
            >
              Projelerde düzenli tedarik, net iletişim.
            </h2>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-start lg:justify-end">
            <div className="inline-flex h-10 items-center gap-2 rounded-[2px] border border-slate-300 bg-white px-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700">
              <Star className="h-3.5 w-3.5 fill-[#d6a94a] text-[#d6a94a]" />
              {AVERAGE_RATING} / 5 Memnuniyet
            </div>

            {snapCount > 1 ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => api?.scrollPrev()}
                  disabled={!canScrollPrev}
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[2px] border border-[#152f51]/20 bg-white text-[#152f51] transition-colors hover:bg-[#152f51] hover:text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                  aria-label="Önceki yorum"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                </button>

                <button
                  type="button"
                  onClick={() => api?.scrollNext()}
                  disabled={!canScrollNext}
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[2px] border border-[#152f51]/20 bg-white text-[#152f51] transition-colors hover:bg-[#152f51] hover:text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                  aria-label="Sonraki yorum"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative mt-4">
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
              {REVIEW_SLIDES.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="basis-full md:basis-1/2 xl:basis-1/3"
                >
                  <figure className="relative flex h-full min-h-48 flex-col rounded-[3px] border border-slate-200 bg-white p-4 shadow-[0_16px_34px_-30px_rgba(15,23,42,0.28)] transition-colors hover:border-slate-300 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={review.href}
                        prefetch={false}
                        className="inline-flex min-h-8 items-center rounded-[2px] border border-[#152f51]/10 bg-[#152f51]/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#152f51] transition-colors hover:bg-[#152f51]/10"
                      >
                        {review.productName}
                      </Link>
                      <Quote className="h-6 w-6 shrink-0 rotate-180 text-slate-200" />
                    </div>

                    <blockquote className="mt-4 flex-1">
                      <p className="line-clamp-3 text-sm font-medium leading-6 text-slate-700">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </blockquote>

                    <figcaption className="mt-4 border-t border-slate-200 pt-3">
                      <div className="flex items-center justify-between">
                        <cite className="not-italic text-sm font-black text-slate-900">
                          {review.customerName}
                        </cite>
                        <span className="text-xs font-bold text-slate-500">
                          {review.city}
                        </span>
                      </div>
                      <div
                        className="mt-2 flex items-center gap-0.5 text-[#d6a94a]"
                        aria-label={`5 üzerinden ${review.rating} yıldız`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={`${review.id}-star-${i}`}
                            className={`h-3.5 w-3.5 ${
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
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
