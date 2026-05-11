"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  useDictionary,
  useLocalizedPath,
} from "@/components/i18n-provider";
import { ZoomableImage } from "@/components/ZoomableImage";
import { handleCall, handleWhatsApp } from "@/lib/analytics/googleAds";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ProjectGalleryModal } from "./ModalSliderImage";

// DB Product type for detail page
interface DBProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

interface DetailProduct {
  id: string;
  name: string;
  slug: string;
  area: string;
  room: string;
  floor: string;
  bath: string;
  height: string;
  price: string | null;
  oldPrice: string | null;
  description: string | null;
  metaDescription: string | null;
  images: DBProductImage[];
}

interface ProductPageClientProps {
  product: DetailProduct;
  detailBlocks?: ProductDetailRenderBlock[];
  descriptionText?: string | null;
  relatedProducts?: RelatedProduct[];
  relatedTitle?: string;
}

interface ProductImageProps {
  product: DetailProduct;
}

interface RelatedProduct {
  id: string;
  href: string;
  slug: string;
  name: string;
  area: string;
  room: string;
  price: string | null;
  oldPrice: string | null;
  categoryName: string | null;
  metaDescription: string | null;
  image: {
    url: string;
    alt: string;
  } | null;
}

type ProductDetailRenderBlock =
  | {
      id: string;
      type: "description";
      html: string | null;
      text: string;
    }
  | {
      id: string;
      type: "table";
      title: string;
      headers: string[];
      rows: string[][];
    };

export function ProductImage({ product }: ProductImageProps) {
  const dict = useDictionary();
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = useState<DetailProduct | null>(
    null,
  );

  const getImageAlt = (alt: string, index: number) =>
    alt?.trim() ? alt : `${product.name} - ${index + 1}`;

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <>
      <ProjectGalleryModal
        projects={
          selectedProduct
            ? selectedProduct.images.map((imageItem, i) => ({
                id: i,
                img: imageItem.url,
                title: getImageAlt(imageItem.alt, i),
              }))
            : []
        }
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <div className="relative">
        <div className="relative group">
          <Carousel
            setApi={setApi}
            className="w-full overflow-hidden rounded-[3px] border border-slate-200 bg-slate-100 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.55)]"
          >
            <CarouselContent>
              {product.images.map((item, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div
                    className="relative aspect-video w-full"
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                  >
                    <ZoomableImage
                      src={item.url}
                      alt={getImageAlt(item.alt, index)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Yakınlaştırma İkonu */}
          <button
            onClick={() => setSelectedProduct(product)}
            className="absolute top-4 right-4 z-30 rounded-[2px] bg-white/95 p-2 text-[#152f51] shadow transition-all hover:bg-white"
            aria-label={dict.productDetail.imageZoom}
          >
            <ZoomIn className="h-5 w-5" />
          </button>

          {product.images.length > 1 && (
            <div className="absolute bottom-4 z-20 flex w-full justify-center gap-2">
              {product.images.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  animate={{
                    width: current === index ? 22 : 10,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`h-2.5 rounded-full cursor-pointer ${
                    current === index ? "bg-[#d6a94a]" : "bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="relative mt-4 flex items-center gap-2 overflow-x-auto pb-1">
            {product.images.map((item, index) => (
              <button
                key={index}
                type="button"
                className={`overflow-hidden rounded-[3px] border transition-all ${
                  current === index
                    ? "border-[#d6a94a] ring-1 ring-[#d6a94a]/35"
                    : "border-slate-200"
                }`}
                onClick={() => api?.scrollTo(index)}
                onContextMenu={handleContextMenu}
              >
                <Image
                  src={item.url}
                  alt={getImageAlt(item.alt, index)}
                  width={90}
                  height={90}
                  draggable={false}
                  className="h-16 w-16 min-w-16 cursor-pointer select-none object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function ProductActions() {
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();

  return (
    <div className="mt-5">
      <div className="hidden gap-3 md:flex">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[2px] bg-[#d6a94a] px-5 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#bf943b] ads-whatsapp"
        >
          <MessageCircle className="h-5 w-5" />
          {dict.common.whatsapp}
        </button>
        <Link
          href={localizedPath("/iletisim")}
          prefetch={false}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[2px] bg-[#152f51] px-5 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#0d1f36] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a94a] focus-visible:ring-offset-2 ads-contact"
        >
          {dict.common.contact}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:hidden">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[2px] bg-[#d6a94a] px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#bf943b] ads-whatsapp"
        >
          <MessageCircle className="h-5 w-5" />
          {dict.common.whatsapp}
        </button>
        <button
          type="button"
          onClick={handleCall}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[2px] bg-[#152f51] px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#0d1f36] ads-phone-call"
        >
          <Phone className="h-5 w-5" />
          {dict.productDetail.callUs}
        </button>
      </div>
    </div>
  );
}

function TrustFeatures() {
  const dict = useDictionary();
  const items = dict.productDetail.trust;

  return (
    <div className="mt-6 grid gap-3 border-y border-slate-200 py-5">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-slate-700"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#152f51]" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ProductDescription({
  detailBlocks = [],
  descriptionText,
}: {
  detailBlocks?: ProductDetailRenderBlock[];
  descriptionText?: string | null;
}) {
  const dict = useDictionary();

  if (detailBlocks.length === 0 && !descriptionText) return null;

  return (
    <div className="mt-8 md:mt-10">
      <div className="mb-4 inline-flex items-center gap-2 rounded-[2px] border border-slate-200 bg-white px-3 py-1.5">
        <span className="h-2 w-2 rounded-[1px] bg-[#d6a94a]" />
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#152f51]">
          {dict.productDetail.info}
        </span>
      </div>
      <h2 className="text-xl font-black tracking-tight text-slate-900 md:text-3xl">
        {dict.productDetail.descriptionTitle}
      </h2>
      {detailBlocks.length > 0 ? (
        <div className="mt-5 space-y-8">
          {detailBlocks.map((block) =>
            block.type === "description" ? (
              block.html ? (
                <div
                  key={block.id}
                  className="blog-content product-content max-w-4xl text-sm text-slate-700 md:text-base"
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              ) : (
                <p
                  key={block.id}
                  className="max-w-4xl whitespace-pre-line text-sm leading-relaxed text-slate-700 md:text-base"
                >
                  {block.text}
                </p>
              )
            ) : (
              <div key={block.id} className="max-w-5xl">
                {block.title ? (
                  <h3 className="mb-3 text-lg font-black tracking-tight text-slate-900 md:text-2xl">
                    {block.title}
                  </h3>
                ) : null}
                <div className="overflow-x-auto rounded-[3px] border border-slate-200 bg-white">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead className="bg-[#152f51] text-white">
                      <tr>
                        {block.headers.map((header, index) => (
                          <th
                            key={`${block.id}-header-${index}`}
                            className="border-r border-white/15 px-4 py-3 font-black"
                          >
                            {header || "-"}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr
                          key={`${block.id}-row-${rowIndex}`}
                          className="border-t border-slate-200 odd:bg-slate-50/70"
                        >
                          {block.headers.map((_, columnIndex) => (
                            <td
                              key={`${block.id}-cell-${rowIndex}-${columnIndex}`}
                              className="border-r border-slate-200 px-4 py-3 text-slate-700 last:border-r-0"
                            >
                              {row[columnIndex] || "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <p className="mt-4 max-w-4xl whitespace-pre-line text-sm leading-relaxed text-slate-700 md:text-base">
          {descriptionText}
        </p>
      )}
    </div>
  );
}

function RelatedProductCard({ product }: { product: RelatedProduct }) {
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();

  return (
    <Link
      href={localizedPath(product.href)}
      prefetch={false}
      className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-slate-300 bg-white shadow-[0_16px_38px_-32px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-400 hover:shadow-[0_24px_52px_-30px_rgba(15,23,42,0.3)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt?.trim() || product.name}
            fill
            quality={75}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 48vw"
          />
        ) : null}

        {product.categoryName ? (
          <div className="absolute right-4 top-4 rounded-[2px] border border-slate-200/80 bg-white/92 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#152f51] shadow-sm backdrop-blur">
            {product.categoryName}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base md:text-lg font-black leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#152f51]">
          {product.name}
        </h3>

        {product.metaDescription ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {product.metaDescription}
          </p>
        ) : null}

        <div className="mt-auto inline-flex items-center gap-2 pt-5 text-[11px] font-black uppercase tracking-[0.14em] text-[#152f51]">
          {dict.common.inspect}
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function RelatedProductsSlider({
  title,
  products,
}: {
  title?: string;
  products: RelatedProduct[];
}) {
  const dict = useDictionary();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  React.useEffect(() => {
    if (!api) return;

    const updateState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelectedIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };

    updateState();
    api.on("select", updateState);
    api.on("reInit", updateState);

    return () => {
      api.off("select", updateState);
      api.off("reInit", updateState);
    };
  }, [api]);

  if (!products.length) return null;

  return (
    <section className="font-[family-name:var(--font-poppins)]">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900">
          {title || dict.productDetail.relatedDefault}
        </h2>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="absolute -left-7 md:-left-10 top-1/2 z-20 inline-flex -translate-y-1/2 items-center justify-center text-black transition-colors hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:scale-110"
          aria-label={dict.productDetail.relatedPrev}
        >
          <ChevronLeft
            className="w-14 h-14 lg:w-20 lg:h-20"
            strokeWidth={0.8}
          />
        </button>

        <button
          type="button"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="absolute -right-7 md:-right-10 top-1/2 z-20 inline-flex -translate-y-1/2 items-center justify-center text-slate-700 transition-colors hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:scale-110"
          aria-label={dict.productDetail.relatedNext}
        >
          <ChevronRight
            className="w-14 h-14 lg:w-20 lg:h-20"
            strokeWidth={0.8}
          />
        </button>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
          }}
          className="w-full px-6 sm:px-8"
        >
          <CarouselContent>
            {products.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <RelatedProductCard product={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {snapCount > 1 ? (
          <div
            className="mt-5 flex items-center justify-center gap-2 md:hidden"
            aria-hidden="true"
          >
            {Array.from({ length: snapCount }).map((_, index) => (
              <span
                key={`related-dot-${index}`}
                className={`block h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function ProductPageClient({
  product,
  detailBlocks,
  descriptionText,
  relatedProducts = [],
  relatedTitle,
}: ProductPageClientProps) {
  const dict = useDictionary();
  const shortDescription = product.metaDescription || descriptionText;

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <section className="pt-8 pb-12 lg:pt-14">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <ProductImage product={product} />
            </div>

            <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-[2px] border border-slate-200 bg-white px-3 py-1.5">
                <span className="h-2 w-2 rounded-[1px] bg-[#d6a94a]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#152f51]">
                  {dict.common.companyName}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-4xl xl:text-5xl">
                {product.name}
              </h1>

              {shortDescription ? (
                <p className="mt-4 line-clamp-5 text-sm leading-7 text-slate-600 [text-wrap:pretty] md:text-base">
                  {shortDescription}
                </p>
              ) : null}

              <ProductActions />
              <TrustFeatures />
            </aside>
          </div>

          <ProductDescription
            detailBlocks={detailBlocks}
            descriptionText={descriptionText}
          />
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="bg-white pb-16 pt-2">
          <div className="container mx-auto max-w-7xl">
            <RelatedProductsSlider
              title={relatedTitle}
              products={relatedProducts}
            />
          </div>
        </section>
      ) : null}
    </main>
  );
}
