"use server";

import { db } from "../db";
import { siteSettings, testimonials } from "../../../drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { useDatabase } from "../db-mode";
import { requireAdmin } from "../permissions";
import {
  createId,
  readSettingsFile,
  readTestimonialsFile,
  writeSettingsFile,
  writeTestimonialsFile,
} from "../file-data-store";

// ─── Site Settings ─────────────────────────────────────────────────
export async function getSettings() {
  if (!useDatabase) return readSettingsFile();
  const rows = await db.select().from(siteSettings);
  const map: Record<string, string> = {};
  for (const row of rows) {
    map[row.key] = row.value;
  }
  return map;
}

export async function getSetting(key: string) {
  if (!useDatabase) {
    const settings = await readSettingsFile();
    return settings[key] ?? null;
  }
  const [row] = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1);
  return row?.value ?? null;
}

export async function updateSetting(key: string, value: string) {
  await requireAdmin();
  if (!useDatabase) {
    const settings = await readSettingsFile();
    settings[key] = value;
    await writeSettingsFile(settings);
    revalidatePath("/admin/settings");
    revalidatePath("/", "layout");
    revalidatePath("/contact");
    revalidatePath("/");
    return;
  }
  const existing = await getSetting(key);
  if (existing !== null) {
    await db
      .update(siteSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ key, value });
  }
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  revalidatePath("/contact");
  revalidatePath("/");
}

// ─── Testimonials ──────────────────────────────────────────────────
export async function getTestimonials(visibleOnly = false) {
  if (!useDatabase) {
    const entries = await readTestimonialsFile();
    return visibleOnly ? entries.filter((entry) => entry.visible) : entries;
  }
  if (visibleOnly) {
    return db
      .select()
      .from(testimonials)
      .where(eq(testimonials.visible, true))
      .orderBy(asc(testimonials.sortOrder));
  }
  return db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
}

export async function createTestimonial(data: {
  name: string;
  route?: string;
  textEn: string;
  textKa?: string;
  rating?: number;
  visible?: boolean;
  sortOrder?: number;
}) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readTestimonialsFile();
    const testimonial = {
      id: createId(),
      name: data.name,
      route: data.route ?? null,
      textEn: data.textEn,
      textKa: data.textKa ?? "",
      rating: data.rating ?? 5,
      visible: data.visible ?? true,
      sortOrder: data.sortOrder ?? 0,
      createdAt: new Date(),
    };
    entries.push(testimonial);
    await writeTestimonialsFile(entries);
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return testimonial;
  }
  const [testimonial] = await db
    .insert(testimonials)
    .values(data)
    .returning();
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return testimonial;
}

export async function updateTestimonial(
  id: string,
  data: Partial<{
    name: string;
    route: string;
    textEn: string;
    textKa: string;
    rating: number;
    visible: boolean;
    sortOrder: number;
  }>
) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readTestimonialsFile();
    const index = entries.findIndex((entry) => entry.id === id);
    if (index === -1) throw new Error("Testimonial not found");
    const updated = { ...entries[index], ...data };
    entries[index] = updated;
    await writeTestimonialsFile(entries);
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return updated;
  }
  const [testimonial] = await db
    .update(testimonials)
    .set(data)
    .where(eq(testimonials.id, id))
    .returning();
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return testimonial;
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readTestimonialsFile();
    await writeTestimonialsFile(entries.filter((entry) => entry.id !== id));
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return;
  }
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
