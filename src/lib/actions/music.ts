"use server";

import { db } from "../db";
import { musicGenres } from "../../../drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { useDatabase } from "../db-mode";
import { requireAdmin } from "../permissions";
import {
  createId,
  readMusicGenresFile,
  writeMusicGenresFile,
} from "../file-data-store";

export async function getMusicGenres() {
  if (!useDatabase) return readMusicGenresFile();
  return db.select().from(musicGenres).orderBy(asc(musicGenres.sortOrder));
}

export async function getMusicGenreBySlug(slug: string) {
  if (!useDatabase) {
    const entries = await readMusicGenresFile();
    return entries.find((entry) => entry.slug === slug) ?? null;
  }
  const [genre] = await db
    .select()
    .from(musicGenres)
    .where(eq(musicGenres.slug, slug))
    .limit(1);
  return genre || null;
}

export async function createMusicGenre(data: {
  slug: string;
  nameEn: string;
  nameKa?: string;
  descriptionEn?: string;
  descriptionKa?: string;
  youtubeLinks?: string[];
  images?: string[];
  sortOrder?: number;
}) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readMusicGenresFile();
    const genre = {
      id: createId(),
      slug: data.slug,
      nameEn: data.nameEn,
      nameKa: data.nameKa ?? "",
      descriptionEn: data.descriptionEn ?? "",
      descriptionKa: data.descriptionKa ?? "",
      youtubeLinks: data.youtubeLinks ?? [],
      images: data.images ?? [],
      sortOrder: data.sortOrder ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    entries.push(genre);
    await writeMusicGenresFile(entries);
    revalidatePath("/music");
    revalidatePath("/admin/music");
    return genre;
  }
  const [genre] = await db.insert(musicGenres).values(data).returning();
  revalidatePath("/music");
  revalidatePath("/admin/music");
  return genre;
}

export async function updateMusicGenre(
  id: string,
  data: Partial<{
    slug: string;
    nameEn: string;
    nameKa: string;
    descriptionEn: string;
    descriptionKa: string;
    youtubeLinks: string[];
    images: string[];
    sortOrder: number;
  }>
) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readMusicGenresFile();
    const index = entries.findIndex((entry) => entry.id === id);
    if (index === -1) throw new Error("Music genre not found");
    const updated = {
      ...entries[index],
      ...data,
      updatedAt: new Date(),
    };
    entries[index] = updated;
    await writeMusicGenresFile(entries);
    revalidatePath("/music");
    revalidatePath("/admin/music");
    return updated;
  }
  const [genre] = await db
    .update(musicGenres)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(musicGenres.id, id))
    .returning();
  revalidatePath("/music");
  revalidatePath("/admin/music");
  return genre;
}

export async function deleteMusicGenre(id: string) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readMusicGenresFile();
    await writeMusicGenresFile(entries.filter((entry) => entry.id !== id));
    revalidatePath("/music");
    revalidatePath("/admin/music");
    return;
  }
  await db.delete(musicGenres).where(eq(musicGenres.id, id));
  revalidatePath("/music");
  revalidatePath("/admin/music");
}
