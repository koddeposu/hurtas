"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ZoomableImage } from "@/components/ZoomableImage";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Bath,
  CheckCircle2,
  FileText,
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
    null
  );

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
                title: imageItem.alt,
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
            className="w-full overflow-hidden rounded-[1rem] md:rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border-2 md:border-[8px] border-white"
          >
            <CarouselContent>
              {product.images.map((item, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div
                    className="relative aspect-video w-full"
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                  >
                    <ZoomableImage src={item.url} alt={item.alt} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Yakınlaştırma İkonu */}
          <button
            onClick={() => setSelectedProduct(product)}
            className="absolute top-8 right-8 z-30 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg transition-all"
            aria-label="Resmi büyüt"
          >
            <ZoomIn />
          </button>

          {product.images.length > 1 && (
            <div className="absolute bottom-5 md:bottom-10 z-20 flex w-full justify-center gap-2">
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

        <div className="relative flex items-center flex-wrap gap-3 mt-4">
          {product.images.map((item, index) => (
            <div
              className="border-3 border-white rounded-lg overflow-hidden shadow-[0_0_100px_1px_rgba(0,0,0,0.01)]"
              key={index}
              onClick={() => api?.scrollTo(index)}
              onContextMenu={handleContextMenu}
            >
              <Image
                src={item.url}
                alt={item.alt}
                width={100}
                height={100}
                draggable={false}
                className={`w-16 h-16 min-w-10 transition-opacity cursor-pointer object-cover select-none ${
                  current === index ? "opacity-100" : "opacity-40"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ProductFeatures({ product }: ProductPriceProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 py-5 border-y border-slate-100 mb-8">
      {product.room && (
        <div className="flex items-center gap-2 text-slate-600">
          <Home size={16} className="text-[#49202d]" />
          <span className="text-sm font-bold">{product.room}</span>
        </div>
      )}
      {product.bath && (
        <div className="flex items-center gap-2 text-slate-600">
          <Bath size={16} className="text-[#49202d]" />
          <span className="text-sm font-bold">{product.bath} banyo</span>
        </div>
      )}
      {product.floor && (
        <div className="flex items-center gap-2 text-slate-600">
          <Ruler size={16} className="text-[#49202d]" />
          <span className="text-sm font-bold">{product.floor} kat</span>
        </div>
      )}
      {product.height && (
        <div className="flex items-center gap-2 text-slate-600">
          <ArrowUp size={16} className="text-[#49202d]" />
          <span className="text-sm font-bold">{product.height} yükseklik</span>
        </div>
      )}
    </div>
  );
}

function ProductPrice({ product }: ProductPriceProps) {
  const oldPriceNum = product.oldPrice ? Number(product.oldPrice) : 0;

  return (
    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
      {oldPriceNum > 0 && (
        <div className="flex items-center gap-3 mb-2">
          <span className="text-slate-300 line-through font-bold">
            {oldPriceNum.toLocaleString("tr-TR")} TL
          </span>
        </div>
      )}
      <div className="text-4xl font-black text-slate-900 tracking-tight mb-2">
        {formatPrice(product?.price)} TL
      </div>
      <p className="text-slate-400 text-xs font-medium italic">
        Ücretsiz Kurulum
      </p>
    </div>
  );
}
const formatPrice = (price: string | null | undefined) => {
  if (!price || price === "null") return null;
  return new Intl.NumberFormat("tr-TR").format(Number(price));
};
function ProductPriceMobile({ product }: ProductPriceProps) {
  const oldPriceNum = product.oldPrice ? Number(product.oldPrice) : 0;

  return (
    <div className="bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100">
      {oldPriceNum > 0 && (
        <div className="flex items-center gap-3 mb-2">
          <span className="text-slate-300 line-through font-bold">
            {oldPriceNum.toLocaleString("tr-TR")} TL
          </span>
        </div>
      )}
      <div className="text-xl font-black text-slate-900 tracking-tight mb-2">
        {formatPrice(product?.price)} TL
      </div>
      <p className="text-slate-400 text-xs font-medium italic">
        Ücretsiz Kurulum
      </p>
    </div>
  );
}

function ProductActions() {
  const phoneNumber = "+905375183006";
  const whatsappMessage = "Merhaba, CT Prefabrik sitesinden ulaşıyorum.";

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      /\+/g,
      ""
    )}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleWhatsApp}
        className="cursor-pointer w-full bg-secondary text-white py-5 rounded-[2rem] font-black text-sm tracking-widest flex items-center justify-center gap-3 hover:bg-[#20ba5a] transition-colors"
      >
        <MessageCircle size={22} /> WHATSAPP
      </button>
      <button
        onClick={handleCall}
        className="cursor-pointer w-full bg-primary text-white py-5 rounded-[2rem] font-black text-sm tracking-widest flex items-center justify-center gap-3 hover:bg-[#3d1a26] transition-colors"
      >
        <Phone size={22} /> BİZİ ARAYIN
      </button>
    </div>
  );
}

function TrustFeatures() {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-[2rem] space-y-3 shadow-sm">
      <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase">
        <CheckCircle2 size={16} className="text-secondary" />
        TSE Onaylı Malzemeler
      </div>
      <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase">
        <CheckCircle2 size={16} className="text-secondary" />
        10 Yıl Resmi Garanti
      </div>
      <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase">
        <Info size={16} className="text-[#49202d]" />
        Hemen Teslim İmkanı
      </div>
    </div>
  );
}

function ProductDescription({ product }: ProductPriceProps) {
  if (!product.description) return null;

  return (
    <div className="mt-8 md:mt-16 space-y-4 md:space-y-8 pr-10">
      <div className="flex items-center gap-3 text-[#49202d]">
        <FileText size={20} />
        <h2 className="text-xl font-black tracking-tight">Ürün Açıklaması</h2>
      </div>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium mt-4 whitespace-pre-line">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  function Desktop() {
    return (
      <main className="bg-white min-h-screen">
        <section className="pt-30">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
              <div className="lg:col-span-7">
                <ProductImage product={product} />
                <ProductDescription product={product} />
              </div>
              <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-[1px] bg-primary" />
                    <span className="text-[10px] font-black text-[#49202d] uppercase tracking-[0.3em]">
                      CT PREFABRİK
                    </span>
                  </div>
                  <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                    {product.name}
                  </h1>
                  <ProductFeatures product={product} />
                </div>
                {product.price && <ProductPrice product={product} />}
                <ProductActions />
                <TrustFeatures />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  function Mobile() {
    return (
      <main className="bg-white min-h-screen">
        <section className="pt-20">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
              <div className="lg:col-span-7">
                <ProductImage product={product} />
              </div>
              <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
                <div>
                  <ProductFeatures product={product} />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-[1px] bg-primary" />
                    <span className="text-[10px] font-black text-[#49202d] uppercase tracking-[0.3em]">
                      CT PREFABRİK
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                    {product.name}
                  </h1>
                </div>
                {product.price && <ProductPriceMobile product={product} />}
                <ProductActions />
                <TrustFeatures />
                <ProductDescription product={product} />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div>
      <section className="hidden lg:block">
        <Desktop />
      </section>
      <section className="block lg:hidden">
        <Mobile />
      </section>
    </div>
  );
}
