import AboutPageClient from "@/components/AboutPageClient";
import { ABOUT_FAQS } from "@/components/page-faq-content";
import { CONTACT_INFO } from "@/lib/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Hakkımızda | CT Prefabrik Prefabrik Ev, Çelik Ev ve Anahtar Teslim Yapı Çözümleri",
  description:
    "CT Prefabrik hakkında detaylı bilgi alın. Prefabrik ev modelleri, prefabrik ev fiyatları, anahtar teslim prefabrik ev, çelik konstrüksiyon ev, dubleks prefabrik ev, prefabrik villa ve konteyner ev fiyatları odaklı çözümlerimizle Sakarya'dan Türkiye geneline hizmet veriyoruz.",
  keywords: [
    "CT Prefabrik hakkında",
    "ctprefabrik hakkında",
    "prefabrik ev üreticisi",
    "prefabrik firma",
    "güvenilir prefabrik firma",
    "prefabrik ev modelleri",
    "prefabrik ev fiyatları",
    "anahtar teslim prefabrik ev",
    "çelik konstrüksiyon ev",
    "dubleks prefabrik ev",
    "prefabrik villa",
    "konteyner ev fiyatları",
    "Sakarya prefabrik ev",
    "çelik ev firması",
    "kaliteli prefabrik ev",
  ],
  openGraph: {
    title:
      "Hakkımızda | CT Prefabrik Prefabrik Ev ve Çelik Ev Uzmanlığı",
    description:
      "CT Prefabrik'in prefabrik ev modelleri, çelik konstrüksiyon ev çözümleri, anahtar teslim yapı yaklaşımı ve Sakarya merkezli hizmet gücü hakkında bilgi alın.",
    url: "https://ctprefabrik.com/hakkimizda",
    siteName: "CT Prefabrik",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "CT Prefabrik hakkında prefabrik ev ve çelik ev çözümleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda | CT Prefabrik Prefabrik Ev ve Çelik Ev Çözümleri",
    description:
      "Prefabrik ev fiyatları, anahtar teslim prefabrik ev, çelik ev ve prefabrik villa çözümlerinde CT Prefabrik yaklaşımını inceleyin.",
    images: ["/og-about.jpg"],
  },
  alternates: {
    canonical: "https://ctprefabrik.com/hakkimizda",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* AboutPage Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Hakkımızda",
            description:
              "CT Prefabrik hakkında bilgiler, prefabrik ev modelleri, çelik ev çözümleri ve anahtar teslim yapı yaklaşımımız",
            url: "https://ctprefabrik.com/hakkimizda",
            mainEntity: {
              "@type": "Organization",
              name: "CT Prefabrik",
              foundingDate: "2010",
              description:
                "Prefabrik ev, çelik konstrüksiyon ev, dubleks prefabrik ev, prefabrik villa ve konteyner yapı çözümleri sunan üretici firma",
              url: "https://ctprefabrik.com",
              logo: "https://ctprefabrik.com/logo.png",
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
                availableLanguage: "Turkish",
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
                name: "Ana Sayfa",
                item: "https://ctprefabrik.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Hakkımızda",
                item: "https://ctprefabrik.com/hakkimizda",
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
            name: "CT Prefabrik",
            url: "https://ctprefabrik.com",
            logo: "https://ctprefabrik.com/logo.png",
            description:
              "Prefabrik ev modelleri, prefabrik ev fiyatları, anahtar teslim prefabrik ev, çelik konstrüksiyon ev ve prefabrik villa çözümleri sunan üretici marka",
            foundingDate: "2010",
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              value: 150,
            },
            slogan: "Hayalinizdeki eve hızlı ve güvenli ulaşın",
            award: [
              "TSE Belgeli Üretim",
              "ISO 9001 Kalite Yönetimi",
              "Müşteri Memnuniyeti Ödülü 2024",
            ],
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
