import { getProductBySlug } from '@/actions/productActions';
import ProductPageClient from '@/components/ProductPageClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

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

  // Açıklama oluştur
  const description = product.description
    ? product.description.substring(0, 160)
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
      canonical: `https://ctprefabrik.com/urun-detay/${slug}`,
    },
    openGraph: {
      title: `${product.name} | CT Prefabrik`,
      description,
      url: `https://ctprefabrik.com/urun-detay/${slug}`,
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

  // JSON-LD Schema Markup
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map(img => img.url),
    description: product.description || `${product.name} prefabrik ev modeli`,
    brand: {
      '@type': 'Brand',
      name: 'CT Prefabrik',
    },
    offers: {
      '@type': 'Offer',
      url: `https://ctprefabrik.com/urun-detay/${slug}`,
      priceCurrency: 'TRY',
      price: product.price || undefined,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'CT Prefabrik',
      },
    },
    // Ek özellikler
    additionalProperty: [
      product.room && {
        '@type': 'PropertyValue',
        name: 'Oda Sayısı',
        value: product.room,
      },
      product.bath && {
        '@type': 'PropertyValue',
        name: 'Banyo Sayısı',
        value: product.bath,
      },
      product.floor && {
        '@type': 'PropertyValue',
        name: 'Kat Sayısı',
        value: product.floor,
      },
      product.height && {
        '@type': 'PropertyValue',
        name: 'Yükseklik',
        value: product.height,
      },
    ].filter(Boolean),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
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
        item: `https://ctprefabrik.com/urun-detay/${slug}`,
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
      <ProductPageClient product={product} />
    </>
  );
}
