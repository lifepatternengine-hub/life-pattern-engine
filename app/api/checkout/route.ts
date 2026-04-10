import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(req: NextRequest) {
  const { resultId } = await req.json();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? req.headers.get('origin') ?? 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'eur',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: 3900, // €39.00 in cents
          product_data: {
            name: 'Life Pattern Engine — Deep Report',
            description: 'Full profile for both your primary and secondary archetypes, including the interaction between your two patterns and practical next steps.',
          },
        },
        quantity: 1,
      },
    ],
    metadata: { resultId: resultId ?? '' },
    success_url: `${baseUrl}/report-success?session_id={CHECKOUT_SESSION_ID}&id=${resultId ?? ''}`,
    cancel_url: `${baseUrl}/upgrade?id=${resultId ?? ''}`,
  });

  return NextResponse.json({ url: session.url });
}
