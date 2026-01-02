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

export interface Product {
  id: string;
  slug: string;
  bestseller?: boolean;
  cat: Category;
  name: string;
  area: string;
  room: string;
  price: number;
  img: StaticImageData[];
  oldPrice?: number;
  description: string[];
  height: string;
  floor: string;
  bath: string;
}

// Mock Product
export const MOCK_PRODUCT: Product[] = [
  {
    id: "1",
    bestseller: true,
    cat: "Tek Katlı",
    name: "a",
    slug: "safir-konak",
    area: "145m²",
    room: "3+1",
    height: "250 cm",
    floor: "1",
    bath: "2",
    price: 1450000,
    oldPrice: 13000,
    img: [Image1, Image1, Image1],
    description: [
      "Safir Konak, modern prefabrik teknolojisinin estetikle buluştuğu en prestijli modellerimizden biridir.",
      "Geniş pencereleri ve yüksek tavan yapısıyla doğal ışığı maksimum seviyede iç mekana taşır.",
      "Yüksek yalıtım standartları sayesinde hem yaz hem kış kullanım için idealdir.",
      "Hafif çelik konstrüksiyon sistemi ile depreme karşı maksimum dayanıklılık sunar.",
      "Ortalama montaj süresi 15 iş günü olup, anahtar teslim seçenekleri mevcuttur.",
    ],
  },
  {
    id: "2",
    bestseller: true,
    cat: "Tek Katlı",
    name: "b",
    slug: "safir-konak3",
    area: "145m²",
    room: "3+1",
    height: "250 cm",
    floor: "1",
    bath: "2",
    price: 1450000,
    oldPrice: 13000,
    img: [Image1, Image1, Image1],
    description: [
      "Safir Konak, modern prefabrik teknolojisinin estetikle buluştuğu en prestijli modellerimizden biridir.",
      "Geniş pencereleri ve yüksek tavan yapısıyla doğal ışığı maksimum seviyede iç mekana taşır.",
      "Yüksek yalıtım standartları sayesinde hem yaz hem kış kullanım için idealdir.",
      "Hafif çelik konstrüksiyon sistemi ile depreme karşı maksimum dayanıklılık sunar.",
      "Ortalama montaj süresi 15 iş günü olup, anahtar teslim seçenekleri mevcuttur.",
    ],
  },
  {
    id: "3",
    bestseller: true,
    cat: "Tek Katlı",
    name: "c",
    slug: "safir-konak2",
    area: "145m²",
    room: "3+1",
    height: "250 cm",
    floor: "1",
    bath: "2",
    price: 1450000,
    oldPrice: 13000,
    img: [Image1, Image1, Image1],
    description: [
      "Safir Konak, modern prefabrik teknolojisinin estetikle buluştuğu en prestijli modellerimizden biridir.",
      "Geniş pencereleri ve yüksek tavan yapısıyla doğal ışığı maksimum seviyede iç mekana taşır.",
      "Yüksek yalıtım standartları sayesinde hem yaz hem kış kullanım için idealdir.",
      "Hafif çelik konstrüksiyon sistemi ile depreme karşı maksimum dayanıklılık sunar.",
      "Ortalama montaj süresi 15 iş günü olup, anahtar teslim seçenekleri mevcuttur.",
    ],
  },
  {
    id: "4",
    bestseller: true,
    cat: "Tek Katlı",
    name: "Safir Konak2",
    slug: "safir-konak11",
    area: "145m²",
    room: "3+1",
    height: "250 cm",
    floor: "1",
    bath: "2",
    price: 1450000,
    oldPrice: 13000,
    img: [Image1, Image1, Image1],
    description: [
      "Safir Konak, modern prefabrik teknolojisinin estetikle buluştuğu en prestijli modellerimizden biridir.",
      "Geniş pencereleri ve yüksek tavan yapısıyla doğal ışığı maksimum seviyede iç mekana taşır.",
      "Yüksek yalıtım standartları sayesinde hem yaz hem kış kullanım için idealdir.",
      "Hafif çelik konstrüksiyon sistemi ile depreme karşı maksimum dayanıklılık sunar.",
      "Ortalama montaj süresi 15 iş günü olup, anahtar teslim seçenekleri mevcuttur.",
    ],
  },
  {
    id: "5",
    bestseller: true,
    cat: "Tek Katlı",
    name: "Safir Konak",
    slug: "safir-konak",
    area: "145m²",
    room: "3+1",
    height: "250 cm",
    floor: "1",
    bath: "2",
    price: 1450000,
    oldPrice: 13000,
    img: [Image1, Image1, Image1],
    description: [
      "Safir Konak, modern prefabrik teknolojisinin estetikle buluştuğu en prestijli modellerimizden biridir.",
      "Geniş pencereleri ve yüksek tavan yapısıyla doğal ışığı maksimum seviyede iç mekana taşır.",
      "Yüksek yalıtım standartları sayesinde hem yaz hem kış kullanım için idealdir.",
      "Hafif çelik konstrüksiyon sistemi ile depreme karşı maksimum dayanıklılık sunar.",
      "Ortalama montaj süresi 15 iş günü olup, anahtar teslim seçenekleri mevcuttur.",
    ],
  },
];
