"use client";

import { useDictionary } from "@/components/i18n-provider";
import { handleCall, handleWhatsApp } from "@/lib/analytics/googleAds";
import { MessageCircle, Phone } from "lucide-react";

const BottomBar = () => {
  const dict = useDictionary();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100]     md:hidden bg-primary "
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
    >
      <div className="mx-auto grid  w-full max-w-md grid-cols-2 overflow-hidden  py-2">
        <button
          type="button"
          onClick={handleCall}
          className="flex h-full  flex-col items-center justify-center gap-2 bg-primary py-1 text-white animate-pulse [animation-duration:4s] [animation-timing-function:ease-in-out] ads-phone-call"
        >
          <Phone size={20} fill="currentColor" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-black">{dict.bottomBar.call}</span>
          </div>
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex h-full  flex-col items-center justify-center gap-2 bg-primary text-[#39f397] animate-pulse [animation-duration:4s] [animation-timing-function:ease-in-out] [animation-delay:3s] google-ads-call ads-whatsapp"
        >
          <MessageCircle size={20} fill="currentColor" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-black">
              {dict.bottomBar.whatsapp}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
