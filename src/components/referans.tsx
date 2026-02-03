"use client";

import Image from "next/image";

import Airbnb from "@/assets/referans/airbnb.webp";
import AnkaraSigorta from "@/assets/referans/ankara-sigorta.webp";
import Canva from "@/assets/referans/canva.webp";
import Exon from "@/assets/referans/exon.webp";
import Hubspot from "@/assets/referans/hubspot.webp";
import Huvai from "@/assets/referans/huvai.webp";
import Kale from "@/assets/referans/kale.webp";
import Netflix from "@/assets/referans/netflix.webp";
import Patagonia from "@/assets/referans/patagonia.webp";
import RaySigorta from "@/assets/referans/ray-sigorta.webp";
import Spotify from "@/assets/referans/spotify.webp";
import Tesla from "@/assets/referans/tesla.webp";
import Vodafone from "@/assets/referans/vodofone.webp";
import Western from "@/assets/referans/western.webp";
import Whatsapp from "@/assets/referans/whatsapp.webp";
import Zendesk from "@/assets/referans/zendesk.webp";
import Ziraat from "@/assets/referans/ziraat.webp";

export const logos = [
  Airbnb,
  AnkaraSigorta,
  Canva,
  Exon,
  Hubspot,
  Huvai,
  Kale,
  Netflix,
  Patagonia,
  RaySigorta,
  Spotify,
  Tesla,
  Vodafone,
  Western,
  Whatsapp,
  Zendesk,
  Ziraat,
];

export const Referans = () => {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="flex w-max animate-marquee gap-24">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="relative w-40 h-20 shrink-0">
            <Image
              src={logo}
              alt="Referans"
              loading="lazy"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
