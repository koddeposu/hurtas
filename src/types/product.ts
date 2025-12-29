import Image1 from "@/assets/hero/home-page-1.webp";
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
    cat: "Tek Katlı",
    name: "Safir Konak",
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
    id: "3",
    cat: "Tek Katlı",
    name: "Safir Konak",
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
];
