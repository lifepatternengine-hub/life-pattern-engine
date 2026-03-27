import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { scoreResponse } from '@/lib/scoring-engine';

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

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    
    console.log('Received Tally webhook:', JSON.stringify(payload, null, 2));
    
    // Extract data from Tally payload
    const { data } = payload;
    if (!data || !data.fields) {
      return NextResponse.json({ error: 'Invalid payload structure' }, { status: 400 });
    }
    
    const { responseId, fields } = data;
    
    // Extract email
    const emailField = fields.find((f: any) => f.type === 'INPUT_EMAIL');
    const email = emailField?.value || 'unknown@example.com';
    
    console.log(`Processing response ${responseId} for ${email}`);
    
    // Score the response using the complete scoring engine
    const scoringResult = scoreResponse(fields);
    
    console.log('Scoring result:', {
      primary: scoringResult.primary_archetype,
      secondary: scoringResult.secondary_archetype,
      confidence: scoringResult.confidence,
      match_reasons: scoringResult.match_reasons
    });
    
    // Create Supabase client (INSIDE the function)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
    
    // Save to Supabase
    const { data: saveData, error: saveError } = await supabase
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
