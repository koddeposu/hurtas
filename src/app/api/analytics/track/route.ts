// src/app/api/analytics/track/route.ts
import { db } from "@/db/drizzle";
import { buttonClicks, pageViews } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm"; // Filtreleme için eklendi
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { type, page, buttonId } = await request.json();

    const userAgent = request.headers.get("user-agent") || "";
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // 12 saat öncesinin tarihini oluştur
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

    if (type === "pageview") {
      // Önce veritabanında son 12 saatte aynı IP ve sayfa var mı bak
      const existingView = await db
        .select()
        .from(pageViews)
        .where(
          and(
            eq(pageViews.ip, ip),
            eq(pageViews.page, page),
            eq(pageViews.userAgent, userAgent),
            gt(pageViews.createdAt, twelveHoursAgo),
          ),
        )
        .limit(1);

      // Eğer kayıt yoksa ekle (Böylece 12 saatte bir sayılır)
      if (existingView.length === 0) {
        await db.insert(pageViews).values({
          page,
          userAgent,
          ip,
        });
      }
    } else if (type === "click") {
      // Aynı buton için son 12 saat kontrolü
      const existingClick = await db
        .select()
        .from(buttonClicks)
        .where(
          and(
            eq(buttonClicks.ip, ip),
            eq(buttonClicks.buttonId, buttonId),
            eq(buttonClicks.page, page),
            eq(buttonClicks.userAgent, userAgent),
            gt(buttonClicks.createdAt, twelveHoursAgo),
          ),
        )
        .limit(1);

      if (existingClick.length === 0) {
        await db.insert(buttonClicks).values({
          buttonId,
          page,
          userAgent,
          ip,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to track" }, { status: 500 });
  }
}
