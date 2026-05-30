import { auth } from "./auth";

export class AuthorizationError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AuthorizationError";
  }
}

type SessionUser = {
  id?: string;
  email?: string | null;
  role?: string;
};

export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    throw new AuthorizationError("Unauthorized");
  }
  return session.user as SessionUser;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") {
    throw new AuthorizationError("Forbidden");
  }
  return user;
}
