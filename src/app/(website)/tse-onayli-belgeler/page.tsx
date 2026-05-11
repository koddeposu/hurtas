import {
  ArrowUpRight,
  ClipboardCheck,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import TSEImage1 from "@/assets/tse/1.jpg";
import TSEImage2 from "@/assets/tse/2.jpg";
import TSEImage3 from "@/assets/tse/3.jpg";
import TSEImage4 from "@/assets/tse/4.jpg";
import TSEImage5 from "@/assets/tse/5.jpg";
import TSEImage6 from "@/assets/tse/6.jpg";
import TSEImage7 from "@/assets/tse/7.jpg";
import { RandomProductsSliderSection } from "@/components/random-products-slider-section";
import {
  formatMessage,
  getDictionary,
  getMetadataAlternates,
  localizePath,
} from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.seo.tseTitle,
    description: dict.seo.tseDescription,
    alternates: getMetadataAlternates("/tse-onayli-belgeler", locale),
  };
}

const DOCUMENT_ITEMS = [
  {
    icon: FileCheck2,
  },
  {
    icon: ClipboardCheck,
  },
  {
    icon: ShieldCheck,
  },
];

const TSE_IMAGES = [
  {
    src: TSEImage1,
  },
  {
    src: TSEImage2,
  },
  {
    src: TSEImage3,
  },
  {
    src: TSEImage4,
  },
  {
    src: TSEImage5,
  },
  {
    src: TSEImage6,
  },
  {
    src: TSEImage7,
  },
];

export default async function TSEDocumentsPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="border-y border-slate-200 bg-[#f6f8fb] px-4 py-6 sm:px-5 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#d6a94a]" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
              {dict.tsePage.eyebrow}
            </span>
          </div>
          <h2 className="mt-3 max-w-3xl text-2xl font-black tracking-tight text-[#152f51] sm:text-3xl">
            {dict.tsePage.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600">
            {dict.tsePage.description}
          </p>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TSE_IMAGES.map((image, index) => (
            <div
              key={`tse-image-${index}`}
              className="relative aspect-[3/4] overflow-hidden rounded-[3px] border border-slate-200 bg-white p-3 shadow-[0_16px_34px_-30px_rgba(15,23,42,0.18)]"
            >
              <Image
                src={image.src}
                alt={formatMessage(dict.tsePage.imageAlt, {
                  index: index + 1,
                })}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-3"
              />
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {DOCUMENT_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const content = dict.tsePage.items[index] ?? dict.tsePage.items[0];

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

        <section className="mt-8 border border-slate-200 bg-[#0d1f36] p-5 text-white sm:p-6 lg:flex lg:items-center lg:justify-between lg:gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
              {dict.tsePage.requestEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              {dict.tsePage.requestTitle}
            </h2>
          </div>
          <Link
            href={localizePath("/iletisim", locale)}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-[2px] bg-[#d6a94a] px-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#152f51] transition-colors hover:bg-[#bf943b] lg:mt-0"
          >
            {dict.tsePage.cta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        <RandomProductsSliderSection />
      </div>
    </main>
  );
}
