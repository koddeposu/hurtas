import { getCategories } from "@/actions/categoryActions";
import { Hero4 } from "@/components/home-page/hero";
import { HomepageAboutSection } from "@/components/home-page/homepage-about-section";
import { HomepageBlogSection } from "@/components/home-page/homepage-blog-section";
import {
  HOMEPAGE_FAQS,
  HomepageFaq,
} from "@/components/home-page/homepage-faq";
import { HomepageFavoritesSection } from "@/components/home-page/homepage-favorites-section";
import { HomepageProductSliders } from "@/components/home-page/homepage-product-sliders";
import { HomepageReviewsSlider } from "@/components/home-page/homepage-reviews-slider";
import { SectionSkeleton } from "@/components/home-page/section-skeleton";
import { StructureCategoryBoxes } from "@/components/home-page/structure-category-boxes";
import { CONTACT_INFO, CONTACT_MAP_EMBED_URL } from "@/lib/contact";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

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
            name: CONTACT_INFO.companyName,
            url: "https://ctprefabrik.com",
            logo: "https://ctprefabrik.com/logo.png",
            description: "Türkiye'nin en kaliteli prefabrik ev üreticisi",
            address: {
              "@type": "PostalAddress",
              streetAddress: `${CONTACT_INFO.address.street}, ${CONTACT_INFO.address.note}`,
              addressLocality: CONTACT_INFO.address.locality,
              addressRegion: CONTACT_INFO.address.region,
              addressCountry: "TR",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: CONTACT_INFO.primaryPhone.schema,
                contactType: "customer service",
                email: CONTACT_INFO.email,
                areaServed: "TR",
                availableLanguage: ["Turkish"],
              },
              {
                "@type": "ContactPoint",
                telephone: CONTACT_INFO.mobilePhone.schema,
                contactType: "sales",
                email: CONTACT_INFO.email,
                areaServed: "TR",
                availableLanguage: ["Turkish"],
              },
            ],
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
            name: CONTACT_INFO.companyName,
            image: "https://ctprefabrik.com/og-home.jpg",
            "@id": "https://ctprefabrik.com",
            url: "https://ctprefabrik.com",
            telephone: CONTACT_INFO.primaryPhone.schema,
            email: CONTACT_INFO.email,
            priceRange: "₺₺",
            address: {
              "@type": "PostalAddress",
              streetAddress: `${CONTACT_INFO.address.street}, ${CONTACT_INFO.address.note}`,
              addressLocality: CONTACT_INFO.address.locality,
              addressRegion: CONTACT_INFO.address.region,
              addressCountry: "TR",
            },
            hasMap: CONTACT_MAP_EMBED_URL,
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
          <StructureCategoryBoxes />
        </section>

        <Suspense fallback={<SectionSkeleton heightClassName="h-[520px]" />}>
          <HomepageProductSliders categories={categories} />
        </Suspense>

        <HomepageAboutSection />

        <section className="flex justify-center py-8 lg:py-4">
          <div className="max-w-[1280px] w-full">
            <DeferredProcessJourney />
          </div>
        </section>

        <Suspense fallback={<SectionSkeleton heightClassName="h-[560px]" />}>
          <HomepageFavoritesSection />
        </Suspense>

        <section className="flex justify-center py-5 pt-16 lg:py-18">
          <div className="max-w-[1280px] w-full">
            <HomepageReviewsSlider />
          </div>
        </section>

        <Suspense fallback={<SectionSkeleton heightClassName="h-[520px]" />}>
          <HomepageBlogSection />
        </Suspense>

        <section className="flex justify-center pt-8 lg:pt-12">
          <div className="max-w-[1280px] w-full">
            <HomepageFaq />
          </div>
        </section>
      </main>
    </>
  );
}
