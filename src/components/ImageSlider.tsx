'use client'
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';

interface DraggableSliderProps {
  images: StaticImageData[];
  height?: string;
  width?: string;
  showDots?: boolean;
  showActiveColor: string;
  containerClassName?: string;
  imageClassName?: string;
}

export const ImageSlider: React.FC<DraggableSliderProps> = ({
  images,
  height = 'h-[500px]',
  width = 'w-full',
  showDots = true,
  showActiveColor,
  containerClassName = '',
  imageClassName = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const changeSlide = (newIndex: number) => {
    const adjustedIndex =
      newIndex < 0
        ? images.length - 1
        : newIndex >= images.length
          ? 0
          : newIndex;

    setCurrentIndex(adjustedIndex);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      changeSlide(currentIndex + 1);
    } else if (swipe > swipeConfidenceThreshold) {
      changeSlide(currentIndex - 1);
    }
    setDragging(false);
  };

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '80%' : '-80%',
      opacity: 1
    }),
    animate: {
      x: '0%',
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 30 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-80%' : '80%',
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 30 }
      }
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full overflow-x-visible overflow-y-hidden">
      {/* Slider Container */}
      <div className={`relative ${width} ${height} overflow-hidden   px-4`}>
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants as any}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className={`w-full h-full object-contain pointer-events-none select-none ${imageClassName}`}
              draggable={false}
              quality={100}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      {showDots && images.length > 1 && (
        <div className="flex space-x-2 justify-center mt-3 mb-4 absolute z-20 bottom-0 w-full">
          {images.map((_, index) => (
            <motion.div
              key={index}
              onClick={() => setCurrentIndex(index)}
              animate={{
                width: currentIndex === index ? '22px' : '8px',
              }}
              className={`h-2 rounded-full cursor-pointer transition-colors ${currentIndex === index ? showActiveColor : 'bg-white'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
