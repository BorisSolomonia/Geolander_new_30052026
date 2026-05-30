import { NextRequest, NextResponse } from "next/server";
import {
  auth,
  clearSessionCookie,
  createLocalSessionCookie,
  setSessionCookie,
  verifyLocalAdminCredentials,
} from "@/lib/auth";

export async function GET() {
  const session = await auth();
  return NextResponse.json({ user: session?.user ?? null });
}

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing credentials" },
      { status: 400 }
    );
  }

  try {
    const isValid = await verifyLocalAdminCredentials(email, password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const sessionCookie = await createLocalSessionCookie(email);
    await setSessionCookie(sessionCookie);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error during session POST:", error);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
