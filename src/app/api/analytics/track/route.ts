// src/app/api/analytics/track/route.ts
import { db } from "@/db/drizzle";
import { buttonClicks } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { type, page, buttonId } = await request.json();

    // Sadece click kabul ediyoruz
    if (type !== "click" || !buttonId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") || "";
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // 12 saat önce
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

    // Aynı buton + sayfa + ip + ua → 12 saat kontrolü
    const existingClick = await db
      .select({ id: buttonClicks.id })
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics click error:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 },
    );
  }
}
