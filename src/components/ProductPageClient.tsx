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
  Bath,
  CheckCircle2,
  Home,
  Info,
  MessageCircle,
  Phone,
  Ruler,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
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
  images: DBProductImage[];
}

interface ProductPageClientProps {
  product: DetailProduct;
}

interface ProductImageProps {
  product: DetailProduct;
}

interface ProductPriceProps {
  product: DetailProduct;
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

function ProductDescription({ product }: ProductPriceProps) {
  if (!product.description) return null;

  return (
    <div className="mt-8 md:mt-10 rounded-[1rem] border border-slate-200 bg-white p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-black tracking-tight text-[#49202d]">
        Ürün Açıklaması
      </h2>
      <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-line">
        {product.description}
      </p>
    </div>
  );
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  return (
    <main className="min-h-screen bg-slate-50/30">
      <section className="pt-14 pb-12 lg:pt-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="lg:col-span-7">
              <ProductImage product={product} />
              <div className="hidden lg:block">
                <ProductDescription product={product} />
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

              <ProductFeatures product={product} />

              {product.price && <ProductPrice product={product} />}

              <ProductActions />
              <TrustFeatures />
            </aside>

            <div className="lg:hidden">
              <ProductDescription product={product} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
