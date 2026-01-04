import AboutPageClient from '@/components/AboutPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda | CT Prefabrik - Türkiye\'nin Öncü Prefabrik Ev Üreticisi',
  description: 'CT Prefabrik olarak 15 yıldır kaliteli, güvenli ve uygun fiyatlı prefabrik ev üretiyoruz. TSE onaylı malzemeler, profesyonel ekip ve müşteri memnuniyeti odaklı hizmet anlayışımızla yanınızdayız.',
  keywords: [
    'CT Prefabrik hakkında',
    'prefabrik ev üreticisi',
    'prefabrik firma',
    'güvenilir prefabrik',
    'TSE onaylı prefabrik',
    'CT Prefabrik referanslar',
    'prefabrik şirket',
    'kaliteli prefabrik ev',
  ],
  openGraph: {
    title: 'Hakkımızda | CT Prefabrik',
    description: 'CT Prefabrik olarak 14 yıldır kaliteli ve güvenli prefabrik ev üretiyoruz.',
    url: 'https://ctprefabrik.com/hakkimizda',
    siteName: 'CT Prefabrik',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'CT Prefabrik Hakkımızda',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hakkımızda | CT Prefabrik',
    description: 'CT Prefabrik olarak 14 yıldır kaliteli ve güvenli prefabrik ev üretiyoruz.',
    images: ['/og-about.jpg'],
  },
  alternates: {
    canonical: 'https://ctprefabrik.com/hakkimizda',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* AboutPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Hakkımızda',
            description: 'CT Prefabrik hakkında bilgiler, misyon, vizyon ve değerlerimiz',
            url: 'https://ctprefabrik.com/hakkimizda',
            mainEntity: {
              '@type': 'Organization',
              name: 'CT Prefabrik',
              foundingDate: '2010',
              description: 'Türkiye\'nin öncü prefabrik ev üreticisi',
              url: 'https://ctprefabrik.com',
              logo: 'https://ctprefabrik.com/logo.png',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'İstanbul',
                addressCountry: 'TR',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+90-537-518-3006',
                contactType: 'customer service',
                areaServed: 'TR',
                availableLanguage: 'Turkish',
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
                name: 'Hakkımızda',
                item: 'https://ctprefabrik.com/hakkimizda',
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
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'CT Prefabrik kaç yıldır faaliyet gösteriyor?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CT Prefabrik 2010 yılından bu yana 15 yıldır prefabrik ev sektöründe hizmet vermektedir.',
                },
              },
              {
                '@type': 'Question',
                name: 'CT Prefabrik hangi bölgelerde hizmet veriyor?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CT Prefabrik Türkiye\'nin tüm illerine prefabrik ev üretimi ve montaj hizmeti sunmaktadır.',
                },
              },
              {
                '@type': 'Question',
                name: 'CT Prefabrik\'in kalite belgeleri var mı?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Evet, CT Prefabrik TSE belgeli olup, tüm ürünlerimiz TSE standartlarında üretilmektedir. Ayrıca ISO kalite yönetim belgelerimiz mevcuttur.',
                },
              },
              {
                '@type': 'Question',
                name: 'Kaç adet projeye imza attınız?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CT Prefabrik olarak bugüne kadar 5000+ başarılı projeye imza atmış bulunmaktayız.',
                },
              },
              {
                '@type': 'Question',
                name: 'Müşteri memnuniyeti oranınız nedir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CT Prefabrik olarak %98 müşteri memnuniyeti oranıyla sektörde öncü konumdayız.',
                },
              },
            ],
          }),
        }}
      />

      {/* Organization Statistics */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'CT Prefabrik',
            url: 'https://ctprefabrik.com',
            logo: 'https://ctprefabrik.com/logo.png',
            description: 'Türkiye\'nin öncü prefabrik ev üreticisi',
            foundingDate: '2010',
            numberOfEmployees: {
              '@type': 'QuantitativeValue',
              value: 150,
            },
            slogan: 'Hayalinizdeki eve hızlı ve güvenli ulaşın',
            award: [
              'TSE Belgeli Üretim',
              'ISO 9001 Kalite Yönetimi',
              'Müşteri Memnuniyeti Ödülü 2024',
            ],
            areaServed: {
              '@type': 'Country',
              name: 'Turkey',
            },
          }),
        }}
      />

      <AboutPageClient />
    </>
  );
}
