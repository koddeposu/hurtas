import { ArrowUpRight, HelpCircle } from "lucide-react";
import Link from "next/link";

export interface SeoFaqItem {
  question: string;
  answer: string;
}

interface SeoFaqSectionProps {
  title: string;
  accent?: string;
  description: string;
  items: readonly SeoFaqItem[];
  ctaHref?: string;
  ctaLabel?: string;
}

export function SeoFaqSection({
  title,
  accent,
  description,
  items,
  ctaHref = "/iletisim",
  ctaLabel = "Teklif Alın",
}: SeoFaqSectionProps) {
  return (
    <section className="font-[family-name:var(--font-poppins)]">
      <div className="rounded-[1rem] border border-slate-300 bg-[#f8f7f3] p-5 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.18)] md:p-7 lg:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-300/80 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg border border-secondary/20 bg-secondary/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
              <HelpCircle className="h-4 w-4" />
              Sıkça Sorulan Sorular
            </div>
            <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
              {title}
              {accent ? (
                <>
                  <br />
                  <span className="text-primary">{accent}</span>
                </>
              ) : null}
            </h2>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600">
              {description}
            </p>
          </div>

          <Link
            href={ctaHref}
            prefetch={false}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <details
              key={item.question}
              className="group h-fit self-start rounded-[0.9rem] border border-slate-300 bg-white p-5 transition-all duration-300 open:border-slate-400 open:shadow-[0_18px_38px_-28px_rgba(15,23,42,0.18)]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-secondary">
                    Soru {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-base font-black leading-6 tracking-tight text-slate-900">
                    {item.question}
                  </h3>
                </div>
                <span className="mt-1 text-lg font-black text-primary transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 border-t border-slate-200 pt-4 text-sm font-medium leading-7 text-slate-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
