import { getCategories } from "@/actions/categoryActions";
import { getProductsPreview } from "@/actions/productActions";
import "@/app/globals.css";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import ClientLayout from "@/components/ClientLayout";
import { LocaleProvider } from "@/components/i18n-provider";
import { CONTACT_INFO } from "@/lib/contact";
import {
  getDictionary,
  getLocalizedCategoryDisplayName,
  getLocalizedImageAlt,
  getLocalizedProductDescription,
  getLocalizedProductMetaDescription,
  getLocalizedProductName,
  getMetadataAlternates,
  SITE_URL,
} from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import {
  getCategoryDisplayName,
  getCategoryHref,
  getProductCategoryDetailHref,
} from "@/lib/productRoutes";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.seo.siteTitle,
      template: `%s | ${dict.common.companyName}`,
    },
    description: `${dict.seo.siteDescription} Telefon: ${CONTACT_INFO.primaryPhone.display}, ${CONTACT_INFO.mobilePhone.display}.`,
    keywords: [
      dict.common.companyName,
      "concrete pipe",
      "beton boru",
      "reinforced concrete pipe",
      "manhole",
      "kerb stone",
      "paving stone",
      "box culvert",
      "concrete barrier",
    ],
    authors: [{ name: dict.common.companyName }],
    creator: dict.common.companyName,
    publisher: dict.common.companyName,
    openGraph: {
      type: "website",
      locale: dict.seo.locale,
      url: getMetadataAlternates("/", locale).canonical,
      siteName: dict.common.companyName,
      title: dict.seo.siteOgTitle,
      description: dict.seo.siteOgDescription,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${dict.common.companyName} concrete products`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.siteTitle,
      description: dict.seo.siteDescription,
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
    alternates: getMetadataAlternates("/", locale),
    category: dict.seo.category,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/logo.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
  };
}

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
  const locale = await getCurrentLocale();
  const [categories, productPreviews] = await Promise.all([
    getCategories(),
    getProductsPreview(),
  ]);
  const productSearchItems = productPreviews.map((product) => {
    const productCategories = product.categories ?? [];
    const category = product.category ?? productCategories[0] ?? null;
    const categoryLabel = category
      ? getCategoryDisplayName(category, locale)
      : null;
    const categoryHrefs = productCategories.map((item) =>
      getCategoryHref(categories, item),
    );
    const productName = getLocalizedProductName(product, locale);
    const productMetaDescription = getLocalizedProductMetaDescription(
      product,
      locale,
    );
    const productDescription = getLocalizedProductDescription(product, locale);

    if (category) {
      const categoryHref = getCategoryHref(categories, category);

      if (!categoryHrefs.includes(categoryHref)) {
        categoryHrefs.unshift(categoryHref);
      }
    }

    return {
      id: product.id,
      name: productName,
      href: getProductCategoryDetailHref(product, categories),
      categoryLabel,
      categoryHrefs,
      imageUrl: product.image?.url ?? null,
      imageAlt: product.image
        ? getLocalizedImageAlt(product.image, locale) || productName
        : productName,
      searchText: [
        productName,
        product.name,
        product.nameEn,
        product.nameAr,
        product.slug,
        productMetaDescription,
        productDescription,
        product.metaDescription,
        product.metaDescriptionEn,
        product.metaDescriptionAr,
        product.description,
        product.descriptionEn,
        product.descriptionAr,
        category ? getLocalizedCategoryDisplayName(category, locale) : null,
        category?.name,
        category?.nameEn,
        category?.nameAr,
        category?.title,
        category?.titleEn,
        category?.titleAr,
        ...productCategories.flatMap((item) => [
          getLocalizedCategoryDisplayName(item, locale),
          item.name,
          item.nameEn,
          item.nameAr,
          item.title,
          item.titleEn,
          item.titleAr,
          item.slug,
        ]),
      ]
        .filter(Boolean)
        .join(" "),
    };
  });

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
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
              url: getMetadataAlternates("/", locale).canonical,
              logo: `${SITE_URL}/logo.png`,
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: CONTACT_INFO.primaryPhone.schema,
                  contactType: "customer service",
                  email: CONTACT_INFO.email,
                  areaServed: "TR",
                  availableLanguage: ["Turkish", "English", "Arabic"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: CONTACT_INFO.mobilePhone.schema,
                  contactType: "sales",
                  email: CONTACT_INFO.email,
                  areaServed: "TR",
                  availableLanguage: ["Turkish", "English", "Arabic"],
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
          <LocaleProvider locale={locale}>
            <ClientLayout
              categories={categories}
              productSearchItems={productSearchItems}
            >
              {children}
            </ClientLayout>
          </LocaleProvider>
        </AnalyticsWrapper>
      </body>
    </html>
  );
}
