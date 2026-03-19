import { DBProductPreview } from "@/types/product";
import { ArrowUpRight, Home, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const formatPrice = (price: string | null | undefined) => {
  if (!price || price === "null") return null;
  return new Intl.NumberFormat("tr-TR").format(Number(price));
};

interface HomeProductCardProps {
  product: DBProductPreview;
  badge?: string;
}

export function HomeProductCard({ product, badge }: HomeProductCardProps) {
  return (
    <Link
      href={`/urun-detay/${product.slug}`}
      prefetch={false}
      className="group flex h-full flex-col overflow-hidden rounded-[1rem] border border-slate-300 bg-white shadow-[0_16px_38px_-32px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-400 hover:shadow-[0_24px_52px_-30px_rgba(15,23,42,0.3)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            quality={50}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 300px, 90vw"
          />
        ) : null}

        {badge ? (
          <div className="absolute left-4 top-4 rounded-lg bg-primary/92 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-sm">
            {badge}
          </div>
        ) : null}

        {product.category?.name ? (
          <div className="absolute right-4 top-4 rounded-lg border border-slate-200/80 bg-white/92 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur">
            {product.category.name}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-black leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-primary">
          {product.name}
        </h3>

        {product.price ? (
          <div className="mt-2 flex items-center gap-2">
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

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <Ruler className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-slate-500">
              {product.area} m<sup>2</sup>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <Home className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-slate-500">
              {product.room}
            </span>
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-secondary">
          İncele
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
