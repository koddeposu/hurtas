import { getCategories } from '@/actions/categoryActions';
import { getProductBySlug, getProductsPreview } from '@/actions/productActions';
import ProductPageClient from '@/components/ProductPageClient';
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

function getRelatedTitle(categoryName: string | null | undefined) {
  const name = categoryName ?? '';
  const lower = name.toLocaleLowerCase('tr-TR');

  if (lower.includes('tek kat')) {
    return 'Diğer Tek Katlı Ev Modellerimiz';
  }
  if (lower.includes('çift kat') || lower.includes('dubleks')) {
    return 'Diğer Çift Katlı Ev Modellerimiz';
  }
  if (lower.includes('çelik')) {
    return 'Diğer Çelik Ev Modellerimiz';
  }

  return name ? `Diğer ${name} Modellerimiz` : 'Diğer Beton Ürünlerimiz';
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
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Ürün Bulunamadı | Hürtaş Beton',
      description: 'Aradığınız ürün bulunamadı.',
    };
  }

  const firstImage = product.images[0]?.url;
  const imageUrl = firstImage || 'https://www.hurtasbeton.com/og-image.png';
  const plainDescription = extractPlainTextFromProductDetailContent(product.description);
  const fallbackDescription = `${product.name} ürünü. Detaylı bilgi için Hürtaş Beton ile iletişime geçin.`;
  const categories = await getCategories();
  const canonicalPath = getProductCategoryDetailHref(product, categories);
  const categoryDisplayName = product.category
    ? getCategoryDisplayName(product.category)
    : undefined;

  // Açıklama oluştur
  const description = (
    product.metaDescription?.trim() || plainDescription || fallbackDescription
  ).substring(0, 160);

  const keywords = [
    product.name,
    categoryDisplayName,
    'beton ürünleri',
    'altyapı elemanları',
    'üst yapı elemanları',
    'Hürtaş Beton ürünleri',
  ].filter(Boolean);

  return {
    title: `${product.name} | Hürtaş Beton`,
    description,
    keywords: keywords.join(', '),

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Hürtaş Beton`,
      description,
      images: [imageUrl],
    },

    // Canonical URL
    alternates: {
      canonical: `https://www.hurtasbeton.com${canonicalPath}`,
    },
    openGraph: {
      title: `${product.name} | Hürtaş Beton`,
      description,
      url: `https://www.hurtasbeton.com${canonicalPath}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
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
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const imageUrls = product.images.map((img) => img.url);
  const categories = await getCategories();
  const canonicalPath = getProductCategoryDetailHref(product, categories);
  const pageUrl = `https://www.hurtasbeton.com${canonicalPath}`;
  const plainDescription = extractPlainTextFromProductDetailContent(product.description);
  const detailBlocks = getProductDetailBlocks(product.description);
  const categoryDisplayName = product.category
    ? getCategoryDisplayName(product.category)
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
      name: item.name,
      area: item.area,
      room: item.room,
      price: item.price,
      oldPrice: item.oldPrice,
      categoryName: item.category ? getCategoryDisplayName(item.category) : null,
      metaDescription: item.metaDescription,
      image: item.image
        ? {
            url: item.image.url,
            alt: item.image.alt,
          }
        : null,
    }));
  const relatedTitle = getRelatedTitle(categoryDisplayName);
  const productDescription =
    product.metaDescription ||
    plainDescription ||
    `${product.name} ürünü. ${
      product.room ? `${product.room} oda planı, ` : ""
    }${
      product.floor ? `${product.floor} katlı yapı çözümü, ` : ""
    }Hürtaş Beton tarafından sunulan ürün çözümü.`;

  const additionalProperty = [
    product.area && {
      "@type": "PropertyValue",
      name: "Metrekare",
      value: product.area,
      unitText: "m²",
    },
    product.room && {
      "@type": "PropertyValue",
      name: "Oda Sayısı",
      value: product.room,
    },
    product.bath && {
      "@type": "PropertyValue",
      name: "Banyo Sayısı",
      value: product.bath,
    },
    product.floor && {
      "@type": "PropertyValue",
      name: "Kat Sayısı",
      value: product.floor,
    },
    product.height && {
      "@type": "PropertyValue",
      name: "Tavan Yüksekliği",
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
    name: product.name,
    sku: product.id,
    mpn: product.slug,
    image: imageUrls,
    description: productDescription,
    category: categoryDisplayName || "Beton Ürünü",
    brand: {
      "@type": "Brand",
      name: "Hürtaş Beton",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Hürtaş Beton",
      url: "https://www.hurtasbeton.com",
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
        name: 'Ana Sayfa',
        item: 'https://www.hurtasbeton.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tüm Ürünler',
        item: 'https://www.hurtasbeton.com/tum-urunler',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
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
        product={product}
        detailBlocks={detailBlocks}
        descriptionText={plainDescription}
        relatedProducts={relatedProducts}
        relatedTitle={relatedTitle}
      />
    </>
  );
}
