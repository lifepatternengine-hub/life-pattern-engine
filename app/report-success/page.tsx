'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const serif = '"Inria Serif", Georgia, serif';
const sans  = '"Inter", system-ui, -apple-system, sans-serif';

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <main style={{ backgroundColor: '#0b1428', minHeight: '100vh', color: '#fff', fontFamily: serif, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(60px, 10vw, 100px) clamp(24px, 8%, 120px)' }}>
        <div style={{ maxWidth: '520px', width: '100%' }}>

          <p style={{ fontSize: '10px', letterSpacing: '3.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '32px', fontFamily: sans }}>
            Payment confirmed
          </p>

          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '24px' }}>
            Your Deep Report<br />is on its way.
          </h1>

          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', marginBottom: '52px', fontFamily: sans }}>
            Check your email — your full report will arrive within a few minutes.
            It contains both your primary and secondary archetypes, their interaction, and your next steps.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {id && (
              <a
                href={`/result/${id}`}
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  border: '1px solid rgba(255,255,255,0.5)',
                  color: '#fff',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontFamily: sans,
                  textDecoration: 'none',
                  width: 'fit-content',
                }}
              >
                ← Back to your result
              </a>
            )}
          </div>

        </div>
      </div>

      <footer style={{ padding: '22px clamp(24px, 8%, 120px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: sans }}>
          2026 copyright Life Pattern Engine
        </p>
      </footer>
    </main>
  );
}

export default function ReportSuccessPage() {
  return (
    <Suspense fallback={
      <main style={{ backgroundColor: '#0b1428', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: sans }}>Loading…</p>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
