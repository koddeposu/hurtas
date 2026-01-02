"use client";

import { MessageCircle, Phone } from 'lucide-react';

const BottomBar = () => {
  const phoneNumber = "+905375183006";
  const whatsappMessage = "Merhaba, CT Prefabrik sitesinden ulaşıyorum.";

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-6 md:hidden">
      <div className="bg-white/80 backdrop-blur-2xl    rounded-[2.5rem]  grid-cols-2 grid  w-full overflow-hidden h-14 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] ">

        <button
          onClick={handleCall}
          className="flex-1 bg-primary text-white h-full  flex items-center  shadow-xl  w-full justify-center gap-2"
        >
          <div className="flex flex-col items-start">
            <span className="text-sm font-black ">Şimdi Ara</span>
          </div>
          <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
            <Phone size={20} fill="currentColor" />
          </div>
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex-1  text-white h-full  flex items-center   shadow-xl bg-secondary justify-center gap-2"
        >
          <div className="flex flex-col items-start">
            <span className="text-sm font-black ">Whatsapp</span>
          </div>
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
            <MessageCircle size={20} fill="currentColor" />
          </div>
        </button>

      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent -z-10" />
    </div>
  );
};

export default BottomBar;
