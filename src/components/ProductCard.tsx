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
      className="group w-full flex flex-col justify-between text-left bg-white overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 "
    >
      {/* SLIDER */}
      <div className="relative rounded-tr-[2rem] rounded-tl-[2rem] overflow-hidden">
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover select-none"
                      draggable={false}
                      priority={index === 0}
                    />

                    <button
                      onClick={fullscreenChange}
                      aria-label="Resmi Buyult"
                      className="absolute bottom-4 right-4 text-white bg-black/30 rounded-md w-10 h-10  flex items-center justify-center cursor-pointer hover:scale-110 duration-200"
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
          <div className="px-6 pt-4">
            <h3 className="text-xl font-black text-slate-900 mb-2">
              {product.name}
            </h3>

            {product.price && (
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
            )}
          </div>
          {/* CONTENT */}
          <div className="px-6 pb-6">
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

            <div className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-primary transition-all">
              İncele <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
