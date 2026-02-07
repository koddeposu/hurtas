// src/components/admin/analytics-dashboard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";

interface Stats {
  totalPageViews: number;
  todayPageViews: number;
  weekPageViews: number;
  totalClicks: number;
  todayClicks: number;
  weekClicks: number;
  pageStats: { page: string; count: number }[];
  buttonStats: { buttonId: string; count: number }[];
  dailyStats: { date: string; pageViews: number }[];
}

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // 60 saniyede bir güncelle
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/analytics/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          İstatistikler yüklenemedi
        </CardContent>
      </Card>
    );
  }

  const whatsappClicks =
    stats.buttonStats?.find((s) => s.buttonId === "whatsapp-butonu")?.count ||
    0;
  const phoneClicks =
    stats.buttonStats?.find((s) => s.buttonId === "telefon-butonu")?.count || 0;
  const totalContacts = whatsappClicks + phoneClicks;
  const conversionRate =
    stats.totalPageViews > 0
      ? ((totalContacts / stats.totalPageViews) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Site İstatistikleri
        </h2>
        <button
          onClick={fetchStats}
          className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Yenile
        </button>
      </div>

      {/* İletişim İstatistikleri - Öne Çıkan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-green-700">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {whatsappClicks.toLocaleString("tr-TR")}
            </p>
            <p className="text-xs text-gray-600 mt-1">Toplam tıklama</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-blue-700">
              <Phone className="w-4 h-4" />
              Telefon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {phoneClicks.toLocaleString("tr-TR")}
            </p>
            <p className="text-xs text-gray-600 mt-1">Toplam arama</p>
          </CardContent>
        </Card>
        {/*
        <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-orange-700">
              <TrendingUp className="w-4 h-4" />
              Dönüşüm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">
              {conversionRate}%
            </p>
            <p className="text-xs text-gray-600 mt-1">İletişim oranı</p>
          </CardContent>
        </Card> */}
      </div>

      {/* Ziyaret İstatistikleri */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Eye className="w-4 h-4" />
              Bugün
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">
              {(stats.todayPageViews || 0).toLocaleString("tr-TR")}
            </p>
            <p className="text-xs text-gray-600 mt-1">Sayfa görüntüleme</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Eye className="w-4 h-4" />
              Son 7 Gün
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">
              {(stats.weekPageViews || 0).toLocaleString("tr-TR")}
            </p>
            <p className="text-xs text-gray-600 mt-1">Sayfa görüntüleme</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Eye className="w-4 h-4" />
              Toplam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">
              {(stats.totalPageViews || 0).toLocaleString("tr-TR")}
            </p>
            <p className="text-xs text-gray-600 mt-1">Sayfa görüntüleme</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Detaylı İstatistikler */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> */}
      {/* En Çok Ziyaret Edilen Sayfalar */}
      {/* <Card>
          <CardHeader>
            <CardTitle className="text-base">
              En Çok Ziyaret Edilen Sayfalar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.pageStats && stats.pageStats.length > 0 ? (
                stats.pageStats.slice(0, 5).map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded"
                  >
                    <span className="text-sm truncate flex-1 text-slate-700">
                      {stat.page}
                    </span>
                    <span className="ml-2 text-sm font-bold text-slate-900">
                      {stat.count.toLocaleString("tr-TR")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Henüz veri yok
                </p>
              )}
            </div>
          </CardContent>
        </Card> */}

      {/* Buton Tıklamaları */}
      {/* <Card>
          <CardHeader>
            <CardTitle className="text-base">Buton Tıklamaları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.buttonStats && stats.buttonStats.length > 0 ? (
                stats.buttonStats.slice(0, 5).map((stat, i) => {
                  const isWhatsApp = stat.buttonId === "whatsapp-butonu";
                  const isPhone = stat.buttonId === "telefon-butonu";
                  const bgColor = isWhatsApp
                    ? "bg-green-50"
                    : isPhone
                      ? "bg-blue-50"
                      : "bg-slate-50";

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-2 rounded ${bgColor}`}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {isWhatsApp && (
                          <MessageCircle className="w-3 h-3 text-green-600" />
                        )}
                        {isPhone && <Phone className="w-3 h-3 text-blue-600" />}
                        <span className="text-sm truncate text-slate-700">
                          {stat.buttonId}
                        </span>
                      </div>
                      <span
                        className={`ml-2 text-sm font-bold ${
                          isWhatsApp
                            ? "text-green-600"
                            : isPhone
                              ? "text-blue-600"
                              : "text-slate-900"
                        }`}
                      >
                        {stat.count.toLocaleString("tr-TR")}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Henüz veri yok
                </p>
              )}
            </div>
          </CardContent>
        </Card> */}
      {/* </div> */}
    </div>
  );
}
