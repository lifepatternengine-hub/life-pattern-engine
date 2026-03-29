'use client';

import { useEffect, useState } from 'react';
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

const font = '"Inria Serif", Georgia, serif';

export default function ResultPage({ params }: { params: { id: string } }) {
  const { id } = params;
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

  /* ── shared shell ── */
  const Shell = ({ children }: { children: React.ReactNode }) => (
    <main style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: '#fff', fontFamily: font, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 8%' }}>
        <div style={{ maxWidth: '620px', width: '100%' }}>{children}</div>
      </div>
      <footer style={{ padding: '22px 8%', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.22)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          2026 copyright LIFE PATTERN ENGINE
        </p>
      </footer>
    </main>
  );

  if (loading) return (
    <Shell>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>
        Mapping your pattern…
      </p>
    </Shell>
  );

  if (error || !result) return (
    <Shell>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>
        {error ?? 'Result not found'}
      </p>
      <a href="/" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
        ← Back to home
      </a>
    </Shell>
  );

  const pCode = result.primary_archetype;
  const sCode = result.secondary_archetype;
  const pName = archetypeNames[pCode as keyof typeof archetypeNames] ?? pCode;
  const sName = sCode ? (archetypeNames[sCode as keyof typeof archetypeNames] ?? sCode) : null;

  return (
    <Shell>
      {/* label */}
      <p style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: '32px' }}>
        Your pattern
      </p>

      {/* primary */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: '10px' }}>
          Primary archetype
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '6px' }}>
          {pCode}
        </h1>
        <p style={{ fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 400, color: 'rgba(255,255,255,0.7)', marginBottom: '28px' }}>
          {pName}
        </p>
        <a
          href={archetypeLinks[pCode]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block', padding: '11px 26px',
            border: '1px solid rgba(255,255,255,0.65)',
            color: '#fff', fontSize: '11px', letterSpacing: '2.5px',
            textTransform: 'uppercase', fontWeight: 500,
            backgroundColor: 'transparent', textDecoration: 'none', fontFamily: font,
          }}
        >
          View full profile →
        </a>
      </div>

      {/* secondary */}
      {sCode && sName && (
        <div style={{ paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: '48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: '10px' }}>
            Secondary archetype
          </p>
          <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 32px)', fontWeight: 700, lineHeight: 1.2, marginBottom: '6px' }}>
            {sCode}
          </h2>
          <p style={{ fontSize: 'clamp(15px, 2.5vw, 20px)', fontWeight: 400, color: 'rgba(255,255,255,0.55)', marginBottom: '28px' }}>
            {sName}
          </p>
          <a
            href={archetypeLinks[sCode]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '11px 26px',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'rgba(255,255,255,0.6)', fontSize: '11px', letterSpacing: '2.5px',
              textTransform: 'uppercase', fontWeight: 500,
              backgroundColor: 'transparent', textDecoration: 'none', fontFamily: font,
            }}
          >
            View secondary profile →
          </a>
        </div>
      )}

      {/* note */}
      <div style={{ paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.38)' }}>
          This is a diagnostic result — a map of where you are, not instructions for where to go.
          A full breakdown has been sent to your email.
        </p>
      </div>

      <div style={{ marginTop: '52px' }}>
        <a href="/" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
          ← Back to home
        </a>
      </div>
    </Shell>
  );
}
