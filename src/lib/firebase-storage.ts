import { randomUUID } from "node:crypto";
import { getFirebaseAdminStorage } from "./firebase-admin";

function getStorageBucketName() {
  const bucketName =
    process.env.FIREBASE_STORAGE_BUCKET?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim();

  if (!bucketName) {
    throw new Error("Firebase Storage bucket is not configured.");
  }

  return bucketName;
}

function buildDownloadUrl(objectPath: string, token: string) {
  return `https://firebasestorage.googleapis.com/v0/b/${getStorageBucketName()}/o/${encodeURIComponent(
    objectPath
  )}?alt=media&token=${token}`;
}

function extractObjectPathFromUrl(url: string) {
  const parsed = new URL(url);
  const storagePrefix = `/v0/b/${getStorageBucketName()}/o/`;

  if (
    parsed.hostname !== "firebasestorage.googleapis.com" ||
    !parsed.pathname.startsWith(storagePrefix)
  ) {
    throw new Error("Invalid Firebase Storage URL");
  }

  return decodeURIComponent(parsed.pathname.slice(storagePrefix.length));
}

export async function uploadImageToFirebaseStorage(
  objectPath: string,
  file: File
) {
  const bucket = getFirebaseAdminStorage();
  const storageFile = bucket.file(objectPath);
  const downloadToken = randomUUID();
  const buffer = Buffer.from(await file.arrayBuffer());

  await storageFile.save(buffer, {
    metadata: {
      contentType: file.type,
      metadata: {
        firebaseStorageDownloadTokens: downloadToken,
      },
    },
    resumable: false,
  });

  return buildDownloadUrl(objectPath, downloadToken);
}

export async function deleteFirebaseStorageFile(url: string) {
  const objectPath = extractObjectPathFromUrl(url);
  await getFirebaseAdminStorage().file(objectPath).delete({ ignoreNotFound: true });
}
