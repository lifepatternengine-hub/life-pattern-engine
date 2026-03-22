import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { calculateScores } from '@/lib/scoring';

const QUESTION_KEY_MAP: Record<string, number | string> = {
  'question_0ERbYy': 1,
  'question_zK50AR': 2,
  'question_5dPlYo': 3,
  'question_dYeZoo': 4,
  'question_YZlobB': 5,
  'question_DV6XoR': 6,
  'question_lNk0jk': 7,
  'question_RzyZQ9': 8,
  'question_oAL0ZP': 9,
  'question_GrAoVZ': 10,
  'question_OAMjZR': 11,
  'question_VZO9ag': 12,
  'question_PAJ2NV': 13,
  'question_EP7BG4': 14,
  'question_rlM0QN': 15,
  'question_42V10X': 16,
  'question_jBA04a': 17,
  'question_24Gbdj': 18,
  'question_xd50br': 19,
  'question_RzyZed': 20,
  'question_oAL0Ne': 21,
  'question_GrAoEp': 22,
  'question_OAMjq7': 23,
  'question_VZO97J': 24,
  'question_PAJ2Q5': 25,
  'question_EP7BVX': 26,
  'question_rlM09l': 27,
  'question_42V10k': 28,
  'question_jBA04x': 'email',
};

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const payload = await request.json();
    
    console.log('Received Tally webhook:', JSON.stringify(payload, null, 2));
    
    const tallyResponseId = payload.data.responseId;
    const fields = payload.data.fields;
    let email = '';
    const answers: Record<string, any> = {};
    
    fields.forEach((field: any) => {
      const mappedKey = QUESTION_KEY_MAP[field.key];
      
      if (mappedKey === 'email') {
        email = field.value;
      } else if (typeof mappedKey === 'number') {
        if (field.type === 'MULTIPLE_CHOICE' && Array.isArray(field.value)) {
          answers[`question_${mappedKey}`] = field.value[0];
        } else if (field.type === 'LINEAR_SCALE') {
          answers[`question_${mappedKey}`] = field.value;
        } else if (field.type === 'RANKING' && Array.isArray(field.value)) {
          answers[`question_${mappedKey}`] = field.value;
        } else {
          answers[`question_${mappedKey}`] = field.value;
        }
      }
    });
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    const scores = calculateScores(answers);
    const scoreEntries = Object.entries(scores);
    const sortedScores = scoreEntries.sort((a, b) => Number(b[1]) - Number(a[1]));
    const primaryArchetype = sortedScores[0][0];
    const secondaryArchetype = sortedScores[1] && Number(sortedScores[1][1]) > 0 ? sortedScores[1][0] : null;
    
    const { error } = await supabase
      .from('responses')
      .insert({
        id: tallyResponseId,
        email,
        answers,
        scores,
        primary_archetype: primaryArchetype,
        secondary_archetype: secondaryArchetype,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
    
    console.log('Saved response with ID:', tallyResponseId);
    
    // Return 302 redirect
    const redirectUrl = `https://life-pattern-engine.vercel.app/result/${tallyResponseId}`;
    
    return NextResponse.redirect(redirectUrl, 302);
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
