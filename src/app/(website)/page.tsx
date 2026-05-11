import { getCategories } from "@/actions/categoryActions";
import { Hero4 } from "@/components/home-page/hero";
import { HomepageAboutSection } from "@/components/home-page/homepage-about-section";
import { HomepageBlogSection } from "@/components/home-page/homepage-blog-section";
import {
  getHomepageFaqs,
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
import {
  getDictionary,
  getMetadataAlternates,
  getLocalizedUrl,
  localizePath,
  SITE_URL,
} from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import { ALL_PRODUCTS_PATH } from "@/lib/productRoutes";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.seo.homeTitle,
    description: dict.seo.homeDescription,
    keywords: [
      dict.common.companyName,
      "concrete pipe",
      "beton boru",
      "manhole",
      "kerb",
      "paving stone",
      "box culvert",
      "concrete barrier",
    ],
    openGraph: {
      title: dict.seo.siteOgTitle,
      description: dict.seo.siteOgDescription,
      url: getLocalizedUrl("/", locale),
      siteName: dict.common.companyName,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${dict.common.companyName} concrete products`,
        },
      ],
      locale: dict.seo.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.homeTitle,
      description: dict.seo.homeDescription,
      images: ["/og-image.png"],
    },
    alternates: getMetadataAlternates("/", locale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const homepageFaqs = getHomepageFaqs(locale);
  const categories = await getCategories();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: dict.common.companyName,
            url: getLocalizedUrl("/", locale),
            potentialAction: {
              "@type": "SearchAction",
              target:
                `${SITE_URL}${localizePath(
                  ALL_PRODUCTS_PATH,
                  locale,
                )}?q={search_term_string}`,
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
            url: getLocalizedUrl("/", locale),
            logo: `${SITE_URL}/logo.png`,
            description: dict.seo.siteOgDescription,
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
                availableLanguage: ["Turkish", "English", "Arabic"],
              },
              {
                "@type": "ContactPoint",
                telephone: CONTACT_INFO.mobilePhone.schema,
                contactType: "sales",
                email: CONTACT_INFO.email,
                areaServed: "TR",
                availableLanguage: ["Turkish", "English", "Arabic"],
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
            image: `${SITE_URL}/og-image.png`,
            "@id": getLocalizedUrl("/", locale),
            url: getLocalizedUrl("/", locale),
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
            mainEntity: homepageFaqs.map((item) => ({
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
          <StructureCategoryBoxes />
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
