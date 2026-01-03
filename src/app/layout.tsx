import ClientLayout from "@/components/ClientLayout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL('https://ctprefabrik.com'),
  title: {
    default: "Sakarya CT Prefabrik Evler",
    template: "%s | Sakarya CT Prefabrik Evler",
  },
  description: "Prefabrik ev,  çelik ev ve konteyner çözümleri! Hızlı kurulum, modern tasarımlar, Sakarya CT Prefabrik 20 yıllık deneyim. Ücretsiz keşif +90 537 518 30 06.",
  keywords: [
    'prefabrik ev',
    'prefabrik ev fiyatları',
    'prefabrik ev modelleri',
    'prefabrik konut',
    'modüler ev',
    'CT Prefabrik',
    'prefabrik ev üreticisi',
    'uygun fiyatlı prefabrik',
    'prefabrik villa',
  ],
  authors: [{ name: 'CT Prefabrik' }],
  creator: 'CT Prefabrik',
  publisher: 'CT Prefabrik',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://ctprefabrik.com',
    siteName: 'CT Prefabrik',
    title: 'CT Prefabrik | Prefabrik Ev Modelleri ve Fiyatları',
    description: 'Türkiye\'nin en kaliteli prefabrik ev üreticisi. Uygun fiyatlı, TSE onaylı prefabrik ev modelleri.',
    images: [
      {
        url: 'https://ctprefabrik.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CT Prefabrik',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'CT Prefabrik | Prefabrik Ev Modelleri',
    description: 'Türkiye\'nin en kaliteli prefabrik ev üreticisi',
    images: ['/og-image.jpg'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: 'your-yandex-verification-code',
  },

  // Alternates
  alternates: {
    canonical: 'https://ctprefabrik.com',
  },

  // Other
  category: 'Real Estate',

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  themeColor: '#ffffff',
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <meta name="yandex-verification" content="d1e22bf8dd1eb29e" />

        <meta name="google-site-verification" content="-eKu2_9KxeaM_RgTv1LMwIx2955IHuOtoSJYUdxScT0" />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CT Prefabrik',
              url: 'https://ctprefabrik.com',
              logo: 'https://ctprefabrik.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+90-537-518-3006',
                contactType: 'customer service',
                areaServed: 'TR',
                availableLanguage: 'Turkish',
              },
              sameAs: [
                'https://www.facebook.com/ctprefabrik',
                'https://www.instagram.com/ctprefabrik',
                'https://twitter.com/ctprefabrik',
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
