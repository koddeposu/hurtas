import Image, { type StaticImageData } from "next/image";

import Arnavutkoy from "@/assets/referans/arnavutköy.png";
import Bagcilar from "@/assets/referans/bagcilar.jpg";
import Bayrampasa from "@/assets/referans/bayrampasa.png";
import BeylikDuzu from "@/assets/referans/beylik-duzu.png";
import Catalca from "@/assets/referans/catalca.png";
import Cerkeskoy from "@/assets/referans/cerkes-köy.png";
import Corlu from "@/assets/referans/corlu.jpg";
import Dardanel from "@/assets/referans/dardanel.png";
import Dolu from "@/assets/referans/dolu.png";
import Edirne from "@/assets/referans/edirne.jpg";
import Esenyurt from "@/assets/referans/esenyurt.png";
import Ibb from "@/assets/referans/ibb.png";
import Ictas from "@/assets/referans/ictas.png";
import Iga from "@/assets/referans/iga.png";
import Ilbank from "@/assets/referans/ilbank.png";
import Kalyon from "@/assets/referans/kalyon.png";
import Kiptas from "@/assets/referans/kiptas.png";
import Makyol from "@/assets/referans/makyol.png";
import Roketsan from "@/assets/referans/roketsan.png";
import Safiport from "@/assets/referans/safiport.png";
import Sariyer from "@/assets/referans/sariyer.png";
import Silivri from "@/assets/referans/silivri.png";
import Sultangazi from "@/assets/referans/sultangazi.png";
import Tck from "@/assets/referans/tck.png";
import Tekirdag from "@/assets/referans/tekirdag.png";
import Toki from "@/assets/referans/toki.png";
import Turktelekom from "@/assets/referans/turktelekom.png";

type ReferansLogo = {
  src: StaticImageData;
  alt: string;
};

export const logos: ReferansLogo[] = [
  { src: Ibb, alt: "İstanbul Büyükşehir Belediyesi" },
  { src: Ilbank, alt: "İlbank" },
  { src: Kalyon, alt: "Kalyon" },
  { src: Iga, alt: "İGA" },
  { src: Toki, alt: "TOKİ" },
  { src: Tck, alt: "Karayolları Genel Müdürlüğü" },
  { src: Turktelekom, alt: "Türk Telekom" },
  { src: Kiptas, alt: "KİPTAŞ" },
  { src: Arnavutkoy, alt: "Arnavutköy Belediyesi" },
  { src: Sultangazi, alt: "Sultangazi Belediyesi" },
  { src: Bagcilar, alt: "Bağcılar Belediyesi" },
  { src: Bayrampasa, alt: "Bayrampaşa Belediyesi" },
  { src: BeylikDuzu, alt: "Beylikdüzü Belediyesi" },
  { src: Catalca, alt: "Çatalca Belediyesi" },
  { src: Cerkeskoy, alt: "Çerkezköy Belediyesi" },
  { src: Corlu, alt: "Çorlu Belediyesi" },
  { src: Dolu, alt: "Dolu İnşaat" },
  { src: Edirne, alt: "Edirne Belediyesi" },
  { src: Esenyurt, alt: "Esenyurt Belediyesi" },
  { src: Ictas, alt: "İÇTAŞ" },
  { src: Makyol, alt: "Makyol" },
  { src: Roketsan, alt: "Roketsan" },
  { src: Safiport, alt: "Safiport" },
  { src: Sariyer, alt: "Sarıyer Belediyesi" },
  { src: Silivri, alt: "Silivri Belediyesi" },
  { src: Tekirdag, alt: "Tekirdağ Belediyesi" },
  { src: Dardanel, alt: "Dardanel" },
];

export function Referans({ className = "" }: { className?: string }) {
  return (
    <section className={`relative overflow-hidden py-6 ${className}`}>
      <div className="flex w-max animate-marquee items-center gap-14">
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="relative h-16 w-36 shrink-0 sm:h-20 sm:w-44"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              loading="lazy"
              sizes="(min-width: 640px) 176px, 144px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
