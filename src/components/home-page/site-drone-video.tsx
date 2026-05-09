const DRONE_VIDEO_EMBED_URL =
  "https://www.youtube-nocookie.com/embed/Dlet9NpeDbE?rel=0&modestbranding=1&playsinline=1";

export function SiteDroneVideo() {
  return (
    <section
      aria-labelledby="site-drone-video-heading"
      className="flex justify-center px-4 py-5 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-[1280px]">
        <div className="mb-3 flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
              Sahadan Görüntüler
            </p>
            <h2
              id="site-drone-video-heading"
              className="mt-1 text-xl font-black tracking-tight text-[#152f51] sm:text-2xl"
            >
              Şantiye drone çekimi
            </h2>
          </div>

          <span className="hidden border border-[#d6a94a]/45 bg-[#fffaf0] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#9b7430] sm:inline-flex">
            Hürtaş
          </span>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-[3px] border border-slate-300 bg-slate-950 shadow-[0_24px_54px_-42px_rgba(15,23,42,0.55)]">
          <iframe
            src={DRONE_VIDEO_EMBED_URL}
            title="Hürtaş şantiye drone çekimi"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
