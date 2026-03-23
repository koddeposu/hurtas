import { Building2, Layers3, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface ProductCategoryCardsProps {
  items: Array<{
    title: string;
    description: string;
    href: string;
    icon: "single" | "duplex" | "steel";
  }>;
}

const iconMap = {
  single: Building2,
  duplex: Layers3,
  steel: ShieldCheck,
};

export function ProductCategoryCards({ items }: ProductCategoryCardsProps) {
  return (
    <section className="font-[family-name:var(--font-poppins)]">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <Link
              key={item.title}
              href={item.href}
              prefetch={false}
              className="flex items gap-2  group rounded-[0.9rem] border border-slate-300 bg-white p-5 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-400 hover:shadow-[0_24px_48px_-28px_rgba(22,91,57,0.26)] lg:p-6"
            >
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-900 lg:text-xl">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                  {item.description}
                </p>

                <div className="mt-4 text-[12px] font-medium w-fit  tracking-[0.10em] text-white bg-primary rounded-sm py-2 px-3.5">
                  Ürünleri İncele
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
