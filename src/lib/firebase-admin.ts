import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required for Firebase integration.`);
  }
  return value;
}

function getPrivateKey() {
  return getRequiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

function getStorageBucketName() {
  return (
    process.env.FIREBASE_STORAGE_BUCKET?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim() ||
    getRequiredEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET")
  );
}

function getAdminApp() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: getRequiredEnv("FIREBASE_PROJECT_ID"),
        clientEmail: getRequiredEnv("FIREBASE_CLIENT_EMAIL"),
        privateKey: getPrivateKey(),
      }),
      storageBucket: getStorageBucketName(),
    });
  }

  return getApps()[0]!;
}

export function getFirebaseAdminAuth() {
  return getAuth(getAdminApp());
}

export function getFirebaseAdminStorage() {
  return getStorage(getAdminApp()).bucket();
}
