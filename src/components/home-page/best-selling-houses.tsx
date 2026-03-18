import { DBProductPreview } from "@/types/product";
import Link from "next/link";
import { HomeProductCard } from "./home-product-card";

interface BestSellingHousesProps {
  favorites: DBProductPreview[];
}

export function BestSellingHouses({ favorites }: BestSellingHousesProps) {
  return (
    <section className="overflow-hidden font-[family-name:var(--font-poppins)]">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row lg:mb-12 lg:items-end">
          <div className="max-w-xl">
            <h2
              className="text-2xl font-black leading-none tracking-tighter md:text-4xl"
              style={{ color: "#165b39" }}
            >
              EN ÇOK TERCİH EDİLEN <br />
              <span style={{ color: "#49202d" }}>PREFABRİK EVLERİMİZ</span>
            </h2>
            <div
              className="mt-5 h-1 w-16 rounded-full"
              style={{ backgroundColor: "#165b39" }}
            />
          </div>

          <p className="max-w-xs text-sm font-medium uppercase tracking-[0.16em] text-slate-600 md:text-right">
            Yüzlerce aileye yuva olan, en çok incelenen prefabrik ev
            modellerimiz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((product) => (
            <HomeProductCard
              key={product.id}
              product={product}
              badge="Çok Tercih Edilen"
            />
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/prefabrik-evler"
            prefetch={false}
            className="cursor-pointer text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 transition-colors hover:text-[#49202d]"
          >
            Tüm Modelleri Keşfedin
          </Link>
        </div>
      </div>
    </section>
  );
}
