export const DEFAULT_LOCALE = "tr" as const;
export const LOCALES = ["tr", "en", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.hurtasbeton.com";

export const LANGUAGE_OPTIONS: Array<{
  locale: Locale;
  label: string;
  shortLabel: string;
}> = [
  { locale: "tr", label: "Türkçe", shortLabel: "TR" },
  { locale: "en", label: "English", shortLabel: "EN" },
  { locale: "ar", label: "العربية", shortLabel: "AR" },
];

function getFilledText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function isLocale(value: string | null | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

function ensureLeadingSlash(pathname: string) {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function stripLocaleFromPathname(pathname: string) {
  const normalized = ensureLeadingSlash(pathname);
  const segments = normalized.split("/").filter(Boolean);

  if (isLocale(segments[0])) {
    const stripped = `/${segments.slice(1).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/+$/, "") || "/";
  }

  return normalized === "/" ? "/" : normalized.replace(/\/+$/, "");
}

export function localizePath(path: string, locale: Locale) {
  if (
    !path ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const [pathAndQuery, hash] = path.split("#");
  const [pathname, query] = pathAndQuery.split("?");
  const cleanPathname = stripLocaleFromPathname(pathname || "/");
  const localizedPathname =
    locale === DEFAULT_LOCALE
      ? cleanPathname
      : cleanPathname === "/"
        ? `/${locale}`
        : `/${locale}${cleanPathname}`;

  return `${localizedPathname}${query ? `?${query}` : ""}${
    hash ? `#${hash}` : ""
  }`;
}

export function getLocalizedUrl(path: string, locale: Locale) {
  return `${SITE_URL}${localizePath(path, locale)}`;
}

export function getAlternateLanguages(path: string) {
  return {
    tr: getLocalizedUrl(path, "tr"),
    en: getLocalizedUrl(path, "en"),
    ar: getLocalizedUrl(path, "ar"),
    "x-default": getLocalizedUrl(path, "tr"),
  };
}

export function getMetadataAlternates(path: string, locale: Locale) {
  return {
    canonical: getLocalizedUrl(path, locale),
    languages: getAlternateLanguages(path),
  };
}

export function pickLocalizedText(
  locale: Locale,
  tr: string | null | undefined,
  en?: string | null,
  ar?: string | null,
) {
  if (locale === "en") {
    return getFilledText(en) ?? getFilledText(tr) ?? "";
  }

  if (locale === "ar") {
    return getFilledText(ar) ?? getFilledText(en) ?? getFilledText(tr) ?? "";
  }

  return getFilledText(tr) ?? getFilledText(en) ?? getFilledText(ar) ?? "";
}

export function getLocalizedCategoryDisplayName<
  T extends {
    name: string;
    nameEn?: string | null;
    nameAr?: string | null;
    title?: string | null;
    titleEn?: string | null;
    titleAr?: string | null;
  },
>(category: T, locale: Locale = DEFAULT_LOCALE) {
  if (locale === "en") {
    return (
      getFilledText(category.titleEn) ??
      getFilledText(category.nameEn) ??
      getFilledText(category.title) ??
      category.name
    );
  }

  if (locale === "ar") {
    return (
      getFilledText(category.titleAr) ??
      getFilledText(category.nameAr) ??
      getFilledText(category.titleEn) ??
      getFilledText(category.nameEn) ??
      getFilledText(category.title) ??
      category.name
    );
  }

  return getFilledText(category.title) ?? category.name;
}

export function getLocalizedCategoryField<
  T extends Partial<
    Record<
      | "name"
      | "nameEn"
      | "nameAr"
      | "title"
      | "titleEn"
      | "titleAr"
      | "description"
      | "descriptionEn"
      | "descriptionAr"
      | "subtitle"
      | "subtitleEn"
      | "subtitleAr"
      | "subdescription"
      | "subdescriptionEn"
      | "subdescriptionAr",
      string | null | undefined
    >
  >,
>(
  category: T,
  field: "name" | "title" | "description" | "subtitle" | "subdescription",
  locale: Locale,
) {
  const suffix = locale === "en" ? "En" : locale === "ar" ? "Ar" : "";
  const localizedKey = `${field}${suffix}`;

  return (
    getFilledText(
      category[localizedKey as keyof T] as string | null | undefined,
    ) ??
    (locale === "ar"
      ? getFilledText(
          category[`${field}En` as keyof T] as string | null | undefined,
        )
      : undefined) ??
    getFilledText(category[field])
  );
}

export function getLocalizedProductName<
  T extends { name: string; nameEn?: string | null; nameAr?: string | null },
>(product: T, locale: Locale = DEFAULT_LOCALE) {
  return pickLocalizedText(
    locale,
    product.name,
    product.nameEn,
    product.nameAr,
  );
}

export function getLocalizedProductDescription<
  T extends {
    description?: string | null;
    descriptionEn?: string | null;
    descriptionAr?: string | null;
  },
>(product: T, locale: Locale = DEFAULT_LOCALE) {
  return pickLocalizedText(
    locale,
    product.description,
    product.descriptionEn,
    product.descriptionAr,
  );
}

export function getLocalizedProductMetaDescription<
  T extends {
    metaDescription?: string | null;
    metaDescriptionEn?: string | null;
    metaDescriptionAr?: string | null;
  },
>(product: T, locale: Locale = DEFAULT_LOCALE) {
  return pickLocalizedText(
    locale,
    product.metaDescription,
    product.metaDescriptionEn,
    product.metaDescriptionAr,
  );
}

export function getLocalizedImageAlt<
  T extends { alt: string; altEn?: string | null; altAr?: string | null },
>(image: T, locale: Locale = DEFAULT_LOCALE) {
  return pickLocalizedText(locale, image.alt, image.altEn, image.altAr);
}

export function getLocalizedProjectTitle<
  T extends { title: string; titleEn?: string | null; titleAr?: string | null },
>(project: T, locale: Locale = DEFAULT_LOCALE) {
  return pickLocalizedText(
    locale,
    project.title,
    project.titleEn,
    project.titleAr,
  );
}

export const dictionaries = {
  tr: {
    common: {
      brand: "Hürtaş",
      companyName: "Hürtaş Beton",
      brandTagline: "Beton Elemanları",
      whatsapp: "WhatsApp",
      contact: "İletişim",
      callNow: "Hemen Ara",
      callUs: "Bizi Arayın",
      viewProducts: "Ürünleri İncele",
      viewAll: "Tümünü Gör",
      inspect: "İncele",
      requestQuote: "Teklif Alın",
      requestQuoteShort: "Teklif Al",
      productCount: "Ürün",
      copied: "Kopyalandı",
      home: "Ana Sayfa",
      allProducts: "Tüm Ürünler",
      concreteProducts: "Beton Ürünleri",
      productInfo: "Ürün Bilgisi",
      noImage: "Görsel yok",
      previous: "Önceki",
      next: "Sonraki",
      minutes: "dk",
    },
    seo: {
      siteTitle: "Hürtaş Beton | Beton Boru, Baca, Bordür ve Parke Taşı",
      siteDescription:
        "Beton boru, parke taşı, bordür ve altyapı elemanları için Hürtaş Beton ile iletişime geçin.",
      siteOgTitle: "Hürtaş Beton | Beton Altyapı ve Üst Yapı Elemanları",
      siteOgDescription:
        "Beton boru, betonarme boru, baca elemanları, kutu menfez, bordür, parke taşı ve saha beton ürünleri için Hürtaş Beton.",
      locale: "tr_TR",
      category: "Construction Materials",
      homeTitle:
        "Hürtaş Beton | Beton Boru, Rögar, Menhol, Bordür ve Parke Taşı",
      homeDescription:
        "Hürtaş Beton; beton boru, betonarme boru, muayene bacası, parsel bacası, kutu menfez, bordür taşı, parke taşı, şev taşı ve beton bariyer üretimi yapar.",
      productsTitle: "Tüm Ürünler | Hürtaş Beton",
      productsDescription:
        "Hürtaş Beton altyapı, üst yapı ve çevre düzenleme ürünlerini kategori bazında inceleyin.",
      blogTitle: "Blog | Hürtaş Beton",
      blogDescription:
        "Beton boru, parke taşı, bordür ve altyapı beton ürünleri hakkında ürün seçimi, tedarik ve uygulama rehberleri.",
      galleryTitle:
        "Galeri | Hürtaş Beton Boru, Baca, Bordür ve Parke Görselleri",
      galleryDescription:
        "Hürtaş Beton galerisinde beton boru, baca elemanları, kutu menfez, bordür, parke taşı ve saha beton ürünleri görsellerini inceleyin.",
      aboutTitle: "Hakkımızda | Hürtaş Beton Elemanları",
      aboutDescription:
        "Hürtaş Beton hakkında bilgi alın. Beton boru, parke taşı, bordür, menhol ve çevre düzenleme ürünlerinde üretim yaklaşımımızı inceleyin.",
      contactTitle: "İletişim | Hürtaş Beton - Bize Ulaşın",
      contactDescription:
        "Hürtaş Beton ile iletişime geçin. Beton elemanları için telefon, e-posta ve adres bilgilerimize ulaşın.",
      brandsTitle: "Çalıştığımız Markalar | Hürtaş Beton",
      brandsDescription:
        "Hürtaş Beton'un beton elemanları tedarikinde çalıştığı sektörler, proje tipleri ve iş ortaklığı yaklaşımı hakkında bilgi alın.",
      argeTitle: "Arge | Hürtaş Beton",
      argeDescription:
        "Hürtaş Beton'un beton elemanlarında üretim geliştirme, kalite kontrol ve saha ihtiyaçlarına uygun çözüm yaklaşımı hakkında bilgi alın.",
      tseTitle: "TSE Onaylı Belgeler | Hürtaş Beton",
      tseDescription:
        "Hürtaş Beton'un TSE onaylı belge yaklaşımı, kalite standardı ve beton elemanları üretim süreçleri hakkında bilgi alın.",
      notFoundTitle: "Sayfa Bulunamadı | Hürtaş Beton",
      productNotFoundTitle: "Ürün Bulunamadı | Hürtaş Beton",
      productNotFoundDescription: "Aradığınız ürün bulunamadı.",
      categoryNotFoundTitle: "Kategori Bulunamadı",
    },
    nav: {
      corporate: "Kurumsal",
      gallery: "Galeri",
      katalog: "katalog",
      blog: "Blog",
      contact: "İletişim",
      brands: "Çalıştığımız Markalar",
      about: "Hakkımızda",
      arge: "Arge",
      tse: "TSE Onaylı Belgeler",
      otherPages: "Diğer Sayfalar",
      productCategory: "Ürün kategorisi",
      searchProduct: "Ürün ara",
      searchPlaceholder: "Ürün ara...",
      allCategoryPrefix: "Tüm",
      noSearchResults: "Bu aramaya uygun ürün bulunamadı.",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      menu: "Menü",
      close: "Kapat",
      language: "Dil seçimi",
    },
    hero: {
      slides: [
        {
          title: "Hürtaş ile Güçlü Altyapı Çözümleri",
          desc: "Beton boru, parke taşı, bordür ve altyapı elemanlarında dayanıklı üretim, düzenli sevkiyat ve güvenilir tedarik sağlıyoruz.",
        },
        {
          title: "Şantiye ve Belediye Projelerine Uygun Beton Ürünleri",
          desc: "Yol, çevre düzenleme ve altyapı ihtiyaçları için standartlara uygun beton elemanları zamanında teslim ediyoruz.",
        },
        {
          title: "Üretimden Teslimata Planlı Beton Elemanı Tedariki",
          desc: "Projenizin ihtiyacına göre doğru ürün, doğru adet ve doğru sevkiyat planıyla iş akışınızı hızlandırıyoruz.",
        },
      ],
      features: [
        "Dayanıklı Beton Üretimi",
        "Planlı Sevkiyat",
        "Altyapı ve Çevre Düzenleme Ürünleri",
      ],
      marquee: [
        "Beton Boru",
        "Parke Taşı",
        "Bordür",
        "Menhol",
        "Yağmur Oluğu",
        "Altyapı Elemanları",
        "Şantiye Tedariki",
        "Planlı Sevkiyat",
      ],
      prevSlide: "Önceki slayt",
      nextSlide: "Sonraki slayt",
    },
    homeAbout: {
      eyebrow: "Hürtaş Beton Elemanları",
      title: "Projenize uygun beton ürünlerine hızlı ulaşın.",
      description:
        "Altyapı ve üst yapı projeleri için beton boru, parke taşı, bordür, menhol ve saha düzenleme ürünlerinde dayanıklı üretim, net planlama ve zamanında teslim yaklaşımıyla çalışıyoruz.",
      about: "Hakkımızda",
      quickAccess: "Ürünlere Hızlı Geçiş",
      links: ["Tüm Ürünler", "Beton Boru", "Parke Taşı", "Bordür"],
    },
    structure: {
      label: "Beton Ürünleri",
      items: [
        {
          title: "Altyapı Elemanları",
          description: "Beton boru, menhol ve saha altyapısı.",
          action: "Altyapı Elemanlarını İncele",
        },
        {
          title: "Üst Yapı Elemanları",
          description: "Parke taşı, bordür ve yüzey çözümleri.",
          action: "Üst Yapı Elemanlarını İncele",
        },
      ],
    },
    sliders: {
      environment: {
        title: "Ürünleri",
        accent: "Çevre Düzenleme",
        seoLabel: "Çevre Düzenleme Ürünleri",
        description:
          "Bahçe, yol, kaldırım ve saha düzenlemelerinde kullanılan tamamlayıcı beton ürünlerini bir arada görün.",
      },
      infrastructure: {
        title: "Elemanları",
        accent: "Altyapı",
        seoLabel: "Altyapı Beton Ürünleri",
        description:
          "Beton boru, menhol, baca ve altyapı projeleri için ihtiyaç duyulan dayanıklı beton ürünlerini inceleyin.",
      },
      superstructure: {
        title: "Elemanları",
        accent: "Üst Yapı",
        seoLabel: "Üst Yapı Beton Ürünleri",
        description:
          "Parke taşı, bordür ve saha kaplama çözümleriyle üst yapı projeleriniz için uygun ürünleri keşfedin.",
      },
      featured: {
        title: "Ürünler",
        accent: "Öne Çıkan",
        seoLabel: "Seçili Beton Ürünleri",
        description:
          "Altyapı, üst yapı ve çevre düzenleme projeleri için öne çıkan beton ürünlerini keşfedin.",
      },
      random: {
        title: "Ürünler",
        accent: "Öne Çıkan",
        seoLabel: "Ürünlerimizden Seçmeler",
        description:
          "Hürtaş Beton ürünleri arasından rastgele seçilen modelleri inceleyin.",
      },
      prevProducts: "önceki ürünler",
      nextProducts: "sonraki ürünler",
    },
    faq: {
      label: "Sıkça Sorulan Sorular",
      cta: "Teklif Alın",
      homepageTitle: "Beton Altyapı ve Üst Yapı Ürünleri Hakkında",
      homepageAccent: "En Çok Sorulan Sorular",
      homepageDescription:
        "Beton boru, parsel bacası, bordür taşı, parke taşı, kutu menfez, beton bariyer ve daha fazlası hakkında merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.",
      homepageItems: [
        {
          question: "Hürtaş Beton hangi ürünleri üretiyor?",
          answer:
            "Hürtaş Beton; beton borular, parsel bacaları, baca gövde ve tabanları, kutu menfez, PTT menhol, bordür taşları, parke taşları, beton bariyer ve çevre düzenleme ürünleri üretmektedir.",
        },
        {
          question: "Beton boru fiyatları neye göre değişir?",
          answer:
            "Beton boru fiyatları; boru çapı, et kalınlığı, boru boyu, kullanım amacı ve sipariş miktarına göre değişir.",
        },
        {
          question: "Parsel bacası nedir, ne işe yarar?",
          answer:
            "Parsel bacası, binaların atık su sistemini ana kanalizasyon hattına bağlayan ve bakım için erişim sağlayan beton elemandır.",
        },
        {
          question: "Kutu menfez ne için kullanılır?",
          answer:
            "Kutu menfez, yol altı geçişleri, su kanalları ve dere ıslahı gibi projelerde kullanılan dikdörtgen kesitli beton yapı elemanıdır.",
        },
        {
          question: "Toplu sipariş ve kurumsal alım yapılabilir mi?",
          answer:
            "Evet, belediyeler, müteahhitler, inşaat firmaları ve altyapı proje sahipleri için toplu siparişler proje bazında değerlendirilebilir.",
        },
      ],
    },
    reviews: {
      label: "Müşteri Yorumları",
      title: "Projelerde düzenli tedarik, net iletişim.",
      satisfaction: "Memnuniyet",
      prev: "Önceki yorum",
      next: "Sonraki yorum",
      stars: "5 üzerinden {rating} yıldız",
      slides: [
        {
          productName: "Beton Boru",
          customerName: "Murat K.",
          city: "Kocaeli",
          comment:
            "Altyapı hattı için beton boru tedarikinde ölçü, adet ve sevkiyat planı net ilerledi. Şantiye programımız aksamadı.",
        },
        {
          productName: "Parke Taşı",
          customerName: "Ayşe Y.",
          city: "Tekirdağ",
          comment:
            "Saha düzenlemesi için parke taşı siparişi verdik. Ürün kalitesi ve sevkiyat zamanlaması proje akışına uydu.",
        },
        {
          productName: "Bordür",
          customerName: "Zehra A.",
          city: "Bursa",
          comment:
            "Bordür ürünlerinde ihtiyacımızı hızlı netleştirdiler. Üretim ve teslim süreci beklediğimizden daha düzenli geçti.",
        },
        {
          productName: "Menhol Elemanları",
          customerName: "Hasan D.",
          city: "Sakarya",
          comment:
            "Menhol ve altyapı elemanlarında teknik sorularımıza hızlı dönüş aldık. Doğru ürün seçimi konusunda ekip yardımcı oldu.",
        },
        {
          productName: "Yağmur Oluğu",
          customerName: "Elif T.",
          city: "Balıkesir",
          comment:
            "Drenaj hattı için gerekli ürünleri tek kalemde planladık. Paketleme ve teslimat tarafında düzenli bilgi verildi.",
        },
        {
          productName: "Saha Beton Elemanları",
          customerName: "Mehmet S.",
          city: "Yalova",
          comment:
            "Farklı beton ürünlerini aynı sevkiyat planında toparlayabildik. Satış ekibinin takip disiplini bize zaman kazandırdı.",
        },
      ],
    },
    supply: {
      title: "Projeye hazır beton ürünleri.",
      description:
        "İhtiyacınıza uygun ürün, adet ve sevkiyat planını hızlıca netleştiriyoruz.",
      items: ["Standart üretim", "Net ürün seçimi", "Planlı sevkiyat"],
    },
    drone: {
      eyebrow: "Sahadan Görüntüler",
      title: "Şantiye drone çekimi",
      iframeTitle: "Hürtaş şantiye drone çekimi",
    },
    blog: {
      searchTitle: "Blog Arama",
      searchPlaceholder: "Blog veya kategori ara",
      emptyTitle: "Henüz Blog Yazısı Yok",
      emptyDescription:
        "Yakında beton ürünleri, saha kullanımı ve tedarik planlaması hakkında faydalı içerikler paylaşılacak.",
      noResultTitle: "Sonuç Bulunamadı",
      noResultDescription:
        "ile eşleşen bir blog yazısı ya da kategori bulunamadı.",
      readMore: "Devamını Oku",
      sharePost: "Bu yazıyı paylaş",
      recentTitle: "Son 4 Gönderi",
      newLabel: "Yeni",
      categoriesTitle: "Beton Ürün Kategorileri",
      categoriesDescription: "Ürünleri kategori bazında hızlıca inceleyin.",
      categoryNoResult: "Aramanıza uygun kategori bulunamadı.",
      latestEyebrow: "Hürtaş Beton Blog Yazıları",
      latestTitle: "Hürtaş Beton Elemanları",
      latestAccent: " Ürün ve Proje Rehberi",
      latestDescription:
        "Beton boru, parke taşı, bordür ve altyapı ürünleriyle ilgili seçim, tedarik ve uygulama içeriklerimizi inceleyin.",
      itemListName: "Hürtaş Beton Blog Yazıları",
      pageTitle: "Blog - Sayfa {page} | Hürtaş Beton",
    },
    pageHero: {
      "/hakkimizda": {
        eyebrow: "Kurumsal",
        title: "Hürtaş Beton Elemanları",
        description:
          "Altyapı, üst yapı ve çevre düzenleme projeleri için dayanıklı beton ürünleri üretiyor; ürün seçimi ve sevkiyat planını netleştiriyoruz.",
      },
      "/arge": {
        eyebrow: "Kurumsal",
        title: "Arge",
        description:
          "Beton elemanlarında üretim kalitesi, ürün geliştirme ve saha ihtiyaçlarına uygun çözüm yaklaşımımız.",
      },
      "/iletisim": {
        eyebrow: "İletişim",
        title: "Projeniz İçin Bize Ulaşın",
        description:
          "Beton boru, parke taşı, bordür ve saha ürünleri için ürün, adet ve sevkiyat detaylarını birlikte planlayalım.",
      },
      "/blog": {
        eyebrow: "Blog",
        title: "Beton Ürünleri Rehberi",
        description:
          "Altyapı ve üst yapı beton elemanları için ürün seçimi, saha kullanımı ve tedarik planlamasına dair içerikler.",
      },
      "/galeri": {
        eyebrow: "Galeri",
        title: "Ürün ve Saha Galerisi",
        description:
          "Beton elemanlarımızın sahadaki kullanım alanlarını, üretim detaylarını ve tamamlanan uygulama görsellerini inceleyin.",
      },
      "/calistigimiz-markalar": {
        eyebrow: "Kurumsal",
        title: "Çalıştığımız Markalar",
        description:
          "Belediye, şantiye ve saha projelerinde beton elemanı tedariki için düzenli, takip edilebilir ve güven veren iş birlikleri kuruyoruz.",
      },
      "/tse-onayli-belgeler": {
        eyebrow: "Belgeler",
        title: "TSE Onaylı Belgeler",
        description:
          "Beton ürünlerinde standartlara uygun üretim yaklaşımımızı ve kalite belgelerimizi bu sayfada topluyoruz.",
      },
      "/katalog": {
        eyebrow: "Katalog",
        title: "Hürtaş Beton Kataloğu",
        description:
          "Beton ürün gruplarını, kullanım alanlarını ve proje tedariki için öne çıkan ürün bilgilerini katalog üzerinden inceleyin.",
      },
    },
    about: {
      eyebrow: "Hürtaş Beton Elemanları",
      title: "Hakkımızda",
      intro:
        "1986 yılından bu yana beton elemanları üretiminde kalite, güven ve müşteri memnuniyeti odaklı çalışıyoruz.",
      imageAlt: "Hürtaş Beton üretim alanı",
      companyTitle: "Firmamız",
      paragraphs: [
        "Firmamızın temeli 1986 yılında İstanbul'da Nebioğlu İnşaat olarak başladı ve beton boru sektöründe 1996 yılına kadar en iyi hizmeti vermeye çalışırken aynı zamanda sektöre tecrübeli personeller kazandırdı.",
        "1996 yılından sonra Hürtaş İnşaat adıyla revize edilip müşterilerine daha teknolojik makinalarla üretilen ürünleri sunmaya başlamıştır ve müşteri portföyünü büyütmüştür.",
        "Yöneticileri, personelleri ve çalışanlarıyla kalitede ve müşteri memnuniyetinde sınır tanımamayı benimseyen anlayışıyla daima ilerlemekte ve hızla büyümektedir.",
        "Altyapı grubunun yanı sıra çevre düzenleme ürünlerini de büyük titizlikle ve kalitede üreten firmamız müşterilerinin istek ve önerilerini dikkate almış, dostluk sağlamış ve devamlılığını başarmıştır.",
      ],
      missionTitle: "Misyonumuz",
      mission:
        "Firma olarak misyonumuz, İstanbul'da alt yapı ve üst yapı projelerine yüksek kaliteli ve yenilikçi çözümler sunmaktır. Müşterilerimize güvenilir, dayanıklı ve çevre dostu beton ürünlerini temin ederek, projelerinde başarıya ulaşmalarına yardımcı olmayı hedefliyoruz.",
      visionTitle: "Vizyonumuz",
      vision:
        "Firma olarak vizyonumuz, İstanbul'un altyapı ve üst yapı projelerinde lider bir konuma ulaşmaktır. Sektördeki gelişmeleri yakından takip ederek yenilikçi ürünler ve çözümler sunmayı hedefliyoruz.",
      productsTitle: "Üretimini Yaptığımız Ürünler",
      productsText:
        "Hürtaş beton elemanları olarak beton ve betonarme boru, muayene baca elemanları, parsel baca elemanları, rögar elemanları, bordür ve parke taşları, şev taşı, beton bariyer, oluk taşları, çim taşları ve briketleri yüksek kalite standartlarına uygun şekilde üretmekteyiz.",
      experienceEyebrow: "Tecrübe",
      experienceTitle: "40+ yıllık tecrübe ile üretim ve tedarik.",
      stats: ["Kuruluş", "Yıllık Tecrübe", "Ürün Çeşidi"],
      brandsTitle: "Çalıştığımız Markalar",
      brandsDescription: "Logo görselleri hazır olduğunda bu alana eklenecek.",
      brandSlot: "Marka Logosu",
    },
    contactPage: {
      phoneLabel: "Bizi Arayın",
      emailLabel: "E-Posta Gönderin",
      addressLabel: "Merkez Ofisimiz",
      weekday: "Hafta içi: 09:00 - 18:00",
      emailSub: "7/24 Yanıt Garantisi",
      addressSub: "Tesislerimize Kahveye Bekleriz",
      mapTitle: "Hürtaş Beton Merkez Ofis Konumu",
      directions: "Yol Tarifi",
      directionsText:
        "Üretim tesislerimizi ziyaret etmek için konum alabilirsiniz.",
      openMaps: "Haritalarda Aç",
      copy: "kopyala",
      copied: "✓ Kopyalandı!",
    },
    form: {
      titleBefore: "Ücretsiz",
      titleAccent: "Danışmanlık",
      titleAfter: "Alın.",
      description:
        "Beton ürün ihtiyacınızı uzman ekibimizle planlayın. Size en uygun ürün grubunu, adedi ve sevkiyat akışını birlikte netleştirelim.",
      benefits: [
        "Ürün grubu yönlendirmesi",
        "Detaylı maliyet değerlendirmesi",
        "Saha ve sevkiyat danışmanlığı",
      ],
      successTitle: "Mesajınız Alındı!",
      successDescription:
        "En kısa sürede uzman ekibimiz sizinle iletişime geçecektir. İlginiz için teşekkürler.",
      newForm: "Yeni Form Gönder",
      nameLabel: "Adınız Soyadınız",
      namePlaceholder: "Örn: Ahmet Yılmaz",
      phoneLabel: "Telefon Numaranız",
      messageLabel: "Mesajınız / Ürün İhtiyacınız",
      messagePlaceholder: "Projenizden kısaca bahsedin...",
      verifyError: "Lütfen doğrulamayı bekleyin ve tekrar deneyin.",
      submitError: "Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
      connectionError: "Bir bağlantı hatası oluştu. Lütfen tekrar deneyin.",
      submitting: "Gönderiliyor...",
      submit: "Teklifi Gönder",
      kvkk: "Verileriniz KVKK kapsamında korunmaktadır. Formu göndererek",
      kvkkLink: "aydınlatma metnini",
      kvkkEnd: "kabul etmiş sayılırsınız.",
    },
    products: {
      menu: "Ürün Menüsü",
      categories: "Kategoriler",
      quickSelection: "Hızlı Seçim",
      chooseCategory: "Kategori Seç",
      openCategories: "Kategorileri Aç",
      closeMenu: "Ürün menüsünü kapat",
      all: "Tümü",
      notFound: "Ürün Bulunamadı",
      notFoundSearch: '"{query}" araması için uygun ürün bulunamadı.',
      notFoundCategory: '"{category}" kategorisinde henüz ürün bulunmuyor.',
      notAdded: "Henüz ürün eklenmemiş.",
      seeAll: "Tüm Ürünleri Gör",
      imageZoom: "Ürün görselini büyüt",
      bestseller: "Çok Satan",
      cardCta: "Ürünü İncele",
      seoEyebrow: "Ürün Bilgisi",
      defaults: {
        eyebrow: "Hürtaş Beton Ürün Seçkisi",
        title: "Tüm Beton Ürünleri",
        description:
          "Altyapı, üst yapı ve çevre düzenleme projeleri için beton ürünlerini kategori, kullanım alanı ve proje ihtiyacına göre inceleyin.",
        seoTitle: "Beton Boru, Baca, Bordür ve Parke Taşı Ürünleri {year}",
        seoDescription:
          "Hürtaş Beton; beton boru, betonarme boru, baca elemanları, kutu menfez, bordür taşı, parke taşı, oluk taşı, şev taşı, beton bariyer, briket ve çim taşı ürünlerini proje ihtiyacına göre sunar.",
      },
      rooms: {
        eyebrow: "{room} Ürün Seçkisi",
        title: "{room} Ölçü ve Proje Uygunluğu",
        description:
          "Ürünleri ölçü, kullanım alanı ve sevkiyat ihtiyacına göre karşılaştırın.",
      },
      infrastructure: {
        eyebrow: "Altyapı Beton Ürünleri",
        title: "Beton Boru ve Baca Elemanları",
        description:
          "Beton boru, betonarme boru, muayene bacası, parsel bacası ve yağmur suyu elemanlarını proje ihtiyacına göre inceleyin.",
      },
      superstructure: {
        eyebrow: "Üst Yapı Beton Ürünleri",
        title: "Bordür, Parke Taşı ve Çevre Düzenleme Ürünleri",
        description:
          "Bordür taşı, parke taşı, oluk taşı, çim taşı, şev taşı ve beton bariyer ürünlerini kullanım alanına göre karşılaştırın.",
      },
      projectSupply: {
        eyebrow: "Proje Tedariki",
        title: "Beton Ürünlerinde Ölçü, Adet ve Sevkiyat Planı",
        description:
          "Şantiye, belediye, altyapı ve çevre düzenleme projeleri için beton ürün tedarikini planlayın.",
      },
    },
    productDetail: {
      imageZoom: "Resmi büyüt",
      callUs: "Bizi Arayın",
      trust: [
        "Dayanıklı Beton Üretimi",
        "Planlı Sevkiyat",
        "Altyapı ve Çevre Düzenleme Ürünleri",
      ],
      info: "Ürün Bilgisi",
      descriptionTitle: "Ürün Açıklaması",
      relatedDefault: "Diğer Beton Ürünlerimiz",
      relatedPrefix: "Diğer {name} Modellerimiz",
      relatedPrev: "İlgili ürünler önceki",
      relatedNext: "İlgili ürünler sonraki",
      productFallback:
        "{name} ürünü. Detaylı bilgi için Hürtaş Beton ile iletişime geçin.",
      schemaCategory: "Beton Ürünü",
      properties: {
        area: "Metrekare",
        room: "Oda Sayısı",
        bath: "Banyo Sayısı",
        floor: "Kat Sayısı",
        height: "Tavan Yüksekliği",
      },
    },
    gallery: {
      empty: "Henüz proje bulunmamaktadır.",
      visualToProduct: "Görselden Ürüne",
      title: "Adını bilmediğiniz beton elemanını galeriden kolayca tarif edin",
      description:
        "Künk, büz, rögar, yağmur suyu kanalı, yol kenarı taşı veya zemin taşı diye aradığınız ürün; galeride beton boru, baca elemanı, bordür, parke taşı, oluk taşı, menfez ya da şev taşı olarak karşılık bulabilir.",
      quote: "Teklif Alın",
      imageCount: "Görsel",
      faqTitle: "Galeri Sayfası İçin",
      faqAccent: "En Çok Aranan Sorular",
      faqDescription:
        "Beton elemanları, saha uygulamaları, ürün görselleri ve tedarik planlaması hakkında kullanıcıların en çok aradığı soruları bu bölümde topladık.",
      groups: [
        {
          title: "Boru ve drenaj",
          text: "Beton boru, betonarme boru, contalı boru, lambazıvana boru",
        },
        {
          title: "Baca ve menhol",
          text: "Muayene baca gövdesi, baca tabanı, parsel baca, konik eleman",
        },
        {
          title: "Yol ve zemin",
          text: "Bordür taşı, parke taşı, oluk taşı, çim taşı",
        },
        {
          title: "Saha çözümleri",
          text: "Kutu menfez, şev taşı, Terra Blok, beton bariyer, briket",
        },
      ],
    },
    footer: {
      supplyEyebrow: "Proje Tedariki",
      supplyTitle: "Beton ürün ihtiyacınızı netleştirelim.",
      supplyDescription:
        "Altyapı, üst yapı ve çevre düzenleme ürünleri için doğru adet, doğru ürün ve planlı sevkiyat.",
      description:
        "Altyapı ve üst yapı beton elemanlarında dayanıklı üretim, anlaşılır ürün seçimi ve düzenli tedarik yaklaşımıyla çalışıyoruz.",
      corporate: "Kurumsal",
      products: "Ürünler",
      contact: "İletişim",
      copyAddress: "Adresi kopyala",
      copyPhone: "Telefon numarasını kopyala",
      copyEmail: "E-posta adresini kopyala",
      rights: "Tüm hakları saklıdır.",
    },
    bottomBar: {
      call: "Şimdi Ara",
      whatsapp: "Whatsapp İletişim",
    },
    brandsPage: {
      eyebrow: "İş Birlikleri",
      title: "Farklı ölçeklerdeki projeler için beton elemanı tedariki.",
      description:
        "Hürtaş Beton, marka ve kurum iş birliklerinde ürün standardı, zamanında teslim ve açık iletişim başlıklarını önceliklendirir.",
      groups: [
        {
          title: "Belediye ve Kamu Projeleri",
          text: "Altyapı, yol ve çevre düzenleme işleri için beton elemanı tedarik süreçlerinde düzenli planlama sağlıyoruz.",
        },
        {
          title: "Şantiye ve Müteahhit Ekipleri",
          text: "Saha programına uygun beton boru, bordür, parke taşı ve tamamlayıcı ürün sevkiyatı planlıyoruz.",
        },
        {
          title: "Peyzaj ve Çevre Düzenleme",
          text: "Kaldırım, bahçe, saha ve yol düzenleme işlerinde ihtiyaç duyulan beton ürünleri için çözüm sunuyoruz.",
        },
      ],
      bullets: [
        "Standart ürün seçimi",
        "Planlı sevkiyat",
        "Takip edilebilir iletişim",
      ],
    },
    argePage: {
      eyebrow: "Araştırma ve Geliştirme",
      title:
        "Beton elemanlarında daha güçlü üretim ve daha net saha çözümleri.",
      description:
        "Arge yaklaşımımız; ürün kalitesini, üretim sürekliliğini ve projelerin sahadaki ihtiyaçlarına uygun tedarik planını geliştirmeye odaklanır.",
      approachEyebrow: "Arge Yaklaşımımız",
      approachTitle:
        "Sahadan gelen ihtiyaçları mühendislik verileriyle geliştiriyoruz.",
      paragraphs: [
        "HÜRTAŞ BETON sektördeki güçlü konumunu sadece kaliteli üretimle değil aynı zamanda araştırma ve geliştirmeye verdiği önemle de pekiştiriyor.",
        "Sahadan gelen ihtiyaçları, mühendislik verilerini ve teknolojik gelişmeleri dikkate alarak beton elemanlarının her aşamasında inovatif çözümler geliştiriyoruz.",
        "Geliştirme çalışmalarımızda özellikle şu alanlara odaklanıyoruz.",
        "Arge merkezimizde gerçekleştirilen laboratuvar testleriyle her ürünümüzün kalite performansı, ulusal ve uluslararası standartlara uygunluğu titizlikle denetlenmektedir.",
      ],
      focus: [
        "Yüksek mukavemetli, uzun ömürlü beton formülleri",
        "Su sızdırmazlığı yüksek kanalizasyon ve altyapı ürünleri",
        "Çevre dostu üretim süreçleri ve geri dönüştürülebilir malzeme kullanımı",
        "Montaj kolaylığı sağlayan tasarım optimizasyonları",
        "Yeni nesil beton boru, muayene baca grubu, şev taşı, parke ve bariyer sistemleri",
      ],
      supportEyebrow: "Proje Desteği",
      supportTitle: "Projenize uygun ürün çözümü için bizimle görüşün.",
      cta: "İletişime Geç",
      imageAlts: [
        "Hürtaş Beton arge ve laboratuvar çalışması",
        "Hürtaş Beton beton elemanı kalite kontrol süreci",
        "Hürtaş Beton üretim geliştirme çalışması",
        "Hürtaş Beton altyapı ürünleri arge kontrolü",
      ],
    },
    tsePage: {
      eyebrow: "Kalite Belgeleri",
      title: "Beton elemanlarında standartlara bağlı üretim.",
      description:
        "TSE onaylı belgeler ve kalite dokümanları, ürün grupları bazında güncellendikçe bu sayfada yayınlanacaktır.",
      requestEyebrow: "Belge Talebi",
      requestTitle: "Projeniz için belge bilgisi mi gerekiyor?",
      cta: "İletişime Geç",
      imageAlt: "Hürtaş Beton TSE onaylı belge görseli {index}",
      items: [
        {
          title: "TSE Onaylı Üretim Yaklaşımı",
          text: "Beton elemanlarında ürün standardını ve üretim takibini görünür kılan belge yaklaşımı.",
        },
        {
          title: "Kalite Kontrol Süreci",
          text: "Ürün grubu, ölçü ve sevkiyat öncesi kontrollerle proje teslim akışını destekleyen süreç.",
        },
        {
          title: "Standartlara Uygun Ürün",
          text: "Beton boru, parke taşı, bordür ve altyapı elemanlarında güven veren üretim disiplini.",
        },
      ],
    },
    catalog: {
      title: "Proje Kataloğu",
      subtitle: "CT Prefabrik 2025",
      instruction: "Sayfaları çevirmek için tıklayın",
      cover: "Kapak",
      page: "S. {page}",
      end: "Son",
    },
  },
  en: {
    common: {
      brand: "Hürtaş",
      companyName: "Hürtaş Concrete",
      brandTagline: "Concrete Elements",
      whatsapp: "WhatsApp",
      contact: "Contact",
      callNow: "Call Now",
      callUs: "Call Us",
      viewProducts: "View Products",
      viewAll: "View All",
      inspect: "View",
      requestQuote: "Request a Quote",
      requestQuoteShort: "Get a Quote",
      productCount: "Products",
      copied: "Copied",
      home: "Home",
      allProducts: "All Products",
      concreteProducts: "Concrete Products",
      productInfo: "Product Information",
      noImage: "No image",
      previous: "Previous",
      next: "Next",
      minutes: "min",
    },
    seo: {
      siteTitle: "Hürtaş Concrete | Concrete Pipes, Manholes, Kerbs and Pavers",
      siteDescription:
        "Contact Hürtaş Concrete for concrete pipes, paving stones, kerbs and infrastructure elements.",
      siteOgTitle:
        "Hürtaş Concrete | Concrete Infrastructure and Superstructure Elements",
      siteOgDescription:
        "Concrete pipes, reinforced concrete pipes, manhole elements, box culverts, kerbs, paving stones and field concrete products by Hürtaş Concrete.",
      locale: "en_US",
      category: "Construction Materials",
      homeTitle:
        "Hürtaş Concrete | Concrete Pipes, Manholes, Kerbs and Paving Stones",
      homeDescription:
        "Hürtaş Concrete manufactures concrete pipes, reinforced concrete pipes, inspection manholes, parcel manholes, box culverts, kerbs, paving stones, slope stones and concrete barriers.",
      productsTitle: "All Products | Hürtaş Concrete",
      productsDescription:
        "Browse Hürtaş Concrete infrastructure, superstructure and landscaping products by category.",
      blogTitle: "Blog | Hürtaş Concrete",
      blogDescription:
        "Guides on product selection, supply and application for concrete pipes, paving stones, kerbs and infrastructure concrete products.",
      galleryTitle:
        "Gallery | Hürtaş Concrete Pipes, Manholes, Kerbs and Pavers",
      galleryDescription:
        "Explore product and site images for concrete pipes, manhole elements, box culverts, kerbs, paving stones and field concrete products.",
      aboutTitle: "About Us | Hürtaş Concrete Elements",
      aboutDescription:
        "Learn about Hürtaş Concrete and our production approach for concrete pipes, paving stones, kerbs, manholes and landscaping products.",
      contactTitle: "Contact | Hürtaş Concrete",
      contactDescription:
        "Contact Hürtaş Concrete by phone, email or address for concrete product requests.",
      brandsTitle: "Partner Sectors | Hürtaş Concrete",
      brandsDescription:
        "Learn about the sectors, project types and partnership approach Hürtaş Concrete serves in concrete element supply.",
      argeTitle: "R&D | Hürtaş Concrete",
      argeDescription:
        "Learn about Hürtaş Concrete's production development, quality control and site-focused solution approach.",
      tseTitle: "TSE Approved Documents | Hürtaş Concrete",
      tseDescription:
        "Learn about Hürtaş Concrete's TSE document approach, quality standards and concrete element production processes.",
      notFoundTitle: "Page Not Found | Hürtaş Concrete",
      productNotFoundTitle: "Product Not Found | Hürtaş Concrete",
      productNotFoundDescription:
        "The product you are looking for was not found.",
      categoryNotFoundTitle: "Category Not Found",
    },
    nav: {
      corporate: "Corporate",
      gallery: "Gallery",
      blog: "Blog",
      contact: "Contact",
      brands: "Partner Sectors",
      about: "About Us",
      arge: "R&D",
      tse: "TSE Documents",
      otherPages: "Other Pages",
      productCategory: "Product category",
      searchProduct: "Search product",
      searchPlaceholder: "Search products...",
      allCategoryPrefix: "All",
      noSearchResults: "No products matched this search.",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menu: "Menu",
      close: "Close",
      language: "Language selection",
    },
    hero: {
      slides: [
        {
          title: "Strong Infrastructure Solutions with Hürtaş",
          desc: "We provide durable production, planned delivery and reliable supply for concrete pipes, paving stones, kerbs and infrastructure elements.",
        },
        {
          title: "Concrete Products for Sites and Municipal Projects",
          desc: "We deliver standards-compliant concrete elements on time for road, landscaping and infrastructure needs.",
        },
        {
          title: "Planned Concrete Element Supply from Production to Delivery",
          desc: "We speed up your workflow with the right product, quantity and delivery plan for your project.",
        },
      ],
      features: [
        "Durable Concrete Production",
        "Planned Delivery",
        "Infrastructure and Landscaping Products",
      ],
      marquee: [
        "Concrete Pipe",
        "Paving Stone",
        "Kerb",
        "Manhole",
        "Drainage Channel",
        "Infrastructure Elements",
        "Site Supply",
        "Planned Delivery",
      ],
      prevSlide: "Previous slide",
      nextSlide: "Next slide",
    },
    homeAbout: {
      eyebrow: "Hürtaş Concrete Elements",
      title: "Reach the right concrete products for your project quickly.",
      description:
        "For infrastructure and superstructure projects, we work with durable production, clear planning and on-time delivery for concrete pipes, pavers, kerbs, manholes and field products.",
      about: "About Us",
      quickAccess: "Quick Product Access",
      links: ["All Products", "Concrete Pipe", "Paving Stone", "Kerb"],
    },
    structure: {
      label: "Concrete Products",
      items: [
        {
          title: "Infrastructure Elements",
          description: "Concrete pipes, manholes and field infrastructure.",
          action: "View Infrastructure Elements",
        },
        {
          title: "Superstructure Elements",
          description: "Paving stones, kerbs and surface solutions.",
          action: "View Superstructure Elements",
        },
      ],
    },
    sliders: {
      environment: {
        title: "Products",
        accent: "Landscaping",
        seoLabel: "Landscaping Concrete Products",
        description:
          "See complementary concrete products used in gardens, roads, pavements and field arrangements.",
      },
      infrastructure: {
        title: "Elements",
        accent: "Infrastructure",
        seoLabel: "Infrastructure Concrete Products",
        description:
          "Browse durable concrete products needed for concrete pipes, manholes and infrastructure projects.",
      },
      superstructure: {
        title: "Elements",
        accent: "Superstructure",
        seoLabel: "Superstructure Concrete Products",
        description:
          "Discover products for your superstructure projects with paving stones, kerbs and field surface solutions.",
      },
      featured: {
        title: "Products",
        accent: "Featured",
        seoLabel: "Selected Concrete Products",
        description:
          "Discover featured concrete products for infrastructure, superstructure and landscaping projects.",
      },
      random: {
        title: "Products",
        accent: "Featured",
        seoLabel: "Selected From Our Products",
        description:
          "Browse randomly selected models from Hürtaş Concrete products.",
      },
      prevProducts: "previous products",
      nextProducts: "next products",
    },
    faq: {
      label: "Frequently Asked Questions",
      cta: "Request a Quote",
      homepageTitle:
        "About Concrete Infrastructure and Superstructure Products",
      homepageAccent: "Frequently Asked Questions",
      homepageDescription:
        "Find answers about concrete pipes, parcel manholes, kerbs, paving stones, box culverts, concrete barriers and more.",
      homepageItems: [
        {
          question: "Which products does Hürtaş Concrete manufacture?",
          answer:
            "Hürtaş Concrete manufactures concrete pipes, parcel manholes, manhole bodies and bases, box culverts, kerbs, paving stones, concrete barriers and landscaping products.",
        },
        {
          question: "What affects concrete pipe prices?",
          answer:
            "Concrete pipe prices depend on diameter, wall thickness, pipe length, application area and order quantity.",
        },
        {
          question: "What is a parcel manhole used for?",
          answer:
            "A parcel manhole connects a building wastewater system to the main sewer line and provides maintenance access.",
        },
        {
          question: "What is a box culvert used for?",
          answer:
            "A box culvert is a rectangular concrete element used for under-road passages, water channels and stream improvement projects.",
        },
        {
          question: "Can bulk and corporate orders be supplied?",
          answer:
            "Yes, bulk orders for municipalities, contractors, construction firms and infrastructure project owners are evaluated project by project.",
        },
      ],
    },
    reviews: {
      label: "Customer Reviews",
      title: "Reliable supply and clear communication on projects.",
      satisfaction: "Satisfaction",
      prev: "Previous review",
      next: "Next review",
      stars: "{rating} stars out of 5",
      slides: [
        {
          productName: "Concrete Pipe",
          customerName: "Murat K.",
          city: "Kocaeli",
          comment:
            "For our infrastructure line, concrete pipe supply moved clearly in terms of dimensions, quantity and delivery schedule.",
        },
        {
          productName: "Paving Stone",
          customerName: "Ayşe Y.",
          city: "Tekirdağ",
          comment:
            "We ordered paving stones for site arrangement. Product quality and delivery timing matched our project flow.",
        },
        {
          productName: "Kerb",
          customerName: "Zehra A.",
          city: "Bursa",
          comment:
            "They clarified our kerb needs quickly. Production and delivery were more organized than expected.",
        },
        {
          productName: "Manhole Elements",
          customerName: "Hasan D.",
          city: "Sakarya",
          comment:
            "We received quick answers for technical questions about manhole and infrastructure elements.",
        },
        {
          productName: "Drainage Channel",
          customerName: "Elif T.",
          city: "Balıkesir",
          comment:
            "We planned the required drainage products in one order. Packaging and delivery updates were regular.",
        },
        {
          productName: "Field Concrete Elements",
          customerName: "Mehmet S.",
          city: "Yalova",
          comment:
            "We combined different concrete products in the same delivery plan. The sales team's follow-up saved us time.",
        },
      ],
    },
    supply: {
      title: "Project-ready concrete products.",
      description:
        "We quickly clarify the right product, quantity and delivery plan for your need.",
      items: [
        "Standard production",
        "Clear product selection",
        "Planned delivery",
      ],
    },
    drone: {
      eyebrow: "Site Footage",
      title: "Construction site drone video",
      iframeTitle: "Hürtaş construction site drone video",
    },
    blog: {
      searchTitle: "Blog Search",
      searchPlaceholder: "Search blog or category",
      emptyTitle: "No Blog Posts Yet",
      emptyDescription:
        "Useful content about concrete products, field usage and supply planning will be shared soon.",
      noResultTitle: "No Results Found",
      noResultDescription: "did not match any blog post or category.",
      readMore: "Read More",
      sharePost: "Share this post",
      recentTitle: "Latest 4 Posts",
      newLabel: "New",
      categoriesTitle: "Concrete Product Categories",
      categoriesDescription: "Quickly browse products by category.",
      categoryNoResult: "No category matched your search.",
      latestEyebrow: "Hürtaş Concrete Blog Posts",
      latestTitle: "Hürtaş Concrete Elements",
      latestAccent: " Product and Project Guide",
      latestDescription:
        "Read our content about selection, supply and application for concrete pipes, paving stones, kerbs and infrastructure products.",
      itemListName: "Hürtaş Concrete Blog Posts",
      pageTitle: "Blog - Page {page} | Hürtaş Concrete",
    },
    pageHero: {
      "/hakkimizda": {
        eyebrow: "Corporate",
        title: "Hürtaş Concrete Elements",
        description:
          "We manufacture durable concrete products for infrastructure, superstructure and landscaping projects, clarifying product selection and delivery plans.",
      },
      "/arge": {
        eyebrow: "Corporate",
        title: "R&D",
        description:
          "Our approach to production quality, product development and site-specific solutions in concrete elements.",
      },
      "/iletisim": {
        eyebrow: "Contact",
        title: "Contact Us for Your Project",
        description:
          "Let's plan product, quantity and delivery details together for concrete pipes, pavers, kerbs and field products.",
      },
      "/blog": {
        eyebrow: "Blog",
        title: "Concrete Product Guide",
        description:
          "Content on product selection, field usage and supply planning for infrastructure and superstructure concrete elements.",
      },
      "/galeri": {
        eyebrow: "Gallery",
        title: "Product and Site Gallery",
        description:
          "Review application areas, production details and completed site images of our concrete elements.",
      },
      "/calistigimiz-markalar": {
        eyebrow: "Corporate",
        title: "Partner Sectors",
        description:
          "We build organized, trackable and reliable partnerships for concrete element supply in municipal, site and field projects.",
      },
      "/tse-onayli-belgeler": {
        eyebrow: "Documents",
        title: "TSE Approved Documents",
        description:
          "We collect our standards-based production approach and quality documents for concrete products on this page.",
      },
      "/katalog": {
        eyebrow: "Catalog",
        title: "Hürtaş Concrete Catalog",
        description:
          "Browse concrete product groups, application areas and key product details for project supply through the catalog.",
      },
    },
    about: {
      eyebrow: "Hürtaş Concrete Elements",
      title: "About Us",
      intro:
        "Since 1986, we have worked with a focus on quality, trust and customer satisfaction in concrete element production.",
      imageAlt: "Hürtaş Concrete production area",
      companyTitle: "Our Company",
      paragraphs: [
        "Our company was founded in Istanbul in 1986 as Nebioğlu İnşaat and served the concrete pipe industry until 1996 while training experienced personnel for the sector.",
        "After 1996, it continued as Hürtaş İnşaat and began offering products manufactured with more advanced machinery, expanding its customer portfolio.",
        "With managers and teams committed to quality and customer satisfaction, the company continues to grow steadily.",
        "Alongside infrastructure products, we manufacture landscaping products with care and quality, taking customer requests and suggestions seriously.",
      ],
      missionTitle: "Our Mission",
      mission:
        "Our mission is to provide high-quality, innovative solutions for infrastructure and superstructure projects in Istanbul. We aim to supply reliable, durable and environmentally conscious concrete products.",
      visionTitle: "Our Vision",
      vision:
        "Our vision is to become a leading name in Istanbul's infrastructure and superstructure projects by following sector developments and offering innovative products and solutions.",
      productsTitle: "Products We Manufacture",
      productsText:
        "We manufacture concrete and reinforced concrete pipes, inspection and parcel manhole elements, manhole rings, kerbs, paving stones, slope stones, concrete barriers, drainage channels, grass stones and blocks in line with high quality standards.",
      experienceEyebrow: "Experience",
      experienceTitle: "Production and supply with 40+ years of experience.",
      stats: ["Founded", "Years of Experience", "Product Types"],
      brandsTitle: "Partner Sectors",
      brandsDescription: "Logo visuals will be added to this area when ready.",
      brandSlot: "Brand Logo",
    },
    contactPage: {
      phoneLabel: "Call Us",
      emailLabel: "Send Email",
      addressLabel: "Head Office",
      weekday: "Weekdays: 09:00 - 18:00",
      emailSub: "Response support",
      addressSub: "You are welcome to visit our facilities",
      mapTitle: "Hürtaş Concrete Head Office Location",
      directions: "Directions",
      directionsText:
        "You can get directions to visit our production facilities.",
      openMaps: "Open in Maps",
      copy: "copy",
      copied: "✓ Copied!",
    },
    form: {
      titleBefore: "Get Free",
      titleAccent: "Consulting",
      titleAfter: ".",
      description:
        "Plan your concrete product need with our team. Let's clarify the right product group, quantity and delivery flow together.",
      benefits: [
        "Product group guidance",
        "Detailed cost review",
        "Site and delivery consulting",
      ],
      successTitle: "Your Message Was Received!",
      successDescription:
        "Our expert team will contact you as soon as possible. Thank you for your interest.",
      newForm: "Send New Form",
      nameLabel: "Full Name",
      namePlaceholder: "Example: John Smith",
      phoneLabel: "Phone Number",
      messageLabel: "Message / Product Need",
      messagePlaceholder: "Briefly tell us about your project...",
      verifyError: "Please wait for verification and try again.",
      submitError:
        "An error occurred while sending the form. Please try again.",
      connectionError: "A connection error occurred. Please try again.",
      submitting: "Sending...",
      submit: "Send Request",
      kvkk: "Your data is protected under KVKK. By sending this form, you accept the",
      kvkkLink: "clarification text",
      kvkkEnd: ".",
    },
    products: {
      menu: "Product Menu",
      categories: "Categories",
      quickSelection: "Quick Selection",
      chooseCategory: "Choose Category",
      openCategories: "Open Categories",
      closeMenu: "Close product menu",
      all: "All",
      notFound: "Product Not Found",
      notFoundSearch: 'No suitable product was found for "{query}".',
      notFoundCategory: 'No products are available in "{category}" yet.',
      notAdded: "No products have been added yet.",
      seeAll: "View All Products",
      imageZoom: "Enlarge product image",
      bestseller: "Best Seller",
      cardCta: "View Product",
      seoEyebrow: "Product Information",
      defaults: {
        eyebrow: "Hürtaş Concrete Product Selection",
        title: "All Concrete Products",
        description:
          "Browse concrete products for infrastructure, superstructure and landscaping projects by category, application area and project need.",
        seoTitle:
          "Concrete Pipes, Manholes, Kerbs and Paving Stone Products {year}",
        seoDescription:
          "Hürtaş Concrete offers concrete pipes, reinforced concrete pipes, manhole elements, box culverts, kerbs, paving stones, drainage channels, slope stones, concrete barriers, blocks and grass stones according to project needs.",
      },
      rooms: {
        eyebrow: "{room} Product Selection",
        title: "{room} Measurement and Project Suitability",
        description:
          "Compare products by size, application area and delivery need.",
      },
      infrastructure: {
        eyebrow: "Infrastructure Concrete Products",
        title: "Concrete Pipes and Manhole Elements",
        description:
          "Browse concrete pipes, reinforced concrete pipes, inspection manholes, parcel manholes and rainwater elements according to your project need.",
      },
      superstructure: {
        eyebrow: "Superstructure Concrete Products",
        title: "Kerbs, Paving Stones and Landscaping Products",
        description:
          "Compare kerbs, paving stones, drainage channels, grass stones, slope stones and concrete barriers by application area.",
      },
      projectSupply: {
        eyebrow: "Project Supply",
        title: "Size, Quantity and Delivery Planning for Concrete Products",
        description:
          "Plan concrete product supply for construction sites, municipalities, infrastructure and landscaping projects.",
      },
    },
    productDetail: {
      imageZoom: "Enlarge image",
      callUs: "Call Us",
      trust: [
        "Durable Concrete Production",
        "Planned Delivery",
        "Infrastructure and Landscaping Products",
      ],
      info: "Product Information",
      descriptionTitle: "Product Description",
      relatedDefault: "Other Concrete Products",
      relatedPrefix: "Other {name} Models",
      relatedPrev: "Previous related products",
      relatedNext: "Next related products",
      productFallback:
        "{name} product. Contact Hürtaş Concrete for detailed information.",
      schemaCategory: "Concrete Product",
      properties: {
        area: "Area",
        room: "Room Count",
        bath: "Bathroom Count",
        floor: "Floor Count",
        height: "Ceiling Height",
      },
    },
    gallery: {
      empty: "No projects are available yet.",
      visualToProduct: "From Visual to Product",
      title:
        "Describe the concrete element you do not know by using the gallery",
      description:
        "A product searched as pipe, culvert, manhole, rainwater channel, roadside stone or floor stone may correspond to concrete pipe, manhole element, kerb, paving stone, channel, culvert or slope stone in the gallery.",
      quote: "Request a Quote",
      imageCount: "Images",
      faqTitle: "For the Gallery Page",
      faqAccent: "Most Searched Questions",
      faqDescription:
        "We collected frequently searched questions about concrete elements, site applications, product visuals and supply planning.",
      groups: [
        {
          title: "Pipe and drainage",
          text: "Concrete pipe, reinforced concrete pipe, gasketed pipe, tongue-and-groove pipe",
        },
        {
          title: "Manhole systems",
          text: "Inspection manhole body, manhole base, parcel manhole, conical element",
        },
        {
          title: "Road and ground",
          text: "Kerb, paving stone, drainage channel, grass stone",
        },
        {
          title: "Field solutions",
          text: "Box culvert, slope stone, Terra Block, concrete barrier, block",
        },
      ],
    },
    footer: {
      supplyEyebrow: "Project Supply",
      supplyTitle: "Let's clarify your concrete product need.",
      supplyDescription:
        "The right quantity, right product and planned delivery for infrastructure, superstructure and landscaping products.",
      description:
        "We work with durable production, clear product selection and regular supply in infrastructure and superstructure concrete elements.",
      corporate: "Corporate",
      products: "Products",
      contact: "Contact",
      copyAddress: "Copy address",
      copyPhone: "Copy phone number",
      copyEmail: "Copy email address",
      rights: "All rights reserved.",
    },
    bottomBar: {
      call: "Call Now",
      whatsapp: "WhatsApp Contact",
    },
    brandsPage: {
      eyebrow: "Partnerships",
      title: "Concrete element supply for projects of different scales.",
      description:
        "Hürtaş Concrete prioritizes product standards, timely delivery and clear communication in brand and institutional partnerships.",
      groups: [
        {
          title: "Municipal and Public Projects",
          text: "We provide organized planning for concrete element supply in infrastructure, road and landscaping works.",
        },
        {
          title: "Construction Sites and Contractors",
          text: "We plan delivery for concrete pipes, kerbs, paving stones and complementary products according to the site schedule.",
        },
        {
          title: "Landscape and Environmental Works",
          text: "We offer solutions for concrete products needed in pavements, gardens, fields and road arrangements.",
        },
      ],
      bullets: [
        "Standard product selection",
        "Planned delivery",
        "Trackable communication",
      ],
    },
    argePage: {
      eyebrow: "Research and Development",
      title:
        "Stronger production and clearer site solutions in concrete elements.",
      description:
        "Our R&D approach focuses on improving product quality, production continuity and supply plans that fit project site needs.",
      approachEyebrow: "Our R&D Approach",
      approachTitle: "We develop field needs with engineering data.",
      paragraphs: [
        "HÜRTAŞ CONCRETE strengthens its position in the sector not only with quality production but also with its focus on research and development.",
        "We develop innovative solutions at every stage of concrete elements by considering field needs, engineering data and technological developments.",
        "Our development work focuses especially on the following areas.",
        "With laboratory tests, every product's quality performance and compliance with national and international standards are carefully inspected.",
      ],
      focus: [
        "High-strength, long-life concrete formulas",
        "High water-tightness sewer and infrastructure products",
        "Environmentally conscious production processes and recyclable material use",
        "Design optimizations that make installation easier",
        "New-generation concrete pipe, manhole, slope stone, paver and barrier systems",
      ],
      supportEyebrow: "Project Support",
      supportTitle:
        "Contact us for a product solution suitable for your project.",
      cta: "Contact Us",
      imageAlts: [
        "Hürtaş Concrete R&D and laboratory work",
        "Hürtaş Concrete concrete element quality control process",
        "Hürtaş Concrete production development work",
        "Hürtaş Concrete infrastructure products R&D control",
      ],
    },
    tsePage: {
      eyebrow: "Quality Documents",
      title: "Standards-based production in concrete elements.",
      description:
        "TSE approved documents and quality records will be published on this page as they are updated by product group.",
      requestEyebrow: "Document Request",
      requestTitle: "Do you need document information for your project?",
      cta: "Contact Us",
      imageAlt: "Hürtaş Concrete TSE approved document image {index}",
      items: [
        {
          title: "TSE Approved Production Approach",
          text: "A document approach that makes product standards and production tracking visible in concrete elements.",
        },
        {
          title: "Quality Control Process",
          text: "A process that supports delivery flow through product group, size and pre-delivery checks.",
        },
        {
          title: "Standards-Compliant Product",
          text: "Production discipline that builds trust in concrete pipes, paving stones, kerbs and infrastructure elements.",
        },
      ],
    },
    catalog: {
      title: "Project Catalog",
      subtitle: "CT Prefabrik 2025",
      instruction: "Click to turn the pages",
      cover: "Cover",
      page: "P. {page}",
      end: "End",
    },
  },
  ar: {
    common: {
      brand: "هورتاش",
      companyName: "هورتاش للخرسانة",
      brandTagline: "العناصر الخرسانية",
      whatsapp: "واتساب",
      contact: "اتصل بنا",
      callNow: "اتصل الآن",
      callUs: "اتصل بنا",
      viewProducts: "عرض المنتجات",
      viewAll: "عرض الكل",
      inspect: "عرض",
      requestQuote: "طلب عرض سعر",
      requestQuoteShort: "طلب سعر",
      productCount: "منتج",
      copied: "تم النسخ",
      home: "الرئيسية",
      allProducts: "كل المنتجات",
      concreteProducts: "منتجات الخرسانة",
      productInfo: "معلومات المنتج",
      noImage: "لا توجد صورة",
      previous: "السابق",
      next: "التالي",
      minutes: "دقيقة",
    },
    seo: {
      siteTitle: "هورتاش للخرسانة | أنابيب خرسانية ومناهل وبردورات وإنترلوك",
      siteDescription:
        "تواصل مع هورتاش للخرسانة للحصول على الأنابيب الخرسانية وحجارة الرصف والبردورات وعناصر البنية التحتية.",
      siteOgTitle: "هورتاش للخرسانة | عناصر خرسانية للبنية التحتية والفوقية",
      siteOgDescription:
        "أنابيب خرسانية ومسلحة، عناصر مناهل، عبارات صندوقية، بردورات، حجارة رصف ومنتجات خرسانية للمواقع من هورتاش.",
      locale: "ar",
      category: "Construction Materials",
      homeTitle: "هورتاش للخرسانة | أنابيب خرسانية ومناهل وبردورات وحجارة رصف",
      homeDescription:
        "تنتج هورتاش للخرسانة الأنابيب الخرسانية والمسلحة، مناهل التفتيش، مناهل parcel، العبارات الصندوقية، البردورات، حجارة الرصف، أحجار المنحدرات والحواجز الخرسانية.",
      productsTitle: "كل المنتجات | هورتاش للخرسانة",
      productsDescription:
        "تصفح منتجات هورتاش للبنية التحتية والفوقية وتنسيق المواقع حسب الفئة.",
      blogTitle: "المدونة | هورتاش للخرسانة",
      blogDescription:
        "أدلة حول اختيار وتوريد وتطبيق الأنابيب الخرسانية وحجارة الرصف والبردورات ومنتجات البنية التحتية.",
      galleryTitle: "المعرض | صور أنابيب ومناهل وبردورات وحجارة رصف هورتاش",
      galleryDescription:
        "استعرض صور المنتجات والمواقع للأنابيب الخرسانية وعناصر المناهل والعبارات الصندوقية والبردورات وحجارة الرصف.",
      aboutTitle: "من نحن | هورتاش للعناصر الخرسانية",
      aboutDescription:
        "تعرف على هورتاش للخرسانة ونهجها في إنتاج الأنابيب الخرسانية وحجارة الرصف والبردورات والمناهل ومنتجات تنسيق المواقع.",
      contactTitle: "اتصل بنا | هورتاش للخرسانة",
      contactDescription:
        "تواصل مع هورتاش للخرسانة عبر الهاتف أو البريد الإلكتروني أو العنوان لطلبات المنتجات الخرسانية.",
      brandsTitle: "القطاعات التي نخدمها | هورتاش للخرسانة",
      brandsDescription:
        "تعرف على القطاعات وأنواع المشاريع ونهج الشراكة لدى هورتاش في توريد العناصر الخرسانية.",
      argeTitle: "البحث والتطوير | هورتاش للخرسانة",
      argeDescription:
        "تعرف على نهج هورتاش في تطوير الإنتاج ومراقبة الجودة والحلول المناسبة لاحتياجات المواقع.",
      tseTitle: "وثائق TSE المعتمدة | هورتاش للخرسانة",
      tseDescription:
        "تعرف على نهج وثائق TSE ومعايير الجودة وعمليات إنتاج العناصر الخرسانية لدى هورتاش.",
      notFoundTitle: "الصفحة غير موجودة | هورتاش للخرسانة",
      productNotFoundTitle: "المنتج غير موجود | هورتاش للخرسانة",
      productNotFoundDescription: "لم يتم العثور على المنتج المطلوب.",
      categoryNotFoundTitle: "الفئة غير موجودة",
    },
    nav: {
      corporate: "الشركة",
      gallery: "المعرض",
      blog: "المدونة",
      contact: "اتصل بنا",
      brands: "القطاعات التي نخدمها",
      about: "من نحن",
      arge: "البحث والتطوير",
      tse: "وثائق TSE",
      otherPages: "صفحات أخرى",
      productCategory: "فئة المنتج",
      searchProduct: "بحث عن منتج",
      searchPlaceholder: "ابحث عن المنتجات...",
      allCategoryPrefix: "كل",
      noSearchResults: "لا توجد منتجات مطابقة لهذا البحث.",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      menu: "القائمة",
      close: "إغلاق",
      language: "اختيار اللغة",
    },
    hero: {
      slides: [
        {
          title: "حلول بنية تحتية قوية مع هورتاش",
          desc: "نوفر إنتاجا متينا وتوريدا موثوقا وتسليما منظما للأنابيب الخرسانية وحجارة الرصف والبردورات وعناصر البنية التحتية.",
        },
        {
          title: "منتجات خرسانية للمواقع والمشاريع البلدية",
          desc: "نسلم عناصر خرسانية مطابقة للمعايير وفي الوقت المناسب لاحتياجات الطرق وتنسيق المواقع والبنية التحتية.",
        },
        {
          title: "توريد مخطط للعناصر الخرسانية من الإنتاج إلى التسليم",
          desc: "نسرع سير العمل من خلال المنتج الصحيح والكمية المناسبة وخطة التسليم الملائمة لمشروعك.",
        },
      ],
      features: [
        "إنتاج خرسانة متين",
        "تسليم مخطط",
        "منتجات البنية التحتية وتنسيق المواقع",
      ],
      marquee: [
        "أنبوب خرساني",
        "حجر رصف",
        "بردورة",
        "منهل",
        "قناة تصريف",
        "عناصر بنية تحتية",
        "توريد للمواقع",
        "تسليم مخطط",
      ],
      prevSlide: "الشريحة السابقة",
      nextSlide: "الشريحة التالية",
    },
    homeAbout: {
      eyebrow: "هورتاش للعناصر الخرسانية",
      title: "احصل بسرعة على المنتجات الخرسانية المناسبة لمشروعك.",
      description:
        "لمشاريع البنية التحتية والفوقية، نعمل بإنتاج متين وتخطيط واضح وتسليم في الوقت المناسب للأنابيب الخرسانية وحجارة الرصف والبردورات والمناهل ومنتجات المواقع.",
      about: "من نحن",
      quickAccess: "وصول سريع للمنتجات",
      links: ["كل المنتجات", "أنبوب خرساني", "حجر رصف", "بردورة"],
    },
    structure: {
      label: "منتجات الخرسانة",
      items: [
        {
          title: "عناصر البنية التحتية",
          description: "أنابيب خرسانية ومناهل وبنية تحتية للمواقع.",
          action: "عرض عناصر البنية التحتية",
        },
        {
          title: "عناصر البنية الفوقية",
          description: "حجارة رصف وبردورات وحلول للأسطح.",
          action: "عرض عناصر البنية الفوقية",
        },
      ],
    },
    sliders: {
      environment: {
        title: "المنتجات",
        accent: "تنسيق المواقع",
        seoLabel: "منتجات خرسانية لتنسيق المواقع",
        description:
          "شاهد المنتجات الخرسانية المكملة المستخدمة في الحدائق والطرق والأرصفة وترتيبات المواقع.",
      },
      infrastructure: {
        title: "العناصر",
        accent: "البنية التحتية",
        seoLabel: "منتجات خرسانية للبنية التحتية",
        description:
          "تصفح المنتجات الخرسانية المتينة اللازمة للأنابيب الخرسانية والمناهل ومشاريع البنية التحتية.",
      },
      superstructure: {
        title: "العناصر",
        accent: "البنية الفوقية",
        seoLabel: "منتجات خرسانية للبنية الفوقية",
        description:
          "اكتشف المنتجات المناسبة لمشاريع البنية الفوقية مثل حجارة الرصف والبردورات وحلول أسطح المواقع.",
      },
      featured: {
        title: "المنتجات",
        accent: "مختارة",
        seoLabel: "منتجات خرسانية مختارة",
        description:
          "اكتشف منتجات خرسانية مختارة لمشاريع البنية التحتية والفوقية وتنسيق المواقع.",
      },
      random: {
        title: "المنتجات",
        accent: "مختارة",
        seoLabel: "مختارات من منتجاتنا",
        description: "تصفح نماذج مختارة عشوائيا من منتجات هورتاش للخرسانة.",
      },
      prevProducts: "المنتجات السابقة",
      nextProducts: "المنتجات التالية",
    },
    faq: {
      label: "الأسئلة الشائعة",
      cta: "طلب عرض سعر",
      homepageTitle: "حول منتجات الخرسانة للبنية التحتية والفوقية",
      homepageAccent: "الأسئلة الأكثر شيوعا",
      homepageDescription:
        "اعثر على إجابات حول الأنابيب الخرسانية ومناهل parcel والبردورات وحجارة الرصف والعبارات الصندوقية والحواجز الخرسانية والمزيد.",
      homepageItems: [
        {
          question: "ما المنتجات التي تصنعها هورتاش للخرسانة؟",
          answer:
            "تصنع هورتاش الأنابيب الخرسانية، مناهل parcel، أجسام وقواعد المناهل، العبارات الصندوقية، البردورات، حجارة الرصف، الحواجز الخرسانية ومنتجات تنسيق المواقع.",
        },
        {
          question: "ما العوامل التي تؤثر على أسعار الأنابيب الخرسانية؟",
          answer:
            "تعتمد الأسعار على القطر وسماكة الجدار وطول الأنبوب ومجال الاستخدام وكمية الطلب.",
        },
        {
          question: "ما هو منهل parcel وما فائدته؟",
          answer:
            "يربط منهل parcel نظام مياه الصرف في المبنى بخط الصرف الرئيسي ويوفر نقطة وصول للصيانة.",
        },
        {
          question: "ما استخدام العبارة الصندوقية؟",
          answer:
            "العبارة الصندوقية عنصر خرساني مستطيل يستخدم في ممرات أسفل الطرق وقنوات المياه ومشاريع تحسين المجاري.",
        },
        {
          question: "هل يمكن توريد طلبات كبيرة ومؤسسية؟",
          answer:
            "نعم، يتم تقييم طلبات البلديات والمقاولين وشركات الإنشاء وأصحاب مشاريع البنية التحتية حسب المشروع.",
        },
      ],
    },
    reviews: {
      label: "آراء العملاء",
      title: "توريد منتظم وتواصل واضح في المشاريع.",
      satisfaction: "رضا العملاء",
      prev: "الرأي السابق",
      next: "الرأي التالي",
      stars: "{rating} نجوم من 5",
      slides: [
        {
          productName: "أنبوب خرساني",
          customerName: "Murat K.",
          city: "Kocaeli",
          comment:
            "كان توريد الأنابيب الخرسانية لخط البنية التحتية واضحا من حيث القياس والكمية وخطة التسليم.",
        },
        {
          productName: "حجر رصف",
          customerName: "Ayşe Y.",
          city: "Tekirdağ",
          comment:
            "طلبنا حجارة رصف لترتيب الموقع. جودة المنتج وتوقيت التسليم ناسبا سير المشروع.",
        },
        {
          productName: "بردورة",
          customerName: "Zehra A.",
          city: "Bursa",
          comment:
            "تم توضيح احتياجنا من البردورات بسرعة. كان الإنتاج والتسليم أكثر انتظاما مما توقعنا.",
        },
        {
          productName: "عناصر المناهل",
          customerName: "Hasan D.",
          city: "Sakarya",
          comment:
            "تلقينا إجابات سريعة على أسئلتنا الفنية حول المناهل وعناصر البنية التحتية.",
        },
        {
          productName: "قناة تصريف",
          customerName: "Elif T.",
          city: "Balıkesir",
          comment:
            "خططنا لمنتجات التصريف المطلوبة في طلب واحد، وكانت معلومات التعبئة والتسليم منتظمة.",
        },
        {
          productName: "عناصر خرسانية للموقع",
          customerName: "Mehmet S.",
          city: "Yalova",
          comment:
            "تمكنا من جمع منتجات خرسانية مختلفة في خطة تسليم واحدة، وقد وفر لنا متابعة فريق المبيعات وقتا.",
        },
      ],
    },
    supply: {
      title: "منتجات خرسانية جاهزة للمشاريع.",
      description: "نوضح بسرعة المنتج والكمية وخطة التسليم المناسبة لاحتياجك.",
      items: ["إنتاج قياسي", "اختيار واضح للمنتج", "تسليم مخطط"],
    },
    drone: {
      eyebrow: "لقطات من الموقع",
      title: "تصوير جوي للموقع",
      iframeTitle: "تصوير جوي لموقع هورتاش",
    },
    blog: {
      searchTitle: "بحث المدونة",
      searchPlaceholder: "ابحث في المدونة أو الفئة",
      emptyTitle: "لا توجد مقالات بعد",
      emptyDescription:
        "سيتم قريبا نشر محتوى مفيد حول المنتجات الخرسانية واستخدامها في المواقع وتخطيط التوريد.",
      noResultTitle: "لا توجد نتائج",
      noResultDescription: "لا يطابق أي مقال أو فئة.",
      readMore: "اقرأ المزيد",
      sharePost: "شارك هذا المقال",
      recentTitle: "آخر 4 مقالات",
      newLabel: "جديد",
      categoriesTitle: "فئات المنتجات الخرسانية",
      categoriesDescription: "تصفح المنتجات بسرعة حسب الفئة.",
      categoryNoResult: "لا توجد فئة مطابقة لبحثك.",
      latestEyebrow: "مقالات مدونة هورتاش للخرسانة",
      latestTitle: "هورتاش للعناصر الخرسانية",
      latestAccent: " دليل المنتجات والمشاريع",
      latestDescription:
        "اقرأ محتوانا حول اختيار وتوريد وتطبيق الأنابيب الخرسانية وحجارة الرصف والبردورات ومنتجات البنية التحتية.",
      itemListName: "مقالات مدونة هورتاش للخرسانة",
      pageTitle: "المدونة - صفحة {page} | هورتاش للخرسانة",
    },
    pageHero: {
      "/hakkimizda": {
        eyebrow: "الشركة",
        title: "هورتاش للعناصر الخرسانية",
        description:
          "ننتج منتجات خرسانية متينة لمشاريع البنية التحتية والفوقية وتنسيق المواقع، ونوضح اختيار المنتج وخطط التسليم.",
      },
      "/arge": {
        eyebrow: "الشركة",
        title: "البحث والتطوير",
        description:
          "نهجنا في جودة الإنتاج وتطوير المنتجات والحلول المناسبة للمواقع في العناصر الخرسانية.",
      },
      "/iletisim": {
        eyebrow: "اتصل بنا",
        title: "تواصل معنا لمشروعك",
        description:
          "لنخطط معا تفاصيل المنتج والكمية والتسليم للأنابيب الخرسانية وحجارة الرصف والبردورات ومنتجات المواقع.",
      },
      "/blog": {
        eyebrow: "المدونة",
        title: "دليل المنتجات الخرسانية",
        description:
          "محتوى حول اختيار المنتجات واستخدامها في المواقع وتخطيط التوريد لعناصر الخرسانة.",
      },
      "/galeri": {
        eyebrow: "المعرض",
        title: "معرض المنتجات والمواقع",
        description:
          "استعرض مجالات الاستخدام وتفاصيل الإنتاج وصور التطبيقات المكتملة لعناصرنا الخرسانية.",
      },
      "/calistigimiz-markalar": {
        eyebrow: "الشركة",
        title: "القطاعات التي نخدمها",
        description:
          "نبني شراكات منظمة وموثوقة وقابلة للمتابعة لتوريد العناصر الخرسانية في المشاريع البلدية والمواقع.",
      },
      "/tse-onayli-belgeler": {
        eyebrow: "الوثائق",
        title: "وثائق TSE المعتمدة",
        description:
          "نجمع في هذه الصفحة نهج الإنتاج وفق المعايير ووثائق الجودة الخاصة بالمنتجات الخرسانية.",
      },
      "/katalog": {
        eyebrow: "الكتالوج",
        title: "كتالوج هورتاش للخرسانة",
        description:
          "تصفح مجموعات المنتجات الخرسانية ومجالات استخدامها ومعلومات المنتجات المهمة لتوريد المشاريع عبر الكتالوج.",
      },
    },
    about: {
      eyebrow: "هورتاش للعناصر الخرسانية",
      title: "من نحن",
      intro:
        "منذ عام 1986 نعمل في إنتاج العناصر الخرسانية مع التركيز على الجودة والثقة ورضا العملاء.",
      imageAlt: "منطقة إنتاج هورتاش للخرسانة",
      companyTitle: "شركتنا",
      paragraphs: [
        "بدأ أساس شركتنا في إسطنبول عام 1986 باسم Nebioğlu İnşaat، وقدمت خدماتها في قطاع الأنابيب الخرسانية حتى عام 1996 مع تدريب كوادر خبيرة للقطاع.",
        "بعد عام 1996 واصلت نشاطها باسم Hürtaş İnşaat وبدأت بتقديم منتجات مصنعة بآلات أكثر تطورا، مما وسع قاعدة عملائها.",
        "تواصل الشركة نموها بثبات من خلال إدارة وفرق تتبنى الجودة ورضا العملاء.",
        "إلى جانب منتجات البنية التحتية، ننتج منتجات تنسيق المواقع بعناية وجودة ونأخذ طلبات العملاء وملاحظاتهم بجدية.",
      ],
      missionTitle: "رسالتنا",
      mission:
        "رسالتنا هي تقديم حلول عالية الجودة ومبتكرة لمشاريع البنية التحتية والفوقية في إسطنبول، وتوريد منتجات خرسانية موثوقة ومتينة وصديقة للبيئة.",
      visionTitle: "رؤيتنا",
      vision:
        "رؤيتنا هي أن نصبح اسما رائدا في مشاريع البنية التحتية والفوقية في إسطنبول عبر متابعة تطورات القطاع وتقديم منتجات وحلول مبتكرة.",
      productsTitle: "المنتجات التي نصنعها",
      productsText:
        "ننتج الأنابيب الخرسانية والمسلحة، عناصر مناهل التفتيش وparcel، حلقات المناهل، البردورات، حجارة الرصف، أحجار المنحدرات، الحواجز الخرسانية، قنوات التصريف، أحجار العشب والبلوكات وفق معايير جودة عالية.",
      experienceEyebrow: "الخبرة",
      experienceTitle: "إنتاج وتوريد بخبرة تزيد عن 40 عاما.",
      stats: ["التأسيس", "سنوات الخبرة", "تنوع المنتجات"],
      brandsTitle: "القطاعات التي نخدمها",
      brandsDescription: "ستتم إضافة شعارات العلامات هنا عند تجهيزها.",
      brandSlot: "شعار العلامة",
    },
    contactPage: {
      phoneLabel: "اتصل بنا",
      emailLabel: "أرسل بريدا",
      addressLabel: "المكتب الرئيسي",
      weekday: "أيام الأسبوع: 09:00 - 18:00",
      emailSub: "دعم للرد",
      addressSub: "نرحب بزيارتكم لمرافقنا",
      mapTitle: "موقع المكتب الرئيسي لهورتاش للخرسانة",
      directions: "الاتجاهات",
      directionsText: "يمكنك الحصول على الاتجاهات لزيارة مرافق الإنتاج.",
      openMaps: "افتح في الخرائط",
      copy: "نسخ",
      copied: "✓ تم النسخ!",
    },
    form: {
      titleBefore: "احصل على",
      titleAccent: "استشارة",
      titleAfter: "مجانية.",
      description:
        "خطط لاحتياجك من المنتجات الخرسانية مع فريقنا. لنحدد معا فئة المنتج والكمية ومسار التسليم الأنسب.",
      benefits: [
        "توجيه لفئة المنتج",
        "تقييم تفصيلي للتكلفة",
        "استشارة للموقع والتسليم",
      ],
      successTitle: "تم استلام رسالتك!",
      successDescription:
        "سيتواصل معك فريقنا المختص في أقرب وقت. شكرا لاهتمامك.",
      newForm: "إرسال نموذج جديد",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "مثال: أحمد علي",
      phoneLabel: "رقم الهاتف",
      messageLabel: "الرسالة / احتياج المنتج",
      messagePlaceholder: "اكتب نبذة قصيرة عن مشروعك...",
      verifyError: "يرجى انتظار التحقق والمحاولة مرة أخرى.",
      submitError: "حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.",
      connectionError: "حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
      submitting: "جار الإرسال...",
      submit: "إرسال الطلب",
      kvkk: "تتم حماية بياناتك ضمن KVKK. بإرسال هذا النموذج فإنك تقبل",
      kvkkLink: "نص التوضيح",
      kvkkEnd: ".",
    },
    products: {
      menu: "قائمة المنتجات",
      categories: "الفئات",
      quickSelection: "اختيار سريع",
      chooseCategory: "اختر الفئة",
      openCategories: "فتح الفئات",
      closeMenu: "إغلاق قائمة المنتجات",
      all: "الكل",
      notFound: "لم يتم العثور على منتج",
      notFoundSearch: 'لم يتم العثور على منتج مناسب للبحث "{query}".',
      notFoundCategory: 'لا توجد منتجات في فئة "{category}" بعد.',
      notAdded: "لم تتم إضافة منتجات بعد.",
      seeAll: "عرض كل المنتجات",
      imageZoom: "تكبير صورة المنتج",
      bestseller: "الأكثر مبيعا",
      cardCta: "عرض المنتج",
      seoEyebrow: "معلومات المنتج",
      defaults: {
        eyebrow: "مختارات منتجات هورتاش للخرسانة",
        title: "كل المنتجات الخرسانية",
        description:
          "تصفح المنتجات الخرسانية لمشاريع البنية التحتية والفوقية وتنسيق المواقع حسب الفئة ومجال الاستخدام واحتياج المشروع.",
        seoTitle:
          "منتجات الأنابيب الخرسانية والمناهل والبردورات وحجارة الرصف {year}",
        seoDescription:
          "تقدم هورتاش الأنابيب الخرسانية والمسلحة، عناصر المناهل، العبارات الصندوقية، البردورات، حجارة الرصف، قنوات التصريف، أحجار المنحدرات، الحواجز الخرسانية والبلوكات حسب احتياج المشروع.",
      },
      rooms: {
        eyebrow: "مختارات {room}",
        title: "ملاءمة قياس {room} للمشروع",
        description:
          "قارن المنتجات حسب القياس ومجال الاستخدام واحتياج التسليم.",
      },
      infrastructure: {
        eyebrow: "منتجات خرسانية للبنية التحتية",
        title: "أنابيب خرسانية وعناصر مناهل",
        description:
          "تصفح الأنابيب الخرسانية والمسلحة ومناهل التفتيش ومناهل parcel وعناصر مياه الأمطار حسب احتياج مشروعك.",
      },
      superstructure: {
        eyebrow: "منتجات خرسانية للبنية الفوقية",
        title: "بردورات وحجارة رصف ومنتجات تنسيق المواقع",
        description:
          "قارن البردورات وحجارة الرصف وقنوات التصريف وأحجار العشب وأحجار المنحدرات والحواجز الخرسانية حسب مجال الاستخدام.",
      },
      projectSupply: {
        eyebrow: "توريد المشاريع",
        title: "تخطيط القياس والكمية والتسليم للمنتجات الخرسانية",
        description:
          "خطط لتوريد المنتجات الخرسانية للمواقع والبلديات ومشاريع البنية التحتية وتنسيق المواقع.",
      },
    },
    productDetail: {
      imageZoom: "تكبير الصورة",
      callUs: "اتصل بنا",
      trust: [
        "إنتاج خرسانة متين",
        "تسليم مخطط",
        "منتجات البنية التحتية وتنسيق المواقع",
      ],
      info: "معلومات المنتج",
      descriptionTitle: "وصف المنتج",
      relatedDefault: "منتجات خرسانية أخرى",
      relatedPrefix: "نماذج أخرى من {name}",
      relatedPrev: "المنتجات المرتبطة السابقة",
      relatedNext: "المنتجات المرتبطة التالية",
      productFallback:
        "منتج {name}. تواصل مع هورتاش للخرسانة للحصول على معلومات مفصلة.",
      schemaCategory: "منتج خرساني",
      properties: {
        area: "المساحة",
        room: "عدد الغرف",
        bath: "عدد الحمامات",
        floor: "عدد الطوابق",
        height: "ارتفاع السقف",
      },
    },
    gallery: {
      empty: "لا توجد مشاريع بعد.",
      visualToProduct: "من الصورة إلى المنتج",
      title: "صف العنصر الخرساني الذي لا تعرف اسمه بسهولة من المعرض",
      description:
        "قد يكون المنتج الذي تبحث عنه باسم كنك أو بوز أو روكار أو قناة مياه أمطار أو حجر جانب الطريق أو حجر أرضيات مقابلا لأنبوب خرساني أو عنصر منهل أو بردورة أو حجر رصف أو قناة أو عبارة أو حجر منحدر في المعرض.",
      quote: "طلب عرض سعر",
      imageCount: "صورة",
      faqTitle: "لصفحة المعرض",
      faqAccent: "الأسئلة الأكثر بحثا",
      faqDescription:
        "جمعنا الأسئلة الأكثر بحثا حول العناصر الخرسانية وتطبيقات المواقع وصور المنتجات وتخطيط التوريد.",
      groups: [
        {
          title: "الأنابيب والتصريف",
          text: "أنبوب خرساني، أنبوب خرساني مسلح، أنبوب بجوان، أنبوب لسان ومجرى",
        },
        {
          title: "أنظمة المناهل",
          text: "جسم منهل تفتيش، قاعدة منهل، منهل parcel، عنصر مخروطي",
        },
        {
          title: "الطرق والأرضيات",
          text: "بردورة، حجر رصف، قناة تصريف، حجر عشب",
        },
        {
          title: "حلول الموقع",
          text: "عبارة صندوقية، حجر منحدر، Terra Block، حاجز خرساني، بلوك",
        },
      ],
    },
    footer: {
      supplyEyebrow: "توريد المشاريع",
      supplyTitle: "لنوضح احتياجك من المنتجات الخرسانية.",
      supplyDescription:
        "الكمية الصحيحة والمنتج الصحيح والتسليم المخطط لمنتجات البنية التحتية والفوقية وتنسيق المواقع.",
      description:
        "نعمل بإنتاج متين واختيار واضح للمنتج وتوريد منتظم في العناصر الخرسانية للبنية التحتية والفوقية.",
      corporate: "الشركة",
      products: "المنتجات",
      contact: "اتصل بنا",
      copyAddress: "نسخ العنوان",
      copyPhone: "نسخ رقم الهاتف",
      copyEmail: "نسخ البريد الإلكتروني",
      rights: "جميع الحقوق محفوظة.",
    },
    bottomBar: {
      call: "اتصل الآن",
      whatsapp: "تواصل واتساب",
    },
    brandsPage: {
      eyebrow: "الشراكات",
      title: "توريد عناصر خرسانية لمشاريع بمقاييس مختلفة.",
      description:
        "تعطي هورتاش للخرسانة الأولوية لمعايير المنتج والتسليم في الوقت المناسب والتواصل الواضح في الشراكات المؤسسية.",
      groups: [
        {
          title: "المشاريع البلدية والعامة",
          text: "نوفر تخطيطا منظما لتوريد العناصر الخرسانية في أعمال البنية التحتية والطرق وتنسيق المواقع.",
        },
        {
          title: "المواقع والمقاولون",
          text: "نخطط لتسليم الأنابيب الخرسانية والبردورات وحجارة الرصف والمنتجات المكملة حسب برنامج الموقع.",
        },
        {
          title: "تنسيق المواقع والأعمال البيئية",
          text: "نقدم حلولا للمنتجات الخرسانية المطلوبة في الأرصفة والحدائق والمواقع وترتيبات الطرق.",
        },
      ],
      bullets: ["اختيار منتج قياسي", "تسليم مخطط", "تواصل قابل للمتابعة"],
    },
    argePage: {
      eyebrow: "البحث والتطوير",
      title: "إنتاج أقوى وحلول أوضح للمواقع في العناصر الخرسانية.",
      description:
        "يركز نهج البحث والتطوير لدينا على تحسين جودة المنتج واستمرارية الإنتاج وخطط التوريد المناسبة لاحتياجات مواقع المشاريع.",
      approachEyebrow: "نهج البحث والتطوير",
      approachTitle: "نطور احتياجات الموقع ببيانات هندسية.",
      paragraphs: [
        "تعزز هورتاش للخرسانة مكانتها في القطاع ليس فقط بالإنتاج عالي الجودة، بل أيضا باهتمامها بالبحث والتطوير.",
        "نطور حلولا مبتكرة في كل مرحلة من مراحل العناصر الخرسانية من خلال مراعاة احتياجات الموقع والبيانات الهندسية والتطورات التقنية.",
        "تركز أعمال التطوير لدينا خصوصا على المجالات التالية.",
        "من خلال الاختبارات المخبرية، يتم فحص أداء الجودة والامتثال للمعايير الوطنية والدولية لكل منتج بدقة.",
      ],
      focus: [
        "تركيبات خرسانية عالية المقاومة وطويلة العمر",
        "منتجات صرف وبنية تحتية عالية العزل المائي",
        "عمليات إنتاج تراعي البيئة واستخدام مواد قابلة لإعادة التدوير",
        "تحسينات تصميم تسهل التركيب",
        "أنظمة جديدة للأنابيب الخرسانية والمناهل وأحجار المنحدرات وحجارة الرصف والحواجز",
      ],
      supportEyebrow: "دعم المشروع",
      supportTitle: "تواصل معنا للحصول على حل منتج مناسب لمشروعك.",
      cta: "اتصل بنا",
      imageAlts: [
        "عمل بحث وتطوير ومختبر في هورتاش للخرسانة",
        "عملية مراقبة جودة عنصر خرساني في هورتاش",
        "عمل تطوير الإنتاج في هورتاش",
        "فحص بحث وتطوير لمنتجات البنية التحتية في هورتاش",
      ],
    },
    tsePage: {
      eyebrow: "وثائق الجودة",
      title: "إنتاج مرتبط بالمعايير في العناصر الخرسانية.",
      description:
        "سيتم نشر وثائق TSE المعتمدة ووثائق الجودة في هذه الصفحة عند تحديثها حسب مجموعات المنتجات.",
      requestEyebrow: "طلب وثيقة",
      requestTitle: "هل تحتاج إلى معلومات الوثائق لمشروعك؟",
      cta: "اتصل بنا",
      imageAlt: "صورة وثيقة TSE معتمدة لهورتاش للخرسانة {index}",
      items: [
        {
          title: "نهج إنتاج معتمد من TSE",
          text: "نهج وثائقي يجعل معيار المنتج ومتابعة الإنتاج واضحين في العناصر الخرسانية.",
        },
        {
          title: "عملية مراقبة الجودة",
          text: "عملية تدعم تدفق تسليم المشروع عبر فحص مجموعة المنتج والقياس وما قبل الشحن.",
        },
        {
          title: "منتج مطابق للمعايير",
          text: "انضباط إنتاج يمنح الثقة في الأنابيب الخرسانية وحجارة الرصف والبردورات وعناصر البنية التحتية.",
        },
      ],
    },
    catalog: {
      title: "كتالوج المشروع",
      subtitle: "CT Prefabrik 2025",
      instruction: "انقر لتقليب الصفحات",
      cover: "الغلاف",
      page: "ص. {page}",
      end: "النهاية",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[typeof DEFAULT_LOCALE];

export function getDictionary(locale: Locale): Dictionary {
  return (dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]) as Dictionary;
}

export function formatMessage(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (message, [key, value]) => message.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export function getDateLocale(locale: Locale) {
  if (locale === "en") return "en-US";
  if (locale === "ar") return "ar";
  return "tr-TR";
}
