'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { archetypeNames } from '@/lib/scoring';

const archetypeLinks: Record<string, string> = {
  BOA: 'https://subdued-castanet-545.notion.site/BOA-Burned-out-Achiever-324a21b2a01b80539c77c8d4032b8c28',
  SBM: 'https://subdued-castanet-545.notion.site/SBM-Stable-But-Meaningless-324a21b2a01b80a2a8d5dcd6ef405fa8',
  LCA: 'https://subdued-castanet-545.notion.site/LCA-Late-Creative-Awakening-324a21b2a01b80f8a05cf1c0c1094a13',
  CE:  'https://subdued-castanet-545.notion.site/CE-Corporate-Exit-324a21b2a01b8095b0c3f8a3dba21c01',
  CP:  'https://subdued-castanet-545.notion.site/CP-Career-Plateau-324a21b2a01b80a6ab3cf4620fcc16cf',
  RE:  'https://subdued-castanet-545.notion.site/RE-Reluctant-Entrepreneur-324a21b2a01b80439f97d7c65b854d81',
  VR:  'https://subdued-castanet-545.notion.site/VR-Values-Rupture-324a21b2a01b805c9a3cfa01e2ecae49',
  RO:  'https://subdued-castanet-545.notion.site/RO-Responsibility-Overload-324a21b2a01b80d6ad7effc1c85ab11a',
  PCT: 'https://subdued-castanet-545.notion.site/PCT-Portfolio-Career-Transition-324a21b2a01b80ee8b63d0243c1c4cd2',
  ISG: 'https://subdued-castanet-545.notion.site/ISG-Identity-Skill-Gap-324a21b2a01b80a889ecdaaa290c42c8',
  DA:  'https://subdued-castanet-545.notion.site/DA-Delayed-Ambition-324a21b2a01b800498e3cd947f96efde',
  SC:  'https://subdued-castanet-545.notion.site/SC-Specialist-Ceiling-324a21b2a01b8050a73beabe97bd195b',
  PSV: 'https://subdued-castanet-545.notion.site/PSV-Post-Success-Vacuum-324a21b2a01b80439eb2c414d9fc905b',
  GD:  'https://subdued-castanet-545.notion.site/GD-Geographic-Displacement-324a21b2a01b80e6a2c4eabc45067210',
  LRP: 'https://subdued-castanet-545.notion.site/LRP-Late-Reinvention-Path-324a21b2a01b8087803afa0de4b32df1',
};

const serif = '"Inria Serif", Georgia, serif';
const sans  = '"Inter", system-ui, -apple-system, sans-serif';

/* ── archetype hero panels (gradient placeholders) ── */
const archetypePanels: Record<string, [string, string, string]> = {
  BOA: ['linear-gradient(160deg,#5a1010 0%,#3d0a0a 100%)', 'linear-gradient(160deg,#4a1060 0%,#9333ea 50%,#c026d3 100%)', 'linear-gradient(160deg,#8b1a1a 0%,#dc2626 60%,#f97316 100%)'],
  SBM: ['linear-gradient(160deg,#1a2a1a 0%,#0f1f0f 100%)', 'linear-gradient(160deg,#1a3a2a 0%,#166534 50%,#15803d 100%)', 'linear-gradient(160deg,#2a3a1a 0%,#3f6212 60%,#65a30d 100%)'],
  LCA: ['linear-gradient(160deg,#1a1a3a 0%,#0f0f2a 100%)', 'linear-gradient(160deg,#2a1a4a 0%,#7c3aed 50%,#a855f7 100%)', 'linear-gradient(160deg,#1a2a4a 0%,#1d4ed8 60%,#3b82f6 100%)'],
  CE:  ['linear-gradient(160deg,#2a1a0a 0%,#1a0f00 100%)', 'linear-gradient(160deg,#3a2a0a 0%,#92400e 50%,#d97706 100%)', 'linear-gradient(160deg,#3a1a0a 0%,#b45309 60%,#f59e0b 100%)'],
  default: ['linear-gradient(160deg,#1a1a2a 0%,#0f0f1a 100%)', 'linear-gradient(160deg,#2a1a3a 0%,#6d28d9 50%,#7c3aed 100%)', 'linear-gradient(160deg,#1a2a3a 0%,#1e40af 60%,#3b82f6 100%)'],
};

function getPanels(code: string): [string, string, string] {
  return archetypePanels[code] ?? archetypePanels.default;
}

export default function ResultPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [result, setResult]   = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/result/${id}`);
        if (!res.ok) { setError('Result not found'); setLoading(false); return; }
        setResult(await res.json());
      } catch {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  /* ── loading ── */
  if (loading) return (
    <main style={{ backgroundColor: '#0b1428', minHeight: '100vh', color: '#fff', fontFamily: serif, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '3px', textTransform: 'uppercase' }}>
        Mapping your pattern…
      </p>
    </main>
  );

  /* ── error ── */
  if (error || !result) return (
    <main style={{ backgroundColor: '#0b1428', minHeight: '100vh', color: '#fff', fontFamily: serif, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>
          {error ?? 'Result not found'}
        </p>
        <a href="/" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
          ← Back to home
        </a>
      </div>
    </main>
  );

  const pCode  = result.primary_archetype;
  const pName  = archetypeNames[pCode as keyof typeof archetypeNames] ?? pCode;
  const panels = getPanels(pCode);

  return (
    <main style={{ fontFamily: serif, color: '#fff' }}>

      {/* ══════════════════════════════════════════
          TOP SECTION — dark navy
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#0b1428' }}>

        {/* hero image panels */}
        <div style={{ display: 'flex', height: 'clamp(200px, 28vw, 320px)', gap: '2px' }}>
          <div style={{ flex: 1, background: panels[0] }} />
          <div style={{ flex: 1, background: panels[1] }} />
          <div style={{ flex: 1, background: panels[2] }} />
        </div>

        {/* archetype content */}
        <div style={{ padding: 'clamp(40px, 6vw, 64px) clamp(24px, 8%, 120px)' }}>
          <p style={{ fontSize: '10px', letterSpacing: '3.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '24px', fontFamily: sans }}>
            Your pattern
          </p>

          <p style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '12px', fontFamily: sans }}>
            Primary archetype
          </p>

          <h1 style={{ fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-1px', marginBottom: '8px' }}>
            {pCode}
          </h1>

          <p style={{ fontSize: 'clamp(18px, 2.8vw, 26px)', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>
            {pName}
          </p>

          <a
            href={archetypeLinks[pCode]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '11px 24px',
              border: '1px solid rgba(255,255,255,0.6)',
              color: '#fff',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 500,
              fontFamily: sans,
              backgroundColor: 'transparent',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            View full profile →
          </a>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '48px', paddingTop: '32px' }}>
            <p style={{ fontSize: '12px', lineHeight: 1.85, color: 'rgba(255,255,255,0.35)', maxWidth: '560px', fontFamily: sans }}>
              This is a diagnostic result — a map of where you are, not instructions for where to go.
              A full breakdown has been sent to your email.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM SECTION — paywall / upsell
      ══════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, #1e2d4a 0%, #2c3d5c 40%, #3a4d6a 100%)', padding: 'clamp(60px, 9vw, 100px) clamp(24px, 8%, 120px)' }}>

        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, lineHeight: 1.25, marginBottom: '20px' }}>
          There is more to this
        </h2>

        <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.8)', maxWidth: '520px', marginBottom: '32px', fontFamily: sans }}>
          Your secondary pattern changes how you read the primary. See both in your Deep Report.
        </p>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', marginBottom: '32px' }} />

        <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.85, color: 'rgba(255,255,255,0.75)', maxWidth: '560px', marginBottom: '48px', fontFamily: sans }}>
          Finding your way forward takes some work — sometimes it takes professional help.
          This report won&apos;t replace that. But it will make every conversation you have —
          with a coach, a therapist, a trusted friend — significantly more efficient.
          You arrive knowing what you&apos;re dealing with. The shortcut is already in your pocket.
        </p>

        <button
          onClick={() => router.push(`/upgrade?id=${id}`)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '11px 24px',
            border: '1px solid rgba(255,255,255,0.55)',
            color: '#fff',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 500,
            fontFamily: sans,
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Get a full report
          <span style={{ letterSpacing: '1px', opacity: 0.7 }}>————→</span>
        </button>
      </section>

      {/* footer */}
      <footer style={{ backgroundColor: '#0b1428', padding: '22px clamp(24px, 8%, 120px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: sans }}>
          2026 copyright Life Pattern Engine
        </p>
      </footer>

    </main>
  );
}
