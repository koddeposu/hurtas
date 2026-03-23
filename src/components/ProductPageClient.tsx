"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ZoomableImage } from "@/components/ZoomableImage";
import { handleCall, handleWhatsApp } from "@/lib/analytics/googleAds";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Bath,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
  MessageCircle,
  Phone,
  Ruler,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ProjectGalleryModal } from "./ModalSliderImage";

// DB Product type for detail page
interface DBProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

interface DetailProduct {
  id: string;
  name: string;
  slug: string;
  area: string;
  room: string;
  floor: string;
  bath: string;
  height: string;
  price: string | null;
  oldPrice: string | null;
  description: string | null;
  metaDescription: string | null;
  images: DBProductImage[];
}

interface ProductPageClientProps {
  product: DetailProduct;
  descriptionHtml?: string | null;
  descriptionText?: string | null;
  relatedProducts?: RelatedProduct[];
  relatedTitle?: string;
}

interface ProductImageProps {
  product: DetailProduct;
}

interface ProductPriceProps {
  product: DetailProduct;
}

interface RelatedProduct {
  id: string;
  slug: string;
  name: string;
  area: string;
  room: string;
  price: string | null;
  oldPrice: string | null;
  categoryName: string | null;
  metaDescription: string | null;
  image: {
    url: string;
    alt: string;
  } | null;
}

export function ProductImage({ product }: ProductImageProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = useState<DetailProduct | null>(
    null,
  );

  const getImageAlt = (alt: string, index: number) =>
    alt?.trim() ? alt : `${product.name} - ${index + 1}`;

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <>
      <ProjectGalleryModal
        projects={
          selectedProduct
            ? selectedProduct.images.map((imageItem, i) => ({
                id: i,
                img: imageItem.url,
                title: getImageAlt(imageItem.alt, i),
              }))
            : []
        }
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <div className="relative">
        <div className="relative group">
          <Carousel
            setApi={setApi}
            className="w-full overflow-hidden rounded-[1rem] border border-white"
          >
            <CarouselContent>
              {product.images.map((item, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div
                    className="relative aspect-video w-full"
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                  >
                    <ZoomableImage
                      src={item.url}
                      alt={getImageAlt(item.alt, index)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Yakınlaştırma İkonu */}
          <button
            onClick={() => setSelectedProduct(product)}
            className="absolute top-4 right-4 z-30 bg-white/95 hover:bg-white p-2 rounded-lg shadow transition-all"
            aria-label="Resmi büyüt"
          >
            <ZoomIn />
          </button>

          {product.images.length > 1 && (
            <div className="absolute bottom-4 z-20 flex w-full justify-center gap-2">
              {product.images.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  animate={{
                    width: current === index ? 22 : 10,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`h-2.5 rounded-full cursor-pointer ${
                    current === index ? "bg-secondary" : "bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="relative mt-4 flex items-center gap-2 overflow-x-auto pb-1">
            {product.images.map((item, index) => (
              <button
                key={index}
                type="button"
                className={`overflow-hidden rounded-lg border transition-all ${
                  current === index
                    ? "border-secondary ring-1 ring-secondary/30"
                    : "border-slate-200"
                }`}
                onClick={() => api?.scrollTo(index)}
                onContextMenu={handleContextMenu}
              >
                <Image
                  src={item.url}
                  alt={getImageAlt(item.alt, index)}
                  width={90}
                  height={90}
                  draggable={false}
                  className="h-16 w-16 min-w-16 cursor-pointer select-none object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function ProductFeatures({ product }: ProductPriceProps) {
  const featureItems = [
    product.area && {
      icon: <Ruler size={16} className="text-[#49202d]" />,
      label: `${product.area} m²`,
    },
    product.room && {
      icon: <Home size={16} className="text-[#49202d]" />,
      label: `${product.room}`,
    },
    product.bath && {
      icon: <Bath size={16} className="text-[#49202d]" />,
      label: `${product.bath} banyo`,
    },
    product.floor && {
      icon: <Ruler size={16} className="text-[#49202d]" />,
      label: `${product.floor} kat`,
    },
    product.height && {
      icon: <ArrowUp size={16} className="text-[#49202d]" />,
      label: `${product.height}m yükseklik`,
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

  if (!featureItems.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {featureItems.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700"
        >
          {item.icon}
          <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function ProductPrice({ product }: ProductPriceProps) {
  const oldPriceNum = product.oldPrice ? Number(product.oldPrice) : 0;

  return (
    <div className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4 md:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
        Başlangıç Fiyatı
      </p>
      {oldPriceNum > 0 && (
        <div className="flex items-center gap-3 mb-2">
          <span className="text-slate-300 line-through font-bold">
            {oldPriceNum.toLocaleString("tr-TR")} TL
          </span>
        </div>
      )}
      <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-1">
        {formatPrice(product?.price)} TL
      </div>
      <p className="text-slate-500 text-xs font-medium">Ücretsiz Kurulum</p>
    </div>
  );
}
const formatPrice = (price: string | null | undefined) => {
  if (!price || price === "null") return null;
  return new Intl.NumberFormat("tr-TR").format(Number(price));
};

function ProductActions() {
  return (
    <div className="space-y-3">
      <button
        onClick={handleWhatsApp}
        className="cursor-pointer w-full bg-secondary text-white py-4 rounded-[1rem] font-black text-sm tracking-[0.08em] flex items-center justify-center gap-3 hover:bg-[#20ba5a] transition-colors"
      >
        <MessageCircle size={22} /> WHATSAPP
      </button>
      <button
        onClick={handleCall}
        className="cursor-pointer w-full bg-primary text-white py-4 rounded-[1rem] font-black text-sm tracking-[0.08em] flex items-center justify-center gap-3 hover:bg-[#3d1a26] transition-colors"
      >
        <Phone size={22} /> BİZİ ARAYIN
      </button>
      <p className="text-xs text-slate-500">
        Uzman ekibimiz ortalama 2 dakika içinde size geri dönüş sağlar.
      </p>
    </div>
  );
}

function TrustFeatures() {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-[1rem] space-y-3 shadow-sm">
      <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase tracking-wide">
        <CheckCircle2 size={16} className="text-secondary" />
        TSE Onaylı Malzemeler
      </div>
      <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase tracking-wide">
        <CheckCircle2 size={16} className="text-secondary" />
        10 Yıl Resmi Garanti
      </div>
      <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase tracking-wide">
        <Info size={16} className="text-[#49202d]" />
        Hemen Teslim İmkanı
      </div>
    </div>
  );
}

function ProductDescription({
  descriptionHtml,
  descriptionText,
}: {
  descriptionHtml?: string | null;
  descriptionText?: string | null;
}) {
  if (!descriptionHtml && !descriptionText) return null;

  return (
    <div className="mt-8 md:mt-10 rounded-[1rem] border border-slate-200 bg-white p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-black tracking-tight text-[#49202d]">
        Ürün Açıklaması
      </h2>
      {descriptionHtml ? (
        <div
          className="blog-content product-content mt-3 text-sm md:text-base text-slate-700"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      ) : (
        <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-line">
          {descriptionText}
        </p>
      )}
    </div>
  );
}

function RelatedProductCard({ product }: { product: RelatedProduct }) {
  return (
    <Link
      href={`/prefabrik-ev/${product.slug}`}
      prefetch={false}
      className="group flex h-full flex-col overflow-hidden rounded-[1rem] border border-slate-300 bg-white shadow-[0_16px_38px_-32px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-400 hover:shadow-[0_24px_52px_-30px_rgba(15,23,42,0.3)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            quality={75}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 48vw"
          />
        ) : null}

        {product.categoryName ? (
          <div className="absolute right-4 top-4 rounded-lg border border-slate-200/80 bg-white/92 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur">
            {product.categoryName}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base md:text-lg font-black leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-primary">
          {product.name}
        </h3>

        {product.metaDescription ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {product.metaDescription}
          </p>
        ) : null}

        {product.price ? (
          <div className="mt-2 flex items-center gap-2">
            <p className="text-base font-bold text-secondary">
              {formatPrice(product.price)} ₺
            </p>
            {product.oldPrice ? (
              <p className="text-sm font-bold text-slate-500 line-through">
                {formatPrice(product.oldPrice)} ₺
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <Ruler className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-slate-500">
              {product.area} m<sup>2</sup>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <Home className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-slate-500">
              {product.room}
            </span>
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-secondary">
          İncele
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function RelatedProductsSlider({
  title,
  products,
}: {
  title?: string;
  products: RelatedProduct[];
}) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  React.useEffect(() => {
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

  if (!products.length) return null;

  return (
    <section className="font-[family-name:var(--font-poppins)]">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900">
          {title || "Diğer Prefabrik Ev Modellerimiz"}
        </h2>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="absolute -left-7 md:-left-10 top-1/2 z-20 inline-flex -translate-y-1/2 items-center justify-center text-black transition-colors hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:scale-110"
          aria-label={`${title || "İlgili ürünler"} önceki`}
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
          className="absolute -right-7 md:-right-10 top-1/2 z-20 inline-flex -translate-y-1/2 items-center justify-center text-slate-700 transition-colors hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:scale-110"
          aria-label={`${title || "İlgili ürünler"} sonraki`}
        >
          <ChevronRight
            className="w-14 h-14 lg:w-20 lg:h-20"
            strokeWidth={0.8}
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
            {products.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <RelatedProductCard product={item} />
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
                key={`related-dot-${index}`}
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

export default function ProductPageClient({
  product,
  descriptionHtml,
  descriptionText,
  relatedProducts = [],
  relatedTitle,
}: ProductPageClientProps) {
  return (
    <main className="min-h-screen bg-slate-50/30">
      <section className="pt-14 pb-12 lg:pt-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="lg:col-span-7">
              <ProductImage product={product} />
              <div className="hidden lg:block">
                <ProductDescription
                  descriptionHtml={descriptionHtml}
                  descriptionText={descriptionText}
                />
              </div>
            </div>

            <aside className="lg:col-span-5 mt-1 lg:mt-0 space-y-4 p-0 border-0 shadow-none bg-transparent lg:sticky lg:top-28 lg:rounded-[1rem] lg:border lg:border-slate-200 lg:bg-white lg:p-6 lg:shadow-sm lg:space-y-5">
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1">
                <span className="w-4 h-[1px] bg-primary" />
                <span className="text-[10px] font-black text-[#49202d] uppercase tracking-[0.18em]">
                  CT PREFABRİK
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.05]">
                {product.name}
              </h1>

              {product.metaDescription ? (
                <p className="text-sm md:text-base leading-relaxed text-slate-600 [text-wrap:pretty]">
                  {product.metaDescription}
                </p>
              ) : null}

              <ProductFeatures product={product} />

              {product.price && <ProductPrice product={product} />}

              <ProductActions />
              <TrustFeatures />
            </aside>

            <div className="lg:hidden">
              <ProductDescription
                descriptionHtml={descriptionHtml}
                descriptionText={descriptionText}
              />
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="pb-16">
          <div className="container mx-auto max-w-7xl">
            <RelatedProductsSlider
              title={relatedTitle}
              products={relatedProducts}
            />
          </div>
        </section>
      ) : null}
    </main>
  );
}
