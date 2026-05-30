"use client";

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

function getRequiredPublicEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required for Firebase client auth.`);
  }
  return value;
}

function getFirebaseApp() {
  if (!getApps().length) {
    initializeApp({
      apiKey: getRequiredPublicEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
      authDomain: getRequiredPublicEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
      projectId: getRequiredPublicEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
      storageBucket: getRequiredPublicEnv(
        "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
      ),
      messagingSenderId: getRequiredPublicEnv(
        "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
      ),
      appId: getRequiredPublicEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
    });
  }

  return getApps()[0]!;
}

export function getFirebaseClientAuth() {
  return getAuth(getFirebaseApp());
}
