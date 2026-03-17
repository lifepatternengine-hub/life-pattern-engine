import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { calculateScores } from '@/lib/scoring';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Extract Tally form data
    const { data } = payload;
    
    // Map Tally responses to our answer format
    // Tally sends data as: { fields: [{ key: 'question_xxx', value: 'answer' }] }
    const answers: Record<string, any> = {};
    const email = data.fields.find((f: any) => f.type === 'EMAIL')?.value || '';
    
    // Map each question response
    // Questions are numbered q1-q28
    for (let i = 1; i <= 28; i++) {
      const field = data.fields.find((f: any) => f.key === `question_${i}`);
      if (field) {
        // For multiple choice: map to index (0-4)
        // For scale: use the number directly (1-5)
        if (field.type === 'MULTIPLE_CHOICE') {
          // Find the index of the selected option
          answers[`q${i}`] = field.options.indexOf(field.value);
        } else if (field.type === 'RATING' || field.type === 'NUMBER') {
          answers[`q${i}`] = parseInt(field.value);
        }
      }
    }

    // Calculate scores
    const scores = calculateScores(answers);
    const primary = scores[0];
    const secondary = scores[1].score > 0 ? scores[1] : null;

    // Save to Supabase
    const { data: result, error } = await supabase
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

    // Return redirect URL to Tally
    // Tally will redirect the user to this URL after submission
    return NextResponse.json({
      redirect_url: `https://life-pattern-engine.vercel.app/result/${result.id}`
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
