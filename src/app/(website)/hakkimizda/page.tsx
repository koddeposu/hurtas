import AboutPageClient from "@/components/AboutPageClient";
import { ABOUT_FAQS } from "@/components/page-faq-content";
import { CONTACT_INFO } from "@/lib/contact";
import {
  getDictionary,
  getMetadataAlternates,
  getLocalizedUrl,
  SITE_URL,
} from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.seo.aboutTitle,
    description: dict.seo.aboutDescription,
    keywords: [
      dict.common.companyName,
      "about concrete elements",
      "beton elemanları",
      "concrete pipe",
      "paving stone",
      "kerb",
    ],
    openGraph: {
      title: dict.seo.aboutTitle,
      description: dict.seo.aboutDescription,
      url: getMetadataAlternates("/hakkimizda", locale).canonical,
      siteName: dict.common.companyName,
      images: [
        {
          url: "/og-about.jpg",
          width: 1200,
          height: 630,
          alt: dict.seo.aboutTitle,
        },
      ],
      locale: dict.seo.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.aboutTitle,
      description: dict.seo.aboutDescription,
      images: ["/og-about.jpg"],
    },
    alternates: getMetadataAlternates("/hakkimizda", locale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AboutPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <>
      {/* AboutPage Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: dict.about.title,
            description: dict.seo.aboutDescription,
            url: getMetadataAlternates("/hakkimizda", locale).canonical,
            mainEntity: {
              "@type": "Organization",
              name: CONTACT_INFO.companyName,
              description: dict.seo.siteOgDescription,
              url: getLocalizedUrl("/", locale),
              logo: `${SITE_URL}/logo.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress: `${CONTACT_INFO.address.street}, ${CONTACT_INFO.address.note}`,
                addressLocality: CONTACT_INFO.address.locality,
                addressRegion: CONTACT_INFO.address.region,
                addressCountry: "TR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: CONTACT_INFO.primaryPhone.schema,
                contactType: "customer service",
                email: CONTACT_INFO.email,
                areaServed: "TR",
                availableLanguage: ["Turkish", "English", "Arabic"],
              },
            },
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: dict.common.home,
                item: getLocalizedUrl("/", locale),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: dict.about.title,
                item: getMetadataAlternates("/hakkimizda", locale).canonical,
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema - Eğer FAQ bölümü varsa */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ABOUT_FAQS.map((item) => ({
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

      {/* Organization Statistics */}
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
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              value: 150,
            },
            slogan: dict.supply.title,
            award: dict.supply.items,
            areaServed: {
              "@type": "Country",
              name: "Turkey",
            },
          }),
        }}
      />

      <AboutPageClient />
    </>
  );
}
