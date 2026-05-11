import ArgeImage1 from "@/assets/arge/1.jpg";
import ArgeImage2 from "@/assets/arge/2.jpg";
import ArgeImage3 from "@/assets/arge/3.jpg";
import ArgeImage4 from "@/assets/arge/4.jpg";
import { RandomProductsSliderSection } from "@/components/random-products-slider-section";
import {
  getDictionary,
  getMetadataAlternates,
  localizePath,
} from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.seo.argeTitle,
    description: dict.seo.argeDescription,
    alternates: getMetadataAlternates("/arge", locale),
  };
}

const ARGE_IMAGES = [
  {
    src: ArgeImage1,
  },
  {
    src: ArgeImage2,
  },
  {
    src: ArgeImage3,
  },
  {
    src: ArgeImage4,
  },
];

export default async function ArgePage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="border-y border-slate-200 bg-[#f6f8fb] px-4 py-6 sm:px-5 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#d6a94a]" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
              {dict.argePage.eyebrow}
            </span>
          </div>
          <h2 className="mt-3 max-w-3xl text-2xl font-black tracking-tight text-[#152f51] sm:text-3xl">
            {dict.argePage.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600">
            {dict.argePage.description}
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {ARGE_IMAGES.map((image, index) => (
            <div
              key={`arge-image-${index}`}
              className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-slate-100"
            >
              <Image
                src={image.src}
                alt={dict.argePage.imageAlts[index]}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </section>

        <section className="mt-8 border-y border-slate-200 bg-white py-8 lg:grid lg:grid-cols-[0.7fr_1.3fr] lg:gap-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
              {dict.argePage.approachEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#152f51]">
              {dict.argePage.approachTitle}
            </h2>
          </div>
          <div className="mt-5 space-y-5 text-sm font-medium leading-7 text-slate-600 lg:mt-0">
            {dict.argePage.paragraphs.slice(0, 3).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <ul className="space-y-3">
              {dict.argePage.focus.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#152f51]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p>{dict.argePage.paragraphs[3]}</p>
          </div>
        </section>

        <section className="mt-8 border border-slate-200 bg-[#0d1f36] p-5 text-white sm:p-6 lg:flex lg:items-center lg:justify-between lg:gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
              {dict.argePage.supportEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              {dict.argePage.supportTitle}
            </h2>
          </div>
          <Link
            href={localizePath("/iletisim", locale)}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-[2px] bg-[#d6a94a] px-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#152f51] transition-colors hover:bg-[#bf943b] lg:mt-0"
          >
            {dict.argePage.cta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        <RandomProductsSliderSection />
      </div>
    </main>
  );
}
