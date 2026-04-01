import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getExistingEmails, bulkAppendEmails } from '@/lib/google-sheets';

// Protected with a secret key — call with ?secret=YOUR_SYNC_SECRET
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.SYNC_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('responses')
    .select('email, created_at, primary_archetype, secondary_archetype')
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'Supabase error', details: error }, { status: 500 });
  }

  // Get emails already in the sheet to avoid duplicates
  const existing = await getExistingEmails();

  const toAdd = (data ?? []).filter((r) => !existing.has(r.email));

  if (toAdd.length === 0) {
    return NextResponse.json({ synced: 0, message: 'All emails already in sheet' });
  }

  await bulkAppendEmails(
    toAdd.map((r) => ({
      email: r.email,
      createdAt: r.created_at,
      primaryArchetype: r.primary_archetype,
      secondaryArchetype: r.secondary_archetype,
    }))
  );

  return NextResponse.json({ synced: toAdd.length, message: `Added ${toAdd.length} emails to sheet` });
}
