import ContactPageClient from '@/components/ContactPageClient';
import { CONTACT_INFO, CONTACT_MAP_EMBED_URL } from '@/lib/contact';
import {
  getDictionary,
  getMetadataAlternates,
  getLocalizedUrl,
  SITE_URL,
} from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/i18n-server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.seo.contactTitle,
    description: `${dict.seo.contactDescription} Telefon: ${CONTACT_INFO.primaryPhone.display}, ${CONTACT_INFO.mobilePhone.display}, E-posta: ${CONTACT_INFO.email}.`,
    keywords: [
      dict.common.companyName,
      'contact concrete products',
      'beton ürünleri iletişim',
      'concrete product quote',
    ],
    openGraph: {
      title: dict.seo.contactTitle,
      description: dict.seo.contactDescription,
      url: getMetadataAlternates('/iletisim', locale).canonical,
      siteName: dict.common.companyName,
      images: [
        {
          url: '/og-contact.jpg',
          width: 1200,
          height: 630,
          alt: dict.seo.contactTitle,
        },
      ],
      locale: dict.seo.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.seo.contactTitle,
      description: dict.seo.contactDescription,
      images: ['/og-contact.jpg'],
    },
    alternates: getMetadataAlternates('/iletisim', locale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ContactPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <>
      {/* ContactPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: dict.common.contact,
            description: dict.seo.contactDescription,
            url: getMetadataAlternates('/iletisim', locale).canonical,
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
            '@id': getLocalizedUrl('/', locale),
            name: CONTACT_INFO.companyName,
            image: `${SITE_URL}/logo.png`,
            url: getLocalizedUrl('/', locale),
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
                name: dict.common.home,
                item: getLocalizedUrl('/', locale),
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: dict.common.contact,
                item: getMetadataAlternates('/iletisim', locale).canonical,
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
            url: getLocalizedUrl('/', locale),
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: CONTACT_INFO.primaryPhone.schema,
                contactType: 'customer service',
                email: CONTACT_INFO.email,
                areaServed: 'TR',
                availableLanguage: ['Turkish', 'English', 'Arabic'],
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
                availableLanguage: ['Turkish', 'English', 'Arabic'],
              },
            ],
          }),
        }}
      />

      <ContactPageClient />
    </>
  );
}
