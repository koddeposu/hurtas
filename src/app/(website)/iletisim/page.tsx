import ContactPageClient from '@/components/ContactPageClient';
import { CONTACT_INFO, CONTACT_MAP_EMBED_URL } from '@/lib/contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | Hürtaş Beton - Bize Ulaşın',
  description: `Hürtaş Beton ile iletişime geçin. Telefon: ${CONTACT_INFO.primaryPhone.display}, ${CONTACT_INFO.mobilePhone.display}, E-posta: ${CONTACT_INFO.email}. ${CONTACT_INFO.address.short} adresimizden veya online olarak bize ulaşabilirsiniz.`,
  keywords: [
    'Hürtaş Beton iletişim',
    'Hürtaş Beton telefon',
    'Hürtaş Beton adres',
    'hurtas beton iletişim',
    'beton ürünleri iletişim',
    'beton elemanları telefon',
    'Arnavutköy beton',
    'İstanbul beton elemanları',
    'beton ürünleri teklif al',
  ],
  openGraph: {
    title: 'İletişim | Hürtaş Beton',
    description: 'Hürtaş Beton ile iletişime geçin. Beton elemanları için hemen arayın.',
    url: 'https://ctprefabrik.com/iletisim',
    siteName: 'Hürtaş Beton',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Hürtaş Beton İletişim',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İletişim | Hürtaş Beton',
    description: 'Hürtaş Beton ile iletişime geçin.',
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
            description: 'Hürtaş Beton iletişim bilgileri',
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
            name: CONTACT_INFO.companyName,
            image: 'https://ctprefabrik.com/logo.png',
            url: 'https://ctprefabrik.com',
            telephone: CONTACT_INFO.primaryPhone.schema,
            email: CONTACT_INFO.email,
            priceRange: '₺₺',
            address: {
              '@type': 'PostalAddress',
              streetAddress: `${CONTACT_INFO.address.street}, ${CONTACT_INFO.address.note}`,
              addressLocality: CONTACT_INFO.address.locality,
              addressRegion: CONTACT_INFO.address.region,
              addressCountry: 'TR',
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
            hasMap: CONTACT_MAP_EMBED_URL,
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
            name: CONTACT_INFO.companyName,
            url: 'https://ctprefabrik.com',
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: CONTACT_INFO.primaryPhone.schema,
                contactType: 'customer service',
                email: CONTACT_INFO.email,
                areaServed: 'TR',
                availableLanguage: ['Turkish'],
                hoursAvailable: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '18:00',
                },
              },
              {
                '@type': 'ContactPoint',
                telephone: CONTACT_INFO.mobilePhone.schema,
                contactType: 'sales',
                email: CONTACT_INFO.email,
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
