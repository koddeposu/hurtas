import Logo from "@/assets/logo.png";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    // Fare pozisyonunu yüzde (%) cinsinden hesapla
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setMousePos({ x, y });
  };

  return (
    <div
      className="relative aspect-video w-full overflow-hidden cursor-zoom-in rounded-[1rem] md:rounded-[2rem]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{
          scale: isHovered ? 2 : 1,
          x: isHovered ? `${50 - mousePos.x}%` : 0,
          y: isHovered ? `${50 - mousePos.y}%` : 0,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover select-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
