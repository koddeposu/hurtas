"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MessageCircle, Phone, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface MonthlySummary {
  monthKey: string;
  label: string;
  visitors: number;
  offset: number;
}

interface LastMonthDailyRow {
  date: string;
  label: string;
  visitors: number;
  phoneClicks: number;
  whatsappClicks: number;
}

interface StatsResponse {
  weekVisitors: number;
  monthVisitors: number;
  weekPhoneClicks: number;
  weekWhatsAppClicks: number;
  lastMonthLabel: string;
  lastMonthTotalVisitors: number;
  monthlySummaries: MonthlySummary[];
  lastMonthDaily: LastMonthDailyRow[];
  generatedAt: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  className,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-700">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-black text-slate-900">
          {value.toLocaleString("tr-TR")}
        </p>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/analytics/stats", { cache: "no-store" });
      if (!response.ok) throw new Error("stats failed");
      const data = (await response.json()) as StatsResponse;
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-slate-900" />
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-slate-500">
          İstatistikler yüklenemedi
        </CardContent>
      </Card>
    );
  }

  const lastMonthPhoneTotal = stats.lastMonthDaily.reduce(
    (sum, row) => sum + row.phoneClicks,
    0,
  );
  const lastMonthWhatsAppTotal = stats.lastMonthDaily.reduce(
    (sum, row) => sum + row.whatsappClicks,
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-900">Site İstatistikleri</h2>
        <button
          onClick={fetchStats}
          className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-200"
        >
          Yenile
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Bu Hafta Ziyaretçi"
          value={stats.weekVisitors}
          subtitle="Aynı kullanıcı 4 saatte bir sayılır"
          icon={<Users className="h-4 w-4" />}
          className="border-l-4 border-l-slate-700"
        />
        <StatCard
          title="Bu Ay Ziyaretçi"
          value={stats.monthVisitors}
          subtitle="Aylık toplam (4 saat kuralı ile)"
          icon={<CalendarDays className="h-4 w-4" />}
          className="border-l-4 border-l-indigo-600"
        />
        <StatCard
          title="Bu Hafta WhatsApp"
          value={stats.weekWhatsAppClicks}
          subtitle="4 saat içinde tekrar sayılmaz"
          icon={<MessageCircle className="h-4 w-4" />}
          className="border-l-4 border-l-green-600"
        />
        <StatCard
          title="Bu Hafta Telefon"
          value={stats.weekPhoneClicks}
          subtitle="4 saat içinde tekrar sayılmaz"
          icon={<Phone className="h-4 w-4" />}
          className="border-l-4 border-l-blue-600"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Aylık Ziyaretçi Özeti (Bu Ay + Son 3 Ay)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-3 font-semibold">Dönem</th>
                  <th className="pb-3 font-semibold">Ziyaretçi</th>
                  <th className="pb-3 font-semibold">Not</th>
                </tr>
              </thead>
              <tbody>
                {stats.monthlySummaries.map((item) => (
                  <tr key={item.monthKey} className="border-b last:border-0">
                    <td className="py-3 font-medium text-slate-800">{item.label}</td>
                    <td className="py-3 font-black text-slate-900">
                      {item.visitors.toLocaleString("tr-TR")}
                    </td>
                    <td className="py-3 text-slate-500">
                      {item.offset === 0
                        ? "Bu ay"
                        : item.offset === 1
                          ? "Geçen ay (detay aşağıda)"
                          : "Genel özet"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {stats.lastMonthLabel} Detay Tablosu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-lg border bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Toplam Ziyaretçi</p>
              <p className="text-xl font-black text-slate-900">
                {stats.lastMonthTotalVisitors.toLocaleString("tr-TR")}
              </p>
            </div>
            <div className="rounded-lg border bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Toplam Telefon Tıklama</p>
              <p className="text-xl font-black text-blue-700">
                {lastMonthPhoneTotal.toLocaleString("tr-TR")}
              </p>
            </div>
            <div className="rounded-lg border bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Toplam WhatsApp Tıklama</p>
              <p className="text-xl font-black text-green-700">
                {lastMonthWhatsAppTotal.toLocaleString("tr-TR")}
              </p>
            </div>
          </div>

          <div className="max-h-[420px] overflow-auto rounded-lg border">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b text-left text-slate-500">
                  <th className="px-4 py-3 font-semibold">Tarih</th>
                  <th className="px-4 py-3 font-semibold">Ziyaretçi</th>
                  <th className="px-4 py-3 font-semibold">Telefon</th>
                  <th className="px-4 py-3 font-semibold">WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {stats.lastMonthDaily.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                      Geçen ay için veri bulunamadı
                    </td>
                  </tr>
                ) : (
                  stats.lastMonthDaily.map((row) => (
                    <tr key={row.date} className="border-b last:border-0">
                      <td className="px-4 py-2.5 text-slate-700">{row.label}</td>
                      <td className="px-4 py-2.5 font-semibold text-slate-900">
                        {row.visitors.toLocaleString("tr-TR")}
                      </td>
                      <td className="px-4 py-2.5 font-semibold text-blue-700">
                        {row.phoneClicks.toLocaleString("tr-TR")}
                      </td>
                      <td className="px-4 py-2.5 font-semibold text-green-700">
                        {row.whatsappClicks.toLocaleString("tr-TR")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500">
            Son güncelleme: {new Date(stats.generatedAt).toLocaleString("tr-TR")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
