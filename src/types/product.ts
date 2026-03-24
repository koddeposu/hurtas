import { StaticImageData } from "next/image";

export const CATEGORIES = [
  "Çift Katlı",
  "Tek Katlı",
  "Çelik Ev",
  "Tümü",
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

interface ImageItem {
  src: string | StaticImageData;
  alt: string;
}

export interface Product {
  id: string;
  slug?: string;
  // bestseller?: boolean;
  category: Category;
  name: string;
  metaDescription?: string;
  area: string;
  room: string;
  price?: string;
  img: ImageItem[];
  oldPrice?: string;
  description?: string[];
  height: string;
  floor: string;
  bath: string;
}

// DB Product type - matches what getProductsWithImages() returns
export interface DBProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string;
  order: number;
  createdAt: Date;
}

export interface DBCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DBProduct {
  id: string;
  categoryId: string | null;
  categoryIds?: string[];
  name: string;
  slug: string;
  area: string;
  room: string;
  floor: string;
  bath: string;
  height: string;
  price: string | null;
  oldPrice: string | null;
  description: string | null;
  metaDescription: string | null;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  category: DBCategory | null;
  categories?: DBCategory[];
  images: DBProductImage[];
}

export interface DBProductPreview {
  id: string;
  categoryId: string | null;
  categoryIds?: string[];
  name: string;
  slug: string;
  area: string;
  room: string;
  floor: string;
  bath: string;
  height: string;
  price: string | null;
  oldPrice: string | null;
  description: string | null;
  metaDescription: string | null;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  category: DBCategory | null;
  categories?: DBCategory[];
  image: DBProductImage | null;
}

// Mock Product
export const MOCK_PRODUCT: Product[] = [
  {
    id: "13",
    name: "1+1 Tek Katlı Prefabrik Ev 40 m2",
    slug: "1-1-tek-katli-prefabrik-ev-40-m2",
    area: "40",
    room: "1+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "376200",
    oldPrice: "391300",
    img: [
      {
        src: "tek-katli-prefabrik-1+1-40.jpg",
        alt: "1+1 Tek Katlı Prefabrik Ev 40 m2 bina",
      },
      {
        src: "tek-katli-prefabrik-1+1-40-plan-1.jpg",
        alt: "1+1 Tek Katlı Prefabrik Ev 40 m2 plan",
      },
    ],
  },
  {
    id: "14",
    name: "2+1 Tek Katlı Prefabrik Ev 45 m2",
    slug: "2-1-tek-katli-prefabrik-ev-45-m2",
    area: "45",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "453800",
    oldPrice: "492400",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-45.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 45 m2 genel görünüm",
      },
      {
        src: "tek-katli-prefabrik-2+1-45-plan-1.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 45 m2 iç mekan planı",
      },
    ],
  },
  {
    id: "15",
    name: "1+1 Tek Katlı Prefabrik Ev 49 m2",
    slug: "1-1-tek-katli-prefabrik-ev-49-m2",
    area: "49",
    room: "1+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "446800",
    oldPrice: "496700",
    img: [
      {
        src: "tek-katli-prefabrik-1+1-49.jpg",
        alt: "1+1 Tek Katlı Prefabrik Ev 49 m2 dış cephe",
      },
      {
        src: "tek-katli-prefabrik-1+1-49-plan-1.jpg",
        alt: "1+1 Tek Katlı Prefabrik Ev 49 m2 planı",
      },
    ],
  },
  {
    id: "16",
    name: "2+1 Tek Katlı Prefabrik Ev 49 m2",
    slug: "2-1-tek-katli-prefabrik-ev-49-m2",
    area: "49",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "458700",
    oldPrice: "492600",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-49.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 49 m2 ev",
      },
      {
        src: "tek-katli-prefabrik-2+1-49-plan-1.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 49 m2 yerleşim",
      },
    ],
  },
  {
    id: "17",
    name: "2+1 Tek Katlı Prefabrik Ev 53 m2",
    slug: "2-1-tek-katli-prefabrik-ev-53-m2",
    area: "53",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "467800",
    oldPrice: "512800",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-53.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 53 m2 görünüş",
      },
      {
        src: "tek-katli-prefabrik-2+1-53-plan-1.png",
        alt: "2+1 Tek Katlı Prefabrik Ev 53 m2 plan şeması",
      },
    ],
  },
  {
    id: "18",
    name: "2+1 Tek Katlı Prefabrik Ev 62 m2",
    slug: "2-1-tek-katli-prefabrik-ev-62-m2",
    area: "62",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "512600",
    oldPrice: "565900",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-62-plan-1.webp",
        alt: "2+1 Tek Katlı Prefabrik Ev 62 m2 teknik plan",
      },
      {
        src: "tek-katli-prefabrik-2+1-62.webp",
        alt: "2+1 Tek Katlı Prefabrik Ev 62 m2 bitmiş hali",
      },
    ],
  },
  {
    id: "19",
    name: "2+1 Tek Katlı Prefabrik Ev 68 m2",
    slug: "2-1-tek-katli-prefabrik-ev-68-m2",
    area: "68",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "552700",
    oldPrice: "612100",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-68.webp",
        alt: "2+1 Tek Katlı Prefabrik Ev 68 m2 modern dış",
      },
      {
        src: "tek-katli-prefabrik-2+1-68-plan-1.webp",
        alt: "2+1 Tek Katlı Prefabrik Ev 68 m2 kat şeması",
      },
    ],
  },
  {
    id: "20",
    name: "2+1 Tek Katlı Prefabrik Ev 72 m2",
    slug: "2-1-tek-katli-prefabrik-ev-72-m2",
    area: "72",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "596800",
    oldPrice: "626800",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-72.webp",
        alt: "2+1 Tek Katlı Prefabrik Ev 72 m2 tasarım örneği",
      },
      {
        src: "tek-katli-prefabrik-2+1-72-plan-1.webp",
        alt: "2+1 Tek Katlı Prefabrik Ev 72 m2 yerleşim düzeni",
      },
    ],
  },
  {
    id: "21",
    name: "2+1 Tek Katlı Prefabrik Ev 75 m2",
    slug: "2-1-tek-katli-prefabrik-ev-75-m2",
    area: "75",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "592800",
    oldPrice: "612900",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-75.webp",
        alt: "2+1 Tek Katlı Prefabrik Ev 75 m2 şık dış görünüş",
      },
    ],
  },
  {
    id: "22",
    name: "2+1 Tek Katlı Prefabrik Ev 77 m2",
    slug: "2-1-tek-katli-prefabrik-ev-77-m2",
    area: "77",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "608700",
    oldPrice: "648600",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-77.webp",
        alt: "2+1 Tek Katlı Prefabrik Ev 77 m2 görsel",
      },
      {
        src: "tek-katli-prefabrik-2+1-77-plan-1.webp",
        alt: "2+1 Tek Katlı Prefabrik Ev 77 m2 plan",
      },
    ],
  },
  {
    id: "23",
    name: "2+1 Tek Katlı Prefabrik Ev 78 m2",
    slug: "2-1-tek-katli-prefabrik-ev-78-m2",
    area: "78",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "616800",
    oldPrice: "676800",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-78.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 78 m2 bina dışı",
      },
      {
        src: "tek-katli-prefabrik-2+1-78-plan-1.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 78 m2 oda planı",
      },
    ],
  },
  {
    id: "24",
    name: "2+1 Tek Katlı Prefabrik Ev 81 m2",
    slug: "2-1-tek-katli-prefabrik-ev-81-m2",
    area: "81",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "644700",
    oldPrice: "694700",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-81-plan-1.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 81 m2 proje planı",
      },
      {
        src: "tek-katli-prefabrik-2+1-81.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 81 m2 bitmiş yapı",
      },
    ],
  },
  {
    id: "34",
    name: "3+1 Tek Katlı Prefabrik Ev 81 m2",
    slug: "3-1-tek-katli-prefabrik-ev-81-m2",
    area: "81",
    room: "3+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "644700",
    oldPrice: "694700",
    img: [
      {
        src: "tek-katli-prefabrik2-3+1-81.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 81 m2 ev modeli",
      },
      {
        src: "tek-katli-prefabrik2-3+1-81-plan-1.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 81 m2 yerleşim planı",
      },
    ],
  },
  {
    id: "25",
    name: "2+1 Tek Katlı Prefabrik Ev 84 m2",
    slug: "2-1-tek-katli-prefabrik-ev-84-m2",
    area: "84",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "627800",
    oldPrice: "687800",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-84.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 84 m2 ev modeli",
      },
      {
        src: "tek-katli-prefabrik-2+1-84-plan-1.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 84 m2 iç planı",
      },
    ],
  },
  {
    id: "35",
    name: "3+1 Tek Katlı Prefabrik Ev 86 m2",
    slug: "3-1-tek-katli-prefabrik-ev-86-m2",
    area: "86",
    room: "3+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "662400",
    oldPrice: "694300",
    img: [
      {
        src: "tek-katli-prefabrik-3+1-86.webp",
        alt: "3+1 Tek Katlı Prefabrik Ev 86 m2 bina görsel",
      },
      {
        src: "tek-katli-prefabrik-3+1-86-plan-1.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 86 m2 şema",
      },
    ],
  },
  {
    id: "26",
    name: "2+1 Tek Katlı Prefabrik Ev 93 m2",
    slug: "2-1-tek-katli-prefabrik-ev-93-m2",
    area: "93",
    room: "2+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "668700",
    oldPrice: "718700",
    img: [
      {
        src: "tek-katli-prefabrik-2+1-93.jpg",
        alt: "2+1 Tek Katlı Prefabrik Ev 93 m2 geniş tasarım",
      },
      {
        src: "tek-katli-prefabrik-2+1-93-plan-1.webp",
        alt: "2+1 Tek Katlı Prefabrik Ev 93 m2 yerleşim planı",
      },
    ],
  },

  {
    id: "36",
    name: "3+1 Tek Katlı Prefabrik Ev 95 m2",
    slug: "3-1-tek-katli-prefabrik-ev-95-m2",
    area: "95",
    room: "3+1",
    floor: "1",
    bath: "2",
    height: "2.5",
    category: "Tek Katlı",
    price: "687900",
    oldPrice: "702900",
    img: [
      {
        src: "tek-katli-prefabrik-3+1-95.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 95 m2 bitmiş ev",
      },
      {
        src: "tek-katli-prefabrik-3+1-95-plan-1.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 95 m2 banyolu plan",
      },
    ],
  },

  {
    id: "37",
    name: "3+1 Tek Katlı Prefabrik Ev 98 m2",
    slug: "3-1-tek-katli-prefabrik-ev-98-m2",
    area: "98",
    room: "3+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "808600",
    oldPrice: "888600",
    img: [
      {
        src: "tek-katli-prefabrik-3+1-98.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 98 m2 villa tipi",
      },
      {
        src: "tek-katli-prefabrik-3+1-98-plan-1.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 98 m2 teknik plan",
      },
    ],
  },
  {
    id: "27",
    name: "3+1 Tek Katlı Prefabrik Ev 112 m2",
    slug: "3-1-tek-katli-prefabrik-ev-112-m2",
    area: "112",
    room: "3+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "817600",
    oldPrice: "867800",
    img: [
      {
        src: "tek-katli-prefabrik-3+1-112.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 112 m2 ana model",
      },
      {
        src: "tek-katli-prefabrik-3+1-112-plan-1.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 112 m2 oda dağılımı",
      },
    ],
  },
  {
    id: "28",
    name: "3+1 Tek Katlı Prefabrik Ev 113 m2",
    slug: "3-1-tek-katli-prefabrik-ev-113-m2",
    area: "113",
    room: "3+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "826900",
    oldPrice: "926900",
    img: [
      {
        src: "tek-katli-prefabrik-3+1-113.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 113 m2 bitmiş ev",
      },
      {
        src: "tek-katli-prefabrik-3+1-113-plan-1.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 113 m2 kat planı",
      },
    ],
  },
  {
    id: "29",
    name: "3+1 Tek Katlı Prefabrik Ev 117 m2",
    slug: "3-1-tek-katli-prefabrik-ev-117-m2",
    area: "117",
    room: "3+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "806900",
    oldPrice: "846900",
    img: [
      {
        src: "tek-katli-prefabrik-3+1-117.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 117 m2 dış görünüş",
      },
      {
        src: "tek-katli-prefabrik-3+1-117-plan-1.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 117 m2 mimari plan",
      },
    ],
  },
  {
    id: "30",
    name: "3+1 Tek Katlı Prefabrik Ev 121 m2",
    slug: "3-1-tek-katli-prefabrik-ev-121-m2",
    area: "121",
    room: "3+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "882600",
    oldPrice: "897400",
    img: [
      {
        src: "tek-katli-prefabrik-3+1-121.webp",
        alt: "3+1 Tek Katlı Prefabrik Ev 121 m2 villa modeli",
      },
      {
        src: "tek-katli-prefabrik-3+1-121-plan-1.jpg",
        alt: "3+1 Tek Katlı Prefabrik Ev 121 m2 plan detayı",
      },
    ],
  },
  {
    id: "31",
    name: "3+1 Tek Katlı Prefabrik Ev 122 m2",
    slug: "3-1-tek-katli-prefabrik-ev-122-m2",
    area: "122",
    room: "3+1",
    floor: "1",
    bath: "2",
    height: "2.5",
    category: "Tek Katlı",
    price: "892700",
    oldPrice: "922700",
    img: [
      {
        src: "tek-katli-prefabrik-3+1-122.webp",
        alt: "3+1 Tek Katlı Prefabrik Ev 122 m2 bina",
      },
      {
        src: "tek-katli-prefabrik-3+1-122-plan-1.webp",
        alt: "3+1 Tek Katlı Prefabrik Ev 122 m2 banyolu plan",
      },
    ],
  },
  {
    id: "32",
    name: "3+1 Tek Katlı Prefabrik Ev 123 m2",
    slug: "3-1-tek-katli-prefabrik-ev-123-m2",
    area: "123",
    room: "3+1",
    floor: "1",
    bath: "2",
    height: "2.5",
    category: "Tek Katlı",
    price: "928700",
    oldPrice: "998700",
    img: [
      {
        src: "tek-katli-prefabrik-3+1-123.webp",
        alt: "3+1 Tek Katlı Prefabrik Ev 123 m2 şık dış",
      },
      {
        src: "tek-katli-prefabrik-3+1-123-plan-1.webp",
        alt: "3+1 Tek Katlı Prefabrik Ev 123 m2 kat dağılımı",
      },
    ],
  },
  {
    id: "33",
    name: "3+1 Tek Katlı Prefabrik Ev 166 m2",
    slug: "3-1-tek-katli-prefabrik-ev-166-m2",
    area: "166",
    room: "3+1",
    floor: "1",
    bath: "1",
    height: "2.5",
    category: "Tek Katlı",
    price: "1156800",
    oldPrice: "1218400",
    img: [
      {
        src: "tek-katli-prefabrik-3+1-166.webp",
        alt: "3+1 Tek Katlı Prefabrik Ev 166 m2 konut tasarımı",
      },
      {
        src: "tek-katli-prefabrik-3+1-166-plan-1.webp",
        alt: "3+1 Tek Katlı Prefabrik Ev 166 m2 çok geniş plan",
      },
    ],
  },
  {
    id: "2",
    name: "2+1 Çift Katlı Prefabrik Ev 82 m2",
    slug: "2-1-cift-katli-prefabrik-ev-82-m2",
    area: "82",
    room: "2+1",
    floor: "2",
    bath: "1",
    height: "2.5",
    category: "Çift Katlı",
    price: "796800",
    oldPrice: "811800",
    img: [
      {
        src: "cift-katli-82.jpg",
        alt: "2+1 Çift Katlı Prefabrik Ev 82 m2 dış tasarım",
      },
      {
        src: "cift-katli-82-plan-1.jpg",
        alt: "2+1 Çift Katlı Prefabrik Ev 82 m2 plan 1",
      },
      {
        src: "cift-katli-82-plan-2.jpg",
        alt: "2+1 Çift Katlı Prefabrik Ev 82 m2 plan 2",
      },
    ],
  },

  {
    id: "3",
    name: "2+1 Çift Katlı Prefabrik Ev 92 m2",
    slug: "2-1-cift-katli-prefabrik-ev-92-m2",
    area: "92",
    room: "2+1",
    floor: "2",
    bath: "1",
    height: "2.5",
    category: "Çift Katlı",
    price: "928600",
    oldPrice: "998600",
    img: [
      {
        src: "cift-katli-prefabrik-92.jpg",
        alt: "2+1 Çift Katlı Prefabrik Ev 92 m2 dış cephe",
      },
      {
        src: "cift-katli-prefabrik-92-plan-2.jpg",
        alt: "2+1 Çift Katlı Prefabrik Ev 92 m2 üst kat planı",
      },
      {
        src: "cift-katli-prefabrik-92-plan-1.jpg",
        alt: "2+1 Çift Katlı Prefabrik Ev 92 m2 alt kat planı",
      },
    ],
  },
  {
    id: "1",
    name: "2+1 Çift Katlı Prefabrik Ev 100 m2",
    slug: "2-1-cift-katli-prefabrik-ev-100-m2",
    area: "100",
    room: "2+1",
    floor: "2",
    bath: "1",
    height: "2.5",
    category: "Çift Katlı",
    price: "896700",
    oldPrice: "914500",
    img: [
      {
        src: "2+1-cift-katli-prefabrik-100m2.jpg",
        alt: "2+1 Çift Katlı Prefabrik Ev 100 m2 dış görünüş",
      },
      {
        src: "2+1-cift-katli-prefabrik-100m2-plan-1.jpg",
        alt: "2+1 Çift Katlı Prefabrik Ev 100 m2 kat planı 1",
      },
      {
        src: "2+1-cift-katli-prefabrik-100m2-plan-2.jpg",
        alt: "2+1 Çift Katlı Prefabrik Ev 100 m2 kat planı 2",
      },
    ],
  },
  {
    id: "5",
    name: "3+1 Çift Katlı Prefabrik Ev 114 m2",
    slug: "3-1-cift-katli-prefabrik-ev-114-m2",
    area: "114",
    room: "3+1",
    floor: "2",
    bath: "2",
    height: "2.5",
    category: "Çift Katlı",
    price: "1063700",
    oldPrice: "1157200",
    img: [
      {
        src: "cift-katli-prefabrik-3+1-114.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 114 m2 model",
      },
      {
        src: "cift-katli-prefabrik-3+1-114-plan-1.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 114 m2 alt kat",
      },
      {
        src: "cift-katli-prefabrik-3+1-114-plan-2.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 114 m2 üst kat",
      },
    ],
  },
  {
    id: "6",
    name: "3+1 Çift Katlı Prefabrik Ev 118 m2",
    slug: "3-1-cift-katli-prefabrik-ev-118-m2",
    area: "118",
    room: "3+1",
    floor: "2",
    bath: "1",
    height: "2.5",
    category: "Çift Katlı",
    price: "1135400",
    oldPrice: "1240400",
    img: [
      {
        src: "cift-katli-prefabrik-3+1-118.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 118 m2 villa",
      },
      {
        src: "cift-katli-prefabrik-3+1-118-plan-2.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 118 m2 mimari 2",
      },
      {
        src: "cift-katli-prefabrik-3+1-118-plan-1.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 118 m2 mimari 1",
      },
    ],
  },
  {
    id: "4",
    name: "3+1 Çift Katlı Prefabrik Ev 122 m2",
    slug: "3-1-cift-katli-prefabrik-ev-122-m2",
    area: "122",
    room: "3+1",
    floor: "2",
    bath: "2",
    height: "2.5",
    category: "Çift Katlı",
    price: "1146800",
    oldPrice: "1210200",
    img: [
      {
        src: "cift-katli-3+1-105.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 122 m2 dış görünüş",
      },
      {
        src: "cift-katli-3+1-105-plan-1.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 122 m2 kat planı 1",
      },
      {
        src: "cift-katli-3+1-105-plan-2.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 122 m2 kat planı 2",
      },
    ],
  },

  {
    id: "7",
    name: "3+1 Çift Katlı Prefabrik Ev 122 m2",
    slug: "3-1-cift-katli-prefabrik-ev-122-m2-v2",
    area: "122",
    room: "3+1",
    floor: "2",
    bath: "2",
    height: "2.5",
    category: "Çift Katlı",
    price: "1146800",
    oldPrice: "1210200",
    img: [
      {
        src: "cift-katli-prefabrik-122.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 122 m2 genel",
      },
      {
        src: "cift-katli-prefabrik-122-plan-1.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 122 m2 plan 1",
      },
      {
        src: "cift-katli-prefabrik-122-plan-2.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 122 m2 plan 2",
      },
    ],
  },
  {
    id: "8",
    name: "3+1 Çift Katlı Prefabrik Ev 131 m2",
    slug: "3-1-cift-katli-prefabrik-ev-131-m2",
    area: "131",
    room: "3+1",
    floor: "2",
    bath: "2",
    height: "2.5",
    category: "Çift Katlı",
    price: "1185600",
    oldPrice: "1287100",
    img: [
      {
        src: "cift-katli-prefabrik-131.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 131 m2 model",
      },
      {
        src: "cift-katli-prefabrik-131-plan-1.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 131 m2 teknik 1",
      },
      {
        src: "cift-katli-prefabrik-131-plan-2.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 131 m2 teknik 2",
      },
    ],
  },
  {
    id: "9",
    name: "3+1 Çift Katlı Prefabrik Ev 134 m2",
    slug: "3-1-cift-katli-prefabrik-ev-134-m2",
    area: "134",
    room: "3+1",
    floor: "2",
    bath: "2",
    height: "2.5",
    category: "Çift Katlı",
    price: "1225600",
    oldPrice: "1390100",
    img: [
      {
        src: "cift-katli-prefabrik-134.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 134 m2 dış",
      },
      {
        src: "cift-katli-prefabrik-134-plan-2.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 134 m2 üst kat",
      },
      {
        src: "cift-katli-prefabrik-134-plan-1.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 134 m2 alt kat",
      },
    ],
  },

  {
    id: "11",
    name: "4+1 Çift Katlı Prefabrik Ev 142 m2",
    slug: "4-1-cift-katli-prefabrik-ev-142-m2",
    area: "142",
    room: "4+1",
    floor: "2",
    bath: "2",
    height: "2.5",
    category: "Çift Katlı",
    price: "1178400",
    oldPrice: "1296800",
    img: [
      {
        src: "cift-katli-prefabrik-4+1-142.jpg",
        alt: "4+1 Çift Katlı Prefabrik Ev 142 m2 genel bakış",
      },
      {
        src: "cift-katli-prefabrik-4+1-142-plan-1.jpg",
        alt: "4+1 Çift Katlı Prefabrik Ev 142 m2 plan a",
      },
      {
        src: "cift-katli-prefabrik-4+1-142-plan-2.jpg",
        alt: "4+1 Çift Katlı Prefabrik Ev 142 m2 plan b",
      },
    ],
  },
  {
    id: "12",
    name: "4+1 Çift Katlı Prefabrik Ev 149 m2",
    slug: "4-1-cift-katli-prefabrik-ev-149-m2",
    area: "149",
    room: "4+1",
    floor: "2",
    bath: "2",
    height: "2.5",
    category: "Çift Katlı",
    price: "1258700",
    oldPrice: "1350000",
    img: [
      {
        src: "cift-katli-prefabrik-4+1-149.jpg",
        alt: "4+1 Çift Katlı Prefabrik Ev 149 m2 komple",
      },
      {
        src: "cift-katli-prefabrik-4+1-149-plan-1.jpg",
        alt: "4+1 Çift Katlı Prefabrik Ev 149 m2 alt plan",
      },
      {
        src: "cift-katli-prefabrik-4+1-149-plan-2.jpg",
        alt: "4+1 Çift Katlı Prefabrik Ev 149 m2 üst plan",
      },
    ],
  },
  {
    id: "10",
    name: "3+1 Çift Katlı Prefabrik Ev 158 m2",
    slug: "3-1-cift-katli-prefabrik-ev-158-m2",
    area: "158",
    room: "3+1",
    floor: "2",
    bath: "2",
    height: "2.5",
    category: "Çift Katlı",
    price: "1317800",
    oldPrice: "1415930",
    img: [
      {
        src: "cift-katli-prefabrik-3+1-158.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 158 m2 bina",
      },
      {
        src: "cift-katli-prefabrik-3+1-158-plan-2.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 158 m2 plan 2",
      },
      {
        src: "cift-katli-prefabrik-3+1-158-plan-1.jpg",
        alt: "3+1 Çift Katlı Prefabrik Ev 158 m2 plan 1",
      },
    ],
  },
  {
    id: "38",
    name: "Çelik Ev 95m2",
    slug: "celik-ev-95m2",
    area: "95",
    room: "4+1",
    floor: "2",
    bath: "3",
    height: "2.8",
    category: "Çelik Ev",

    img: [
      { src: "celik-prefabrik-95.webp", alt: "Çelik Ev 95m2 model 1" },
      { src: "celik-prefabrik-95-2.webp", alt: "Çelik Ev 95m2 model 2" },
      { src: "celik-prefabrik-95-3.webp", alt: "Çelik Ev 95m2 model 3" },
      { src: "celik-prefabrik-95-4.webp", alt: "Çelik Ev 95m2 model 4" },
      { src: "celik-prefabrik-95-5.webp", alt: "Çelik Ev 95m2 model 5" },
    ],
  },
  {
    id: "39",
    name: "Çelik Ev 104m2",
    slug: "celik-ev-104m2",
    area: "104",
    room: "4+1",
    floor: "2",
    bath: "2",
    height: "2.8",
    category: "Çelik Ev",

    img: [
      { src: "celik-prefabrik-104.webp", alt: "Çelik Ev 104m2 görünüş 1" },
      { src: "celik-prefabrik-104-2.webp", alt: "Çelik Ev 104m2 görünüş 2" },
      { src: "celik-prefabrik-104-3.webp", alt: "Çelik Ev 104m2 görünüş 3" },
      { src: "celik-prefabrik-104-4.webp", alt: "Çelik Ev 104m2 görünüş 4" },
      { src: "celik-prefabrik-104-5.webp", alt: "Çelik Ev 104m2 görünüş 5" },
    ],
  },
  {
    id: "40",
    name: "Çelik Ev 120m2",
    slug: "celik-ev-120m2",
    area: "120",
    room: "4+1",
    floor: "2",
    bath: "2",
    height: "2.8",
    category: "Çelik Ev",

    img: [
      { src: "celik-prefabrik-120.webp", alt: "Çelik Ev 120m2 tasarım 1" },
      { src: "celik-prefabrik-120-2.webp", alt: "Çelik Ev 120m2 tasarım 2" },
      { src: "celik-prefabrik-120-3.webp", alt: "Çelik Ev 120m2 tasarım 3" },
      { src: "celik-prefabrik-120-4.webp", alt: "Çelik Ev 120m2 tasarım 4" },
      { src: "celik-prefabrik-120-5.webp", alt: "Çelik Ev 120m2 tasarım 5" },
    ],
  },
  {
    id: "41",
    name: "Çelik Ev 139m2",
    slug: "celik-ev-139m2",
    area: "139",
    room: "5+1",
    floor: "2",
    bath: "2",
    height: "2.5",
    category: "Çelik Ev",

    img: [
      { src: "celik-prefabrik-139.webp", alt: "Çelik Ev 139m2 büyük ev 1" },
      { src: "celik-prefabrik-139-2.webp", alt: "Çelik Ev 139m2 büyük ev 2" },
      { src: "celik-prefabrik-139-3.webp", alt: "Çelik Ev 139m2 büyük ev 3" },
      { src: "celik-prefabrik-139-4.webp", alt: "Çelik Ev 139m2 büyük ev 4" },
      { src: "celik-prefabrik-139-5.webp", alt: "Çelik Ev 139m2 büyük ev 5" },
    ],
  },
  {
    id: "42",
    name: "Çelik Ev 140m2",
    slug: "celik-ev-140m2",
    area: "140",
    room: "4+1",
    floor: "2",
    bath: "2",
    height: "2.8",
    category: "Çelik Ev",

    img: [
      { src: "celik-prefabrik-140.webp", alt: "Çelik Ev 140m2 cephe 1" },
      { src: "celik-prefabrik-140-2.webp", alt: "Çelik Ev 140m2 cephe 2" },
      { src: "celik-prefabrik-140-3.webp", alt: "Çelik Ev 140m2 cephe 3" },
      { src: "celik-prefabrik-140-4.webp", alt: "Çelik Ev 140m2 cephe 4" },
      { src: "celik-prefabrik-140-5.webp", alt: "Çelik Ev 140m2 cephe 5" },
    ],
  },
  {
    id: "43",
    name: "Çelik Ev 143m2",
    slug: "celik-ev-143m2",
    area: "143",
    room: "4+1",
    floor: "2",
    bath: "2",
    height: "2.8",
    category: "Çelik Ev",

    img: [
      { src: "celik-prefabrik-143.webp", alt: "Çelik Ev 143m2 villa 1" },
      { src: "celik-prefabrik-143-2.webp", alt: "Çelik Ev 143m2 villa 2" },
      { src: "celik-prefabrik-143-3.webp", alt: "Çelik Ev 143m2 villa 3" },
      { src: "celik-prefabrik-143-4.webp", alt: "Çelik Ev 143m2 villa 4" },
      { src: "celik-prefabrik-143-5.webp", alt: "Çelik Ev 143m2 villa 5" },
    ],
  },
  {
    id: "44",
    name: "Çelik Ev 146m2",
    slug: "celik-ev-146m2",
    area: "146",
    room: "4+1",
    floor: "null",
    bath: "2",
    height: "2.8",
    category: "Çelik Ev",

    img: [
      { src: "celik-prefabrik-146.webp", alt: "Çelik Ev 146m2 modern 1" },
      { src: "celik-prefabrik-146-2.webp", alt: "Çelik Ev 146m2 modern 2" },
      { src: "celik-prefabrik-146-3.webp", alt: "Çelik Ev 146m2 modern 3" },
      { src: "celik-prefabrik-146-4.webp", alt: "Çelik Ev 146m2 modern 4" },
      { src: "celik-prefabrik-146-5.webp", alt: "Çelik Ev 146m2 modern 5" },
    ],
  },
  {
    id: "45",
    name: "Çelik Ev 159m2",
    slug: "celik-ev-159m2",
    area: "159",
    room: "6+1",
    floor: "null",
    bath: "2",
    height: "2.8",
    category: "Çelik Ev",

    img: [
      { src: "celik-prefabrik-159.webp", alt: "Çelik Ev 159m2 geniş 1" },
      { src: "celik-prefabrik-159-2.webp", alt: "Çelik Ev 159m2 geniş 2" },
      { src: "celik-prefabrik-159-3.webp", alt: "Çelik Ev 159m2 geniş 3" },
      { src: "celik-prefabrik-159-4.webp", alt: "Çelik Ev 159m2 geniş 4" },
      { src: "celik-prefabrik-159-5.webp", alt: "Çelik Ev 159m2 geniş 5" },
    ],
  },
  // {
  //   id: "46",
  //   name: "Çelik Ev 170m2",
  //   slug: "celik-ev-170m2",
  //   area: "170",
  //   room: "3+1",
  //   floor: "2",
  //   bath: "2",
  //   height: "2.8",
  //   category: "Çelik Ev",

  //   img: [],
  // },
];
