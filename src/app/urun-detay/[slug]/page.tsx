import ProductPageClient from '@/components/ProductPageClient';
import { MOCK_PRODUCT } from "@/types/product";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

// Metadata oluştur
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const productId = slug.split('-').pop();
  const product = MOCK_PRODUCT.find(p => p.id === productId);

  if (!product) {
    return {
      title: 'Ürün Bulunamadı | CT Prefabrik',
      description: 'Aradığınız prefabrik ev bulunamadı.',
    };
  }

  const firstImage = product.img[0]?.src;
  const imageUrl = `https://ctprefabrik.com/urun-detay/${firstImage}`;

  // Açıklama oluştur
  const description = product.description && product.description.length > 0
    ? product.description[0].substring(0, 160)
    : `${product.name} - ${product.room ? product.room + ' oda' : ''} ${product.bath ? product.bath + ' banyo' : ''} prefabrik ev modeli. Uygun fiyatlarla hemen teslim.`;

  // Anahtar kelimeler
  const keywords = [
    product.name,
    'prefabrik ev',
    'prefabrik ev modelleri',
    'prefabrik ev fiyatları',
    product.room && `${product.room} oda prefabrik ev`,
    product.bath && `${product.bath} banyo`,
    product.floor && `${product.floor} katlı prefabrik`,
    'CT Prefabrik',
    'prefabrik konut',
    'modüler ev',
  ].filter(Boolean);

  return {
    title: `${product.name} | Prefabrik Ev Modelleri | CT Prefabrik`,
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

// Static paths oluştur (tüm ürünler için)
export async function generateStaticParams() {
  return MOCK_PRODUCT.map((product) => {
    // Slug oluştur: ürün-adı-id formatında
    const slug = `${product.name
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')}-${product.id}`;

    return {
      slug,
    };
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const productId = slug.split('-').pop();
  const product = MOCK_PRODUCT.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  // JSON-LD Schema Markup
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.img.map(img => `https://ctprefabrik.com/urun-detay/${img.src}`),
    description: product.description && product.description.length > 0
      ? product.description.join(' ')
      : `${product.name} prefabrik ev modeli`,
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
