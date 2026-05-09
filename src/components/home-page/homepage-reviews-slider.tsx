"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// Veri yapınız aynı kalıyor
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
  // Noktaları kullanmayacağız, sadece oklar
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      // setSelectedIndex(api.selectedScrollSnap());
      // setSnapCount(api.scrollSnapList().length);
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
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-slate-100"
    >
      {/* Ana İçerik Alanı (Carousel) */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 md:px-8 lg:py-12">
        {/* Üst Alan: Başlık */}
        <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-primary">
            Müşteri Yorumları
          </span>
          <h2
            id="reviews-heading"
            className="mt-4 text-2xl font-black tracking-tight text-slate-900 md:text-4xl"
          >
            Sizin İçin En İyi Deneyimi Sunuyoruz
          </h2>
          <p className="mt-4 text-sm font-medium leading-6 text-slate-600 sm:text-base">
            Tek katlı prefabrik ev, çift katlı prefabrik ev ve çelik ev
            projelerimiz için paylaşılan gerçek müşteri yorumlarını inceleyin.
          </p>
        </div>

        {/* Carousel ve Kenar Okları */}
        <div className="relative">
          {/* Sol Ok */}
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className="absolute -left-7 top-1/2 z-20 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center text-black transition-colors hover:scale-110 hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 md:-left-10"
            aria-label="Önceki yorum"
          >
            <ChevronLeft
              className="h-14 w-14 lg:h-20 lg:w-20"
              strokeWidth={0.8}
            />
          </button>

          {/* Sağ Ok */}
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            className="absolute -right-7 top-1/2 z-20 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center text-slate-700 transition-colors hover:scale-110 hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 md:-right-10"
            aria-label="Sonraki yorum"
          >
            <ChevronRight
              className="h-14 w-14 lg:h-20 lg:w-20"
              strokeWidth={0.8}
            />
          </button>

          {/* Carousel */}
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1, // Tek bir yorum kaydırılacak
            }}
            className="w-full px-6 sm:px-8"
          >
            <CarouselContent>
              {REVIEW_SLIDES.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="basis-full" // Tam genişlikte tek bir yorum
                >
                  {/* Yorum Kartı - Büyütülmüş ve Merkezlenmiş - SEO Semantik Yapı */}
                  <figure className="relative mx-auto flex max-w-3xl flex-col rounded-[0.9rem] border border-slate-300 bg-white p-6 shadow-[0_16px_38px_-32px_rgba(15,23,42,0.24)] transition-all hover:border-slate-400 hover:shadow-[0_24px_52px_-30px_rgba(15,23,42,0.28)] md:p-7">
                    {/* Arka plan tırnak işareti (Görsel Zenginlik) */}
                    <Quote className="pointer-events-none absolute right-6 top-6 h-10 w-10 rotate-180 text-slate-100" />

                    {/* Yıldızlar */}
                    <div
                      className="flex items-center gap-1 text-[#d6a94a]"
                      aria-label={`${review.rating} üzerinden 5 yıldız`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={`${review.id}-star-${i}`}
                          className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-slate-200"}`}
                        />
                      ))}
                    </div>

                    {/* Yorum (Blockquote) - Büyütülmüş Metin */}
                    <blockquote className="mt-4 flex-grow">
                      <p className="text-sm font-medium leading-6 text-slate-700 md:text-base">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </blockquote>

                    {/* Yorum Yapan Kişi ve Ürün (Footer) */}
                    <figcaption className="mt-5 border-t border-slate-200 pt-4">
                      <Link
                        href={review.href}
                        prefetch={false}
                        className="mb-3 inline-block rounded border border-primary/10 bg-primary/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary/10"
                      >
                        {review.productName}
                      </Link>
                      <div className="flex items-center justify-between">
                        <cite className="not-italic text-sm font-bold text-slate-900 md:text-base">
                          {review.customerName}
                        </cite>
                        <span className="text-xs font-medium text-slate-500 md:text-sm">
                          {review.city}
                        </span>
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
