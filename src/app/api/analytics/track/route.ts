// src/app/api/analytics/track/route.ts
import { db } from "@/db/drizzle";
import { contactClick, siteVisit } from "@/db/schema";
import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;
const TRACKED_CONTACT_BUTTONS = new Set(["telefon-butonu", "whatsapp-butonu"]);

function normalizePage(page: unknown) {
  if (typeof page !== "string" || page.length === 0) return "/";
  return page.slice(0, 300);
}

function normalizeButtonId(buttonId: unknown) {
  if (typeof buttonId !== "string" || buttonId.length === 0) return null;
  return buttonId.slice(0, 80);
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}

function getBucketStart(date: Date) {
  return new Date(Math.floor(date.getTime() / FOUR_HOURS_MS) * FOUR_HOURS_MS);
}

function getVisitorKey(request: NextRequest, visitorId: unknown) {
  if (typeof visitorId === "string") {
    const trimmed = visitorId.trim();
    if (trimmed.length >= 12 && trimmed.length <= 80) {
      return `id:${trimmed}`;
    }
  }

  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") || "unknown";
  const hash = createHash("sha256")
    .update(`${ip}|${userAgent}`)
    .digest("hex")
    .slice(0, 32);

  return `h:${hash}`;
}

export async function POST(request: NextRequest) {
  try {
    const { type, page, buttonId, visitorId } = await request.json();

    if (type !== "pageview" && type !== "click") {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const visitorKey = getVisitorKey(request, visitorId);
    const bucketStart = getBucketStart(new Date());
    const normalizedPage = normalizePage(page);

    if (type === "pageview") {
      await db
        .insert(siteVisit)
        .values({
          visitorKey,
          page: normalizedPage,
          bucketStart,
        })
        .onConflictDoNothing({
          target: [siteVisit.visitorKey, siteVisit.bucketStart],
        });

      return NextResponse.json({ success: true });
    }

    const normalizedButtonId = normalizeButtonId(buttonId);
    if (!normalizedButtonId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (!TRACKED_CONTACT_BUTTONS.has(normalizedButtonId)) {
      return NextResponse.json({ success: true });
    }

    await db
      .insert(contactClick)
      .values({
        buttonId: normalizedButtonId,
        visitorKey,
        page: normalizedPage,
        bucketStart,
      })
      .onConflictDoNothing({
        target: [
          contactClick.buttonId,
          contactClick.visitorKey,
          contactClick.bucketStart,
        ],
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
