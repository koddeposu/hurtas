import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { ArrowUpRight, Home, Ruler } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageSlider } from './ImageSlider';

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  const goDetail = () => {
    router.push(`/urun-detay/${product.slug}-${product.id}`);
  };

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={goDetail}
      className="group w-full text-left bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      {/* SLIDER */}
      <div
        className="relative rounded-tr-[2rem] rounded-tl-[2rem] overflow-hidden mb-6"
        onClick={(e) => e.stopPropagation()} // ⭐ slider tıklamasını iptal eder
      >
        {product?.img && (
          <ImageSlider
            showActiveColor="bg-secondary"
            showDots
            images={product.img}
            height="aspect-video"
          />
        )}

        {product.bestseller && (
          <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
            <span className="text-[9px] font-black text-white uppercase tracking-widest">
              Çok Satan
            </span>
          </div>
        )}

        <div className="absolute right-4 top-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm">
          <span className="text-[9px] font-black text-primary uppercase tracking-widest">
            {product.cat}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 pb-6">
        <h3 className="text-xl font-black text-slate-900 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <p className="text-lg font-bold text-secondary">
            {product.price.toLocaleString('tr-TR')} ₺
          </p>
          {product.oldPrice && (
            <p className="text-md font-bold text-slate-500 line-through">
              {product.oldPrice.toLocaleString('tr-TR')} ₺
            </p>
          )}
        </div>

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
    </motion.button>
  );
};
