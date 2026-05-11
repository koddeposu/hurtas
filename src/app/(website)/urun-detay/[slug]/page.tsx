import { getCategories } from '@/actions/categoryActions';
import { getProductBySlug, getProductsPreview } from '@/actions/productActions';
import ProductPageClient from '@/components/ProductPageClient';
import {
  formatMessage,
  getDictionary,
  getLocalizedCategoryDisplayName,
  getLocalizedImageAlt,
  getLocalizedProductDescription,
  getLocalizedProductMetaDescription,
  getLocalizedProductName,
  getMetadataAlternates,
  getLocalizedUrl,
  SITE_URL,
} from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/i18n-server';
import {
  getCategoryDisplayName,
  getProductCategoryDetailHref,
} from '@/lib/productRoutes';
import { parseTipTapDoc } from '@/lib/richContent';
import {
  extractPlainTextFromProductDetailContent,
  parseProductDetailContent,
} from '@/lib/productDetailContent';
import { convertJsonToHtml } from '@/lib/tiptap-utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

type RelatedProduct = {
  id: string;
  href: string;
  slug: string;
  name: string;
  area: string;
  room: string;
  price: string | null;
  oldPrice: string | null;
  categoryName: string | null;
  metaDescription: string | null;
  image: {
    url: string;
    alt: string;
  } | null;
};

type ProductDetailRenderBlock =
  | {
      id: string;
      type: 'description';
      html: string | null;
      text: string;
    }
  | {
      id: string;
      type: 'table';
      title: string;
      headers: string[];
      rows: string[][];
    };

function getDescriptionHtml(description: string | null | undefined) {
  if (!description) return null;
  if (!parseTipTapDoc(description)) return null;

  const html = convertJsonToHtml(description);
  return html || null;
}

function getRelatedTitle(
  categoryName: string | null | undefined,
  relatedDefault: string,
  relatedPrefix: string,
) {
  const name = categoryName ?? '';
  return name
    ? formatMessage(relatedPrefix, { name })
    : relatedDefault;
}

function getProductDetailBlocks(
  description: string | null | undefined,
): ProductDetailRenderBlock[] {
  const detailContent = parseProductDetailContent(description);

  if (!detailContent) {
    const html = getDescriptionHtml(description);
    const text = extractPlainTextFromProductDetailContent(description);
    return html || text
      ? [
          {
            id: 'legacy-description',
            type: 'description',
            html,
            text,
          },
        ]
      : [];
  }

  return detailContent.blocks
    .map((block): ProductDetailRenderBlock | null => {
      if (block.type === 'description') {
        const html = getDescriptionHtml(block.content);
        const text = extractPlainTextFromProductDetailContent(block.content);
        return html || text
          ? {
              id: block.id,
              type: 'description',
              html,
              text,
            }
          : null;
      }

      const hasTableContent =
        block.title.trim() ||
        block.headers.some((header) => header.trim()) ||
        block.rows.some((row) => row.some((cell) => cell.trim()));

      return hasTableContent
        ? {
            id: block.id,
            type: 'table',
            title: block.title,
            headers: block.headers,
            rows: block.rows,
          }
        : null;
    })
    .filter((block): block is ProductDetailRenderBlock => block !== null);
}

// Metadata oluştur
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: dict.seo.productNotFoundTitle,
      description: dict.seo.productNotFoundDescription,
    };
  }

  const firstImage = product.images[0]?.url;
  const imageUrl = firstImage || `${SITE_URL}/og-image.png`;
  const productName = getLocalizedProductName(product, locale);
  const localizedDescription = getLocalizedProductDescription(product, locale);
  const localizedMetaDescription = getLocalizedProductMetaDescription(
    product,
    locale,
  );
  const plainDescription =
    extractPlainTextFromProductDetailContent(localizedDescription);
  const fallbackDescription = formatMessage(
    dict.productDetail.productFallback,
    { name: productName },
  );
  const categories = await getCategories();
  const canonicalPath = getProductCategoryDetailHref(product, categories);
  const categoryDisplayName = product.category
    ? getCategoryDisplayName(product.category, locale)
    : undefined;

  // Açıklama oluştur
  const description = (
    localizedMetaDescription || plainDescription || fallbackDescription
  ).substring(0, 160);

  const keywords = [
    productName,
    categoryDisplayName,
    dict.common.concreteProducts,
    dict.common.companyName,
  ].filter(Boolean);

  return {
    title: `${productName} | ${dict.common.companyName}`,
    description,
    keywords: keywords.join(', '),

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: `${productName} - ${dict.common.companyName}`,
      description,
      images: [imageUrl],
    },

    // Canonical URL
    alternates: {
      ...getMetadataAlternates(canonicalPath, locale),
    },
    openGraph: {
      title: `${productName} | ${dict.common.companyName}`,
      description,
      url: getLocalizedUrl(canonicalPath, locale),
      type: 'website',
      locale: dict.seo.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
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

  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productName = getLocalizedProductName(product, locale);
  const localizedDescription = getLocalizedProductDescription(product, locale);
  const localizedMetaDescription = getLocalizedProductMetaDescription(
    product,
    locale,
  );
  const localizedProduct = {
    ...product,
    name: productName,
    description: localizedDescription,
    metaDescription: localizedMetaDescription,
    images: product.images.map((img) => ({
      ...img,
      alt: getLocalizedImageAlt(img, locale),
    })),
  };
  const imageUrls = localizedProduct.images.map((img) => img.url);
  const categories = await getCategories();
  const canonicalPath = getProductCategoryDetailHref(product, categories);
  const pageUrl = getLocalizedUrl(canonicalPath, locale);
  const plainDescription =
    extractPlainTextFromProductDetailContent(localizedDescription);
  const detailBlocks = getProductDetailBlocks(localizedDescription);
  const categoryDisplayName = product.category
    ? getCategoryDisplayName(product.category, locale)
    : null;
  const relatedCategoryId = product.categoryId ?? product.categoryIds?.[0];
  const relatedSource = relatedCategoryId
    ? await getProductsPreview(relatedCategoryId, 12)
    : [];
  const relatedProducts: RelatedProduct[] = relatedSource
    .filter((item) => item.id !== product.id)
    .slice(0, 6)
    .map((item) => ({
      id: item.id,
      href: getProductCategoryDetailHref(item, categories),
      slug: item.slug,
      name: getLocalizedProductName(item, locale),
      area: item.area,
      room: item.room,
      price: item.price,
      oldPrice: item.oldPrice,
      categoryName: item.category
        ? getLocalizedCategoryDisplayName(item.category, locale)
        : null,
      metaDescription: getLocalizedProductMetaDescription(item, locale),
      image: item.image
        ? {
            url: item.image.url,
            alt: getLocalizedImageAlt(item.image, locale),
          }
        : null,
    }));
  const relatedTitle = getRelatedTitle(
    categoryDisplayName,
    dict.productDetail.relatedDefault,
    dict.productDetail.relatedPrefix,
  );
  const productDescription =
    localizedMetaDescription ||
    plainDescription ||
    formatMessage(dict.productDetail.productFallback, { name: productName });

  const additionalProperty = [
    product.area && {
      "@type": "PropertyValue",
      name: dict.productDetail.properties.area,
      value: product.area,
      unitText: "m²",
    },
    product.room && {
      "@type": "PropertyValue",
      name: dict.productDetail.properties.room,
      value: product.room,
    },
    product.bath && {
      "@type": "PropertyValue",
      name: dict.productDetail.properties.bath,
      value: product.bath,
    },
    product.floor && {
      "@type": "PropertyValue",
      name: dict.productDetail.properties.floor,
      value: product.floor,
    },
    product.height && {
      "@type": "PropertyValue",
      name: dict.productDetail.properties.height,
      value: product.height,
      unitText: "m",
    },
  ].filter(Boolean);

  // JSON-LD Schema Markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    name: productName,
    sku: product.id,
    mpn: product.slug,
    image: imageUrls,
    description: productDescription,
    category: categoryDisplayName || dict.productDetail.schemaCategory,
    brand: {
      "@type": "Brand",
      name: dict.common.companyName,
    },
    manufacturer: {
      "@type": "Organization",
      name: dict.common.companyName,
      url: getLocalizedUrl("/", locale),
    },
    additionalProperty,
    potentialAction: {
      "@type": "ViewAction",
      target: pageUrl,
    },
  };

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.common.home,
        item: getLocalizedUrl("/", locale),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: dict.common.allProducts,
        item: getLocalizedUrl("/tum-urunler", locale),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: productName,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Client Component */}
      <ProductPageClient
        product={localizedProduct}
        detailBlocks={detailBlocks}
        descriptionText={plainDescription}
        relatedProducts={relatedProducts}
        relatedTitle={relatedTitle}
      />
    </>
  );
}
