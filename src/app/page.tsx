import { LeadForm } from "@/components/form";
import { BestSellingHouses } from "@/components/home-page/best-selling-houses";
import { CoreValues } from "@/components/home-page/core-values";
import { Features } from "@/components/home-page/features";
import { Hero4 } from "@/components/home-page/hero";
import { WhoWeAre } from "@/components/home-page/who-we-are";

export default function Page() {
  return (
    <main className="min-h-screen  space-y-5 lg:space-y-24 ">

      <section className="flex justify-center">
        <div className="max-w-[1280px] w-full mt-20">
          <Hero4 />
        </div>
      </section>
      <section className=" flex justify-center py-5 lg:py-20">
        <div className="max-w-[1280px] w-full">
          <CoreValues />
        </div>
      </section>
      <section className="flex justify-center py-16 lg:py-0">
        <div className="max-w-[1280px] w-full">
          <WhoWeAre />
        </div>
      </section>

      <section className="flex justify-center py-6 lg:py-30">
        <div className="max-w-[1280px] w-full">
          <Features />
        </div>
      </section>

      <section className="flex justify-center pt-10 md:pt-0 lg:pg-0">
        <div className="max-w-[1280px] w-full">
          <BestSellingHouses />
        </div>
      </section>

      <section className="flex justify-center pt-20 lg:mt-0">
        <div className="max-w-[1280px] w-full">
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
