"use client";

export async function signOutFromApp() {
  await fetch("/api/auth/session", { method: "DELETE" });
}
