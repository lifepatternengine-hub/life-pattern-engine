import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { calculateScores } from '@/lib/scoring';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, answers } = await request.json();

    // Calculate scores
    const scores = calculateScores(answers);
    const primary = scores[0];
    const secondary = scores[1].score > 0 ? scores[1] : null;

    // Save to database
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

    // Send email with result (optional - can add later)
    // await sendResultEmail(email, data.id, primary.code);

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
