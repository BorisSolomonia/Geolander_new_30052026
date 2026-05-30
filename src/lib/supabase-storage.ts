import {
  deleteLocalImage,
  uploadImageLocally,
} from "./local-file-storage";

export async function uploadImage(
  _bucket: string,
  path: string,
  file: File
): Promise<string> {
  return uploadImageLocally(path, file);
}

export async function deleteImage(
  _bucket: string,
  publicUrl: string
): Promise<void> {
  await deleteLocalImage(publicUrl);
}

export function getPublicUrl(_bucket: string, path: string): string {
  return path.startsWith("/") ? path : `/${path.replace(/^\/+/, "")}`;
}
