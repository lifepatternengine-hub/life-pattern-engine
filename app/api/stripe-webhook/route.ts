import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

const ARCHETYPE_NAMES: Record<string, string> = {
  BOA: 'Burned-out Achiever',
  SBM: 'Stable But Meaningless',
  LCA: 'Late Creative Awakening',
  CE: 'Corporate Exit',
  CP: 'Career Plateau',
  RE: 'Reluctant Entrepreneur',
  VR: 'Values Rupture',
  RO: 'Responsibility Overload',
  PCT: 'Portfolio Career Transition',
  ISG: 'Identity–Skill Gap',
  DA: 'Delayed Ambition',
  SC: 'Specialist Ceiling',
  PSV: 'Post-Success Vacuum',
  GD: 'Geographic Displacement',
  LRP: 'Late Reinvention Path',
};

async function sendDeepReportEmail(email: string, resultId: string, primaryCode: string, secondaryCode: string | null) {
  const appPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '');
  if (!appPassword) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'lifepatternengine@gmail.com', pass: appPassword },
  });

  const primaryName = ARCHETYPE_NAMES[primaryCode] ?? primaryCode;
  const secondaryName = secondaryCode ? (ARCHETYPE_NAMES[secondaryCode] ?? secondaryCode) : null;
  const reportUrl = `https://life-pattern-engine.xyz/deep-report/${resultId}`;

  await transporter.sendMail({
    from: 'Zdnk from Lifepattern Engine <lifepatternengine@gmail.com>',
    to: email,
    subject: `Your Deep Report is ready — ${primaryCode} + ${secondaryCode ?? ''}`,
    html: `
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0b0f1a;font-family:'Georgia',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f1a;padding:60px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;padding:0 24px;">
  <tr><td style="padding-bottom:40px;">
    <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Life Pattern Engine</p>
  </td></tr>
  <tr><td>
    <p style="margin:0 0 24px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Your Deep Report</p>
    <h1 style="margin:0 0 8px;font-size:32px;font-weight:700;color:#fff;line-height:1.2;">Your full pattern is ready.</h1>
    <p style="margin:0 0 32px;font-size:16px;color:rgba(255,255,255,0.6);line-height:1.7;">
      ${primaryCode} — ${primaryName}${secondaryName ? `<br>+ ${secondaryCode} — ${secondaryName}` : ''}
    </p>
    <p style="margin:0 0 32px;font-size:14px;line-height:1.8;color:rgba(255,255,255,0.55);">
      Your Deep Report includes both archetypes in full, how your secondary pattern shapes the primary, and practical next steps for your specific combination.
    </p>
    <a href="${reportUrl}" style="display:inline-block;padding:14px 32px;background:#fff;color:#0b0f1a;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;font-weight:700;text-decoration:none;">Access your Deep Report →</a>
  </td></tr>
  <tr><td style="padding:40px 0 0;">
    <p style="margin:0;font-size:12px;line-height:1.8;color:rgba(255,255,255,0.3);">This link is personal to you. The report is generated for your exact combination.</p>
  </td></tr>
  <tr><td style="padding:32px 0 0;border-top:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.2);">2026 copyright LIFE PATTERN ENGINE</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // Dev fallback — no signature verification
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error('Stripe webhook signature error:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const resultId = session.metadata?.resultId;

    if (!resultId) {
      console.error('No resultId in session metadata');
      return NextResponse.json({ error: 'Missing resultId' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!
    );

    // Mark as paid
    const { data: response, error } = await supabase
      .from('responses')
      .update({ paid: true })
      .eq('id', resultId)
      .select('email, primary_archetype, secondary_archetype')
      .single();

    if (error || !response) {
      console.error('Failed to update paid status:', error);
      return NextResponse.json({ error: 'DB update failed' }, { status: 500 });
    }

    // Send Deep Report email
    try {
      await sendDeepReportEmail(
        response.email,
        resultId,
        response.primary_archetype,
        response.secondary_archetype
      );
      console.log('Deep Report email sent to', response.email);
    } catch (emailErr) {
      console.error('Deep Report email error:', emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
