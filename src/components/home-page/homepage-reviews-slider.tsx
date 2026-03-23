"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
    productName: "1+1 Tek Katlı Prefabrik Ev 40 m²",
    href: "/prefabrik-ev/1-1-tek-katli-prefabrik-ev-40-m2",
    customerName: "Ayşe Y.",
    city: "Kocaeli",
    rating: 5,
    comment:
      "Hafta sonu kullanımı için 40 m² 1+1 tek katlı modeli seçtik. İç plan küçük ama kullanışlı, kurulum süreci de tahminimizden daha düzenli geçti.",
  },
  {
    id: "review-2",
    productName: "2+1 Tek Katlı Prefabrik Ev 72 m²",
    href: "/prefabrik-ev/2-1-tek-katli-prefabrik-ev-72-m2",
    customerName: "Murat K.",
    city: "Tekirdağ",
    rating: 4,
    comment:
      "72 m² 2+1 tek katlı modelde salon genişliği bizim için belirleyici oldu. Çocuklu aile için günlük kullanımda gerçekten rahat bir planı var.",
  },
  {
    id: "review-3",
    productName: "3+1 Çift Katlı Prefabrik Ev 122 m²",
    href: "/prefabrik-ev/3-1-cift-katli-prefabrik-ev-122-m2",
    customerName: "Zehra A.",
    city: "Bursa",
    rating: 5,
    comment:
      "122 m² 3+1 çift katlı modelde odaların birbirinden ayrılması hoşumuza gitti. Süreç boyunca ekip düzenli bilgi verdi, teslim de söz verilen tarihte oldu.",
  },
  {
    id: "review-4",
    productName: "4+1 Çift Katlı Prefabrik Ev 149 m²",
    href: "/prefabrik-ev/4-1-cift-katli-prefabrik-ev-149-m2",
    customerName: "Hasan D.",
    city: "Sakarya",
    rating: 4,
    comment:
      "149 m² 4+1 çift katlı modeli kalabalık aile yapımıza göre tercih ettik. Oda dağılımı dengeli, özellikle üst kattaki kullanım alanı beklentimizi karşıladı.",
  },
  {
    id: "review-5",
    productName: "3+1 Tek Katlı Prefabrik Ev 95 m²",
    href: "/prefabrik-ev/3-1-tek-katli-prefabrik-ev-95-m2",
    customerName: "Elif T.",
    city: "Balıkesir",
    rating: 5,
    comment:
      "95 m² 3+1 tek katlı modelde yalıtım tarafını özellikle beğendik. Kışın ısıyı iyi tutuyor, yazın da evin içi ferah kalıyor.",
  },
  {
    id: "review-6",
    productName: "Çelik Ev 120 m²",
    href: "/prefabrik-ev/celik-ev-120m2",
    customerName: "Mehmet S.",
    city: "Yalova",
    rating: 4,
    comment:
      "120 m² çelik ev modelinde dayanıklılık beklentisiyle ilerledik. Satış sonrası destek ekibi sorularımıza hızlı döndü, bu da bize güven verdi.",
  },
  {
    id: "review-7",
    productName: "2+1 Tek Katlı Prefabrik Ev 53 m²",
    href: "/prefabrik-ev/2-1-tek-katli-prefabrik-ev-53-m2",
    customerName: "Gökhan A.",
    city: "Çanakkale",
    rating: 4,
    comment:
      "53 m² 2+1 tek katlı modeli yazlık arsa için değerlendirdik. Alanı verimli kullanması bizim için önemliydi, planı bu açıdan başarılı bulduk.",
  },
  {
    id: "review-8",
    productName: "3+1 Tek Katlı Prefabrik Ev 112 m²",
    href: "/prefabrik-ev/3-1-tek-katli-prefabrik-ev-112-m2",
    customerName: "Seda N.",
    city: "Manisa",
    rating: 5,
    comment:
      "112 m² 3+1 tek katlı modelde mutfak-salon ilişkisi tam istediğimiz gibi çıktı. Uygulama sırasında ekip düzenli ilerleme paylaşımı yaptı.",
  },
  {
    id: "review-9",
    productName: "2+1 Çift Katlı Prefabrik Ev 100 m²",
    href: "/prefabrik-ev/2-1-cift-katli-prefabrik-ev-100-m2",
    customerName: "İsmail T.",
    city: "Düzce",
    rating: 4,
    comment:
      "100 m² 2+1 çift katlı modelde kat ayrımı bizim kullanım alışkanlığımıza uydu. Teslim sonrası küçük taleplerimiz de hızlı şekilde çözüldü.",
  },
];

export function HomepageReviewsSlider() {
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

  if (!REVIEW_SLIDES.length) {
    return null;
  }

  return (
    <section className="mt-12 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 via-white to-white px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex rounded-md border border-emerald-200 bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
            Müşteri Yorumları
          </span>
          <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900 md:text-2xl">
            En Çok Tercih Edilen Modeller Hakkında Geri Bildirimler
          </h3>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Önceki yorum"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Sonraki yorum"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent>
          {REVIEW_SLIDES.map((review) => (
            <CarouselItem
              key={review.id}
              className="basis-full sm:basis-1/2 xl:basis-1/3"
            >
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: review.rating }).map((_, starIndex) => (
                    <Star key={`${review.id}-star-${starIndex}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-700">
                  {review.comment}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <Link
                    href={review.href}
                    prefetch={false}
                    className="inline-flex rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-800 transition-colors hover:bg-emerald-100"
                  >
                    {review.productName}
                  </Link>
                  <p className="mt-2 text-xs font-semibold text-slate-800">
                    {review.customerName}
                  </p>
                  <p className="text-xs text-slate-500">{review.city}</p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {snapCount > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, index) => (
            <button
              key={`review-dot-${index}`}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-6 bg-emerald-700"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`${index + 1}. yoruma git`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
