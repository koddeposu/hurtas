import { ArrowUpRight, ChevronDown, HelpCircle } from "lucide-react";
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
    <section aria-labelledby="faq-heading" className="mx-auto max-w-7xl ">
      {/* Üst Alan: Başlık ve Açıklama */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
          <HelpCircle className="h-4 w-4" />
          Sıkça Sorulan Sorular
        </div>

        <h2
          id="faq-heading"
          className="mt-6 text-2xl font-black tracking-tight text-slate-900 md:text-4xl "
        >
          {title} {accent && <span className="text-primary">{accent}</span>}
        </h2>

        <p className="mt-4 text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Sorular Listesi - 2 Kolonlu, Kutusuz, İnce Çizgili */}
      <div className="grid items-start gap-x-8 gap-y-6 md:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
        {items.map((item) => (
          <details
            key={item.question}
            className="group border-b border-slate-200 pb-4 transition-colors"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-2 pr-2 marker:hidden">
              <h3 className="mt-1 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary">
                {item.question}
              </h3>

              {/* Dönen Ok İkonu */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-300 group-open:rotate-180 group-open:bg-primary group-open:text-white">
                <ChevronDown className="h-4 w-4" />
              </div>
            </summary>

            {/* Cevap Metni */}
            <div className="pr-12 pt-2 pb-4">
              <p className="text-sm leading-relaxed text-slate-600">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>

      {/* Alt Aksiyon Butonu */}
      <div className="mt-16 flex justify-center">
        <Link
          href={ctaHref}
          prefetch={false}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4.5 w-4.5" />
        </Link>
      </div>
    </section>
  );
}
