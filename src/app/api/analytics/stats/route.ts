// src/app/api/analytics/stats/route.ts
import { db } from "@/db/drizzle";
import { buttonClicks } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Toplam sayfa görüntüleme

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

    return NextResponse.json({
      totalClicks: totalClicks[0]?.count || 0,
      todayClicks: todayClicks[0]?.count || 0,
      weekClicks: weekClicks[0]?.count || 0,
      buttonStats,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to get stats" }, { status: 500 });
  }
}
