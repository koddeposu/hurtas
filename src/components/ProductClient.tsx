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
    eyebrow: "Hürtaş Beton Ürün Seçkisi",
    title: "Tüm Beton Ürünleri",
    description:
      "Altyapı, üst yapı ve çevre düzenleme projeleri için beton ürünlerini kategori, kullanım alanı ve proje ihtiyacına göre inceleyin.",
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
