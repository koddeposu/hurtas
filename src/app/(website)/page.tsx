import { getFavoritesForHomepage } from "@/actions/favoriteActions";
import { LeadForm } from "@/components/form";
import { BestSellingHouses } from "@/components/home-page/best-selling-houses";
import { CoreValues } from "@/components/home-page/core-values";
import { Features } from "@/components/home-page/features";
import { Hero4 } from "@/components/home-page/hero";
import { WhoWeAre } from "@/components/home-page/who-we-are";
import { Metadata } from "next";

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
  const favorites = await getFavoritesForHomepage();

  return (
    <>
      {/* Website Schema - Ana Sayfa için */}
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
                "https://ctprefabrik.com/urun-detay?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Organization Schema */}
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

      {/* Local Business Schema */}
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

      {/* FAQ Schema - Sık Sorulan Sorular varsa */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Prefabrik ev fiyatları ne kadar?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "CT Prefabrik ev fiyatları model ve özelliklerine göre değişmektedir. Detaylı fiyat bilgisi için ürünlerimizi inceleyebilir veya bizimle iletişime geçebilirsiniz.",
                },
              },
              {
                "@type": "Question",
                name: "Prefabrik ev ne kadar sürede teslim edilir?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "CT Prefabrik evlerimiz hızlı üretim ve montaj süreciyle 30-45 gün içerisinde teslim edilmektedir.",
                },
              },
              {
                "@type": "Question",
                name: "Prefabrik evler depreme dayanıklı mı?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Evet, CT Prefabrik evler TSE standartlarında üretilmekte ve deprem yönetmeliklerine uygun olarak tasarlanmaktadır.",
                },
              },
              {
                "@type": "Question",
                name: "Prefabrik ev garantisi var mı?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "CT Prefabrik tüm ürünlerinde 10 yıl resmi garanti sunmaktadır.",
                },
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen space-y-5 lg:space-y-24">
        <section className="flex justify-center">
          <div className="max-w-[1280px] w-full mt-20">
            <Hero4 />
          </div>
        </section>

        <section className="flex justify-center py-5 lg:py-20">
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

        {favorites.length > 0 && (
          <section className="flex justify-center pt-10 md:pt-0 lg:pg-0">
            <div className="max-w-[1280px] w-full">
              <BestSellingHouses favorites={favorites} />
            </div>
          </section>
        )}

        <section className="flex justify-center pt-20 lg:mt-0">
          <div className="max-w-[1280px] w-full">
            <LeadForm />
          </div>
        </section>
      </main>
    </>
  );
}
