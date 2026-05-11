"use client";

import { ProductCard } from "@/components/ProductCard";
import {
  ALL_PRODUCTS_PATH,
  getCategoryDisplayName,
  getCategoryHref,
} from "@/lib/productRoutes";
import { DBCategory, DBProduct } from "@/types/product";
import {
  ArrowUpRight,
  ChevronRight,
  Factory,
  Filter,
  Home,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProjectGalleryModal = dynamic(
  () =>
    import("./ModalSliderImage").then((module) => module.ProjectGalleryModal),
  {
    ssr: false,
  },
);

interface ProductsClientProps {
  products: DBProduct[];
  categories: DBCategory[];
  activeCategory?: string;
  searchQuery?: string;
}

type CategoryKey = "all" | "single" | "double" | "steel";
type RoomKey = "1+1" | "2+1" | "3+1" | "4+1";
type ExtendedCategoryKey =
  | CategoryKey
  | "room-1-1"
  | "room-2-1"
  | "room-3-1"
  | "room-4-1";

const CURRENT_YEAR = new Date().getFullYear();

function includesRoom(value: string | undefined, room: RoomKey) {
  if (!value) return false;
  const normalized = value.toLowerCase();
  const target = room.toLowerCase();
  return (
    normalized.includes(target) ||
    normalized.includes(target.replace("+", "-")) ||
    normalized.includes(target.replace("+", " + "))
  );
}

function getCategoryKey(
  categoryName?: string,
  categorySlug?: string,
): ExtendedCategoryKey {
  if (!categoryName && !categorySlug) return "all";

  if (includesRoom(categorySlug, "1+1") || includesRoom(categoryName, "1+1")) {
    return "room-1-1";
  }
  if (includesRoom(categorySlug, "2+1") || includesRoom(categoryName, "2+1")) {
    return "room-2-1";
  }
  if (includesRoom(categorySlug, "3+1") || includesRoom(categoryName, "3+1")) {
    return "room-3-1";
  }
  if (includesRoom(categorySlug, "4+1") || includesRoom(categoryName, "4+1")) {
    return "room-4-1";
  }

  if (categoryName?.includes("Tek Kat")) return "single";
  if (categoryName?.includes("Çift Kat") || categoryName?.includes("Dubleks")) {
    return "double";
  }
  if (categoryName?.includes("Çelik")) return "steel";
  return "all";
}

function normalizeSearchValue(value: string | null | undefined) {
  return (value ?? "").toLocaleLowerCase("tr-TR").trim();
}

function productMatchesQuery(product: DBProduct, query: string) {
  const searchableText = [
    product.name,
    product.slug,
    product.area,
    product.room,
    product.floor,
    product.bath,
    product.height,
    product.price,
    product.oldPrice,
    product.description,
    product.metaDescription,
    product.category?.name,
    product.category?.title,
    product.category?.slug,
    ...(product.categories?.flatMap((item) => [
      item.name,
      item.title,
      item.slug,
    ]) ?? []),
  ]
    .map((item) => normalizeSearchValue(item))
    .join(" ");

  return searchableText.includes(query);
}

function getRoomPageContent(room: RoomKey) {
  return {
    eyebrow: `${room} Ürün Seçkisi`,
    title: `${room} Ölçü ve Proje Uygunluğu`,
    description:
      "Ürünleri ölçü, kullanım alanı ve sevkiyat ihtiyacına göre karşılaştırın.",
    seoTitle: `Beton Ürün Ölçüleri ve Proje Seçimi ${CURRENT_YEAR}`,
    seoDescription:
      "Beton ürünlerinde doğru seçim; ölçü, yük sınıfı, kullanım alanı, bağlantı tipi, adet ve sevkiyat planı birlikte değerlendirilerek yapılır.",
    seoCards: [
      {
        title: "Ürün Ölçüsü Nasıl Netleştirilir?",
        text: "Beton boru, baca elemanı, bordür, parke taşı veya menfez seçiminde proje ölçüsü, uygulama alanı ve ihtiyaç duyulan adet birlikte değerlendirilmelidir.",
      },
      {
        title: "Teklif İçin Hangi Bilgiler Gerekir?",
        text: "Ürün adı, yaklaşık ölçü, adet, teslim adresi ve kullanım alanı bilgisi teklif sürecini hızlandırır.",
      },
      {
        title: "Sahaya Uygun Ürün Nasıl Seçilir?",
        text: "Altyapı, yol, kaldırım, otopark, şantiye veya peyzaj ihtiyacına göre ürün grubu ve teknik beklenti birlikte ele alınmalıdır.",
      },
    ],
  };
}

function getPageContent(categoryName?: string, categorySlug?: string) {
  const categoryKey = getCategoryKey(categoryName, categorySlug);

  if (categoryKey === "room-1-1") return getRoomPageContent("1+1");
  if (categoryKey === "room-2-1") return getRoomPageContent("2+1");
  if (categoryKey === "room-3-1") return getRoomPageContent("3+1");
  if (categoryKey === "room-4-1") return getRoomPageContent("4+1");

  if (categoryKey === "single") {
    return {
      eyebrow: "Altyapı Beton Ürünleri",
      title: "Beton Boru ve Baca Elemanları",
      description:
        "Beton boru, betonarme boru, muayene bacası, parsel bacası ve yağmur suyu elemanlarını proje ihtiyacına göre inceleyin.",
      seoTitle: `Beton Boru ve Baca Elemanları ${CURRENT_YEAR}`,
      seoDescription:
        "Beton boru, betonarme boru, contalı boru ve baca elemanlarında doğru seçim; çap, bağlantı tipi, yük ihtiyacı, hat amacı ve sevkiyat planına göre yapılır.",
      seoCards: [
        {
          title: "Beton Boru Seçimi",
          text: "Yağmur suyu, atık su ve drenaj hatlarında beton boru veya betonarme boru seçimi; çap, hat yükü, bağlantı yapısı ve proje şartlarına göre değerlendirilmelidir.",
        },
        {
          title: "Rögar ve Menhol Elemanları",
          text: "Muayene baca gövdesi, baca tabanı, parsel baca gövdesi, konik eleman ve baca yükseltme halkası altyapı hatlarında erişim ve bakım için kullanılır.",
        },
        {
          title: "Yağmur Suyu Ürünleri",
          text: "Yağmur suyu ızgara tabanları ve oluk taşları yol, otopark ve saha zeminlerinde suyun kontrollü şekilde toplanmasına yardımcı olur.",
        },
      ],
    };
  }

  if (categoryKey === "double") {
    return {
      eyebrow: "Üst Yapı Beton Ürünleri",
      title: "Bordür, Parke Taşı ve Çevre Düzenleme Ürünleri",
      description:
        "Bordür taşı, parke taşı, oluk taşı, çim taşı, şev taşı ve beton bariyer ürünlerini kullanım alanına göre karşılaştırın.",
      seoTitle: `Bordür Taşı, Parke Taşı ve Beton Saha Ürünleri ${CURRENT_YEAR}`,
      seoDescription:
        "Bordür taşı, parke taşı, oluk taşı, çim taşı, şev taşı ve beton bariyer seçiminde zemin kullanımı, trafik yükü, drenaj ihtiyacı ve uygulama alanı dikkate alınır.",
      seoCards: [
        {
          title: "Bordür Taşı Nerede Kullanılır?",
          text: "Bordür taşları yol kenarı, kaldırım, refüj, bahçe ve otopark sınırlarında zemini düzenli bitirmek için kullanılır.",
        },
        {
          title: "Parke Taşı ve Oluk Taşı",
          text: "Parke taşları yaya yolu, site içi yol, otopark ve bahçe zeminlerinde; oluk taşları ise yüzey suyunu yönlendirmek gereken alanlarda tercih edilir.",
        },
        {
          title: "Şev Taşı ve Beton Bariyer",
          text: "Şev taşı ve Terra Blok eğimli arazilerde düzenleme için; beton bariyer ise şantiye, yol ve saha güvenliği için kullanılır.",
        },
      ],
    };
  }

  if (categoryKey === "steel") {
    return {
      eyebrow: "Proje Tedariki",
      title: "Beton Ürünlerinde Ölçü, Adet ve Sevkiyat Planı",
      description:
        "Şantiye, belediye, altyapı ve çevre düzenleme projeleri için beton ürün tedarikini planlayın.",
      seoTitle: `Beton Ürünleri Tedarik ve Teklif Süreci ${CURRENT_YEAR}`,
      seoDescription:
        "Beton ürünlerinde teklif süreci ürün grubu, ölçü, adet, teslim adresi, stok durumu ve proje programına göre netleşir.",
      seoCards: [
        {
          title: "Teklif Süreci Nasıl Başlar?",
          text: "Ürün adı, yaklaşık adet, ölçü ve teslim adresi paylaşıldığında stok, üretim ve sevkiyat uygunluğu daha hızlı değerlendirilir.",
        },
        {
          title: "Toplu Alım ve Kurumsal Tedarik",
          text: "Belediye, müteahhit, sanayi tesisi ve altyapı projeleri için toplu ürün talepleri proje bazında planlanabilir.",
        },
        {
          title: "Sevkiyat Planı Neye Göre Oluşur?",
          text: "Sevkiyat planı ürün hacmi, teslim lokasyonu, saha programı ve araç uygunluğu gibi başlıklar birlikte değerlendirilerek oluşturulur.",
        },
      ],
    };
  }

  return {
    eyebrow: "Hürtaş Beton Ürün Seçkisi",
    title: "Tüm Beton Ürünleri",
    description:
      "Altyapı, üst yapı ve çevre düzenleme projeleri için beton ürünlerini kategori, kullanım alanı ve proje ihtiyacına göre inceleyin.",
    seoTitle: `Beton Boru, Baca, Bordür ve Parke Taşı Ürünleri ${CURRENT_YEAR}`,
    seoDescription:
      "Hürtaş Beton; beton boru, betonarme boru, baca elemanları, kutu menfez, bordür taşı, parke taşı, oluk taşı, şev taşı, beton bariyer, briket ve çim taşı ürünlerini proje ihtiyacına göre sunar.",
    seoCards: [
      {
        title: "Beton Boru ve Betonarme Borular",
        text: "Beton borular, betonarme borular, entegre contalı borular ve lambazıvana borular yağmur suyu, atık su ve drenaj hatlarında kullanılır.",
      },
      {
        title: "Muayene Bacası, Parsel Bacası ve Menhol",
        text: "Muayene baca gövdesi, baca tabanı, parsel baca elemanları, konik elemanlar ve baca yükseltme halkaları altyapı erişim noktalarında kullanılır.",
      },
      {
        title: "Bordür, Parke Taşı ve Çevre Düzenleme",
        text: "Bordür taşı, parke taşı, oluk taşı, çim taşı, şev taşı ve Terra Blok ürünleri yol, kaldırım, otopark ve peyzaj düzenlemelerinde tercih edilir.",
      },
      {
        title: "Kutu Menfez ve Saha Güvenliği Ürünleri",
        text: "Beton kutu menfez, beton bariyer ve briket gibi ürünler altyapı geçişleri, şantiye düzeni ve saha ihtiyaçları için değerlendirilir.",
      },
      {
        title: "Doğru Ürün İçin Teklif Bilgileri",
        text: "Ürün adı, ölçü, adet, teslim adresi ve kullanım alanı bilgisi paylaşıldığında doğru ürün ve sevkiyat planı daha hızlı netleşir.",
      },
    ],
  };
}

function ProductSidebarMenu({
  categories,
  activeCategory,
  onNavigate,
}: {
  categories: DBCategory[];
  activeCategory?: string;
  onNavigate?: () => void;
}) {
  const quickLinks = [
    {
      label: "Tümü",
      href: ALL_PRODUCTS_PATH,
      active: !activeCategory,
      icon: Home,
    },
  ];

  return (
    <aside>
      <div className="border border-[#223955] bg-[#0d1f36] text-white shadow-[0_24px_54px_-42px_rgba(13,31,54,0.75)]">
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1 bg-[#d6a94a]" aria-hidden="true" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
                Ürün Menüsü
              </p>
              <h2 className="mt-1 text-lg font-black uppercase tracking-tight">
                Beton Ürünleri
              </h2>
            </div>
          </div>
        </div>

        <nav className="p-3" aria-label="Ürün kategorileri">
          <p className="px-2 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Hızlı Seçim
          </p>
          <div className="space-y-1">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onNavigate}
                  className={`group flex min-h-11 items-center justify-between border px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition-colors ${
                    item.active
                      ? "border-[#d6a94a] bg-[#d6a94a] text-[#0d1f36]"
                      : "border-white/10 bg-[#132945] text-slate-200 hover:border-white/25 hover:bg-[#183456] hover:text-white"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>

          <div className="my-4 h-px bg-white/10" />

          <p className="px-2 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Kategoriler
          </p>
          <div className="space-y-1">
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;
              const categoryLabel = getCategoryDisplayName(category);

              return (
                <Link
                  key={category.id}
                  href={getCategoryHref(categories, category)}
                  onClick={onNavigate}
                  className={`group flex min-h-11 items-center justify-between border px-3 py-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "border-[#d6a94a] bg-[#d6a94a] text-[#0d1f36]"
                      : "border-white/10 bg-transparent text-slate-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Factory className="h-4 w-4 shrink-0" />
                    <span className="min-w-0 break-words leading-snug">
                      {categoryLabel}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}

function getFilledText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function SeoFooter({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  if (!title && !description) return null;

  return (
    <section className="mt-60 border-t border-slate-200 pt-8">
      <div className="max-w-3xl">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
          Ürün Bilgisi
        </p>
        {title ? (
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#152f51] md:text-3xl">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}

const ProductsClient = ({
  products,
  categories,
  activeCategory,
  searchQuery = "",
}: ProductsClientProps) => {
  const [selectedProduct, setSelectedProduct] = useState<DBProduct | null>(
    null,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const normalizedSearchQuery = normalizeSearchValue(searchQuery);
  const visibleProducts = normalizedSearchQuery
    ? products.filter((product) =>
        productMatchesQuery(product, normalizedSearchQuery),
      )
    : products;

  const activeCategoryItem = activeCategory
    ? categories.find((category) => category.slug === activeCategory)
    : undefined;
  const activeCategoryName = activeCategoryItem?.name;
  const activeCategoryLabel = activeCategoryItem
    ? getCategoryDisplayName(activeCategoryItem)
    : undefined;

  const content = getPageContent(activeCategoryName, activeCategory);
  const headerEyebrow =
    getFilledText(activeCategoryItem?.name) ?? content.eyebrow;
  const headerTitle =
    getFilledText(activeCategoryItem?.title) ??
    activeCategoryName ??
    content.title;
  const headerDescription =
    getFilledText(activeCategoryItem?.description) ??
    (activeCategoryItem ? undefined : content.description);
  const bottomTitle = getFilledText(activeCategoryItem?.subtitle);
  const bottomDescription = getFilledText(activeCategoryItem?.subdescription);
  const hasBottomContent = Boolean(bottomTitle || bottomDescription);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="w-full max-w-[1280px]">
      {selectedProduct ? (
        <ProjectGalleryModal
          projects={selectedProduct.images.map((image, index) => ({
            id: index,
            img: image.url,
            title: image.alt,
          }))}
          isOpen
          onClose={() => setSelectedProduct(null)}
        />
      ) : null}

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-[90] bg-[#0d1f36] text-white lg:hidden">
          <div className="flex h-full flex-col">
            <div className="flex min-h-16 items-center justify-between border-b border-white/10 px-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
                  Ürün Menüsü
                </p>
                <p className="mt-1 text-sm font-black uppercase tracking-[0.08em] text-white">
                  Kategori Seç
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white"
                aria-label="Ürün menüsünü kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
              <ProductSidebarMenu
                categories={categories}
                activeCategory={activeCategory}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      ) : null}

      <section className="pb-20">
        <section className="pb-10 pt-14 lg:pb-12 lg:pt-18">
          <div className="relative py-2">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-secondary">
                {headerEyebrow}
              </p>
              <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                {headerTitle}
              </h1>
              {headerDescription ? (
                <p className="mx-auto mt-3 max-w-5xl text-sm font-medium leading-7 text-slate-600">
                  {headerDescription}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <div className="mb-5 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex min-h-14 w-full items-center justify-between border border-[#152f51] bg-[#0d1f36] px-4 text-left text-white shadow-[0_18px_38px_-30px_rgba(13,31,54,0.8)]"
          >
            <span className="flex min-w-0 items-center gap-3">
              <Filter className="h-5 w-5 shrink-0 text-[#d6a94a]" />
              <span>
                <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#d6a94a]">
                  Ürün Menüsü
                </span>
                <span className="block text-sm font-black uppercase tracking-[0.08em]">
                  Kategorileri Aç
                </span>
              </span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0" />
          </button>
        </div>

        <div className="grid gap-7 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-start">
          <div className="hidden lg:block">
            <ProductSidebarMenu
              categories={categories}
              activeCategory={activeCategory}
            />
          </div>

          <div className="min-w-0">
            {visibleProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-slate-300 bg-white px-6 py-20">
                <div className="mb-6 flex h-20 w-20 items-center justify-center border border-slate-200 bg-slate-100">
                  <Filter size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Ürün Bulunamadı
                </h3>
                <p className="mt-2 max-w-md text-center text-slate-500">
                  {normalizedSearchQuery
                    ? `"${searchQuery}" araması için uygun ürün bulunamadı.`
                    : activeCategoryLabel
                      ? `"${activeCategoryLabel}" kategorisinde henüz ürün bulunmuyor.`
                      : "Henüz ürün eklenmemiş."}
                </p>
                <Link
                  href={ALL_PRODUCTS_PATH}
                  className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                >
                  Tüm Ürünleri Gör
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categories={categories}
                    fullscreenChange={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {hasBottomContent ? (
          <SeoFooter title={bottomTitle} description={bottomDescription} />
        ) : null}
      </section>
    </div>
  );
};

export default ProductsClient;
