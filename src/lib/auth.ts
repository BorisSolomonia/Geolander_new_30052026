import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "../../drizzle/schema";
import { useDatabase } from "./db-mode";

export const SESSION_COOKIE_NAME = "app_session";
const SESSION_MAX_AGE_MS = 5 * 24 * 60 * 60 * 1000;

export type AuthUser = {
  id: string;
  email: string | null;
  name: string | null;
  role?: string;
};

export type AuthSession = {
  user: AuthUser;
};

type SessionPayload = {
  email: string;
  exp: number;
};

function getLocalAdminEmail() {
  return (
    process.env.ADMIN_EMAIL?.trim() ||
    process.env.SEED_ADMIN_EMAIL?.trim() ||
    "admin@geolander.ge"
  );
}

function getLocalAdminPassword() {
  return (
    process.env.ADMIN_PASSWORD?.trim() ||
    process.env.SEED_ADMIN_PASSWORD?.trim() ||
    ""
  );
}

function getLocalAdminPasswordHash() {
  return process.env.ADMIN_PASSWORD_HASH?.trim() || "";
}

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.AUTH_SECRET?.trim() ||
    "local-dev-session-secret"
  );
}

function signPayload(payload: string) {
  return createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

function encodeSession(payload: SessionPayload) {
  const encodedPayload = Buffer.from(
    JSON.stringify(payload),
    "utf8"
  ).toString("base64url");
  const signature = signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

function decodeSession(sessionCookie: string): SessionPayload | null {
  const [encodedPayload, signature] = sessionCookie.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = signPayload(encodedPayload);
  const expectedBuffer = Buffer.from(expectedSignature);
  const actualBuffer = Buffer.from(signature);

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as SessionPayload;

    if (!payload.email || typeof payload.exp !== "number") {
      return null;
    }

    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

async function getUserRole(email: string | null) {
  if (!email) return undefined;

  if (useDatabase) {
    const [user] = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user?.role;
  }

  return email === getLocalAdminEmail() ? "admin" : undefined;
}

export async function verifyLocalAdminCredentials(
  email: string,
  password: string
) {
  const normalizedEmail = email.trim().toLowerCase();
  const adminEmail = getLocalAdminEmail().toLowerCase();

  if (normalizedEmail !== adminEmail) {
    return false;
  }

  const passwordHash = getLocalAdminPasswordHash();
  if (passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  return password === getLocalAdminPassword();
}

export async function auth(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) return null;

  const payload = decodeSession(sessionCookie);
  if (!payload) return null;

  const role = await getUserRole(payload.email);
  if (!role) return null;

  return {
    user: {
      id: payload.email,
      email: payload.email,
      name: payload.email,
      role,
    },
  };
}

export async function createLocalSessionCookie(email: string) {
  return encodeSession({
    email,
    exp: Date.now() + SESSION_MAX_AGE_MS,
  });
}

export async function setSessionCookie(sessionCookie: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_MAX_AGE_MS / 1000),
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
