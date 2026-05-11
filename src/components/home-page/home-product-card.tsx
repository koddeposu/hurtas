"use client";

import {
  useDictionary,
  useLocale,
  useLocalizedPath,
} from "@/components/i18n-provider";
import { DBProductPreview } from "@/types/product";
import {
  getLocalizedImageAlt,
  getLocalizedProductMetaDescription,
  getLocalizedProductName,
} from "@/lib/i18n";
import {
  getCategoryDisplayName,
  getProductCategoryDetailHref,
} from "@/lib/productRoutes";
import type { RouteCategory } from "@/lib/productRoutes";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HomeProductCardProps {
  product: DBProductPreview;
  badge?: string;
  categories?: RouteCategory[];
}

export function HomeProductCard({
  product,
  badge,
  categories = [],
}: HomeProductCardProps) {
  const locale = useLocale();
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();
  const productName = getLocalizedProductName(product, locale);
  const productMetaDescription = getLocalizedProductMetaDescription(
    product,
    locale,
  );
  const categoryLabel = product.category
    ? getCategoryDisplayName(product.category, locale)
    : undefined;

  return (
    <Link
      href={localizedPath(getProductCategoryDetailHref(product, categories))}
      prefetch={false}
      className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-slate-200 bg-white shadow-[0_14px_34px_-30px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d6a94a]/70 hover:shadow-[0_24px_46px_-34px_rgba(21,47,81,0.34)]"
    >
      <div className="h-1 bg-[#d6a94a]" aria-hidden="true" />

      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={getLocalizedImageAlt(product.image, locale) || productName}
            fill
            quality={75}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1280px) 23vw, (min-width: 768px) 46vw, 92vw"
          />
        ) : null}

        <div
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#152f51]/75 to-transparent"
          aria-hidden="true"
        />

        {badge ? (
          <div className="absolute left-3 top-3 rounded-[2px] bg-[#d6a94a] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#152f51] shadow-sm">
            {badge}
          </div>
        ) : null}

        {categoryLabel ? (
          <div className="absolute bottom-3 left-3 rounded-[2px] border border-white/30 bg-white/92 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#152f51] shadow-sm backdrop-blur">
            {categoryLabel}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-black leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#152f51]">
          {productName}
        </h3>

        {productMetaDescription ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {productMetaDescription}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#152f51]">
          <span>{dict.products.cardCta}</span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] bg-[#152f51] text-white transition-colors group-hover:bg-[#d6a94a] group-hover:text-[#152f51]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
