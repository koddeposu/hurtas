// src/app/api/analytics/track/route.ts
import { db } from "@/db/drizzle";
import { buttonClicks, pageViews } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { type, page, buttonId } = await request.json();

    const userAgent = request.headers.get("user-agent") || "";
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (type === "pageview") {
      await db.insert(pageViews).values({
        page,
        userAgent,
        ip,
      });
    } else if (type === "click") {
      await db.insert(buttonClicks).values({
        buttonId,
        page,
        userAgent,
        ip,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to track" }, { status: 500 });
  }
}
