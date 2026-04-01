import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { scoreResponse } from '@/lib/scoring-engine';
import { appendEmailToSheet } from '@/lib/google-sheets';
import nodemailer from 'nodemailer';

const NOTION_URLS: Record<string, string> = {
  BOA: "https://subdued-castanet-545.notion.site/BOA-Burned-out-Achiever-324a21b2a01b80539c77c8d4032b8c28",
  SBM: "https://subdued-castanet-545.notion.site/SBM-Stable-But-Meaningless-324a21b2a01b80a2a8d5dcd6ef405fa8",
  LCA: "https://subdued-castanet-545.notion.site/LCA-Late-Creative-Awakening-324a21b2a01b80f8a05cf1c0c1094a13",
  CE: "https://subdued-castanet-545.notion.site/CE-Corporate-Exit-324a21b2a01b8095b0c3f8a3dba21c01",
  CP: "https://subdued-castanet-545.notion.site/CP-Career-Plateau-324a21b2a01b80a6ab3cf4620fcc16cf",
  RE: "https://subdued-castanet-545.notion.site/RE-Reluctant-Entrepreneur-324a21b2a01b80439f97d7c65b854d81",
  VR: "https://subdued-castanet-545.notion.site/VR-Values-Rupture-324a21b2a01b805c9a3cfa01e2ecae49",
  RO: "https://subdued-castanet-545.notion.site/RO-Responsibility-Overload-324a21b2a01b80d6ad7effc1c85ab11a",
  PCT: "https://subdued-castanet-545.notion.site/PCT-Portfolio-Career-Transition-324a21b2a01b80ee8b63d0243c1c4cd2",
  ISG: "https://subdued-castanet-545.notion.site/ISG-Identity-Skill-Gap-324a21b2a01b80a889ecdaaa290c42c8",
  DA: "https://subdued-castanet-545.notion.site/DA-Delayed-Ambition-324a21b2a01b800498e3cd947f96efde",
  SC: "https://subdued-castanet-545.notion.site/SC-Specialist-Ceiling-324a21b2a01b8050a73beabe97bd195b",
  PSV: "https://subdued-castanet-545.notion.site/PSV-Post-Success-Vacuum-324a21b2a01b80439eb2c414d9fc905b",
  GD: "https://subdued-castanet-545.notion.site/GD-Geographic-Displacement-324a21b2a01b80e6a2c4eabc45067210",
  LRP: "https://subdued-castanet-545.notion.site/LRP-Late-Reinvention-Path-324a21b2a01b8087803afa0de4b32df1"
};

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

async function sendResultEmail(
  email: string,
  responseId: string,
  primaryCode: string,
  secondaryCode: string | null
) {
  const appPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '');
  if (!appPassword) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lifepatternengine@gmail.com',
      pass: appPassword,
    },
  });

  const primaryName = ARCHETYPE_NAMES[primaryCode] ?? primaryCode;
  const secondaryName = secondaryCode ? (ARCHETYPE_NAMES[secondaryCode] ?? secondaryCode) : null;
  const resultUrl = `https://life-pattern-engine.xyz/result/${responseId}`;

  const secondaryBlock = secondaryCode && secondaryName ? `
    <tr><td style="padding:32px 0 0;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.35);">Secondary archetype</p>
      <p style="margin:0;font-size:22px;font-weight:700;color:#fff;">${secondaryCode}</p>
      <p style="margin:4px 0 20px;font-size:16px;color:rgba(255,255,255,0.6);">${secondaryName}</p>
      <a href="${NOTION_URLS[secondaryCode]}" style="display:inline-block;padding:10px 22px;border:1px solid rgba(255,255,255,0.3);color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;">View secondary profile →</a>
    </td></tr>` : '';

  await transporter.sendMail({
    from: 'Zdnk from Lifepattern Engine <lifepatternengine@gmail.com>',
    to: email,
    subject: `Your pattern: ${primaryCode} — ${primaryName}`,
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
    <p style="margin:0 0 32px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Your pattern</p>
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.35);">Primary archetype</p>
    <p style="margin:0;font-size:36px;font-weight:700;color:#fff;">${primaryCode}</p>
    <p style="margin:4px 0 28px;font-size:22px;color:rgba(255,255,255,0.7);">${primaryName}</p>
    <a href="${NOTION_URLS[primaryCode]}" style="display:inline-block;padding:12px 26px;border:1px solid rgba(255,255,255,0.65);color:#fff;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;text-decoration:none;">View full profile →</a>
  </td></tr>
  ${secondaryBlock}
  <tr><td style="padding:40px 0 0;">
    <a href="${resultUrl}" style="display:inline-block;padding:12px 26px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;">View your result page →</a>
  </td></tr>
  <tr><td style="padding:32px 0 0;">
    <p style="margin:0;font-size:12px;line-height:1.8;color:rgba(255,255,255,0.3);">This is a diagnostic result — a map of where you are, not instructions for where to go.</p>
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
  try {
    const payload = await req.json();

    console.log('Received Tally webhook:', JSON.stringify(payload, null, 2));

    const { data } = payload;
    if (!data || !data.fields) {
      return NextResponse.json({ error: 'Invalid payload structure' }, { status: 400 });
    }

    const { responseId, fields } = data;

    // Extract email
    const emailField = fields.find((f: any) => f.type === 'INPUT_EMAIL');
    const email = emailField?.value || 'unknown@example.com';

    console.log(`Processing response ${responseId} for ${email}`);

    const scoringResult = scoreResponse(fields);

    console.log('Scoring result:', {
      primary: scoringResult.primary_archetype,
      secondary: scoringResult.secondary_archetype,
      confidence: scoringResult.confidence,
      match_reasons: scoringResult.match_reasons
    });

    // Support both env var names
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!
    );

    const { error: saveError } = await supabase
      .from('responses')
      .insert({
        id: responseId,
        email: email,
        answers: scoringResult.answers,
        scores: scoringResult.dimension_scores,
        primary_archetype: scoringResult.primary_archetype,
        secondary_archetype: scoringResult.secondary_archetype,
        created_at: new Date().toISOString()
      });

    if (saveError) {
      console.error('Supabase error:', saveError);
      return NextResponse.json({ error: 'Database error', details: saveError }, { status: 500 });
    }

    console.log('Saved to Supabase successfully');

    // Send result email (awaited so Vercel doesn't kill it early)
    try {
      await sendResultEmail(email, responseId, scoringResult.primary_archetype, scoringResult.secondary_archetype);
      console.log('Email sent successfully to', email);
    } catch (emailErr) {
      console.error('Email error:', emailErr);
    }

    appendEmailToSheet(
      email,
      new Date().toISOString(),
      scoringResult.primary_archetype,
      scoringResult.secondary_archetype
    );

    return NextResponse.json({
      success: true,
      responseId,
      primary_archetype: scoringResult.primary_archetype,
      secondary_archetype: scoringResult.secondary_archetype,
      confidence: scoringResult.confidence
    });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}
