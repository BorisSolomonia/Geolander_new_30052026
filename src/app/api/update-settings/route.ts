import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // 1. Update site_url
    await db
      .update(siteSettings)
      .set({ value: "https://geo-lander.com", updatedAt: new Date() })
      .where(eq(siteSettings.key, "site_url"));

    // 2. Update email
    await db
      .update(siteSettings)
      .set({ value: "info@geo-lander.com", updatedAt: new Date() })
      .where(eq(siteSettings.key, "email"));

    return NextResponse.json({
      success: true,
      message: "Database settings updated successfully! 'site_url' set to https://geo-lander.com and 'email' set to info@geo-lander.com.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update database settings.",
      },
      { status: 500 }
    );
  }
}
