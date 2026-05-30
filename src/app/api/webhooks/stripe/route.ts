import { NextResponse } from "next/server";

// Stripe webhook handler (future implementation)
export async function POST() {
  // TODO: Implement Stripe webhook handling
  // 1. Verify webhook signature
  // 2. Handle payment_intent.succeeded
  // 3. Update booking status

  return NextResponse.json(
    { error: "Stripe webhook is not implemented yet." },
    { status: 501 }
  );
}
