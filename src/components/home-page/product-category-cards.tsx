import { ArrowUpRight, Building2, Layers3, ShieldCheck } from "lucide-react";
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
              className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-2 hover:border-slate-200 hover:shadow-[0_28px_70px_-38px_rgba(22,91,57,0.45)] lg:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4.5 w-4.5 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-secondary" />
              </div>

              <h2 className="mt-4 text-lg font-black tracking-tight text-slate-900 lg:text-xl">
                {item.title}
              </h2>

              <p className="mt-2.5 text-sm font-medium leading-6 text-slate-500">
                {item.description}
              </p>

              <div className="mt-4 text-[10px] font-black uppercase tracking-[0.16em] text-secondary">
                Ürünleri İncele
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
