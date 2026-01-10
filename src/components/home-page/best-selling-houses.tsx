"use client";
import { DBProduct } from "@/types/product";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProjectGalleryModal } from "../ModalSliderImage";
import { ProductCard } from "../ProductCard";

interface BestSellingHousesProps {
  favorites: DBProduct[];
}

export const BestSellingHouses = ({ favorites }: BestSellingHousesProps) => {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<DBProduct | null>(
    null,
  );

  return (
    <>
      <ProjectGalleryModal
        projects={
          selectedProduct
            ? selectedProduct.images.map((image, i) => ({
                id: i,
                img: image.url,
                title: image.alt,
              }))
            : []
        }
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <section className="font-[family-name:var(--font-poppins)] overflow-hidden">
        <div className="container mx-auto">
          {/* Başlık Alanı */}
          <div className="flex flex-col md:flex-row justify-between lg:items-end mb-10 lg:mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="max-w-xl"
            >
              <h2
                className="text-3xl md:text-5xl font-black tracking-tighter leading-none"
                style={{ color: "#165b39" }}
              >
                EN ÇOK TERCİH EDİLEN <br />
                <span style={{ color: "#49202d" }}>PREFABRİK EVLERİMİZ</span>
              </h2>
              <div
                className="w-20 h-1 mt-6 rounded-full"
                style={{ backgroundColor: "#165b39" }}
              />
            </motion.div>

            <p className="text-slate-400 font-medium text-sm md:text-right max-w-xs uppercase tracking-widest">
              Yüzlerce aileye yuva olan, en çok tercih edilen prefabrik ev
              modellerimiz.
            </p>
          </div>

          {/* Kartlar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {favorites.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  bestseller
                  fullscreenChange={() => setSelectedProduct(product)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Tümünü Gör Butonu (Opsiyonel) */}
          <div className="mt-5 text-center">
            <button
              className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-300 hover:text-[#49202d] transition-colors cursor-pointer"
              onClick={() => router.push("/prefabrik-evler")}
            >
              TÜM MODELLERİ KEŞFEDİN
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
