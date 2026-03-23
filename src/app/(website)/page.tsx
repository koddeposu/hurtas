import { getCategories } from "@/actions/categoryActions";
import { Features } from "@/components/home-page/features";
import { Hero4 } from "@/components/home-page/hero";
import { HomepageBlogSection } from "@/components/home-page/homepage-blog-section";
import {
  HOMEPAGE_FAQS,
  HomepageFaq,
} from "@/components/home-page/homepage-faq";
import { HomepageFavoritesSection } from "@/components/home-page/homepage-favorites-section";
import { HomepageProductSliders } from "@/components/home-page/homepage-product-sliders";
import { HomepageReviewsSlider } from "@/components/home-page/homepage-reviews-slider";
import { ProductCategoryCards } from "@/components/home-page/product-category-cards";
import { SectionSkeleton } from "@/components/home-page/section-skeleton";
import { ServiceRegions } from "@/components/home-page/service-regions";
import { TrustMetrics } from "@/components/home-page/trust-metrics";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DeferredLeadForm = dynamic(
  () => import("@/components/form").then((mod) => mod.LeadForm),
  {
    loading: () => <SectionSkeleton heightClassName="h-[420px]" />,
  },
);

const DeferredBrandStory = dynamic(
  () =>
    import("@/components/home-page/brand-story").then((mod) => mod.BrandStory),
  {
    loading: () => <SectionSkeleton heightClassName="h-[420px]" />,
  },
);

const DeferredProcessJourney = dynamic(
  () =>
    import("@/components/home-page/process-journey").then(
      (mod) => mod.ProcessJourney,
    ),
  {
    loading: () => <SectionSkeleton heightClassName="h-[520px]" />,
  },
);

export const metadata: Metadata = {
  title: "CT Prefabrik | Türkiye'nin En Kaliteli Prefabrik Ev Üreticisi",
  description:
    "CT Prefabrik ile hayalinizdeki eve kavuşun. TSE onaylı malzemeler, 10 yıl garanti, uygun fiyatlar ve hemen teslim imkanı. 2+1, 3+1, villa tipi prefabrik ev modelleri.",
  keywords: [
    "prefabrik ev",
    "prefabrik ev fiyatları",
    "prefabrik ev modelleri",
    "CT Prefabrik Ev",
    "CT Prefabrik",
    "ctprefabrik",
    "ctprefabrik ev",
    "prefabrik konut",
    "modüler ev",
    "prefabrik villa",
    "uygun fiyatlı prefabrik",
    "TSE onaylı prefabrik",
    "hızlı montaj prefabrik",
  ],
  openGraph: {
    title: "CT Prefabrik | Türkiye'nin En Kaliteli Prefabrik Ev Üreticisi",
    description:
      "TSE onaylı, 10 yıl garantili prefabrik ev modelleri. Hayalinizdeki eve hemen kavuşun.",
    url: "https://ctprefabrik.com",
    siteName: "CT Prefabrik",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "CT Prefabrik - Prefabrik Ev Modelleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CT Prefabrik | Prefabrik Ev Modelleri",
    description: "TSE onaylı, 10 yıl garantili prefabrik ev modelleri",
    images: ["/og-home.jpg"],
  },
  alternates: {
    canonical: "https://ctprefabrik.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  const categories = await getCategories();

  const getCategoryHref = (matcher: string) => {
    const matchedCategory = categories.find((category) =>
      category.name.includes(matcher),
    );

    return matchedCategory
      ? `/prefabrik-evler/${matchedCategory.slug}`
      : "/prefabrik-evler";
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "CT Prefabrik",
            url: "https://ctprefabrik.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://ctprefabrik.com/prefabrik-ev?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CT Prefabrik",
            url: "https://ctprefabrik.com",
            logo: "https://ctprefabrik.com/logo.png",
            description: "Türkiye'nin en kaliteli prefabrik ev üreticisi",
            address: {
              "@type": "PostalAddress",
              addressLocality: "İstanbul",
              addressCountry: "TR",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+90-537-518-3006",
              contactType: "customer service",
              areaServed: "TR",
              availableLanguage: ["Turkish"],
            },
            sameAs: [
              "https://www.facebook.com/ctprefabrik",
              "https://www.instagram.com/ctprefabrik",
              "https://twitter.com/ctprefabrik",
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "CT Prefabrik",
            image: "https://ctprefabrik.com/og-home.jpg",
            "@id": "https://ctprefabrik.com",
            url: "https://ctprefabrik.com",
            telephone: "+90-537-518-3006",
            priceRange: "₺₺",
            address: {
              "@type": "PostalAddress",
              addressLocality: "İstanbul",
              addressCountry: "TR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 41.0082,
              longitude: 28.9784,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "09:00",
              closes: "18:00",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: HOMEPAGE_FAQS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <main className="min-h-screen space-y-4 lg:space-y-18">
        <section className="-mx-5">
          <div className="w-full">
            <Hero4 />
          </div>
        </section>

        <section className="flex justify-center mt-15">
          <div className="max-w-[1280px] w-full">
            <div className="mb-4 md:mb-5">
              <TrustMetrics />
            </div>
            <ProductCategoryCards
              items={[
                {
                  title: "Tek Katlı Prefabrik Ev",
                  description:
                    "Farklı metrekare ve oda dağılımlarına sahip tek katlı modelleri inceleyin.",
                  href: getCategoryHref("Tek Kat"),
                  icon: "single",
                },
                {
                  title: "Dubleks Prefabrik Ev (Çift Katlı)",
                  description:
                    "Geniş yaşam ihtiyaçları için çift katlı prefabrik ev seçeneklerine geçin.",
                  href: getCategoryHref("Çift Kat"),
                  icon: "duplex",
                },
                {
                  title: "Çelik Ev",
                  description:
                    "Dayanıklı tasarım diliyle hazırlanan çelik ev ürünlerimizi keşfedin.",
                  href: getCategoryHref("Çelik"),
                  icon: "steel",
                },
              ]}
            />
          </div>
        </section>

        <Suspense fallback={<SectionSkeleton heightClassName="h-[520px]" />}>
          <HomepageProductSliders categories={categories} />
        </Suspense>

        <section className="flex justify-center py-6 lg:py-10">
          <div className="max-w-[1280px] w-full">
            <DeferredBrandStory />
          </div>
        </section>

        <section className="flex justify-center py-4 lg:py-12">
          <div className="max-w-[1280px] w-full">
            <ServiceRegions />
          </div>
        </section>

        <section className="flex justify-center py-8 lg:py-4">
          <div className="max-w-[1280px] w-full">
            <DeferredProcessJourney />
          </div>
        </section>

        <section className="flex justify-center py-5 lg:py-18">
          <div className="max-w-[1280px] w-full">
            <Features />
          </div>
        </section>

        <Suspense fallback={<SectionSkeleton heightClassName="h-[560px]" />}>
          <HomepageFavoritesSection />
        </Suspense>

        <section className="flex justify-center py-5 lg:py-18">
          <div className="max-w-[1280px] w-full">
            <HomepageReviewsSlider />
          </div>
        </section>

        <Suspense fallback={<SectionSkeleton heightClassName="h-[520px]" />}>
          <HomepageBlogSection />
        </Suspense>

        <section className="flex justify-center pt-14 lg:mt-0">
          <div className="max-w-[1280px] w-full">
            <DeferredLeadForm />
          </div>
        </section>

        <section className="flex justify-center py-8 lg:py-12">
          <div className="max-w-[1280px] w-full">
            <HomepageFaq />
          </div>
        </section>
      </main>
    </>
  );
}
