import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { ArrowUpRight, Home, Ruler } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';


// Product Card Component
export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/urun/urun-detay/${product.id}`} className="block">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
      >
        <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
          {product.img && (
            <Image
              src={product.img}
              alt={product.name ?? ""}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
            <span className="text-[9px] font-black text-[#49202d] uppercase tracking-widest">
              {product.cat}
            </span>
          </div>
        </div>

        <div className="px-2 pb-2">
          <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{product.name}</h3>
          <p className="text-lg font-bold text-[#49202d] mb-4">
            {/* {product.price.toLocaleString('tr-TR')} ₺ */}
          </p>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#49202d]">
                <Ruler size={14} />
              </div>
              <span className="text-xs font-bold text-slate-500">{product.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#49202d]">
                <Home size={14} />
              </div>
              <span className="text-xs font-bold text-slate-500">{product.room}</span>
            </div>
          </div>

          <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-[#49202d] transition-all">
            İncele <ArrowUpRight size={14} />
          </button>
        </div>
      </motion.div>
    </Link >
  )
}


