import AboutImage from "@/assets/hakkimizda-3.webp";
import { SiteDroneVideo } from "@/components/home-page/site-drone-video";
import { getDictionary } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import Image from "next/image";

const STATS = [
  { value: "1986" },
  { value: "40+" },
  { value: "100+" },
];

export default async function AboutPageClient() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const brandSlots = Array.from({ length: 6 }, () => dict.about.brandSlot);

  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase text-[#d6a94a]">
                {dict.about.eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-[#152f51] sm:text-4xl">
                {dict.about.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-slate-600">
                {dict.about.intro}
              </p>
            </div>

            <div className="relative min-h-[260px] overflow-hidden border border-slate-200 bg-slate-100">
              <Image
                src={AboutImage}
                alt={dict.about.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <section className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
            <div>
              <h2 className="text-2xl font-black text-[#152f51]">
                {dict.about.companyTitle}
              </h2>
              <div className="mt-4 h-1 w-16 bg-[#d6a94a]" />
            </div>

            <div className="space-y-4">
              {dict.about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm font-medium leading-7 text-slate-600 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="border border-slate-200 p-6">
              <h2 className="text-xl font-black text-[#152f51]">
                {dict.about.missionTitle}
              </h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                {dict.about.mission}
              </p>
            </article>

            <article className="border border-slate-200 p-6">
              <h2 className="text-xl font-black text-[#152f51]">
                {dict.about.visionTitle}
              </h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                {dict.about.vision}
              </p>
            </article>
          </section>

          <section className="mt-12 border-y border-slate-200 bg-[#f8fafc] px-5 py-8 sm:px-7">
            <h2 className="text-2xl font-black text-[#152f51]">
              {dict.about.productsTitle}
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">
              {dict.about.productsText}
            </p>
          </section>
        </div>
      </section>

      <SiteDroneVideo />

      <section className="px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <section className="border border-slate-200 p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase text-[#d6a94a]">
                  {dict.about.experienceEyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#152f51] sm:text-3xl">
                  {dict.about.experienceTitle}
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {STATS.map((item, index) => (
                  <div key={item.value} className="border border-slate-200 p-4">
                    <p className="text-3xl font-black text-[#152f51]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-xs font-bold uppercase text-slate-500">
                      {dict.about.stats[index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12 overflow-hidden border-t border-slate-200 pt-8">
            <div className="mb-5">
              <h2 className="text-2xl font-black text-[#152f51]">
                {dict.about.brandsTitle}
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-500">
                {dict.about.brandsDescription}
              </p>
            </div>

            <div className="overflow-hidden">
              <div className="flex w-max animate-marquee gap-4">
                {[...brandSlots, ...brandSlots].map((slot, index) => (
                  <div
                    key={`${slot}-${index}`}
                    className="flex h-20 w-44 shrink-0 items-center justify-center border border-slate-200 bg-[#f8fafc] text-sm font-black text-slate-400"
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
