import { NextRequest, NextResponse } from 'next/server';

const STORE_ID = '354083';
const VARIANT_ID = '1564820';

export async function POST(req: NextRequest) {
  const { resultId } = await req.json();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? req.headers.get('origin') ?? 'http://localhost:3000';

  const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            custom: { resultId: resultId ?? '' },
          },
          product_options: {
            redirect_url: `${baseUrl}/report-success?id=${resultId ?? ''}`,
          },
        },
        relationships: {
          store: { data: { type: 'stores', id: STORE_ID } },
          variant: { data: { type: 'variants', id: VARIANT_ID } },
        },
      },
    }),
  });

  const data = await response.json();
  const url = data?.data?.attributes?.url;

  if (!url) {
    console.error('Lemon Squeezy checkout error:', JSON.stringify(data));
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
  }

  return NextResponse.json({ url });
}
