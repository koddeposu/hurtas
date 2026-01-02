"use client";
import { MOCK_PRODUCT } from "@/types/product";
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
} from "lucide-react";
import React, { use } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Image from "next/image";


const FEATURE_ICONS = {
  home: Home,
  bath: Bath,
  floor: Ruler,
  height: ArrowUp,
} as const;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Type tanımlamaları
type Product = typeof MOCK_PRODUCT[number];
type ProductDetail = Product['detail'];
type FeatureIcon = keyof typeof FEATURE_ICONS;

interface ProductImageProps {
  product: Product;
  detail: ProductDetail;
}

interface ProductFeaturesProps {
  detail: ProductDetail;
}

interface ProductPriceProps {
  product: Product;
}

interface ProductDescriptionProps {
  detail: ProductDetail;
}

function ProductImage({ product, detail }: ProductImageProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative">
      <div className="relative">
        <Carousel
          setApi={setApi}
          className="w-full overflow-hidden rounded-[1rem] md:rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border-2 md:border-[8px] border-white"
        >
          <CarouselContent>
            {product.img.map((item, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="relative aspect-video w-full">
                  <Image
                    src={item}
                    alt="product image"
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* DOTS */}
        {product.img.length > 1 && (
          <div className="absolute bottom-5 md:bottom-10 z-20 flex w-full justify-center gap-2">
            {product.img.map((_, index) => (
              <motion.div
                key={index}
                onClick={() => api?.scrollTo(index)}
                animate={{
                  width: current === index ? 22 : 10,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`h-2.5 rounded-full cursor-pointer ${current === index ? "bg-secondary" : "bg-white/70"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="relative flex items-center flex-wrap gap-3 mt-4">
        {product.img.map((item, index) => (
          <div className="border-3 border-white rounded-lg overflow-hidden shadow-[0_0_100px_1px_rgba(0,0,0,0.01)]" key={index} onClick={() => api?.scrollTo(index)}
          >
            <Image

              src={item}
              alt="product image"
              width={100}
              height={100}
              className={`w-16 h-16 min-w-10  transition-opacity cursor-pointer  ${current === index ? "opacity-100" : "opacity-40"}`}
            />
          </div>

        ))}
      </div>
    </div>

  )
}


function ProductFeatures({ detail }: ProductFeaturesProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 py-5 border-y border-slate-100 mb-8">
      {detail?.features?.map((feature, i) => {
        const Icon = FEATURE_ICONS[feature.icon as FeatureIcon];
        return (
          <div
            key={i}
            className="flex items-center gap-2 text-slate-600"
          >
            <Icon size={16} className="text-[#49202d]" />
            <span className="text-sm font-bold">
              {feature.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}


function ProductPrice({ product }: ProductPriceProps) {
  return (
    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
      {typeof product.oldPrice === "number" && product.oldPrice > 0 && (
        <div className="flex items-center gap-3 mb-2">
          <span className="text-slate-300 line-through font-bold">
            {product.oldPrice.toLocaleString("tr-TR")} TL
          </span>
        </div>
      )}

      <div className="text-4xl font-black text-slate-900 tracking-tight mb-2">
        {product.price} TL
      </div>

      <p className="text-slate-400 text-xs font-medium italic">
        Ücretsiz Kurulum
      </p>
    </div>
  );
}

function ProductPriceMobile({ product }: ProductPriceProps) {
  return (
    <div className="bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100">
      {typeof product.oldPrice === "number" && product.oldPrice > 0 && (
        <div className="flex items-center gap-3 mb-2">
          <span className="text-slate-300 line-through font-bold">
            {product.oldPrice.toLocaleString("tr-TR")} TL
          </span>
        </div>
      )}

      <div className="text-xl font-black text-slate-900 tracking-tight mb-2">
        {product.price} TL
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
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
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
        className="cursor-pointer w-full bg-[#49202d] text-white py-5 rounded-[2rem] font-black text-sm tracking-widest flex items-center justify-center gap-3 hover:bg-[#3d1a26] transition-colors"
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

function ProductDescription({ detail }: ProductDescriptionProps) {
  return (
    <div className="mt-8 md:mt-16 space-y-4 md:space-y-8 pr-10">
      <div className="flex items-center gap-3 text-[#49202d]">
        <FileText size={20} />
        <h2 className="text-xl font-black tracking-tight">
          Ürün Açıklaması
        </h2>
      </div>

      <div className="prose prose-slate max-w-none">
        {detail?.description?.map((text, i) => (
          <p
            key={i}
            className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium mt-4"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

function ProductPage({ params }: PageProps) {
  const { slug } = use(params);

  // Slug'dan ID'yi çıkar (örn: "villa-lux-01" -> "01")
  const productId = slug.split('-').pop();

  const productData = MOCK_PRODUCT.find(p => p.id === productId);

  if (!productData) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Ürün Bulunamadı</h1>
          <p className="text-slate-500">Aradığınız ürün mevcut değil.</p>
        </div>
      </main>
    );
  }

  // TypeScript için product'ın undefined olmadığını garanti ediyoruz
  const product: Product = productData;
  const detail = product.detail;

  function Desktop() {
    return (
      <main className="bg-white min-h-screen">
        <section className="pt-30 ">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
              {/* SOL */}
              <div className="lg:col-span-7">
                <ProductImage product={product} detail={detail} />

                {/* DESCRIPTION */}
                <ProductDescription detail={detail} />
              </div>

              {/* SAĞ */}
              <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
                {/* HEADER */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-[1px] bg-[#49202d]" />
                    <span className="text-[10px] font-black text-[#49202d] uppercase tracking-[0.3em]">
                      CT PREFABRİK
                    </span>
                  </div>

                  <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                    {product.name}
                  </h1>

                  {/* FEATURES */}
                  <ProductFeatures detail={detail} />
                </div>

                {/* PRICE */}
                {product.price &&
                  <ProductPrice product={product} />
                }

                {/* ACTIONS */}
                <ProductActions />

                {/* GÜVEN VEREN ÖZELLİKLER */}
                <TrustFeatures />
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  function Mobile() {
    return (
      <main className="bg-white min-h-screen">
        <section className="pt-20 ">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
              {/* SOL */}
              <div className="lg:col-span-7">
                <ProductImage product={product} detail={detail} />
              </div>

              {/* SAĞ */}
              <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
                {/* HEADER */}
                <div>
                  {/* FEATURES */}
                  <ProductFeatures detail={detail} />

                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-[1px] bg-[#49202d]" />
                    <span className="text-[10px] font-black text-[#49202d] uppercase tracking-[0.3em]">
                      CT PREFABRİK
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                    {product.name}
                  </h1>
                </div>

                {/* PRICE */}
                {product.price &&
                  <ProductPriceMobile product={product} />
                }


                {/* ACTIONS */}
                <ProductActions />

                {/* GÜVEN VEREN ÖZELLİKLER */}
                <TrustFeatures />

                {/* DESCRIPTION */}
                <ProductDescription detail={detail} />
              </div>
            </div>
          </div>
        </section>
      </main>
    )
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

export default ProductPage;
