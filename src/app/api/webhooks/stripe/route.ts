import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
const STRIPE_SIGNATURE = 'stripe-signature';

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get(STRIPE_SIGNATURE);

  const { type, data } = stripe.webhooks.constructEvent(
    payload,
    signature!,
    process.env.STRIPE_CUSTOMER_WEBHOOK_SECRET!,
  );

  switch (type) {
    default:
      console.log(`Unhandled event type ${type}`);
      break;
  }

  return NextResponse.json({}, { status: 200 });
}
