'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

const pages = [
  'Sayfa 1 içeriği',
  'Sayfa 2 içeriği',
  'Sayfa 3 içeriği',
];

export default function PageFlipSlider() {
  const [page, setPage] = useState(0);
  const controls = useAnimation();

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100 && page < pages.length - 1) {
      controls.start({ rotateY: -180 });
      setTimeout(() => {
        setPage(p => p + 1);
        controls.set({ rotateY: 0 });
      }, 300);
    } else if (info.offset.x > 100 && page > 0) {
      controls.start({ rotateY: 180 });
      setTimeout(() => {
        setPage(p => p - 1);
        controls.set({ rotateY: 0 });
      }, 300);
    } else {
      controls.start({ rotateY: 0 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted">
      <div style={{ perspective: 1400 }}>
        <motion.div
          drag="x"
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={{ rotateY: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="cursor-grab active:cursor-grabbing"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-[320px] h-[420px] p-6 flex items-center justify-center text-xl font-semibold shadow-xl">
            {pages[page]}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
