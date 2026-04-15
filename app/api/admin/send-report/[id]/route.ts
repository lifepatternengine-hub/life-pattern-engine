import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import nodemailer from 'nodemailer';

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

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!
  );

  const { data, error } = await supabase
    .from('responses')
    .select('email, primary_archetype, secondary_archetype, paid, combination_analysis')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (!data.paid) {
    return NextResponse.json({ error: 'Row is not marked as paid' }, { status: 402 });
  }

  // Generate combination analysis if not cached
  let combinationAnalysis = data.combination_analysis ?? '';

  if (!combinationAnalysis && data.secondary_archetype && process.env.ANTHROPIC_API_KEY) {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const primaryName = ARCHETYPE_NAMES[data.primary_archetype] ?? data.primary_archetype;
    const secondaryName = ARCHETYPE_NAMES[data.secondary_archetype] ?? data.secondary_archetype;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      messages: [
        {
          role: 'user',
          content: `You are writing a section of a professional career diagnostic Deep Report for Life Pattern Engine.

The person's primary pattern is: ${data.primary_archetype} — ${primaryName}
Their secondary pattern is: ${data.secondary_archetype} — ${secondaryName}

Write a "Combination Analysis" section with exactly 3 paragraphs that explains:
1. How the secondary pattern (${secondaryName}) specifically modifies or amplifies the experience of the primary pattern (${primaryName}) — what makes this combination distinct from either pattern alone
2. The specific tension or dynamic this combination creates — what the person is probably feeling that neither pattern alone explains
3. What this combination means practically for next steps — one concrete insight specific to having both these patterns simultaneously

Rules:
- Tone: Direct, honest, grounded. No generic career advice. No filler sentences.
- Write in second person ("you", "your")
- Each paragraph: 4–5 sentences
- Total: ~250–300 words
- Do NOT mention the pattern codes (BOA, ISG, etc.) — use the full names or just "your primary pattern" / "your secondary pattern"
- Do NOT add a heading — just the three paragraphs

Write the combination analysis now.`,
        },
      ],
    });

    const block = message.content[0];
    combinationAnalysis = block.type === 'text' ? block.text : '';

    await supabase
      .from('responses')
      .update({ combination_analysis: combinationAnalysis })
      .eq('id', id);
  }

  // Send the email
  const appPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '');
  if (!appPassword) {
    return NextResponse.json({ error: 'GMAIL_APP_PASSWORD not set' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'lifepatternengine@gmail.com', pass: appPassword },
  });

  const primaryCode = data.primary_archetype;
  const secondaryCode = data.secondary_archetype;
  const primaryName = ARCHETYPE_NAMES[primaryCode] ?? primaryCode;
  const secondaryName = secondaryCode ? (ARCHETYPE_NAMES[secondaryCode] ?? secondaryCode) : null;
  const reportUrl = `https://life-pattern-engine.xyz/deep-report/${id}`;

  await transporter.sendMail({
    from: 'Zdnk from Lifepattern Engine <lifepatternengine@gmail.com>',
    to: data.email,
    subject: `Your Deep Report is ready — ${primaryCode}${secondaryCode ? ' + ' + secondaryCode : ''}`,
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

  return NextResponse.json({
    ok: true,
    email: data.email,
    primary: primaryCode,
    secondary: secondaryCode,
    combinationAnalysis: combinationAnalysis.slice(0, 100) + '...',
  });
}
