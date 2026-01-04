"use client";
import AboutHero from '@/components/about-hero';
import FAQ from '@/components/faq';
import { Interactive } from '@/components/Interactive';
import { MissionVision } from '@/components/mission-vision';
import { Referans } from '@/components/referans';
import { Stats } from '@/components/stats';

export default function AboutPageClient() {
  return (
    <main className="min-h-screen bg-white">
      <div>
        <section className="flex justify-center mt-24 md:mt-40">
          <div className="max-w-[1280px] w-full">
            <AboutHero />
          </div>
        </section>

        <section className="flex justify-center mt-20 md:mt-10">
          <div className="max-w-[1280px] w-full">
            <Referans />
          </div>
        </section>

        <section className="flex justify-center mt-20 md:mt-40">
          <div className="max-w-[1280px] w-full">
            <Interactive />
          </div>
        </section>

        <section className="flex justify-center mt-28 lg:mt-54">
          <div className="max-w-[1280px] w-full">
            <MissionVision />
          </div>
        </section>

        <section className="flex justify-center pb-10 mt-14 md:mt-40">
          <div className="max-w-[1280px] w-full">
            <Stats />
          </div>
        </section>

        <section className="flex justify-center mt-14 md:mt-40">
          <div className="max-w-[1280px] w-full">
            <FAQ />
          </div>
        </section>
      </div>
    </main>
  );
}
