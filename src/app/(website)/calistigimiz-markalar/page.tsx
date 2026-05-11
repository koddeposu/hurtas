import { RandomProductsSliderSection } from "@/components/random-products-slider-section";
import {
  getDictionary,
  getMetadataAlternates,
} from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import { Building2, CheckCircle2, Factory, Handshake } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.seo.brandsTitle,
    description: dict.seo.brandsDescription,
    alternates: getMetadataAlternates("/calistigimiz-markalar", locale),
  };
}

const PARTNER_GROUPS = [
  {
    icon: Building2,
  },
  {
    icon: Factory,
  },
  {
    icon: Handshake,
  },
];

export default async function BrandsPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="border-y border-slate-200 bg-[#f6f8fb] px-4 py-6 sm:px-5 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#d6a94a]" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
              {dict.brandsPage.eyebrow}
            </span>
          </div>
          <h2 className="mt-3 max-w-3xl text-2xl font-black tracking-tight text-[#152f51] sm:text-3xl">
            {dict.brandsPage.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600">
            {dict.brandsPage.description}
          </p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {PARTNER_GROUPS.map((item, index) => {
            const Icon = item.icon;
            const content =
              dict.brandsPage.groups[index] ?? dict.brandsPage.groups[0];

            return (
              <article
                key={content.title}
                className="border border-slate-200 bg-white p-5 shadow-[0_16px_34px_-30px_rgba(15,23,42,0.18)]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] bg-[#152f51] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-900">
                  {content.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                  {content.text}
                </p>
              </article>
            );
          })}
        </section>

        <section className="mt-8 border border-slate-200 bg-[#0d1f36] p-5 text-white sm:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {dict.brandsPage.bullets.map(
              (item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#d6a94a]" />
                  <span className="text-sm font-black uppercase tracking-[0.12em]">
                    {item}
                  </span>
                </div>
              ),
            )}
          </div>
        </section>

        <RandomProductsSliderSection />
      </div>
    </main>
  );
}
