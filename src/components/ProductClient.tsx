"use client";

import { ProductCard } from "@/components/ProductCard";
import { getProductFaqsByCategory } from "@/components/page-faq-content";
import { SeoFaqSection } from "@/components/seo-faq-section";
import { DBCategory, DBProduct } from "@/types/product";
import {
  ArrowUpRight,
  BookOpenText,
  Building2,
  Filter,
  Home,
  Layers3,
  LayoutGrid,
  Link2,
  ShieldCheck,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

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

  if (
    includesRoom(categorySlug, "1+1") ||
    includesRoom(categoryName, "1+1")
  ) {
    return "room-1-1";
  }
  if (
    includesRoom(categorySlug, "2+1") ||
    includesRoom(categoryName, "2+1")
  ) {
    return "room-2-1";
  }
  if (
    includesRoom(categorySlug, "3+1") ||
    includesRoom(categoryName, "3+1")
  ) {
    return "room-3-1";
  }
  if (
    includesRoom(categorySlug, "4+1") ||
    includesRoom(categoryName, "4+1")
  ) {
    return "room-4-1";
  }

  if (categoryName?.includes("Tek Kat")) return "single";
  if (categoryName?.includes("Çift Kat") || categoryName?.includes("Dubleks")) {
    return "double";
  }
  if (categoryName?.includes("Çelik")) return "steel";
  return "all";
}

function getCategoryHref(categories: DBCategory[], matcher: string) {
  const matchedCategory = categories.find((category) =>
    category.name.includes(matcher),
  );

  return matchedCategory
    ? `/prefabrik-evler/${matchedCategory.slug}`
    : "/prefabrik-evler";
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
    product.category?.slug,
    ...(product.categories?.flatMap((item) => [item.name, item.slug]) ?? []),
  ]
    .map((item) => normalizeSearchValue(item))
    .join(" ");

  return searchableText.includes(query);
}

function getRoomPageContent(room: RoomKey) {
  return {
    eyebrow: `${room} Prefabrik Ev Seçkisi`,
    title: `${room} Prefabrik Ev Fiyatları ve Modelleri`,
    description: `${room} prefabrik ev modellerini metrekare, kat planı, kullanım amacı ve anahtar teslim kapsamına göre inceleyin. Kompakt yaşamdan aile kullanımına kadar farklı plan alternatiflerini tek sayfada karşılaştırın.`,
    seoTitle: `${room} Prefabrik Ev Fiyatları ${CURRENT_YEAR}`,
    seoDescription: `${room} prefabrik ev fiyatları; metrekare, malzeme kalitesi, yalıtım seviyesi, proje kapsamı ve teslim detaylarına göre değişir. ${room} plan arayan kullanıcılar için doğru model seçimi, yalnızca fiyat değil plan verimliliği ve uzun ömürlü kullanım kriterleriyle yapılmalıdır.`,
    seoCards: [
      {
        title: `${room} Prefabrik Ev Modelleri`,
        text: `${room} prefabrik ev modelleri, yaşam alışkanlığına uygun plan kurgusu ile öne çıkar. Salon-mutfak ilişkisi, oda yerleşimi, doğal ışık kullanımı ve günlük kullanım konforu birlikte değerlendirilmelidir.`,
      },
      {
        title: `${room} Prefabrik Ev Fiyatları Neye Göre Değişir?`,
        text: `${room} prefabrik ev fiyatlarında metrekare, duvar sistemi, çatı tipi, pencere-doğrama seçimi ve anahtar teslim kapsamı temel belirleyicilerdir. Sağlıklı karşılaştırma için teklif içeriği kalem kalem incelenmelidir.`,
      },
      {
        title: `${room} Planında Doğru Model Seçimi`,
        text: `${room} planı tercih edilirken arsa ölçüsü, aile kişi sayısı, depolama ihtiyacı ve gelecekteki kullanım senaryoları birlikte ele alınmalıdır. Böylece hem bütçeye hem yaşam konforuna uygun model seçimi yapılabilir.`,
      },
      {
        title: `${room} Prefabrik Evlerde Anahtar Teslim Kapsam`,
        text: `Anahtar teslim ${room} prefabrik ev projelerinde dış cephe, çatı, iç bölme, elektrik altyapısı, ıslak hacim detayları, nakliye ve montaj kalemleri teklif kapsamında açık şekilde yer almalıdır.`,
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
      eyebrow: "Tek Katlı Prefabrik Ev Seçkisi",
      title: `Tek Katlı Prefabrik Ev Fiyatları ve Modelleri`,
      description:
        "Tek katlı prefabrik ev modellerini metrekare, oda planı ve yaşam ihtiyaçlarına göre inceleyin. Fiyatları etkileyen detayları ve anahtar teslim kapsamını net biçimde değerlendirin.",
      seoTitle: `Tek Katlı Prefabrik Ev Fiyatları ${CURRENT_YEAR}`,
      seoDescription:
        "Tek katlı prefabrik ev fiyatları ve modelleri değerlendirilirken sadece başlangıç fiyatlarına değil, malzeme kalitesi, anahtar teslim kapsamı, ruhsat uygunluğu, enerji verimliliği ve arsa koşullarına birlikte bakmak gerekir. Doğru planlandığında tek katlı prefabrik evler hem ekonomik hem de uzun ömürlü bir yaşam çözümü sunar.",
      seoCards: [
        {
          title: `Tek Katlı Prefabrik Ev Fiyatları ${CURRENT_YEAR}`,
          text: "Tek katlı prefabrik ev fiyatları 2026 yılında metrekare, oda sayısı, çatı sistemi, cephe detayları, yalıtım seviyesi ve anahtar teslim kapsamına göre değişir. Hammadde ve üretim maliyetlerindeki hareketlilik fiyatları etkileyebilir; ancak prefabrik evler hâlâ betonarme yapılara göre daha kontrollü ve çoğu zaman daha ekonomik bir çözüm sunar. Sağlıklı bir karşılaştırma için yalnızca başlangıç rakamına değil, teklifin içinde hangi uygulama kalemlerinin bulunduğuna da dikkat edilmelidir.",
        },
        {
          title: "Tek Katlı Prefabrik Ev Modelleri ve Fiyat Karşılaştırması",
          text: "Tek katlı prefabrik ev modelleri; 1+1, 2+1, 3+1 ve daha geniş plan alternatifleriyle farklı yaşam ihtiyaçlarına hitap eder. Model seçerken arsa yapısı, aile büyüklüğü, oda dağılımı, mutfak-salon ilişkisi ve kullanım alışkanlıkları dikkate alınmalıdır. Modern çizgili ya da klasik görünümlü modeller arasında karar verirken sadece görsele değil, iç planın günlük yaşama ne kadar uyduğuna bakmak daha doğru sonuç verir.",
        },
        {
          title: "Tek Katlı Prefabrik Ev Alırken Nelere Dikkat Edilmeli?",
          text: "Prefabrik ev alırken dikkat edilmesi gereken en önemli konular ruhsat uygunluğu, inşaat malzemelerinin kalitesi, ısı yalıtımı, teslim süresi ve montaj kapsamıdır. Teklif alınırken nakliye, montaj, iç kapılar, ıslak hacimler, elektrik altyapısı ve çatı sistemi gibi başlıkların dahil olup olmadığı net görülmelidir. En ucuz teklif her zaman en iyi çözüm anlamına gelmez; önemli olan uzun ömürlü kullanım sağlayacak kalite-fiyat dengesidir.",
        },
        {
          title: "Arazi Uygunluğu, Enerji Verimliliği ve Ruhsat Süreci",
          text: "Tek katlı prefabrik evler için düz ve ulaşımı kolay araziler avantaj sağlar; ancak asıl belirleyici unsur arsanın imar uygunluğu ve ruhsat süreçleridir. Bunun yanında enerji verimliliği sunan duvar sistemleri, çatı yalıtımı ve kaliteli doğrama çözümleri uzun vadede ısınma ve soğutma maliyetlerini düşürür. Doğru malzeme tercihleriyle prefabrik evlerde konforlu ve ekonomik bir yaşam kurmak mümkündür.",
        },
        {
          title: "Tek Katlı Prefabrik Evlerin Avantajları Nelerdir?",
          text: "Tek katlı prefabrik evler hızlı kurulum, dengeli maliyet, kolay bakım ve sade yaşam planı avantajıyla öne çıkar. Özellikle erişilebilir kullanım isteyen aileler, yaşlı bireyler veya pratik yaşam alanı arayan kullanıcılar için tek katlı planlar hem konfor hem de fonksiyon açısından güçlü bir tercih oluşturur.",
        },
        {
          title: "Tek Katlı Prefabrik Evlerde Isı Yalıtımı Neden Önemli?",
          text: "Isı yalıtımı, tek katlı prefabrik evlerde hem yaşam konforunu hem de enerji maliyetlerini doğrudan etkiler. Doğru duvar sistemi, çatı çözümü ve pencere kalitesi sayesinde kış aylarında ısı kaybı azalır, yaz aylarında ise iç mekan daha dengeli kalır. Bu da uzun vadede daha ekonomik kullanım sağlar.",
        },
      ],
    };
  }

  if (categoryKey === "double") {
    return {
      eyebrow: "Çift Katlı Prefabrik Ev Seçkisi",
      title: "Çift Katlı Prefabrik Ev Fiyatları ve Modelleri",
      description:
        "Dubleks prefabrik ev modellerini geniş yaşam planı, cephe dili ve teslim kapsamına göre karşılaştırın. Çift katlı çözümlerde fiyatı ve planı etkileyen ana unsurları birlikte görün.",
      seoTitle: `Çift Katlı Prefabrik Ev Fiyatları ve Modelleri ${CURRENT_YEAR}`,
      seoDescription:
        "Çift katlı prefabrik ev modelleri geniş yaşam alanı, ferah plan ve villa hissi arayan kullanıcılar için güçlü bir seçenektir. Dubleks prefabrik ev fiyatlarını değerlendirirken kat planı, cephe malzemesi, balkon-teras detayları ve anahtar teslim kapsamı birlikte okunmalıdır.",
      seoCards: [
        {
          title: "Dubleks Prefabrik Ev Fiyatları ve Modelleri",
          text: "Dubleks prefabrik ev fiyatları; kat planı, merdiven çözümü, balkon-teras detayları, cephe malzemesi ve anahtar teslim beklentisine göre şekillenir. Büyük metrekareli yapılar sunmasına rağmen çift katlı prefabrik evler, doğru planlama ile hâlâ avantajlı bir maliyet-performans dengesi oluşturabilir. Fiyat karşılaştırması yaparken sadece m2 büyüklüğüne değil, tasarım ve uygulama kapsamına da birlikte bakılmalıdır.",
        },
        {
          title: "Çift Katlı Prefabrik Evlerde Konforlu Planlama",
          text: "Çift katlı prefabrik evler yaşam alanını iki kata yayarak salon, mutfak, banyo ve yatak odaları arasında daha konforlu bir ayrım kurulmasını sağlar. Geniş aileler, üst katta özel yaşam alanı isteyen kullanıcılar ve villa tipi plan hayal edenler için dubleks prefabrik çözümler oldukça güçlüdür. İhtiyaca göre oda sayısı, pencere düzeni, balkon ve dış cephe dili kişiselleştirilebilir.",
        },
        {
          title: "Çift Katlı Prefabrik Ev Alırken Nelere Bakılmalı?",
          text: "Taşıyıcı sistem kalitesi, katlar arası plan dengesi, ısı ve ses yalıtımı, ruhsat uygunluğu ve teslim kapsamı dikkatle değerlendirilmelidir. Özellikle çift katlı yapılarda proje çözümünün sağlam olması, deprem güvenliği ve uzun ömürlü kullanım açısından kritik öneme sahiptir. Teklif alınırken hangi malzemelerin kullanıldığı ve montaj sonrası hangi kalemlerin teslim edildiği mutlaka netleştirilmelidir.",
        },
        {
          title: "Neden Çift Katlı Prefabrik Ev Tercih Edilir?",
          text: "Çift katlı prefabrik evler geniş yaşam alanı sunarken hızlı kurulum, ekonomik üretim ve modern tasarım avantajlarını da beraberinde getirir. Ferah oda planları, teras ve balkon gibi detaylarla zenginleşen dubleks prefabrik yapılar, uzun yıllar kullanılabilecek konforlu bir yaşam alanı oluşturmak isteyenler için dikkat çeken bir seçenektir.",
        },
        {
          title: "Prefabrik Ev Kaç Katlı Olabilir?",
          text: "Prefabrik ev projelerinde en yaygın çözümler tek katlı ve çift katlı planlardır. Özellikle dubleks prefabrik evler, geniş yaşam alanı ihtiyacını ekonomik ve hızlı bir üretim modeliyle karşılamak isteyen kullanıcılar için güçlü bir alternatiftir. Kat sayısı planlanırken arsa imarı ve kullanım senaryosu birlikte değerlendirilmelidir.",
        },
        {
          title:
            "Çift Katlı Prefabrik Evlerde Dış Cephe ve Tasarım Seçenekleri",
          text: "Çift katlı prefabrik evlerde geniş pencere açıklıkları, balkon-teras çözümleri, modern cephe çizgileri ve farklı renk kombinasyonları ile güçlü bir dış görünüm elde edilebilir. Tasarım detayları yalnızca estetik değil, aynı zamanda iç mekan ışığı ve yaşam kalitesi açısından da önemli katkı sağlar.",
        },
      ],
    };
  }

  if (categoryKey === "steel") {
    return {
      eyebrow: "Çelik Ev Seçkisi",
      title: "Çelik Ev Fiyatları ve Modelleri",
      description:
        "Çelik prefabrik ev modellerini, anahtar teslim çelik konstrüksiyon ev fiyatlarını ve projelendirme sürecini tek sayfada inceleyin. Dayanıklılık, modern tasarım ve teknik kaliteyi bir arada değerlendirin.",
      seoTitle: `Çelik Prefabrik Ev Modelleri ve Fiyatları ${CURRENT_YEAR}`,
      seoDescription:
        "Çelik prefabrik ev modelleri, anahtar teslim çelik konstrüksiyon ev fiyatları ve çelik prefabrik ev yapımı hakkında doğru karar vermek için teknik kalite, yalıtım seviyesi, teslim kapsamı ve kullanım ömrü birlikte değerlendirilmelidir.",
      seoCards: [
        {
          title: "Çelik Prefabrik Ev Modelleri ve Fiyatları",
          text: "Çelik prefabrik ev modelleri ve fiyatları; taşıyıcı sistem detayları, cephe çözümleri, çelik kalınlığı, yalıtım seviyesi ve yaşam planına göre değişir. Anahtar teslim çelik konstrüksiyon ev fiyatları değerlendirilirken yalnızca kaba yapı değil, proje içeriğinin hangi detayları kapsadığı da dikkatle okunmalıdır. Tek katlı çelik ev, villa tipi çelik ev ve özel planlı çelik yapı teklifleri bu nedenle farklı fiyat seviyelerinde olabilir.",
        },
        {
          title: "Çelik Prefabrik Ev Yapımı Nasıl İlerler?",
          text: "Çelik prefabrik ev yapımı keşif, proje geliştirme, üretim, sevkiyat ve montaj adımlarından oluşur. Üretimin kontrollü ortamda ilerlemesi, sahadaki iş yükünü azaltır ve süreci klasik yapılara kıyasla daha planlı hale getirir. Özellikle çelik konstrüksiyon hazır ev çözümlerinde doğru proje yönetimi hem teslim süresini hem de uygulama kalitesini doğrudan etkiler.",
        },
        {
          title: "Çelik Konstrüksiyon Hazır Ev Alırken Nelere Dikkat Edilmeli?",
          text: "Malzeme kalitesi, teknik detay çözümü, ısı yalıtımı, nem ve ısı davranışı, teslim kapsamı ve garanti yaklaşımı en önemli başlıklardır. Çelik konstrüksiyon hazır ev alırken yalnızca fiyat odaklı ilerlemek yerine, kullanılan malzemenin standardını ve uygulama disiplinini birlikte değerlendirmek gerekir. Güçlü teknik altyapı, uzun ömürlü ve güvenli kullanım için belirleyici olur.",
        },
        {
          title: "Çelik Evlerde Konfor, Dayanıklılık ve Uzun Ömür",
          text: "Çelik ev modelleri modern tasarım dili, güçlü taşıyıcı sistem ve yüksek yalıtım performansı ile öne çıkar. Doğru projelendirme yapıldığında çelik evler dört mevsim konforlu kullanım sağlar ve uzun vadeli enerji maliyetlerini kontrol altında tutar. Bu nedenle çelik ev fiyatları değerlendirilirken sadece ilk yatırım değil, kullanım ömrü ve yaşam kalitesi de hesaba katılmalıdır.",
        },
        {
          title: "Tek Katlı Çelik Ev Fiyatları Neye Göre Değişir?",
          text: "Tek katlı çelik ev fiyatları; metrekare, taşıyıcı sistem kalitesi, duvar ve çatı çözümleri, yalıtım seviyesi ve anahtar teslim kapsamına göre değişir. Basit m2 hesabı yerine teknik detaylarla birlikte yapılan değerlendirme, daha doğru fiyat analizi sağlar.",
        },
        {
          title:
            "Anahtar Teslim Çelik Konstrüksiyon Ev Fiyatları Neden Farklıdır?",
          text: "Anahtar teslim çelik konstrüksiyon ev fiyatları firmadan firmaya değişebilir çünkü her teklif aynı kapsamı içermez. Bazı projelerde iç mekan çözümleri, ıslak hacim detayları, doğrama sistemi veya montaj sonrası teslim kalemleri farklı olabilir. Bu yüzden teklif karşılaştırması yapılırken kapsama odaklanmak gerekir.",
        },
      ],
    };
  }

  return {
    eyebrow: "CT Prefabrik Ürün Seçkisi",
    title: "Prefabrik Ev Modelleri ve Fiyatları",
    description:
      "Tek katlı prefabrik ev, çift katlı prefabrik ev, çelik ev, prefabrik villa ve farklı yaşam çözümlerini tek sayfada inceleyin. Model, fiyat ve teslim kapsamını ihtiyacınıza göre karşılaştırın.",
    seoTitle: `Prefabrik Ev Modelleri ve Fiyatları ${CURRENT_YEAR}`,
    seoDescription:
      "Prefabrik ev modelleri, prefabrik villa, dubleks prefabrik, çelik prefabrik ev modelleri fiyatları ve konteyner ev çözümleri arasında doğru karar verebilmek için model yapısı, proje kapsamı, üretim kalitesi ve fiyat-performans dengesi birlikte değerlendirilmelidir.",
    seoCards: [
      {
        title: "Prefabrik Ev Modelleri ve Fiyatları",
        text: "Prefabrik ev modelleri ve fiyatları; metrekare, plan tipi, malzeme seviyesi, cephe detayları ve anahtar teslim kapsamına göre değişir. Tek katlı prefabrik ev, çift katlı prefabrik ev ve çelik prefabrik ev modelleri arasında doğru karşılaştırma yapmak için yalnızca fiyat listesine değil, yaşam beklentisine ve uygulama içeriğine birlikte bakmak gerekir.",
      },
      {
        title: "Prefabrik Villa, Dubleks Prefabrik ve Çelik Ev Seçenekleri",
        text: "Prefabrik villa çözümleri, dubleks prefabrik ev planları ve çelik konstrüksiyon hazır ev modelleri farklı yaşam beklentilerine yanıt verir. Daha geniş ve ferah plan isteyen kullanıcılar için çift katlı çözümler öne çıkarken, teknik dayanım ve modern çizgi isteyenler çelik ev modellerine yönelir. Her modelin avantajı arsa yapısı, kullanım amacı ve bütçe doğrultusunda değerlendirilmelidir.",
      },
      {
        title:
          "Konteyner Ev, Anahtar Teslim Çelik Konstrüksiyon Ev ve Teslim Süreci",
        text: "Konteyner ev modelleri, konteyner ev fiyatları ve anahtar teslim çelik konstrüksiyon ev fiyatları proje kapsamına göre değişkenlik gösterir. Özellikle hızlı yerleşim, modüler kullanım veya pratik çözüm arayanlar için konteyner evler güçlü bir alternatif sunar. Sağlıklı karar için üretim kalitesi, teslim süresi, yalıtım yapısı ve uygulama içeriği birlikte incelenmelidir.",
      },
      {
        title: "Prefabrik Ev Alırken Doğru Karar Nasıl Verilir?",
        text: "Prefabrik ev satın alırken ruhsat uygunluğu, zemin durumu, enerji verimliliği, üretim kalitesi ve satış sonrası yaklaşım en önemli başlıklardır. Markalar arası karşılaştırma yapılırken sadece kampanya veya başlangıç fiyatına odaklanmak yerine, uzun ömürlü kullanım sağlayacak teknik kaliteyi görmek daha doğru sonuç verir. Bu yaklaşım hem bütçeyi korur hem de daha güvenli bir yatırım süreci sağlar.",
      },
      {
        title: "Prefabrik Ev, Konteyner Ev ve Çelik Ev Arasındaki Farklar",
        text: "Prefabrik ev, konteyner ev ve çelik ev çözümleri farklı ihtiyaçlara hitap eder. Prefabrik evler plan çeşitliliği ve uygun maliyet dengesiyle öne çıkarken, çelik evler teknik dayanım ve modern çizgi arayan kullanıcılar için güçlü bir seçenektir. Konteyner ev modelleri ise hızlı yerleşim ve modüler kullanım avantajı sunar.",
      },
      {
        title: "Anahtar Teslim Yapılarda Neler Sorgulanmalı?",
        text: "Anahtar teslim bir yapı satın alınırken teklifin hangi işleri kapsadığı ayrıntılı biçimde görülmelidir. Üretim standardı, montaj, elektrik altyapısı, ıslak hacim çözümleri, iç kapılar, pencere sistemleri ve yalıtım düzeyi gibi başlıkların açık yazılması, daha güvenli bir satın alma süreci sağlar.",
      },
    ],
  };
}

function getFaqContent(categoryName?: string, categorySlug?: string) {
  const categoryKey = getCategoryKey(categoryName, categorySlug);

  if (categoryKey === "room-1-1") {
    return {
      title: "1+1 Prefabrik Evler İçin",
      accent: "En Çok Aranan Sorular",
      description:
        "1+1 prefabrik ev fiyatları, metrekare planı, teslim süreci ve anahtar teslim kapsam hakkında en çok sorulan soruları burada topladık.",
    };
  }

  if (categoryKey === "room-2-1") {
    return {
      title: "2+1 Prefabrik Evler İçin",
      accent: "En Çok Aranan Sorular",
      description:
        "2+1 prefabrik ev modelleri, fiyat detayları, ruhsat süreci ve aile kullanımına uygun plan seçimiyle ilgili soruları burada yanıtladık.",
    };
  }

  if (categoryKey === "room-3-1") {
    return {
      title: "3+1 Prefabrik Evler İçin",
      accent: "En Çok Aranan Sorular",
      description:
        "3+1 prefabrik ev fiyatları, büyük aileler için planlama, anahtar teslim kapsam ve teslim süreci hakkında merak edilenleri burada bulabilirsiniz.",
    };
  }

  if (categoryKey === "room-4-1") {
    return {
      title: "4+1 Prefabrik Evler İçin",
      accent: "En Çok Aranan Sorular",
      description:
        "4+1 prefabrik ev modelleri, geniş yaşam planı, dubleks çözümler ve proje kapsamıyla ilgili en çok aranan soruları bu bölümde topladık.",
    };
  }

  if (categoryKey === "single") {
    return {
      title: "Tek Katlı Prefabrik Evler İçin",
      accent: "En Çok Aranan Sorular",
      description:
        "Tek katlı prefabrik ev fiyatları, modelleri, anahtar teslim kapsam, ruhsat süreci ve Sakarya uygulamaları hakkında kullanıcıların en çok aradığı soruları burada topladık.",
    };
  }

  if (categoryKey === "double") {
    return {
      title: "Çift Katlı Prefabrik Evler İçin",
      accent: "En Çok Aranan Sorular",
      description:
        "Dubleks prefabrik ev fiyatları, çift katlı plan seçenekleri, anahtar teslim kapsam, ruhsat süreci ve Sakarya uygulamaları hakkında en çok sorulan başlıkları burada yanıtladık.",
    };
  }

  if (categoryKey === "steel") {
    return {
      title: "Çelik Evler İçin",
      accent: "En Çok Aranan Sorular",
      description:
        "Çelik prefabrik ev modelleri, çelik ev fiyatları, anahtar teslim çelik konstrüksiyon ev kapsamı, yalıtım ve uygulama süreci hakkında en çok aranan soruları burada bulabilirsiniz.",
    };
  }

  return {
    title: "Prefabrik Evler Sayfası İçin",
    accent: "En Çok Aranan Sorular",
    description:
      "Prefabrik ev modelleri, çelik prefabrik ev fiyatları, dubleks prefabrik çözümler, prefabrik villa seçenekleri ve anahtar teslim kapsam hakkında kullanıcıların en çok aradığı soruları burada topladık.",
  };
}

function getInternalLinks(categoryName?: string, categorySlug?: string) {
  const categoryKey = getCategoryKey(categoryName, categorySlug);

  if (categoryKey === "room-1-1") {
    return [
      {
        title: "1+1 Prefabrik Ev Rehberleri",
        description:
          "Kompakt yaşam planı, maliyet analizi ve teslim süreci için blog içeriklerine geçin.",
        href: "/blog",
        icon: BookOpenText,
      },
      {
        title: "1+1 Proje Örnekleri",
        description:
          "Tamamlanan küçük metrekareli uygulamaları inceleyip plan fikirleri alın.",
        href: "/projelerimiz",
        icon: LayoutGrid,
      },
    ];
  }

  if (categoryKey === "room-2-1") {
    return [
      {
        title: "2+1 Prefabrik Ev İçerikleri",
        description:
          "2+1 planlarda oda dağılımı, fiyat ve kullanım senaryosu karşılaştırmaları için bloga geçin.",
        href: "/blog",
        icon: BookOpenText,
      },
      {
        title: "2+1 Referans Projeler",
        description:
          "2+1 planla tamamlanan projeleri görüp yaşam düzenine uygun model seçin.",
        href: "/projelerimiz",
        icon: LayoutGrid,
      },
    ];
  }

  if (categoryKey === "room-3-1") {
    return [
      {
        title: "3+1 Prefabrik Ev Rehberleri",
        description:
          "Geniş aile planı, yaşam konforu ve bütçe dengesi için detaylı blog içeriklerine göz atın.",
        href: "/blog",
        icon: BookOpenText,
      },
      {
        title: "3+1 Uygulama Projeleri",
        description:
          "3+1 planların sahadaki gerçek uygulama örneklerini proje sayfasında inceleyin.",
        href: "/projelerimiz",
        icon: LayoutGrid,
      },
    ];
  }

  if (categoryKey === "room-4-1") {
    return [
      {
        title: "4+1 Plan ve Maliyet Rehberi",
        description:
          "4+1 prefabrik evlerde metrekare-fiyat dengesini ve teknik kapsamı blog içerikleriyle inceleyin.",
        href: "/blog",
        icon: BookOpenText,
      },
      {
        title: "4+1 Geniş Yaşam Projeleri",
        description:
          "4+1 oda planlı referans projeler üzerinden cephe ve iç plan fikirleri alın.",
        href: "/projelerimiz",
        icon: LayoutGrid,
      },
    ];
  }

  if (categoryKey === "single") {
    return [
      {
        title: "Tek Katlı Prefabrik Ev İçerikleri",
        description:
          "Blog sayfasında tek katlı prefabrik ev fiyatları, ruhsat ve teslim süreci hakkında içeriklere geçin.",
        href: "/blog",
        icon: BookOpenText,
      },
      {
        title: "Tek Katlı Proje Örnekleri",
        description:
          "Tamamlanan referans projeler üzerinden plan, metrekare ve dış cephe fikirleri alın.",
        href: "/projelerimiz",
        icon: LayoutGrid,
      },
    ];
  }

  if (categoryKey === "double") {
    return [
      {
        title: "Dubleks Prefabrik Rehberleri",
        description:
          "Çift katlı prefabrik ev modelleri ve plan önerileri için blog içeriklerine göz atın.",
        href: "/blog",
        icon: BookOpenText,
      },
      {
        title: "Çift Katlı Referans Projeler",
        description:
          "Dubleks yaşam planı içeren proje uygulamalarını detaylı biçimde inceleyin.",
        href: "/projelerimiz",
        icon: LayoutGrid,
      },
    ];
  }

  if (categoryKey === "steel") {
    return [
      {
        title: "Çelik Ev Blog İçerikleri",
        description:
          "Çelik konstrüksiyon ev, yalıtım, fiyat ve teknik detaylara dair blog yazılarına geçin.",
        href: "/blog",
        icon: BookOpenText,
      },
      {
        title: "Çelik Ev Projeleri",
        description:
          "Tamamlanan çelik ev ve modern yaşam alanı uygulamalarını proje sayfasında inceleyin.",
        href: "/projelerimiz",
        icon: LayoutGrid,
      },
    ];
  }

  return [
    {
      title: "Blog Rehberlerine Geçin",
      description:
        "Prefabrik ev fiyatları, modelleri, anahtar teslim süreç ve ruhsat konularını blog yazılarında inceleyin.",
      href: "/blog",
      icon: BookOpenText,
    },
    {
      title: "Projelerimizi İnceleyin",
      description:
        "Tamamlanan prefabrik ev, dubleks prefabrik ve çelik ev uygulamaları üzerinden fikir alın.",
      href: "/projelerimiz",
      icon: LayoutGrid,
    },
  ];
}

function TopCategoryFilters({
  categories,
  activeCategory,
}: {
  categories: DBCategory[];
  activeCategory?: string;
}) {
  const activeCategoryItem = activeCategory
    ? categories.find((item) => item.slug === activeCategory)
    : undefined;
  const activeCategoryKey = getCategoryKey(
    activeCategoryItem?.name,
    activeCategoryItem?.slug,
  );

  const roomFilters = ([
    { room: "1+1", key: "room-1-1", icon: Home },
    { room: "2+1", key: "room-2-1", icon: Home },
    { room: "3+1", key: "room-3-1", icon: Home },
    { room: "4+1", key: "room-4-1", icon: Home },
  ] as const)
    .map((item) => {
      const category = categories.find(
        (cat) =>
          includesRoom(cat.slug, item.room) || includesRoom(cat.name, item.room),
      );

      if (!category) return null;

      return {
        label: item.room,
        href: `/prefabrik-evler/${category.slug}`,
        active: activeCategoryKey === item.key,
        icon: item.icon,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const filterItems = [
    {
      label: "Tümü",
      href: "/prefabrik-evler",
      active: !activeCategory,
      icon: Home,
    },
    {
      label: "Tek Katlı",
      href: getCategoryHref(categories, "Tek Kat"),
      active: activeCategoryKey === "single",
      icon: Building2,
    },
    {
      label: "Çift Katlı",
      href: getCategoryHref(categories, "Çift Kat"),
      active: activeCategoryKey === "double",
      icon: Layers3,
    },
    {
      label: "Çelik Ev",
      href: getCategoryHref(categories, "Çelik"),
      active: activeCategoryKey === "steel",
      icon: ShieldCheck,
    },
    ...roomFilters,
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {filterItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition-all duration-300 ${
              item.active
                ? "border-primary bg-primary text-white shadow-[0_18px_40px_-28px_rgba(73,32,45,0.55)]"
                : "border-slate-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-[0_16px_38px_-30px_rgba(15,23,42,0.18)]"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

function SeoFooter({
  title,
  description,
  cards,
}: {
  title: string;
  description: string;
  cards: Array<{ title: string; text: string }>;
}) {
  return (
    <section className="mt-14 rounded-[1rem] border border-slate-300 bg-[#f7f5ef] p-6 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.16)] md:p-8 lg:p-10">
      <div className="max-w-4xl">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
          CT PREFABRİK
        </p>
        <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
          {title}
        </h2>
        <p className="mt-5 text-base font-medium leading-8 text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1rem] border border-slate-300 bg-white p-6 shadow-[0_16px_34px_-28px_rgba(15,23,42,0.12)]"
          >
            <h3 className="text-xl font-black leading-snug tracking-tight text-slate-900 md:text-2xl">
              {card.title}
            </h3>
            <p className="mt-4 text-base font-medium leading-8 text-slate-600">
              {card.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function InternalLinkSection({
  items,
}: {
  items: Array<{
    title: string;
    description: string;
    href: string;
    icon: typeof BookOpenText;
  }>;
}) {
  return (
    <section className="mt-14 rounded-[1rem] border border-slate-300 bg-white p-6 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.14)] md:p-8">
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
          <Link2 className="h-4 w-4" />
          İlgili Sayfalar
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
          Kategori İncelemesini Blog ve Projelerle Derinleştirin
        </h2>
        <p className="mt-3 text-sm font-medium leading-7 text-slate-600 md:text-base">
          Model seçimi yaparken sadece ürün kartlarına bakmak yerine, ilgili blog
          içerikleri ve tamamlanan projeler arasında geçiş yapmak daha sağlıklı
          karar vermenizi sağlar.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[0.9rem] border border-slate-300 bg-[#f8f7f3] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-[0_18px_42px_-34px_rgba(15,23,42,0.16)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-secondary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
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
  const normalizedSearchQuery = normalizeSearchValue(searchQuery);
  const visibleProducts = normalizedSearchQuery
    ? products.filter((product) =>
        productMatchesQuery(product, normalizedSearchQuery),
      )
    : products;

  const activeCategoryName = activeCategory
    ? categories.find((category) => category.slug === activeCategory)?.name
    : undefined;

  const content = getPageContent(activeCategoryName, activeCategory);
  const faqContent = getFaqContent(activeCategoryName, activeCategory);
  const faqItems = getProductFaqsByCategory(activeCategoryName, activeCategory);
  const internalLinks = getInternalLinks(activeCategoryName, activeCategory);

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

      <section className="pb-10 pt-14 lg:pb-12 lg:pt-18">
        <div className="relative py-2">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-secondary">
              {content.eyebrow}
            </p>
            <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              {content.title}
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600">
              {content.description}
            </p>

            <div className="mt-6 flex justify-center border-t border-slate-200 pt-5">
              <TopCategoryFilters
                categories={categories}
                activeCategory={activeCategory}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        {visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[1rem] border border-slate-300 bg-white px-6 py-20">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-slate-100">
              <Filter size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Ürün Bulunamadı
            </h3>
            <p className="mt-2 max-w-md text-center text-slate-500">
              {normalizedSearchQuery
                ? `"${searchQuery}" araması için uygun ürün bulunamadı.`
                : activeCategoryName
                ? `"${activeCategoryName}" kategorisinde henüz ürün bulunmuyor.`
                : "Henüz ürün eklenmemiş."}
            </p>
            <Link
              href="/prefabrik-evler"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              Tüm Ürünleri Gör
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                fullscreenChange={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}

        <SeoFooter
          title={content.seoTitle}
          description={content.seoDescription}
          cards={content.seoCards}
        />

        <InternalLinkSection items={internalLinks} />

        <div className="mt-14">
          <SeoFaqSection
            title={faqContent.title}
            accent={faqContent.accent}
            description={faqContent.description}
            items={faqItems}
          />
        </div>
      </section>
    </div>
  );
};

export default ProductsClient;
