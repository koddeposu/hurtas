import ContactPageClient from '@/components/ContactPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | CT Prefabrik - Bize Ulaşın',
  description: 'CT Prefabrik ile iletişime geçin. Telefon: +90 537 518 30 06, E-posta: info@ctprefabrik.com. Sakarya merkez ofisimizden veya online olarak bize ulaşabilirsiniz.',
  keywords: [
    'CT Prefabrik iletişim',
    'ctprefabrik iletişim',
    'prefabrik ev iletişim',
    'prefabrik firma telefon',
    'CT Prefabrik telefon',
    'ctprefabrik telefon',
    'ctprefabrik adres',
    'CT Prefabrik adres',
    'Sakarya prefabrik',
    'prefabrik teklif al',
  ],
  openGraph: {
    title: 'İletişim | CT Prefabrik',
    description: 'CT Prefabrik ile iletişime geçin. Hayalinizdeki prefabrik ev için hemen arayın.',
    url: 'https://ctprefabrik.com/iletisim',
    siteName: 'CT Prefabrik',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'CT Prefabrik İletişim',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İletişim | CT Prefabrik',
    description: 'CT Prefabrik ile iletişime geçin.',
    images: ['/og-contact.jpg'],
  },
  alternates: {
    canonical: 'https://ctprefabrik.com/iletisim',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ContactPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'İletişim',
            description: 'CT Prefabrik iletişim bilgileri',
            url: 'https://ctprefabrik.com/iletisim',
          }),
        }}
      />

      {/* Local Business Schema - YEREL SEO İÇİN ÇOK ÖNEMLİ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://ctprefabrik.com',
            name: 'CT Prefabrik',
            image: 'https://ctprefabrik.com/logo.png',
            url: 'https://ctprefabrik.com',
            telephone: '+905375183006',
            email: 'info@ctprefabrik.com',
            priceRange: '₺₺',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Soğucak, Kervan/1 Sokak No: 2/4',
              addressLocality: 'Söğütlü',
              addressRegion: 'Sakarya',
              postalCode: '54160',
              addressCountry: 'TR',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 40.897743,
              longitude: 30.507634,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '09:00',
                closes: '14:00',
              },
            ],
            sameAs: [
              'https://www.facebook.com/ctprefabrik',
              'https://www.instagram.com/ctprefabrik',
              'https://twitter.com/ctprefabrik',
            ],
            areaServed: {
              '@type': 'Country',
              name: 'Turkey',
            },
            hasMap: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d188.48880587821307!2d30.50763411393848!3d40.89774357467647',
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Ana Sayfa',
                item: 'https://ctprefabrik.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'İletişim',
                item: 'https://ctprefabrik.com/iletisim',
              },
            ],
          }),
        }}
      />

      {/* Organization ContactPoint Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'CT Prefabrik',
            url: 'https://ctprefabrik.com',
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '+90-537-518-3006',
                contactType: 'customer service',
                email: 'info@ctprefabrik.com',
                areaServed: 'TR',
                availableLanguage: ['Turkish'],
                contactOption: 'TollFree',
                hoursAvailable: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '18:00',
                },
              },
              {
                '@type': 'ContactPoint',
                telephone: '+90-537-518-3006',
                contactType: 'sales',
                email: 'info@ctprefabrik.com',
                areaServed: 'TR',
                availableLanguage: ['Turkish'],
              },
            ],
          }),
        }}
      />

      <ContactPageClient />
    </>
  );
}
