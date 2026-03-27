import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
    
    // Fetch result from database
    const { data, error } = await supabase
      .from('responses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }
    
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error.message 
    }, { status: 500 });
  }
}
