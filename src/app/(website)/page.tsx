import { getCategories } from "@/actions/categoryActions";
import { Hero4 } from "@/components/home-page/hero";
import { HomepageAboutSection } from "@/components/home-page/homepage-about-section";
import { HomepageBlogSection } from "@/components/home-page/homepage-blog-section";
import {
  HOMEPAGE_FAQS,
  HomepageFaq,
} from "@/components/home-page/homepage-faq";
import { HomepageFavoritesSection } from "@/components/home-page/homepage-favorites-section";
import { HeroProductMarquee } from "@/components/home-page/hero-product-marquee";
import { HomepageProductSliders } from "@/components/home-page/homepage-product-sliders";
import { HomepageReviewsSlider } from "@/components/home-page/homepage-reviews-slider";
import { ProjectSupplyPower } from "@/components/home-page/project-supply-power";
import { SectionSkeleton } from "@/components/home-page/section-skeleton";
import { SiteDroneVideo } from "@/components/home-page/site-drone-video";
import { StructureCategoryBoxes } from "@/components/home-page/structure-category-boxes";
import { CONTACT_INFO, CONTACT_MAP_EMBED_URL } from "@/lib/contact";
import { ALL_PRODUCTS_PATH } from "@/lib/productRoutes";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Hürtaş Beton | Beton Boru, Rögar, Menhol, Bordür ve Parke Taşı",
  description:
    "Hürtaş Beton; beton boru, betonarme boru, muayene bacası, parsel bacası, kutu menfez, bordür taşı, parke taşı, şev taşı ve beton bariyer üretimi yapar.",
  keywords: [
    "Hürtaş Beton",
    "beton boru",
    "betonarme boru",
    "entegre contalı beton boru",
    "rögar",
    "menhol",
    "muayene bacası",
    "parsel bacası",
    "kutu menfez",
    "baca yükseltme halkası",
    "bordür taşı",
    "parke taşı",
    "oluk taşı",
    "şev taşı",
    "beton bariyer",
    "briket",
    "çim taşı",
  ],
  openGraph: {
    title: "Hürtaş Beton | Beton Altyapı ve Üst Yapı Ürünleri",
    description:
      "Beton boru, baca elemanları, kutu menfez, bordür, parke taşı, şev taşı ve beton bariyer ürünleri için Hürtaş Beton.",
    url: "https://www.hurtasbeton.com",
    siteName: "Hürtaş Beton",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hürtaş Beton beton boru ve saha ürünleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hürtaş Beton | Beton Ürünleri",
    description:
      "Beton boru, rögar, menhol, bordür, parke taşı ve saha ürünleri.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.hurtasbeton.com",
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
            name: "Hürtaş Beton",
            url: "https://www.hurtasbeton.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                `https://www.hurtasbeton.com${ALL_PRODUCTS_PATH}?q={search_term_string}`,
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
            url: "https://www.hurtasbeton.com",
            logo: "https://www.hurtasbeton.com/logo.png",
            description:
              "Beton boru, baca elemanları, kutu menfez, bordür, parke taşı ve çevre düzenleme beton ürünleri üreticisi",
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
            image: "https://www.hurtasbeton.com/og-image.png",
            "@id": "https://www.hurtasbeton.com",
            url: "https://www.hurtasbeton.com",
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
          <Suspense fallback={<SectionSkeleton heightClassName="h-28" />}>
            <HeroProductMarquee />
          </Suspense>
          <StructureCategoryBoxes categories={categories} />
        </section>

        <SiteDroneVideo />

        <Suspense fallback={<SectionSkeleton heightClassName="h-[520px]" />}>
          <HomepageProductSliders categories={categories} />
        </Suspense>

        <HomepageAboutSection />

        <Suspense fallback={<SectionSkeleton heightClassName="h-[360px]" />}>
          <HomepageProductSliders categories={categories} group="environment" />
        </Suspense>

        <ProjectSupplyPower />

        <Suspense fallback={<SectionSkeleton heightClassName="h-[560px]" />}>
          <HomepageFavoritesSection />
        </Suspense>

        <section className="flex justify-center py-4 lg:py-6">
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
