import { Briefcase, ShieldCheck, Timer, Users } from "lucide-react";

const METRICS = [
  {
    value: "1.000+",
    label: "Proje",
    description: "Keşiften montaja planlı uygulama deneyimi.",
    icon: Briefcase,
    tone: "text-primary",
    ring: "bg-primary/10",
  },
  {
    value: "200+",
    label: "Mutlu Müşteri",
    description: "Şeffaf iletişim ve zamanında teslim odaklı süreç.",
    icon: Users,
    tone: "text-secondary",
    ring: "bg-secondary/12",
  },
  {
    value: "10 Yıl",
    label: "Garanti",
    description: "TSE standartlarında üretim ve resmi garanti yaklaşımı.",
    icon: ShieldCheck,
    tone: "text-primary",
    ring: "bg-primary/10",
  },
  {
    value: "30-45 Gün",
    label: "Teslim",
    description: "Proje kapsamına göre hızlı üretim ve montaj planı.",
    icon: Timer,
    tone: "text-secondary",
    ring: "bg-secondary/12",
  },
] as const;

export function TrustMetrics() {
  return (
    <section className="">
      <div className="grid gap-6 lg:gap-3 grid-cols-2 lg:grid-cols-4">
        {METRICS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="group relative rounded-[0.85rem] border border-slate-300 bg-white/95 px-4 pb-4 pt-6 shadow-[0_14px_32px_-24px_rgba(15,23,42,0.16)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-[0_20px_40px_-26px_rgba(15,23,42,0.22)]"
            >
              <p
                className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-black tracking-tight md:text-base min-w-[100px] text-center ${item.tone}`}
              >
                {item.value}
              </p>

              <p
                className={`text-[11px] font-black uppercase tracking-[0.14em]  text-center ${item.tone}`}
              >
                {item.label}
              </p>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-600 text-center">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
