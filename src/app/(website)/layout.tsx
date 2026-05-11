import { getCategories } from "@/actions/categoryActions";
import { getProductsPreview } from "@/actions/productActions";
import "@/app/globals.css";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import ClientLayout from "@/components/ClientLayout";
import { CONTACT_INFO } from "@/lib/contact";
import {
  getCategoryDisplayName,
  getCategoryHref,
  getProductCategoryDetailHref,
} from "@/lib/productRoutes";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hurtasbeton.com"),
  title: {
    default: "Hürtaş Beton | Beton Boru, Baca, Bordür ve Parke Taşı",
    template: "%s | Hürtaş Beton",
  },
  description:
    `Beton boru, parke taşı, bordür ve altyapı elemanları için Hürtaş Beton ile iletişime geçin. Telefon: ${CONTACT_INFO.primaryPhone.display}, ${CONTACT_INFO.mobilePhone.display}.`,
  keywords: [
    "Hürtaş Beton",
    "beton boru",
    "betonarme boru",
    "entegre contalı beton boru",
    "muayene bacası",
    "parsel bacası",
    "rögar",
    "menhol",
    "kutu menfez",
    "bordür taşı",
    "parke taşı",
    "oluk taşı",
    "şev taşı",
    "beton bariyer",
    "çim taşı",
  ],
  authors: [{ name: "Hürtaş Beton" }],
  creator: "Hürtaş Beton",
  publisher: "Hürtaş Beton",

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.hurtasbeton.com",
    siteName: "Hürtaş Beton",
    title: "Hürtaş Beton | Beton Altyapı ve Üst Yapı Elemanları",
    description:
      "Beton boru, betonarme boru, baca elemanları, kutu menfez, bordür, parke taşı ve saha beton ürünleri için Hürtaş Beton.",
    images: [
      {
        url: "https://www.hurtasbeton.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hürtaş Beton beton ürünleri",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hürtaş Beton | Beton Ürünleri",
    description:
      "Beton boru, baca, menhol, bordür, parke taşı ve altyapı beton ürünleri.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: "d1e22bf8dd1eb29e",
  },

  alternates: {
    canonical: "https://www.hurtasbeton.com",
  },

  category: "Construction Materials",

  // ✅ BURASINI DEĞİŞTİRİN
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, productPreviews] = await Promise.all([
    getCategories(),
    getProductsPreview(),
  ]);
  const productSearchItems = productPreviews.map((product) => {
    const productCategories = product.categories ?? [];
    const category = product.category ?? productCategories[0] ?? null;
    const categoryLabel = category ? getCategoryDisplayName(category) : null;
    const categoryHrefs = productCategories.map((item) =>
      getCategoryHref(categories, item),
    );

    if (category) {
      const categoryHref = getCategoryHref(categories, category);

      if (!categoryHrefs.includes(categoryHref)) {
        categoryHrefs.unshift(categoryHref);
      }
    }

    return {
      id: product.id,
      name: product.name,
      href: getProductCategoryDetailHref(product, categories),
      categoryLabel,
      categoryHrefs,
      imageUrl: product.image?.url ?? null,
      imageAlt: product.image?.alt ?? product.name,
      searchText: [
        product.name,
        product.slug,
        product.metaDescription,
        product.description,
        category?.name,
        category?.title,
        ...productCategories.flatMap((item) => [
          item.name,
          item.title,
          item.slug,
        ]),
      ]
        .filter(Boolean)
        .join(" "),
    };
  });

  return (
    <html lang="tr">
      <head>
        <meta name="yandex-verification" content="d1e22bf8dd1eb29e" />

        <meta
          name="google-site-verification"
          content="-eKu2_9KxeaM_RgTv1LMwIx2955IHuOtoSJYUdxScT0"
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NBNQSJ46');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: CONTACT_INFO.companyName,
              url: "https://www.hurtasbeton.com",
              logo: "https://www.hurtasbeton.com/logo.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: CONTACT_INFO.primaryPhone.schema,
                  contactType: "customer service",
                  email: CONTACT_INFO.email,
                  areaServed: "TR",
                  availableLanguage: "Turkish",
                },
                {
                  "@type": "ContactPoint",
                  telephone: CONTACT_INFO.mobilePhone.schema,
                  contactType: "sales",
                  email: CONTACT_INFO.email,
                  areaServed: "TR",
                  availableLanguage: "Turkish",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NBNQSJ46"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <AnalyticsWrapper>
          <ClientLayout
            categories={categories}
            productSearchItems={productSearchItems}
          >
            {children}
          </ClientLayout>
        </AnalyticsWrapper>
      </body>
    </html>
  );
}
