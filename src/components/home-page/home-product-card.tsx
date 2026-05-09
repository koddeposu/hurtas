import { DBProductPreview } from "@/types/product";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HomeProductCardProps {
  product: DBProductPreview;
  badge?: string;
}

export function HomeProductCard({ product, badge }: HomeProductCardProps) {
  return (
    <Link
      href={`/prefabrik-ev/${product.slug}`}
      prefetch={false}
      className="group flex h-full flex-col overflow-hidden rounded-[1rem] border border-slate-300 bg-white shadow-[0_16px_38px_-32px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-400 hover:shadow-[0_24px_52px_-30px_rgba(15,23,42,0.3)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            quality={75}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1280px) 23vw, (min-width: 768px) 46vw, 92vw"
          />
        ) : null}

        {badge ? (
          <div className="absolute left-4 top-4 rounded-lg bg-[#d6a94a] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#152f51] shadow-sm">
            {badge}
          </div>
        ) : null}

        {product.category?.name ? (
          <div className="absolute right-4 top-4 rounded-lg border border-slate-200/80 bg-white/92 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#152f51] shadow-sm backdrop-blur">
            {product.category.name}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-black leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#152f51]">
          {product.name}
        </h3>

        {product.metaDescription ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {product.metaDescription}
          </p>
        ) : null}

        <div className="mt-auto inline-flex items-center gap-2 pt-5 text-[11px] font-black uppercase tracking-[0.14em] text-[#152f51]">
          İncele
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
