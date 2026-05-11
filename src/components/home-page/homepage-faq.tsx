import { SeoFaqSection } from "@/components/seo-faq-section";

export const HOMEPAGE_FAQS = [
  {
    question: "Hürtaş Beton hangi ürünleri üretiyor?",
    answer:
      "Hürtaş Beton; beton borular, parsel bacaları, baca gövde ve tabanları, kutu menfez, PTT menhol, betonarme borular, baca elemanları, lambazıvana beton borular, baca yükseltme halkaları ve kapaklar, C parçalar, konik elemanlar, taban elemanları, yağmur suyu ızgara tabanları, beton saksılar, harpuşta ve küpeşteler, blok taşları, bordür taşları, oluk taşları, parke taşları, beton bariyer, zemin karoları ve park mantarı & beton dubalar üretmektedir.",
  },
  {
    question: "Rögar kapağı veya baca kapağı nereden alınır?",
    answer:
      "Rögar kapağı, baca kapağı veya muayene bacası kapağı olarak da bilinen ürünler Hürtaş Beton'un baca yükseltme halkaları ve kapaklar kategorisinde yer almaktadır. Farklı çap ve yük sınıflarında üretim yapılmaktadır.",
  },
  {
    question: "Beton boru fiyatları neye göre değişir?",
    answer:
      "Beton boru fiyatları; boru çapı, et kalınlığı, boru boyu, kullanım amacı (yağmur suyu, atık su, drenaj) ve sipariş miktarına göre değişir. Betonarme boru ve normal beton boru arasında da fiyat farkı oluşabilir.",
  },
  {
    question: "Parsel bacası nedir, ne işe yarar?",
    answer:
      "Parsel bacası; binaların atık su sistemini ana kanalizasyon hattına bağlayan ve bakım-temizlik amacıyla erişim imkânı sunan beton elemandır. Konut, site ve sanayi projelerinde zorunlu altyapı bileşenidir.",
  },
  {
    question: "Kutu menfez ne için kullanılır?",
    answer:
      "Kutu menfez; yol altı geçişleri, tarım arazisi su kanalları ve dere ıslahı gibi projelerde kullanılan dikdörtgen kesitli beton yapı elemanıdır. Farklı açıklık ve yükseklik ölçülerinde üretilir.",
  },
  {
    question: "Bordür taşı çeşitleri nelerdir?",
    answer:
      "Hürtaş Beton; yol kenarı bordürü, bahçe bordürü, tretuvar bordürü ve kanal bordürü gibi farklı profillerde beton bordür taşı üretmektedir. Standart ve özel ölçülerde sipariş verilebilir.",
  },
  {
    question: "Parke taşı fiyatları nasıl hesaplanır?",
    answer:
      "Parke taşı fiyatları; taş boyutu, kalınlık, desen, renk ve sipariş miktarına göre belirlenir. Metrekare bazında fiyatlandırma yapılır; nakliye mesafesi de toplam maliyeti etkiler.",
  },
  {
    question: "Beton saksı ve çiçeklik modelleri var mı?",
    answer:
      "Evet, Hürtaş Beton farklı desen, renk ve ölçülerde beton saksı ve çiçeklik üretmektedir. Peyzaj düzenlemesi, park alanı ve dış mekân süslemesi için uygun modeller mevcuttur.",
  },
  {
    question: "Beton bariyer nedir, nerede kullanılır?",
    answer:
      "Beton bariyer; yol güvenliği, şantiye çevrimi, otopark ayırımı ve kaza önleme amacıyla kullanılan ağır beton elemanlardır. Taşınabilir ve sabit modelleri mevcuttur.",
  },
  {
    question: "Park mantarı ve beton duba ne işe yarar?",
    answer:
      "Park mantarı ve beton dubalar; park alanı düzenlemesi, yaya bölgesi koruması ve araç girişi engelleme amacıyla kullanılır. Dayanıklı yapıları sayesinde uzun yıllar bakım gerektirmez.",
  },
  {
    question: "Zemin karosu ve harpuşta ürünleri var mı?",
    answer:
      "Evet, Hürtaş Beton zemin karoları ile duvar üstü su geçişini önlemek amacıyla kullanılan harpuşta ve küpeşte ürünleri de üretmektedir. Farklı profil ve ölçü seçenekleri mevcuttur.",
  },
  {
    question: "Yağmur suyu ızgarası ve ızgara tabanı nasıl seçilir?",
    answer:
      "Yağmur suyu ızgara tabanı seçiminde; ızgara açıklığı, yük sınıfı (yaya/araç trafiği), bağlantı borusu çapı ve kurulum yapılacak zemin tipi göz önünde bulundurulmalıdır.",
  },
  {
    question: "PTT menhol nedir?",
    answer:
      "PTT menhol; telekomünikasyon altyapısında kablo geçişleri ve bağlantı noktaları için kullanılan özel beton muayene bacasıdır. Standart PTT projelerinin altyapı şartnamelerine uygun üretilir.",
  },
  {
    question: "Oluk taşı ne işe yarar?",
    answer:
      "Oluk taşı; yol kenarı, bahçe ve çevre düzenlemesinde yüzey sularının toplanması ve yönlendirilmesi amacıyla kullanılır. Bordür taşıyla birlikte uygulanan drenaj çözümüdür.",
  },
  {
    question: "Toplu sipariş ve kurumsal alım yapılabilir mi?",
    answer:
      "Evet, Hürtaş Beton belediyeler, müteahhitler, inşaat firmaları ve altyapı proje sahiplerine toplu sipariş ve kurumsal alım imkânı sunmaktadır. Fiyat teklifi için iletişime geçebilirsiniz.",
  },
] as const;

export function HomepageFaq() {
  return (
    <SeoFaqSection
      title="Beton Altyapı ve Üst Yapı Ürünleri Hakkında"
      accent="En Çok Sorulan Sorular"
      description="Beton boru, parsel bacası, bordür taşı, parke taşı, kutu menfez, beton bariyer ve daha fazlası hakkında merak ettiğiniz soruların cevaplarını burada bulabilirsiniz."
      items={HOMEPAGE_FAQS}
    />
  );
}
