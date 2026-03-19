import { DBProduct, Product } from "@/types/product";
import { ArrowUpRight, Home, Images, Maximize2, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const formatPrice = (price: string | null | undefined) => {
  if (!price || price === "null") return null;
  return new Intl.NumberFormat("tr-TR").format(Number(price));
};

type ProductCardProduct = DBProduct | Product;

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
  const images = isDBProduct(product)
    ? product.images.map((img) => ({ src: img.url, alt: img.alt }))
    : product.img.map((img) => ({
        src: typeof img.src === "string" ? `/product/${img.src}` : img.src,
        alt: img.alt,
      }));

  const categoryName = isDBProduct(product)
    ? product.category?.name
    : product.category;

  const detailSlug = isDBProduct(product)
    ? product.slug
    : `${product.slug}-${product.id}`;

  const coverImage = images[0];

  if (!coverImage) {
    return null;
  }

  return (
    <Link
      href={`/urun-detay/${detailSlug}`}
      prefetch={false}
      className="group flex w-full flex-col justify-between overflow-hidden rounded-[1rem] border border-slate-300 bg-white text-left shadow-[0_16px_34px_-28px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-[0_22px_44px_-28px_rgba(15,23,42,0.18)]"
    >
      <div className="relative overflow-hidden rounded-tl-[1rem] rounded-tr-[1rem]">
        <div className="relative aspect-video w-full bg-slate-100">
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            fill
            quality={52}
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 94vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            draggable={false}
          />

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              fullscreenChange();
            }}
            aria-label="Ürün görselini büyüt"
            className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-md bg-black/35 text-white transition-all duration-200 hover:scale-105"
          >
            <Maximize2 size={18} className="text-white" />
          </button>

          {bestseller ? (
            <div className="absolute left-4 top-4 z-10 rounded-lg bg-red-600/90 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-sm">
              Çok Satan
            </div>
          ) : null}

          {categoryName ? (
            <div className="absolute right-4 top-4 z-10 rounded-lg border border-slate-200/80 bg-white/92 px-4 py-1 text-[9px] font-black uppercase tracking-widest text-primary shadow-sm backdrop-blur">
              {categoryName}
            </div>
          ) : null}

          {images.length > 1 ? (
            <div className="absolute left-4 bottom-4 z-10 inline-flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white/92 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-700 shadow-sm backdrop-blur">
              <Images className="h-3.5 w-3.5 text-secondary" />
              {images.length} Görsel
            </div>
          ) : null}
        </div>
      </div>

      <div className="cursor-pointer px-5 pt-4">
        <h3 className="mb-1.5 text-lg font-black text-slate-900 transition-colors duration-200 group-hover:text-primary">
          {product.name}
        </h3>

        {product.price ? (
          <div className="mb-3 flex items-center gap-2">
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
      </div>

      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-[#49202d]">
              <Ruler size={14} />
            </div>
            <span className="text-xs font-bold text-slate-500">
              {product.area} m<sup>2</sup>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-[#49202d]">
              <Home size={14} />
            </div>
            <span className="text-xs font-bold text-slate-500">
              {product.room}
            </span>
          </div>
        </div>

        <div className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 group-hover:bg-primary">
          İncele <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
};
