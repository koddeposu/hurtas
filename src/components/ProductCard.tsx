import Logo from '@/assets/logo.png'; // Logo import et
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { ArrowUpRight, Home, Maximize2, Ruler } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from 'react';

const formatPrice = (price: string | null) => {
  if (!price || price === "null") return null;
  return new Intl.NumberFormat('tr-TR').format(Number(price));
};

export const ProductCard = ({ product, bestseller, fullscreenChange }: { bestseller?: boolean, fullscreenChange: () => void, product: Product }) => {
  const router = useRouter();

  const goDetail = () => {
    router.push(`/urun-detay/${product.slug}-${product.id}`);
  };
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Sağ tık koruması
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Sürükle koruması
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}

      className="group w-full flex flex-col justify-between text-left bg-white overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 "
    >
      {/* SLIDER */}
      <div
        className="relative rounded-tr-[2rem] rounded-tl-[2rem] overflow-hidden"
      >
        <div className="relative">
          <Carousel
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {product.img.map((item, index) => (
                <CarouselItem key={index} className="basis-full" >
                  <div className="relative aspect-video w-full bg-slate-100">
                    <Image
                      src={`/product/${item.src}`}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover select-none"
                      draggable={false}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <img
                        src={Logo.src}
                        alt=""
                        className="w-[150px] h-auto opacity-20 select-none"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute bottom-4 right-4 pointer-events-none opacity-15">
                      <img
                        src={Logo.src}
                        alt=""
                        className="w-[50px] h-auto select-none"
                        loading="lazy"
                      />
                    </div>
                    <button onClick={fullscreenChange} className='absolute bottom-4 right-4 text-white bg-black/30 rounded-md w-10 h-10  flex items-center justify-center cursor-pointer hover:scale-110 duration-200'>
                      <Maximize2 size={20} className='text-white' />
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* DOTS */}
          {product.img.length > 1 && (
            <div className="absolute bottom-3 z-20 flex w-full justify-center gap-2">
              {product.img.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  animate={{
                    width: current === index ? 22 : 8,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`h-2 rounded-full cursor-pointer ${current === index ? "bg-secondary" : "bg-white/70"
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className='cursor-pointer'
          onClick={goDetail}
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
        >
          {bestseller && (
            <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm z-10 ">
              <span className="text-[9px] font-black text-white uppercase tracking-widest">
                Çok Satan
              </span>
            </div>
          )}

          <div className="absolute right-4 top-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm z-10">
            <span className="text-[9px] font-black text-primary uppercase tracking-widest">
              {product.category}
            </span>
          </div>
          <div className="px-6 pt-4">
            <h3 className="text-xl font-black text-slate-900 mb-2">
              {product.name}
            </h3>

            {product.price &&
              <div className="flex items-center gap-2 mb-4">
                <p className="text-lg font-bold text-secondary">
                  {formatPrice(product.price)} ₺
                </p>
                {product.oldPrice && (
                  <p className="text-md font-bold text-slate-500 line-through">
                    {formatPrice(product.oldPrice)} ₺
                  </p>
                )}
              </div>
            }
          </div>
          {/* CONTENT */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#49202d]">
                  <Ruler size={14} />
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {product.area}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#49202d]">
                  <Home size={14} />
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {product.room}
                </span>
              </div>
            </div>

            <div className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-[#49202d] transition-all">
              İncele <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
