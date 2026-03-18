import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DBProduct, Product } from "@/types/product";
import { motion } from "framer-motion";
import { ArrowUpRight, Home, Maximize2, Ruler } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const formatPrice = (price: string | null | undefined) => {
  if (!price || price === "null") return null;
  return new Intl.NumberFormat("tr-TR").format(Number(price));
};

// Support both DBProduct (from database) and Product (from mock data)
type ProductCardProduct = DBProduct | Product;

// Helper to check if product is from DB
function isDBProduct(product: ProductCardProduct): product is DBProduct {
  return "images" in product;
}

export const ProductCard = ({
  product,
  bestseller,
  fullscreenChange,
}: {
  bestseller?: boolean;
  fullscreenChange: () => void;
  product: ProductCardProduct;
}) => {
  const router = useRouter();

  // Get images array - handle both formats
  const images = isDBProduct(product)
    ? product.images.map((img) => ({ src: img.url, alt: img.alt }))
    : product.img.map((img) => ({
        src: typeof img.src === "string" ? `/product/${img.src}` : img.src,
        alt: img.alt,
      }));

  // Get category name - handle both formats
  const categoryName = isDBProduct(product)
    ? product.category?.name
    : product.category;

  // Get slug for detail page
  const detailSlug = isDBProduct(product)
    ? product.slug
    : `${product.slug}-${product.id}`;

  const goDetail = () => {
    router.push(`/urun-detay/${detailSlug}`);
  };
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
      className="group flex w-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white text-left shadow-sm transition-all duration-500 hover:shadow-2xl "
    >
      {/* SLIDER */}
      <div className="relative overflow-hidden rounded-tl-[1.75rem] rounded-tr-[1.75rem]">
        <div className="relative">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {images.map((item, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="relative aspect-video w-full bg-slate-100">
                    {/* <img src={item.src} alt={item.alt} /> */}
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover select-none"
                      draggable={false}
                      priority={index === 0}
                    />

                    <button
                      onClick={fullscreenChange}
                      aria-label="Resmi Buyult"
                      className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-md bg-black/30 text-white duration-200 hover:scale-110"
                    >
                      <Maximize2 size={20} className="text-white" />
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* DOTS */}
          {images.length > 1 && (
            <div className="absolute bottom-3 z-20 flex w-full justify-center gap-2">
              {images.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  animate={{
                    width: current === index ? 22 : 8,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`h-2 rounded-full cursor-pointer ${
                    current === index ? "bg-secondary" : "bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className="cursor-pointer"
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

          {categoryName && (
            <div className="absolute right-4 top-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm z-10">
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                {categoryName}
              </span>
            </div>
          )}
          <div className="px-5 pt-4">
            <h3 className="mb-1.5 text-lg font-black text-slate-900">
              {product.name}
            </h3>

            {product.price && (
              <div className="mb-3 flex items-center gap-2">
                <p className="text-base font-bold text-secondary">
                  {formatPrice(product.price)} ₺
                </p>
                {product.oldPrice && (
                  <p className="text-sm font-bold text-slate-500 line-through">
                    {formatPrice(product.oldPrice)} ₺
                  </p>
                )}
              </div>
            )}
          </div>
          {/* CONTENT */}
          <div className="px-5 pb-5">
            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#49202d]">
                  <Ruler size={14} />
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {product.area} m<sup>2</sup>
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

            <div className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all group-hover:bg-primary">
              İncele <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
