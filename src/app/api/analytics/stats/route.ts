// src/app/api/analytics/stats/route.ts
import { db } from "@/db/drizzle";
import { buttonClicks, pageViews } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Toplam sayfa görüntüleme
    const totalPageViews = await db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(pageViews);

    // Bugünkü sayfa görüntüleme
    const todayPageViews = await db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(pageViews)
      .where(sql`DATE(created_at) = CURRENT_DATE`);

    // Son 7 günkü sayfa görüntüleme
    const weekPageViews = await db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(pageViews)
      .where(sql`created_at >= NOW() - INTERVAL '7 days'`);

    // Toplam butona tıklama
    const totalClicks = await db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(buttonClicks);

    // Bugünkü butona tıklama
    const todayClicks = await db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(buttonClicks)
      .where(sql`DATE(created_at) = CURRENT_DATE`);

    // Son 7 günkü butona tıklama
    const weekClicks = await db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(buttonClicks)
      .where(sql`created_at >= NOW() - INTERVAL '7 days'`);

    // Sayfa bazlı istatistikler
    const pageStats = await db
      .select({
        page: pageViews.page,
        count: sql<number>`count(*)::int`,
      })
      .from(pageViews)
      .groupBy(pageViews.page)
      .orderBy(sql`count(*) DESC`)
      .limit(10);

    // Buton bazlı istatistikler
    const buttonStats = await db
      .select({
        buttonId: buttonClicks.buttonId,
        count: sql<number>`count(*)::int`,
      })
      .from(buttonClicks)
      .groupBy(buttonClicks.buttonId)
      .orderBy(sql`count(*) DESC`)
      .limit(10);

    // Günlük istatistikler (son 7 gün)
    const dailyStats = await db
      .select({
        date: sql<string>`DATE(created_at)`,
        pageViews: sql<number>`count(*)::int`,
      })
      .from(pageViews)
      .where(sql`created_at >= NOW() - INTERVAL '7 days'`)
      .groupBy(sql`DATE(created_at)`)
      .orderBy(sql`DATE(created_at) DESC`);

    return NextResponse.json({
      totalPageViews: totalPageViews[0]?.count || 0,
      todayPageViews: todayPageViews[0]?.count || 0,
      weekPageViews: weekPageViews[0]?.count || 0,
      totalClicks: totalClicks[0]?.count || 0,
      todayClicks: todayClicks[0]?.count || 0,
      weekClicks: weekClicks[0]?.count || 0,
      pageStats,
      buttonStats,
      dailyStats,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to get stats" }, { status: 500 });
  }
}
