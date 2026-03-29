import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { scoreResponse } from '@/lib/scoring-engine';
import archetypes from '@/lib/archetypes.json';

const NOTION_URLS: Record<string, string> = {
  BOA: "https://subdued-castanet-545.notion.site/BOA-Burned-out-Achiever-324a21b2a01b80539c77c8d4032b8c28",
  SBM: "https://subdued-castanet-545.notion.site/SBM-Stable-But-Meaningless-324a21b2a01b80a2a8d5dcd6ef405fa8",
  LCA: "https://subdued-castanet-545.notion.site/LCA-Late-Creative-Awakening-324a21b2a01b80f8a05cf1c0c1094a13",
  CE:  "https://subdued-castanet-545.notion.site/CE-Corporate-Exit-324a21b2a01b8095b0c3f8a3dba21c01",
  CP:  "https://subdued-castanet-545.notion.site/CP-Career-Plateau-324a21b2a01b80a6ab3cf4620fcc16cf",
  RE:  "https://subdued-castanet-545.notion.site/RE-Reluctant-Entrepreneur-324a21b2a01b80439f97d7c65b854d81",
  VR:  "https://subdued-castanet-545.notion.site/VR-Values-Rupture-324a21b2a01b805c9a3cfa01e2ecae49",
  RO:  "https://subdued-castanet-545.notion.site/RO-Responsibility-Overload-324a21b2a01b80d6ad7effc1c85ab11a",
  PCT: "https://subdued-castanet-545.notion.site/PCT-Portfolio-Career-Transition-324a21b2a01b80ee8b63d0243c1c4cd2",
  ISG: "https://subdued-castanet-545.notion.site/ISG-Identity-Skill-Gap-324a21b2a01b80a889ecdaaa290c42c8",
  DA:  "https://subdued-castanet-545.notion.site/DA-Delayed-Ambition-324a21b2a01b800498e3cd947f96efde",
  SC:  "https://subdued-castanet-545.notion.site/SC-Specialist-Ceiling-324a21b2a01b8050a73beabe97bd195b",
  PSV: "https://subdued-castanet-545.notion.site/PSV-Post-Success-Vacuum-324a21b2a01b80439eb2c414d9fc905b",
  GD:  "https://subdued-castanet-545.notion.site/GD-Geographic-Displacement-324a21b2a01b80e6a2c4eabc45067210",
  LRP: "https://subdued-castanet-545.notion.site/LRP-Late-Reinvention-Path-324a21b2a01b8087803afa0de4b32df1",
};

function getArchetype(id: string) {
  return (archetypes as any[]).find((a) => a.id === id) ?? null;
}

function buildEmailHtml(
  primaryId: string,
  secondaryId: string | null,
): string {
  const primary = getArchetype(primaryId);
  const secondary = secondaryId ? getArchetype(secondaryId) : null;
  const primaryUrl = NOTION_URLS[primaryId] ?? '#';
  const secondaryUrl = secondaryId ? (NOTION_URLS[secondaryId] ?? '#') : null;

  const block = (
    label: string,
    id: string,
    name: string,
    short: string,
    url: string,
    accent: string,
  ) => `
    <tr>
      <td style="padding:0 0 36px 0;">
        <p style="margin:0 0 6px;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${accent};font-family:Georgia,serif;">${label}</p>
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;color:#888;font-family:Georgia,serif;">${id}</p>
        <p style="margin:0 0 12px;font-size:22px;font-weight:700;color:#ffffff;font-family:Georgia,serif;">${name}</p>
        <p style="margin:0 0 20px;font-size:14px;line-height:1.7;color:#aaaaaa;font-family:Georgia,serif;">${short}</p>
        <a href="${url}"
           style="display:inline-block;padding:10px 22px;border:1px solid rgba(255,255,255,0.3);color:#ffffff;font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;font-family:Georgia,serif;">
          Read full pattern →
        </a>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#0b0f1a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0f1a;">
  <tr><td align="center" style="padding:48px 24px;">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="padding:0 0 8px;">
          <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.3);font-family:Georgia,serif;">Life Pattern Engine</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 48px;border-bottom:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0;font-size:28px;font-weight:700;color:#ffffff;font-family:Georgia,serif;line-height:1.2;">Your pattern has<br>been identified.</p>
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td style="height:40px;"></td></tr>

      <!-- Primary archetype -->
      ${block(
        'Primary pattern',
        primaryId,
        primary?.name ?? primaryId,
        primary?.short_description ?? '',
        primaryUrl,
        '#c8855a',
      )}

      ${secondary ? block(
        'Secondary pattern',
        secondaryId!,
        secondary?.name ?? secondaryId!,
        secondary?.short_description ?? '',
        secondaryUrl!,
        '#7a9ec8',
      ) : ''}

      <!-- Divider -->
      <tr>
        <td style="padding:8px 0 36px;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:16px 0 0;font-size:12px;line-height:1.7;color:#666;font-family:Georgia,serif;">
            This is a diagnostic result, not a prescription. It is a map of where you are — not instructions for where to go.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td>
          <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.2);letter-spacing:1.5px;text-transform:uppercase;font-family:Georgia,serif;">2026 copyright Life Pattern Engine</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
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
    const email = emailField?.value || '';

    if (!email) {
      console.error('No email found in Tally payload');
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    console.log(`Processing response ${responseId} for ${email}`);

    // Score
    const scoringResult = scoreResponse(fields);
    const { primary_archetype, secondary_archetype, confidence } = scoringResult;

    console.log('Scoring result:', { primary_archetype, secondary_archetype, confidence });

    // Save to Supabase
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    console.log('Supabase key source:', process.env.SUPABASE_ANON_KEY ? 'SUPABASE_ANON_KEY' : 'NEXT_PUBLIC_SUPABASE_ANON_KEY', '| defined:', !!supabaseKey);
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey!,
    );

    const { error: saveError } = await supabase.from('responses').insert({
      id: responseId,
      email,
      answers: scoringResult.answers,
      scores: scoringResult.dimension_scores,
      primary_archetype,
      secondary_archetype,
      created_at: new Date().toISOString(),
    });

    if (saveError) {
      console.error('Supabase error:', saveError);
      // Don't block — still send email and redirect
    } else {
      console.log('Saved to Supabase successfully');
    }

    // Send result email via Gmail SMTP
    if (process.env.GMAIL_APP_PASSWORD) {
      const primaryName = getArchetype(primary_archetype)?.name ?? primary_archetype;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'lifepatternengine@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      try {
        await transporter.sendMail({
          from: '"Life Pattern Engine" <lifepatternengine@gmail.com>',
          to: email,
          subject: `Your pattern: ${primaryName}`,
          html: buildEmailHtml(primary_archetype, secondary_archetype ?? null),
        });
        console.log('Result email sent to', email);
      } catch (emailError) {
        console.error('Gmail SMTP error:', emailError);
      }
    } else {
      console.warn('GMAIL_APP_PASSWORD not set — email not sent');
    }

    // Redirect to Thank You page
    return NextResponse.redirect(
      new URL('/thank-you', req.url),
      { status: 302 },
    );

  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 });
  }
}
