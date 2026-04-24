import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { calculateScores } from '@/lib/scoring';
import nodemailer from 'nodemailer';

const ARCHETYPE_NAMES: Record<string, string> = {
  BOA: 'Burned-out Achiever', SBM: 'Stable But Meaningless', LCA: 'Late Creative Awakening',
  CE: 'Corporate Exit', CP: 'Career Plateau', RE: 'Reluctant Entrepreneur',
  VR: 'Values Rupture', RO: 'Responsibility Overload', PCT: 'Portfolio Career Transition',
  ISG: 'Identity–Skill Gap', DA: 'Delayed Ambition', SC: 'Specialist Ceiling',
  PSV: 'Post-Success Vacuum', GD: 'Geographic Displacement', LRP: 'Late Reinvention Path',
};

const NOTION_URLS: Record<string, string> = {
  BOA: 'https://subdued-castanet-545.notion.site/BOA-Burned-out-Achiever-324a21b2a01b80539c77c8d4032b8c28',
  SBM: 'https://subdued-castanet-545.notion.site/SBM-Stable-But-Meaningless-324a21b2a01b80a2a8d5dcd6ef405fa8',
  LCA: 'https://subdued-castanet-545.notion.site/LCA-Late-Creative-Awakening-324a21b2a01b80f8a05cf1c0c1094a13',
  CE:  'https://subdued-castanet-545.notion.site/CE-Corporate-Exit-324a21b2a01b8095b0c3f8a3dba21c01',
  CP:  'https://subdued-castanet-545.notion.site/CP-Career-Plateau-324a21b2a01b80a6ab3cf4620fcc16cf',
  RE:  'https://subdued-castanet-545.notion.site/RE-Reluctant-Entrepreneur-324a21b2a01b80439f97d7c65b854d81',
  VR:  'https://subdued-castanet-545.notion.site/VR-Values-Rupture-324a21b2a01b805c9a3cfa01e2ecae49',
  RO:  'https://subdued-castanet-545.notion.site/RO-Responsibility-Overload-324a21b2a01b80d6ad7effc1c85ab11a',
  PCT: 'https://subdued-castanet-545.notion.site/PCT-Portfolio-Career-Transition-324a21b2a01b80ee8b63d0243c1c4cd2',
  ISG: 'https://subdued-castanet-545.notion.site/ISG-Identity-Skill-Gap-324a21b2a01b80a889ecdaaa290c42c8',
  DA:  'https://subdued-castanet-545.notion.site/DA-Delayed-Ambition-324a21b2a01b800498e3cd947f96efde',
  SC:  'https://subdued-castanet-545.notion.site/SC-Specialist-Ceiling-324a21b2a01b8050a73beabe97bd195b',
  PSV: 'https://subdued-castanet-545.notion.site/PSV-Post-Success-Vacuum-324a21b2a01b80439eb2c414d9fc905b',
  GD:  'https://subdued-castanet-545.notion.site/GD-Geographic-Displacement-324a21b2a01b80e6a2c4eabc45067210',
  LRP: 'https://subdued-castanet-545.notion.site/LRP-Late-Reinvention-Path-324a21b2a01b8087803afa0de4b32df1',
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
    auth: { user: 'lifepatternengine@gmail.com', pass: appPassword },
  });

  const primaryName = ARCHETYPE_NAMES[primaryCode] ?? primaryCode;
  const secondaryName = secondaryCode ? (ARCHETYPE_NAMES[secondaryCode] ?? secondaryCode) : null;
  const resultUrl  = `https://life-pattern-engine.xyz/result/${responseId}`;
  const upgradeUrl = `https://life-pattern-engine.xyz/upgrade?id=${responseId}`;

  const secondaryBlock = secondaryName ? `
  <tr><td style="padding:32px 0 0;">
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.35);font-family:Arial,sans-serif;">Secondary archetype</p>
    <p style="margin:0;font-size:24px;font-weight:700;color:rgba(255,255,255,0.55);font-family:'Georgia',serif;">${secondaryCode}</p>
    <p style="margin:4px 0 0;font-size:15px;color:rgba(255,255,255,0.4);font-family:'Georgia',serif;">${secondaryName}</p>
  </td></tr>` : '';

  await transporter.sendMail({
    from: 'Zdnk from Life Pattern Engine <lifepatternengine@gmail.com>',
    to: email,
    subject: `Your pattern: ${primaryCode} — ${primaryName}`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0b0f1a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f1a;padding:60px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;padding:0 24px;">

  <tr><td style="padding-bottom:40px;">
    <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.3);font-family:Arial,sans-serif;">Life Pattern Engine</p>
  </td></tr>

  <!-- Primary archetype -->
  <tr><td>
    <p style="margin:0 0 32px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.3);font-family:Arial,sans-serif;">Your pattern</p>
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.35);font-family:Arial,sans-serif;">Primary archetype</p>
    <p style="margin:0 0 4px;font-size:40px;font-weight:700;color:#fff;font-family:'Georgia',serif;line-height:1.1;">${primaryCode}</p>
    <p style="margin:0 0 24px;font-size:20px;color:rgba(255,255,255,0.7);font-family:'Georgia',serif;">${primaryName}</p>
    <a href="${NOTION_URLS[primaryCode]}" style="display:inline-block;padding:12px 26px;border:1px solid rgba(255,255,255,0.65);color:#fff;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;text-decoration:none;font-family:Arial,sans-serif;">View full profile →</a>
  </td></tr>

  ${secondaryBlock}

  <!-- Result page link -->
  <tr><td style="padding:32px 0 0;">
    <a href="${resultUrl}" style="display:inline-block;padding:12px 26px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;font-family:Arial,sans-serif;">View your result page →</a>
  </td></tr>

  <!-- Deep Report upsell -->
  <tr><td style="padding:40px 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);padding:28px;">
      <tr><td>
        <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#fff;font-family:'Georgia',serif;">There is more to this.</p>
        <p style="margin:0 0 20px;font-size:13px;line-height:1.8;color:rgba(255,255,255,0.6);font-family:Arial,sans-serif;">Your secondary pattern changes how you read the primary. The Deep Report includes both archetypes, their interaction, and practical next steps for your specific combination.</p>
        <a href="${upgradeUrl}" style="display:inline-block;padding:12px 26px;background:#fff;color:#0b0f1a;font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;font-weight:700;font-family:Arial,sans-serif;">Get the Deep Report — €39 →</a>
      </td></tr>
    </table>
  </td></tr>

  <!-- Footnote -->
  <tr><td style="padding:32px 0 0;">
    <p style="margin:0;font-size:12px;line-height:1.8;color:rgba(255,255,255,0.3);font-family:Arial,sans-serif;">This is a diagnostic result — a map of where you are, not instructions for where to go.</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:32px 0 0;border-top:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.2);font-family:Arial,sans-serif;">2026 copyright Life Pattern Engine</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`,
  });
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { email, answers } = await request.json();

    const scores = calculateScores(answers);
    const primary = scores[0];
    const secondary = scores[1].score > 0 ? scores[1] : null;

    const { data, error } = await supabase
      .from('responses')
      .insert({
        email,
        answers,
        scores: scores,
        primary_archetype: primary.code,
        secondary_archetype: secondary?.code || null
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
    }

    // Send result email before responding (Vercel kills execution after response)
    try {
      await sendResultEmail(email, data.id, primary.code, secondary?.code ?? null);
      console.log('Result email sent to', email);
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
    }

    return NextResponse.json({
      id: data.id,
      primary: primary.code,
      secondary: secondary?.code
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
