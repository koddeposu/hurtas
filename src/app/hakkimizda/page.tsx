"use client";
import AboutHero from '@/components/about-hero';
import FAQ from '@/components/faq';
import { Interactive } from '@/components/Interactive';
import { MissionVision } from '@/components/mission-vision';
import Navbar from '@/components/navbar';
import { Referans } from '@/components/referans';
import { Stats } from '@/components/stats';

const About = () => {

  return (
    <main className="min-h-screen bg-white">
      <div>
        <Navbar />
        <section className="flex justify-center mt-20">
          <div className="max-w-[1280px] w-full">
            <AboutHero />
          </div>
        </section>
        <section className="flex justify-center my-5">
          <div className="max-w-[1280px] w-full">
            <Referans />
          </div>
        </section>
        <section className="flex justify-center">
          <div className="max-w-[1280px] w-full">
            <Interactive />
          </div>
        </section>
        <section className="flex justify-center pb-10">
          <div className="max-w-[1280px] w-full">
            <MissionVision />
          </div>
        </section>
        <section className="flex justify-center pb-10">
          <div className="max-w-[1280px] w-full">
            <Stats />
          </div>
        </section>

        <section className="flex justify-center">
          <div className="max-w-[1280px] w-full">
            <FAQ />
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
