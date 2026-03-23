// src/app/api/analytics/stats/route.ts
import { db } from "@/db/drizzle";
import { contactClick, siteVisit } from "@/db/schema";
import { and, gte, inArray, lt, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

const CONTACT_BUTTON_IDS = ["telefon-butonu", "whatsapp-butonu"] as const;

function startOfMonth(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function addMonths(date: Date, amount: number) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1),
  );
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getMonthKey(date: Date) {
  return date.toISOString().slice(0, 7);
}

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export async function GET() {
  try {
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const nextMonthStart = addMonths(currentMonthStart, 1);
    const lastMonthStart = addMonths(currentMonthStart, -1);
    const threeMonthsAgoStart = addMonths(currentMonthStart, -3);

    const weekStartRow = await db.execute<{ week_start: string | Date }>(
      sql`select date_trunc('week', now()) as week_start`,
    );
    const weekStartValue = weekStartRow.rows[0]?.week_start;
    const currentWeekStart = weekStartValue ? new Date(weekStartValue) : now;

    const [
      weekVisitorsRows,
      monthVisitorsRows,
      weekContactRows,
      lastMonthVisitorsByDayRows,
      lastMonthClicksByDayRows,
      monthlyVisitorRows,
    ] = await Promise.all([
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(siteVisit)
        .where(gte(siteVisit.createdAt, currentWeekStart)),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(siteVisit)
        .where(gte(siteVisit.createdAt, currentMonthStart)),
      db
        .select({
          buttonId: contactClick.buttonId,
          count: sql<number>`count(*)::int`,
        })
        .from(contactClick)
        .where(
          and(
            gte(contactClick.createdAt, currentWeekStart),
            inArray(contactClick.buttonId, [...CONTACT_BUTTON_IDS]),
          ),
        )
        .groupBy(contactClick.buttonId),
      db
        .select({
          day: sql<string>`to_char(date(${siteVisit.createdAt}), 'YYYY-MM-DD')`,
          visitors: sql<number>`count(*)::int`,
        })
        .from(siteVisit)
        .where(
          and(
            gte(siteVisit.createdAt, lastMonthStart),
            lt(siteVisit.createdAt, currentMonthStart),
          ),
        )
        .groupBy(sql`date(${siteVisit.createdAt})`),
      db
        .select({
          day: sql<string>`to_char(date(${contactClick.createdAt}), 'YYYY-MM-DD')`,
          phoneClicks: sql<number>`count(*) filter (where ${contactClick.buttonId} = 'telefon-butonu')::int`,
          whatsappClicks: sql<number>`count(*) filter (where ${contactClick.buttonId} = 'whatsapp-butonu')::int`,
        })
        .from(contactClick)
        .where(
          and(
            gte(contactClick.createdAt, lastMonthStart),
            lt(contactClick.createdAt, currentMonthStart),
            inArray(contactClick.buttonId, [...CONTACT_BUTTON_IDS]),
          ),
        )
        .groupBy(sql`date(${contactClick.createdAt})`),
      db
        .select({
          monthKey: sql<string>`to_char(date_trunc('month', ${siteVisit.createdAt}), 'YYYY-MM')`,
          visitors: sql<number>`count(*)::int`,
        })
        .from(siteVisit)
        .where(
          and(
            gte(siteVisit.createdAt, threeMonthsAgoStart),
            lt(siteVisit.createdAt, nextMonthStart),
          ),
        )
        .groupBy(sql`date_trunc('month', ${siteVisit.createdAt})`),
    ]);

    const weekVisitors = weekVisitorsRows[0]?.count ?? 0;
    const monthVisitors = monthVisitorsRows[0]?.count ?? 0;

    const weekPhoneClicks =
      weekContactRows.find((row) => row.buttonId === "telefon-butonu")?.count ??
      0;
    const weekWhatsAppClicks =
      weekContactRows.find((row) => row.buttonId === "whatsapp-butonu")
        ?.count ?? 0;

    const visitorsByDayMap = new Map(
      lastMonthVisitorsByDayRows.map((row) => [row.day, row.visitors]),
    );
    const clicksByDayMap = new Map(
      lastMonthClicksByDayRows.map((row) => [
        row.day,
        {
          phoneClicks: row.phoneClicks,
          whatsappClicks: row.whatsappClicks,
        },
      ]),
    );

    const lastMonthDaily = [];
    const rollingDay = new Date(lastMonthStart);
    while (rollingDay < currentMonthStart) {
      const dayKey = toDateKey(rollingDay);
      const clickData = clicksByDayMap.get(dayKey);

      lastMonthDaily.push({
        date: dayKey,
        label: new Intl.DateTimeFormat("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        }).format(rollingDay),
        visitors: visitorsByDayMap.get(dayKey) ?? 0,
        phoneClicks: clickData?.phoneClicks ?? 0,
        whatsappClicks: clickData?.whatsappClicks ?? 0,
      });

      rollingDay.setUTCDate(rollingDay.getUTCDate() + 1);
    }

    const monthlyVisitorsMap = new Map(
      monthlyVisitorRows.map((row) => [row.monthKey, row.visitors]),
    );

    const monthlySummaries = [0, 1, 2, 3].map((offset) => {
      const monthDate = addMonths(currentMonthStart, -offset);
      const monthKey = getMonthKey(monthDate);
      return {
        monthKey,
        label: getMonthLabel(monthDate),
        visitors: monthlyVisitorsMap.get(monthKey) ?? 0,
        offset,
      };
    });

    const lastMonthSummary =
      monthlySummaries.find((item) => item.offset === 1) ?? null;

    return NextResponse.json({
      weekVisitors,
      monthVisitors,
      weekPhoneClicks,
      weekWhatsAppClicks,
      lastMonthLabel: getMonthLabel(lastMonthStart),
      lastMonthTotalVisitors: lastMonthSummary?.visitors ?? 0,
      monthlySummaries,
      lastMonthDaily: lastMonthDaily.reverse(),
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to get stats" }, { status: 500 });
  }
}
