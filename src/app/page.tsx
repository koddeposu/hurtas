import Footer from "@/components/footer";
import { LeadForm } from "@/components/form";
import { BestSellingHouses } from "@/components/home-page/best-selling-houses";
import { CoreValues } from "@/components/home-page/core-values";
import { Features } from "@/components/home-page/features";
import { Hero4 } from "@/components/home-page/hero";
import { WhoWeAre } from "@/components/home-page/who-we-are";
import Navbar from "@/components/navbar";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="mt-20 flex justify-center">
        <div className="max-w-[1280px] w-full">
          <Hero4 />
        </div>
      </section>
      <section className="mt-20 flex justify-center">
        <div className="max-w-[1280px] w-full">
          <CoreValues />
        </div>
      </section>
      <section className="flex justify-center">
        <div className="max-w-[1280px] w-full">
          <WhoWeAre />
        </div>
      </section>

      <section className="flex justify-center">
        <div className="max-w-[1280px] w-full">
          <Features />

        </div>
      </section>

      <section className="flex justify-center">
        <div className="max-w-[1280px] w-full">
          <BestSellingHouses />
        </div>
      </section>

      <section className="flex justify-center">
        <div className="max-w-[1280px] w-full">
          <LeadForm />
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-full">
          <Footer />
        </div>
      </section>
    </main>
  );
}
