import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const SUPPLY_ITEMS = ["Standart üretim", "Net ürün seçimi", "Planlı sevkiyat"];

export function ProjectSupplyPower() {
  return (
    <section
      aria-labelledby="project-supply-power-heading"
      className="hidden md:flex justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-[1280px] rounded-[3px] border border-slate-200 bg-[#f6f8fb] px-4 py-4 sm:px-5 lg:flex lg:items-center lg:justify-between lg:gap-6">
        <div>
          <h2
            id="project-supply-power-heading"
            className="text-xl font-black tracking-tight text-[#152f51] sm:text-2xl"
          >
            Projeye hazır beton ürünleri.
          </h2>

          <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            İhtiyacınıza uygun ürün, adet ve sevkiyat planını hızlıca
            netleştiriyoruz.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 lg:mt-0 lg:justify-end">
          {SUPPLY_ITEMS.map((item) => (
            <span
              key={item}
              className="inline-flex h-9 items-center gap-2 rounded-[2px] border border-slate-300 bg-white px-3 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[#d6a94a]" />
              {item}
            </span>
          ))}

          <Link
            href="/iletisim"
            prefetch={false}
            className="inline-flex h-9 items-center gap-2 rounded-[2px] bg-[#152f51] px-4 text-[11px] font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#10243d]"
          >
            Teklif Al
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
