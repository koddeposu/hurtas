import Image1 from "@/assets/hero/home-page-1.webp";
import Image2 from "@/assets/hero/home-page-2.webp";
import Image3 from "@/assets/hero/home-page-3.webp";
import Image4 from "@/assets/hero/home-page-4.webp";
import Image5 from "@/assets/hero/home-page-5.webp";
import { StaticImageData } from "next/image";

export const CATEGORIES = [
  "Tümü",
  "Tek Katlı",
  "Dubleks",
  "Villa",
  "Çelik Yapı",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type SortType = "default" | "price-asc" | "price-desc";

export interface SortFilterProps {
  sortBy: SortType;
  onSelect: (sort: SortType) => void;
}

export const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: "default", label: "Varsayılan" },
  { value: "price-asc", label: "Fiyat (Artan)" },
  { value: "price-desc", label: "Fiyat (Azalan)" },
];
export interface ProductGridProps {
  products: Product[];
}

export interface ProductDetail {
  image: {
    src: string | StaticImageData;
    alt: string;
    badge?: string;
  };
  description: string[];
  features: {
    icon: "home" | "bath" | "floor" | "height";
    label: string;
  }[];
}

export interface Product {
  id: string;
  slug: string;
  cat: Category;
  name: string;
  area: string;
  room: string;
  price: number;
  img: string | StaticImageData;
  oldPrice?: number;
  detail?: ProductDetail;
}

// Mock Product
export const MOCK_PRODUCT: Product[] = [
  {
    id: "1",
    cat: "Tek Katlı",
    name: "Safir Konak",
    slug: "safir-konak",
    area: "145m²",
    room: "3+1",
    price: 1450000,
    oldPrice: 13000,
    img: Image1,
    detail: {
      image: {
        src: Image1,
        alt: "CT PREFABRİK Prefabrik Ev",
        badge: "KIŞ KAMPANYASI %15",
      },
      description: [
        "Safir Konak, modern prefabrik teknolojisinin estetikle buluştuğu en prestijli modellerimizden biridir.",
        "Geniş pencereleri ve yüksek tavan yapısıyla doğal ışığı maksimum seviyede iç mekana taşır.",
        "Yüksek yalıtım standartları sayesinde hem yaz hem kış kullanım için idealdir.",
        "Hafif çelik konstrüksiyon sistemi ile depreme karşı maksimum dayanıklılık sunar.",
        "Ortalama montaj süresi 15 iş günü olup, anahtar teslim seçenekleri mevcuttur.",
      ],
      features: [
        { icon: "home", label: "3+1 Oda" },
        { icon: "bath", label: "1 Banyo" },
        { icon: "floor", label: "1 Kat" },
        { icon: "height", label: "250 cm Tavan" },
      ],
    },
  },
  {
    id: "2",
    slug: "safir-konak",

    cat: CATEGORIES[1],
    name: "Safir Konak",
    area: "145m²",
    room: "3+1",
    price: 1450000,
    oldPrice: 13000,
    img: Image2,
    detail: {
      image: {
        src: Image2,
        alt: "CT PREFABRİK Prefabrik Ev",
        badge: "KIŞ KAMPANYASI %15",
      },
      description: [
        "Safir Konak, modern prefabrik teknolojisinin estetikle buluştuğu en prestijli modellerimizden biridir.",
        "Geniş pencereleri ve yüksek tavan yapısıyla doğal ışığı maksimum seviyede iç mekana taşır.",
        "Yüksek yalıtım standartları sayesinde hem yaz hem kış kullanım için idealdir.",
        "Hafif çelik konstrüksiyon sistemi ile depreme karşı maksimum dayanıklılık sunar.",
        "Ortalama montaj süresi 15 iş günü olup, anahtar teslim seçenekleri mevcuttur.",
      ],
      features: [
        { icon: "home", label: "3+1 Oda" },
        { icon: "bath", label: "1 Banyo" },
        { icon: "floor", label: "1 Kat" },
        { icon: "height", label: "250 cm Tavan" },
      ],
    },
  },
  {
    id: "3",
    slug: "safir-konak",
    cat: CATEGORIES[2],
    name: "Safir Konak",
    area: "145m²",
    room: "3+1",
    price: 1450000,
    oldPrice: 13000,
    img: Image3,
    detail: {
      image: {
        src: Image3,
        alt: "CT PREFABRİK Prefabrik Ev",
        badge: "KIŞ KAMPANYASI %15",
      },
      description: [
        "Safir Konak, modern prefabrik teknolojisinin estetikle buluştuğu en prestijli modellerimizden biridir.",
        "Geniş pencereleri ve yüksek tavan yapısıyla doğal ışığı maksimum seviyede iç mekana taşır.",
        "Yüksek yalıtım standartları sayesinde hem yaz hem kış kullanım için idealdir.",
        "Hafif çelik konstrüksiyon sistemi ile depreme karşı maksimum dayanıklılık sunar.",
        "Ortalama montaj süresi 15 iş günü olup, anahtar teslim seçenekleri mevcuttur.",
      ],
      features: [
        { icon: "home", label: "3+1 Oda" },
        { icon: "bath", label: "1 Banyo" },
        { icon: "floor", label: "1 Kat" },
        { icon: "height", label: "250 cm Tavan" },
      ],
    },
  },
  {
    id: "4",
    slug: "safir-konak",
    cat: CATEGORIES[2],
    name: "Safir Konak",
    area: "145m²",
    room: "3+1",
    price: 1450000,
    oldPrice: 13000,
    img: Image4,
    detail: {
      image: {
        src: Image4,
        alt: "CT PREFABRİK Prefabrik Ev",
        badge: "KIŞ KAMPANYASI %15",
      },
      description: [
        "Safir Konak, modern prefabrik teknolojisinin estetikle buluştuğu en prestijli modellerimizden biridir.",
        "Geniş pencereleri ve yüksek tavan yapısıyla doğal ışığı maksimum seviyede iç mekana taşır.",
        "Yüksek yalıtım standartları sayesinde hem yaz hem kış kullanım için idealdir.",
        "Hafif çelik konstrüksiyon sistemi ile depreme karşı maksimum dayanıklılık sunar.",
        "Ortalama montaj süresi 15 iş günü olup, anahtar teslim seçenekleri mevcuttur.",
      ],
      features: [
        { icon: "home", label: "3+1 Oda" },
        { icon: "bath", label: "1 Banyo" },
        { icon: "floor", label: "1 Kat" },
        { icon: "height", label: "250 cm Tavan" },
      ],
    },
  },
  {
    id: "5",
    slug: "safir-konak",
    cat: CATEGORIES[3],
    name: "Safir Konak",
    area: "145m²",
    room: "3+1",
    price: 1450000,
    oldPrice: 13000,
    img: Image5,
    detail: {
      image: {
        src: Image5,
        alt: "CT PREFABRİK Prefabrik Ev",
        badge: "KIŞ KAMPANYASI %15",
      },
      description: [
        "Safir Konak, modern prefabrik teknolojisinin estetikle buluştuğu en prestijli modellerimizden biridir.",
        "Geniş pencereleri ve yüksek tavan yapısıyla doğal ışığı maksimum seviyede iç mekana taşır.",
        "Yüksek yalıtım standartları sayesinde hem yaz hem kış kullanım için idealdir.",
        "Hafif çelik konstrüksiyon sistemi ile depreme karşı maksimum dayanıklılık sunar.",
        "Ortalama montaj süresi 15 iş günü olup, anahtar teslim seçenekleri mevcuttur.",
      ],
      features: [
        { icon: "home", label: "3+1 Oda" },
        { icon: "bath", label: "1 Banyo" },
        { icon: "floor", label: "1 Kat" },
        { icon: "height", label: "250 cm Tavan" },
      ],
    },
  },
];
