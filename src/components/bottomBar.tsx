"use client";

import { handleCall, handleWhatsApp } from "@/lib/analytics/googleAds";
import { MessageCircle, Phone } from "lucide-react";

const BottomBar = () => {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100]     md:hidden bg-primary "
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
    >
      <div className="mx-auto grid  w-full max-w-md grid-cols-2 overflow-hidden  py-2">
        <button
          type="button"
          onClick={handleCall}
          className="flex h-full  flex-col items-center justify-center gap-2 bg-primary text-white  py-1"
        >
          <Phone size={20} fill="currentColor" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-black">Şimdi Ara</span>
          </div>
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex h-full  flex-col items-center justify-center gap-2 bg-primary text-white"
        >
          <MessageCircle size={20} fill="currentColor" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-black">Whatsapp</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
