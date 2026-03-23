import { getProductBySlug, getProductsPreview } from '@/actions/productActions';
import ProductPageClient from '@/components/ProductPageClient';
import { extractPlainTextFromRichContent, parseTipTapDoc } from '@/lib/richContent';
import { convertJsonToHtml } from '@/lib/tiptap-utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

type RelatedProduct = {
  id: string;
  slug: string;
  name: string;
  area: string;
  room: string;
  price: string | null;
  oldPrice: string | null;
  categoryName: string | null;
  image: {
    url: string;
    alt: string;
  } | null;
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

  return name ? `Diğer ${name} Modellerimiz` : 'Diğer Prefabrik Ev Modellerimiz';
}

// Metadata oluştur
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Ürün Bulunamadı | CT Prefabrik',
      description: 'Aradığınız prefabrik ev bulunamadı.',
    };
  }

  const firstImage = product.images[0]?.url;
  const imageUrl = firstImage || 'https://ctprefabrik.com/og-image.png';
  const plainDescription = extractPlainTextFromRichContent(product.description);

  // Açıklama oluştur
  const description = plainDescription
    ? plainDescription.substring(0, 160)
    : `${product.name} - ${product.room ? product.room + ' oda' : ''} ${product.bath ? product.bath + ' banyo' : ''} prefabrik ev modeli. Uygun fiyatlarla hemen teslim.`;

  const keywords = [
    product.name,
    `${product.room} oda prefabrik ev`,
    `${product.room} prefabrik ev fiyatı`,
    `${product.floor} katlı prefabrik ev`,
    "Prefabrik ev fiyatları",
    'anahtar teslim prefabrik ev',
    'çelik konstrüksiyon prefabrik ev',
    'CT Prefabrik ürünleri',
    'CT Prefabrik Evleri',
    'ctprefabrik ürünleri',
    'ctprefabrik evleri',
  ].filter(Boolean);

  return {
    title: `${product.name} – ${product.room ? product.room + ' Oda' : ''} Prefabrik Ev | CT Prefabrik`,
    description,
    keywords: keywords.join(', '),

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Prefabrik Ev`,
      description,
      images: [imageUrl],
    },

    // Canonical URL
    alternates: {
      canonical: `https://ctprefabrik.com/prefabrik-ev/${slug}`,
    },
    openGraph: {
      title: `${product.name} | CT Prefabrik`,
      description,
      url: `https://ctprefabrik.com/prefabrik-ev/${slug}`,
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
  const pageUrl = `https://ctprefabrik.com/prefabrik-ev/${slug}`;
  const plainDescription = extractPlainTextFromRichContent(product.description);
  const descriptionHtml = getDescriptionHtml(product.description);
  const relatedSource = product.categoryId
    ? await getProductsPreview(product.categoryId, 12)
    : [];
  const relatedProducts: RelatedProduct[] = relatedSource
    .filter((item) => item.id !== product.id)
    .slice(0, 6)
    .map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      area: item.area,
      room: item.room,
      price: item.price,
      oldPrice: item.oldPrice,
      categoryName: item.category?.name ?? null,
      image: item.image
        ? {
            url: item.image.url,
            alt: item.image.alt,
          }
        : null,
    }));
  const relatedTitle = getRelatedTitle(product.category?.name);
  const productDescription =
    plainDescription ||
    `${product.name} prefabrik ev modeli. ${
      product.room ? `${product.room} oda planı, ` : ""
    }${
      product.floor ? `${product.floor} katlı yapı çözümü, ` : ""
    }CT Prefabrik tarafından sunulan yaşam alanı modeli.`;

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

  const offer = product.price
    ? {
        "@type": "Offer",
        url: pageUrl,
        priceCurrency: "TRY",
        price: product.price,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: {
          "@type": "Organization",
          name: "CT Prefabrik",
          url: "https://ctprefabrik.com",
        },
      }
    : undefined;

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
    category: product.category?.name || "Prefabrik Ev",
    brand: {
      "@type": "Brand",
      name: "CT Prefabrik",
    },
    manufacturer: {
      "@type": "Organization",
      name: "CT Prefabrik",
      url: "https://ctprefabrik.com",
    },
    additionalProperty,
    ...(offer ? { offers: offer } : {}),
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
        item: 'https://ctprefabrik.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Prefabrik Evler',
        item: 'https://ctprefabrik.com/prefabrik-evler',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://ctprefabrik.com/prefabrik-ev/${slug}`,
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
        descriptionHtml={descriptionHtml}
        descriptionText={plainDescription}
        relatedProducts={relatedProducts}
        relatedTitle={relatedTitle}
      />
    </>
  );
}
