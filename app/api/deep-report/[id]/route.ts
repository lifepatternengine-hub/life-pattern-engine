import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

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

async function generateCombinationAnalysis(
  primaryCode: string,
  primaryName: string,
  secondaryCode: string,
  secondaryName: string
): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 600,
    messages: [
      {
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
      },
    ],
  });

  const block = message.content[0];
  return block.type === 'text' ? block.text : '';
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from('responses')
    .select('primary_archetype, secondary_archetype, paid, combination_analysis')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (!data.paid) {
    return NextResponse.json({ error: 'Payment required' }, { status: 402 });
  }

  // Return cached combination analysis if already generated
  if (data.combination_analysis) {
    return NextResponse.json({
      primaryCode: data.primary_archetype,
      primaryName: ARCHETYPE_NAMES[data.primary_archetype] ?? data.primary_archetype,
      secondaryCode: data.secondary_archetype,
      secondaryName: data.secondary_archetype ? (ARCHETYPE_NAMES[data.secondary_archetype] ?? data.secondary_archetype) : null,
      combinationAnalysis: data.combination_analysis,
    });
  }

  // Generate combination analysis for the first time
  let combinationAnalysis = '';
  if (data.secondary_archetype && process.env.ANTHROPIC_API_KEY) {
    try {
      combinationAnalysis = await generateCombinationAnalysis(
        data.primary_archetype,
        ARCHETYPE_NAMES[data.primary_archetype] ?? data.primary_archetype,
        data.secondary_archetype,
        ARCHETYPE_NAMES[data.secondary_archetype] ?? data.secondary_archetype
      );
      if (combinationAnalysis) {
        await supabase
          .from('responses')
          .update({ combination_analysis: combinationAnalysis })
          .eq('id', id);
      }
    } catch (err) {
      console.error('Combination generation error:', err);
    }
  }

  return NextResponse.json({
    primaryCode: data.primary_archetype,
    primaryName: ARCHETYPE_NAMES[data.primary_archetype] ?? data.primary_archetype,
    secondaryCode: data.secondary_archetype,
    secondaryName: data.secondary_archetype ? (ARCHETYPE_NAMES[data.secondary_archetype] ?? data.secondary_archetype) : null,
    combinationAnalysis,
  });
}
