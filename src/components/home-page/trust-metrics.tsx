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
    <section className="font-[family-name:var(--font-poppins)]">
      <div className="grid gap-3 md:grid-cols-4">
        {METRICS.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group rounded-[1.5rem] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.25)] backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_26px_70px_-44px_rgba(15,23,42,0.32)]"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.ring}`}
                >
                  <Icon className={`h-5 w-5 ${item.tone}`} />
                </div>

                <div className="min-w-0">
                  <p className={`text-lg font-black tracking-tight ${item.tone}`}>
                    {item.value}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                    {item.label}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
