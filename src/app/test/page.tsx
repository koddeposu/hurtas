'use client';
import React, { forwardRef } from "react";

import HTMLFlipBook from 'react-pageflip';

export default function BookFlip() {
  return (
    <div className="w-full flex justify-center pt-10">
      <HTMLFlipBook
        width={500}
        height={500}
        size="fixed"
        minWidth={500}
        maxWidth={500}
        minHeight={500}
        maxHeight={500}
        maxShadowOpacity={0.3}
        showCover={true}
        mobileScrollSupport={true}

        style={{}}
        startPage={0}
        drawShadow={true}
        flippingTime={700}
        usePortrait={true}
        startZIndex={0}
        autoSize={false}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        <Page className="bg-red-400">Page 1</Page>
        <Page className="bg-primary">Page 2</Page>
        <Page className="bg-secondary">Page 3</Page>
        <Page className="bg-amber-300">Page 4</Page>
      </HTMLFlipBook>
    </div>
  );
}

export const Page = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={`page h-full w-full flex items-center justify-center text-xl ${className}`}
    >
      {children}
    </div>
  );
});

Page.displayName = "Page";
