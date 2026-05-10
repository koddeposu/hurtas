import { getCategories } from "@/actions/categoryActions";
import { getProductsPreview } from "@/actions/productActions";
import { getProductCategoryDetailHref } from "@/lib/productRoutes";
import Image from "next/image";
import Link from "next/link";

export async function HeroProductMarquee() {
  const [productResults, categories] = await Promise.all([
    getProductsPreview(undefined, 18),
    getCategories(),
  ]);
  const products = productResults.filter((product) => product.image);

  if (!products.length) {
    return null;
  }

  const marqueeProducts = [...products, ...products];

  return (
    <section
      aria-label="Ürün görselleri"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-slate-200 bg-white"
    >
      <style>{`
        @keyframes product-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .product-marquee-track {
          animation: product-marquee 42s linear infinite;
          will-change: transform;
        }

        .product-marquee-shell:hover .product-marquee-track,
        .product-marquee-shell:focus-within .product-marquee-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .product-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <div className="product-marquee-shell overflow-hidden">
        <div className="product-marquee-track flex w-max gap-2 py-2">
          {marqueeProducts.map((product, index) => {
            const image = product.image;

            if (!image) {
              return null;
            }

            return (
              <Link
                key={`${product.id}-${index}`}
                href={getProductCategoryDetailHref(product, categories)}
                prefetch={false}
                className="group relative h-24 w-40 shrink-0 overflow-hidden border border-slate-200 bg-slate-100 sm:h-28 sm:w-52 lg:h-32 lg:w-60"
                aria-label={`${product.name} ürününü incele`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || product.name}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 208px, 160px"
                  quality={55}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#152f51]/72 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="line-clamp-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                    {product.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
