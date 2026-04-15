import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import nodemailer from 'nodemailer';
import archetypesData from '@/lib/archetypes.json';
import { stories } from '@/lib/stories';
import { logDeepReportToNotion } from '@/lib/notion-logger';

const ARCHETYPE_NAMES: Record<string, string> = {
  BOA: 'Burned-out Achiever', SBM: 'Stable But Meaningless', LCA: 'Late Creative Awakening',
  CE: 'Corporate Exit', CP: 'Career Plateau', RE: 'Reluctant Entrepreneur',
  VR: 'Values Rupture', RO: 'Responsibility Overload', PCT: 'Portfolio Career Transition',
  ISG: 'Identity–Skill Gap', DA: 'Delayed Ambition', SC: 'Specialist Ceiling',
  PSV: 'Post-Success Vacuum', GD: 'Geographic Displacement', LRP: 'Late Reinvention Path',
};

const archetypes: Record<string, { long_description: string; common_paths: { label: string; base_rate: number }[] }> =
  Object.fromEntries((archetypesData as any[]).map((a) => [a.id, a]));

async function generateCombinationAnalysis(
  primaryCode: string, primaryName: string,
  secondaryCode: string, secondaryName: string
): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 600,
    messages: [{
      role: 'user',
      content: `You are writing a section of a professional career diagnostic Deep Report for Life Pattern Engine.

The person's primary pattern is: ${primaryCode} — ${primaryName}
Their secondary pattern is: ${secondaryCode} — ${secondaryName}

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
    }],
  });
  const block = message.content[0];
  return block.type === 'text' ? block.text : '';
}

function archetypeBlock(code: string, label: string, dimmed: boolean): string {
  const name = ARCHETYPE_NAMES[code] ?? code;
  const desc = archetypes[code]?.long_description ?? '';
  const paths = archetypes[code]?.common_paths ?? [];
  const arcStories = stories[code] ?? [];

  const labelColor = dimmed ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.35)';
  const codeColor = dimmed ? 'rgba(255,255,255,0.55)' : '#ffffff';
  const nameColor = dimmed ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.75)';
  const textColor = dimmed ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.65)';

  const storiesHtml = arcStories.map((s) => `
    <tr><td style="padding:0 0 24px 0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="border-left:2px solid rgba(255,255,255,0.12);padding-left:16px;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:rgba(255,255,255,0.35);font-family:'Georgia',serif;letter-spacing:0.5px;">${s.name}</p>
          <p style="margin:0;font-size:13px;line-height:1.85;color:${textColor};font-family:Arial,sans-serif;">${s.text}</p>
        </td></tr>
      </table>
    </td></tr>`).join('');

  const pathsHtml = paths.slice(0, 4).map((p) => `
    <tr><td style="padding:0 0 8px 0;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="font-size:12px;color:${textColor};font-family:Arial,sans-serif;">${p.label}</td>
        <td align="right" style="font-size:12px;color:rgba(255,255,255,0.3);font-family:Arial,sans-serif;">${Math.round(p.base_rate * 100)}%</td>
      </tr></table>
    </td></tr>`).join('');

  return `
  <tr><td style="padding:0 0 48px 0;">
    <p style="margin:0 0 10px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${labelColor};font-family:Arial,sans-serif;">${label}</p>
    <p style="margin:0 0 4px;font-size:40px;font-weight:700;color:${codeColor};font-family:'Georgia',serif;line-height:1.1;">${code}</p>
    <p style="margin:0 0 24px;font-size:18px;color:${nameColor};font-family:'Georgia',serif;">${name}</p>
    <p style="margin:0 0 32px;font-size:14px;line-height:1.85;color:${textColor};font-family:Arial,sans-serif;">${desc}</p>

    ${arcStories.length > 0 ? `
    <p style="margin:0 0 20px;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.2);font-family:Arial,sans-serif;">People who were where you are</p>
    <table width="100%" cellpadding="0" cellspacing="0">${storiesHtml}</table>` : ''}

    ${paths.length > 0 ? `
    <p style="margin:24px 0 12px;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.2);font-family:Arial,sans-serif;">Where people in this pattern typically go</p>
    <table width="100%" cellpadding="0" cellspacing="0">${pathsHtml}</table>` : ''}
  </td></tr>`;
}

function buildEmail(
  primaryCode: string, secondaryCode: string | null,
  combinationAnalysis: string, reportUrl: string
): string {
  const primaryName = ARCHETYPE_NAMES[primaryCode] ?? primaryCode;
  const secondaryName = secondaryCode ? (ARCHETYPE_NAMES[secondaryCode] ?? secondaryCode) : null;

  const divider = `<tr><td style="padding:0 0 48px 0;border-top:1px solid rgba(255,255,255,0.08);"></td></tr>`;

  const combinationHtml = combinationAnalysis ? `
    ${divider}
    <tr><td style="padding:0 0 48px 0;">
      <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.25);font-family:Arial,sans-serif;">The combination</p>
      <p style="margin:0 0 28px;font-size:22px;font-weight:700;color:#fff;font-family:'Georgia',serif;line-height:1.2;">How ${primaryCode}${secondaryCode ? ' + ' + secondaryCode : ''} interact</p>
      ${combinationAnalysis.split('\n\n').filter(Boolean).map((p) =>
        `<p style="margin:0 0 20px;font-size:14px;line-height:1.9;color:rgba(255,255,255,0.75);font-family:Arial,sans-serif;">${p}</p>`
      ).join('')}
    </td></tr>` : '';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0b0f1a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f1a;padding:60px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;padding:0 24px;">

  <!-- header -->
  <tr><td style="padding-bottom:48px;">
    <p style="margin:0 0 32px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.2);font-family:Arial,sans-serif;">Life Pattern Engine — Deep Report</p>
    <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#fff;line-height:1.2;font-family:'Georgia',serif;">Your full pattern.</h1>
    <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.4);font-family:Arial,sans-serif;">${primaryCode}${secondaryCode ? ' + ' + secondaryCode : ''} — ${primaryName}${secondaryName ? ' + ' + secondaryName : ''}</p>
  </td></tr>

  ${divider}

  <!-- primary archetype -->
  ${archetypeBlock(primaryCode, 'Primary archetype', false)}

  ${secondaryCode ? `${divider}${archetypeBlock(secondaryCode, 'Secondary archetype', true)}` : ''}

  ${combinationHtml}

  ${divider}

  <!-- CTA -->
  <tr><td style="padding:0 0 48px 0;">
    <p style="margin:0 0 20px;font-size:13px;color:rgba(255,255,255,0.4);font-family:Arial,sans-serif;">Your report is also available online — bookmark it for reference.</p>
    <a href="${reportUrl}" style="display:inline-block;padding:14px 32px;background:#fff;color:#0b0f1a;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;font-weight:700;text-decoration:none;font-family:Arial,sans-serif;">View report online →</a>
  </td></tr>

  <!-- footer -->
  <tr><td style="padding:24px 0 0;border-top:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.15);font-family:Arial,sans-serif;">2026 copyright Life Pattern Engine</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

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

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!data.paid) return NextResponse.json({ error: 'Row is not marked as paid' }, { status: 402 });

  const primaryCode = data.primary_archetype;
  const secondaryCode = data.secondary_archetype ?? null;
  const sendEmail = req.nextUrl.searchParams.get('notify') !== 'false';

  // Generate combination analysis if not cached
  let combinationAnalysis = data.combination_analysis ?? '';
  if (!combinationAnalysis && secondaryCode && process.env.ANTHROPIC_API_KEY) {
    combinationAnalysis = await generateCombinationAnalysis(
      primaryCode, ARCHETYPE_NAMES[primaryCode] ?? primaryCode,
      secondaryCode, ARCHETYPE_NAMES[secondaryCode] ?? secondaryCode
    );
    await supabase.from('responses').update({ combination_analysis: combinationAnalysis }).eq('id', id);
  }

  // Send rich full-report email (skip if ?notify=false)
  if (!sendEmail) {
    await logDeepReportToNotion(id, primaryCode, secondaryCode, combinationAnalysis).catch(() => {});
    return NextResponse.json({ ok: true, notionOnly: true, primary: primaryCode, secondary: secondaryCode });
  }

  const appPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '');
  if (!appPassword) return NextResponse.json({ error: 'GMAIL_APP_PASSWORD not set' }, { status: 500 });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'lifepatternengine@gmail.com', pass: appPassword },
  });

  const reportUrl = `https://life-pattern-engine.xyz/deep-report/${id}`;

  await transporter.sendMail({
    from: 'Zdnk from Life Pattern Engine <lifepatternengine@gmail.com>',
    to: data.email,
    subject: `Your Deep Report — ${primaryCode}${secondaryCode ? ' + ' + secondaryCode : ''}`,
    html: buildEmail(primaryCode, secondaryCode, combinationAnalysis, reportUrl),
  });

  // Log to Notion
  await logDeepReportToNotion(id, primaryCode, secondaryCode, combinationAnalysis).catch(() => {});

  return NextResponse.json({
    ok: true,
    email: data.email,
    primary: primaryCode,
    secondary: secondaryCode,
    combinationGenerated: !!combinationAnalysis,
  });
}
