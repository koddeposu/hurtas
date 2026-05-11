import AboutPageClient from "@/components/AboutPageClient";
import { ABOUT_FAQS } from "@/components/page-faq-content";
import { CONTACT_INFO } from "@/lib/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Hürtaş Beton Elemanları",
  description:
    "Hürtaş Beton hakkında bilgi alın. Beton boru, parke taşı, bordür, menhol ve çevre düzenleme ürünlerinde üretim, ürün seçimi ve planlı sevkiyat yaklaşımımızı inceleyin.",
  keywords: [
    "Hürtaş Beton hakkında",
    "beton elemanları",
    "beton boru",
    "parke taşı",
    "bordür",
    "menhol",
    "altyapı beton ürünleri",
    "İstanbul beton elemanları",
    "Arnavutköy beton",
  ],
  openGraph: {
    title: "Hakkımızda | Hürtaş Beton Elemanları",
    description:
      "Hürtaş Beton'un beton elemanları üretim, ürün seçimi ve planlı tedarik yaklaşımı hakkında bilgi alın.",
    url: "https://www.hurtasbeton.com/hakkimizda",
    siteName: "Hürtaş Beton",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Hürtaş Beton hakkında beton elemanları üretim yaklaşımı",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda | Hürtaş Beton",
    description:
      "Beton boru, parke taşı, bordür ve altyapı ürünlerinde Hürtaş Beton yaklaşımını inceleyin.",
    images: ["/og-about.jpg"],
  },
  alternates: {
    canonical: "https://www.hurtasbeton.com/hakkimizda",
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
              "Hürtaş Beton hakkında bilgiler, beton elemanları üretimi ve planlı tedarik yaklaşımımız",
            url: "https://www.hurtasbeton.com/hakkimizda",
            mainEntity: {
              "@type": "Organization",
              name: CONTACT_INFO.companyName,
              description:
                "Beton boru, parke taşı, bordür, menhol ve çevre düzenleme ürünleri sunan beton elemanları üreticisi",
              url: "https://www.hurtasbeton.com",
              logo: "https://www.hurtasbeton.com/logo.png",
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
                item: "https://www.hurtasbeton.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Hakkımızda",
                item: "https://www.hurtasbeton.com/hakkimizda",
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
            url: "https://www.hurtasbeton.com",
            logo: "https://www.hurtasbeton.com/logo.png",
            description:
              "Beton boru, parke taşı, bordür, menhol ve altyapı beton ürünleri sunan üretici marka",
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              value: 150,
            },
            slogan: "Beton elemanlarında planlı üretim ve düzenli tedarik",
            award: ["TSE Onaylı Belgeler", "Standart Üretim", "Planlı Sevkiyat"],
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
