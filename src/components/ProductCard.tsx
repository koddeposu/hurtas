"use client";

import {
  useDictionary,
  useLocale,
  useLocalizedPath,
} from "@/components/i18n-provider";
import {
  getLocalizedImageAlt,
  getLocalizedProductMetaDescription,
  getLocalizedProductName,
} from "@/lib/i18n";
import type { RouteCategory } from "@/lib/productRoutes";
import {
  getCategoryDisplayName,
  getProductCategoryDetailHref,
  getProductDetailHref,
} from "@/lib/productRoutes";
import { DBProduct, Product } from "@/types/product";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProduct = DBProduct | Product;

function isDBProduct(product: ProductCardProduct): product is DBProduct {
  return "images" in product;
}

export const ProductCard = ({
  product,
  bestseller,
  fullscreenChange,
  categories = [],
}: {
  bestseller?: boolean;
  fullscreenChange: () => void;
  product: ProductCardProduct;
  categories?: RouteCategory[];
}) => {
  const locale = useLocale();
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();
  const productName = isDBProduct(product)
    ? getLocalizedProductName(product, locale)
    : product.name;
  const images = isDBProduct(product)
    ? product.images.map((img) => ({
        src: img.url,
        alt: getLocalizedImageAlt(img, locale),
      }))
    : product.img.map((img) => ({
        src: typeof img.src === "string" ? `/product/${img.src}` : img.src,
        alt: img.alt,
      }));

  const categoryName = isDBProduct(product)
    ? product.category
      ? getCategoryDisplayName(product.category, locale)
      : undefined
    : product.category;
  const categoryLabel = categoryName?.toLocaleLowerCase("tr-TR");

  const detailSlug = isDBProduct(product)
    ? product.slug
    : `${product.slug}-${product.id}`;
  const detailHref = isDBProduct(product)
    ? getProductCategoryDetailHref(product, categories)
    : getProductDetailHref(detailSlug);

  const coverImage = images[0];
  const coverAlt = coverImage?.alt?.trim() || productName;
  const metaDescription =
    isDBProduct(product)
      ? getLocalizedProductMetaDescription(product, locale)
      : "metaDescription" in product && typeof product.metaDescription === "string"
        ? product.metaDescription
        : "";
  const cardDescription = metaDescription.trim() || null;

  return (
    <Link
      href={localizedPath(detailHref)}
      prefetch={false}
      className="group flex w-full flex-col justify-between overflow-hidden rounded-[3px] border border-slate-300 bg-white text-left shadow-[0_16px_34px_-28px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-[0_22px_44px_-28px_rgba(15,23,42,0.18)]"
    >
      <div className="relative overflow-hidden">
        <div className="relative aspect-video w-full bg-slate-100">
          {coverImage ? (
            <>
              <Image
                src={coverImage.src}
                alt={coverAlt}
                fill
                quality={75}
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
                aria-label={dict.products.imageZoom}
                className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-[2px] bg-black/35 text-white transition-all duration-200 hover:scale-105"
              >
                <Maximize2 size={18} className="text-white" />
              </button>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-sm text-slate-400">
                {dict.common.noImage}
              </span>
            </div>
          )}

          {bestseller ? (
            <div className="absolute left-4 top-4 z-10 rounded-[2px] bg-[#d6a94a] px-3 py-1 text-[9px] font-black uppercase tracking-widest text-[#152f51] shadow-sm">
              {dict.products.bestseller}
            </div>
          ) : null}
        </div>
      </div>

      <div className="cursor-pointer px-5 pt-4">
        {categoryLabel ? (
          <p className="mb-2 text-[11px] font-black tracking-[0.14em] text-[#6f839d]">
            {categoryLabel}
          </p>
        ) : null}

        <h3 className="mb-1.5 text-lg font-black text-slate-900 transition-colors duration-200 group-hover:text-[#152f51]">
          {productName}
        </h3>

        {cardDescription ? (
          <p className="mb-3 line-clamp-2 text-sm leading-6 text-slate-600">
            {cardDescription}
          </p>
        ) : null}
      </div>

      <div className="px-5 pb-5">
        <div className="mt-2 flex w-full items-center justify-center gap-2 rounded-[2px] bg-[#152f51] py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 group-hover:bg-[#10243d]">
          {dict.common.inspect} <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
};
