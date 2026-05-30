import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const defaultUploadsDir = "public/uploads";

function getUploadsDir() {
  return process.env.LOCAL_UPLOADS_DIR?.trim() || defaultUploadsDir;
}

function normalizeRelativePath(relativePath: string) {
  return relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
}

function toPublicUrl(relativePath: string) {
  const normalized = normalizeRelativePath(relativePath);
  const uploadsDir = normalizeRelativePath(getUploadsDir());

  if (!uploadsDir.startsWith("public/")) {
    throw new Error("LOCAL_UPLOADS_DIR must be inside the public directory.");
  }

  return `/${normalized.replace(/^public\//, "")}`;
}

export function getUploadsPublicBasePath() {
  return toPublicUrl(getUploadsDir());
}

export async function uploadImageLocally(
  relativePath: string,
  file: File
): Promise<string> {
  const normalized = normalizeRelativePath(relativePath);
  const destination = path.join(process.cwd(), getUploadsDir(), normalized);

  await mkdir(path.dirname(destination), { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(destination, buffer);

  return toPublicUrl(path.join(getUploadsDir(), normalized));
}

export async function deleteLocalImage(publicUrl: string): Promise<void> {
  if (!publicUrl.startsWith("/")) {
    throw new Error("Local image URL must start with '/'.");
  }

  const filePath = path.join(process.cwd(), "public", publicUrl.slice(1));
  await unlink(filePath).catch((error) => {
    if (error && (error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  });
}
