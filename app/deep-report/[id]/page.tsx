'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { stories } from '@/lib/stories';

const serif = '"Inria Serif", Georgia, serif';
const sans  = '"Inter", system-ui, -apple-system, sans-serif';

const NOTION_URLS: Record<string, string> = {
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

interface ReportData {
  primaryCode: string;
  primaryName: string;
  secondaryCode: string | null;
  secondaryName: string | null;
  combinationAnalysis: string;
}

function Divider() {
  return <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '48px 0' }} />;
}

function StoryCard({ name, text }: { name: string; text: string }) {
  return (
    <div style={{ borderLeft: '2px solid rgba(255,255,255,0.15)', paddingLeft: '20px', marginBottom: '32px' }}>
      <p style={{ margin: '0 0 10px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontFamily: sans, letterSpacing: '0.5px' }}>
        {name}
      </p>
      <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.85, color: 'rgba(255,255,255,0.7)', fontFamily: sans }}>
        {text}
      </p>
    </div>
  );
}

function ArchetypeSection({
  code, name, label, dimmed = false,
}: {
  code: string; name: string; label: string; dimmed?: boolean;
}) {
  const archetypeStories = stories[code] ?? [];
  return (
    <div>
      <p style={{ margin: '0 0 12px', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: sans }}>
        {label}
      </p>
      <h2 style={{ margin: '0 0 6px', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.05, color: dimmed ? 'rgba(255,255,255,0.75)' : '#fff' }}>
        {code}
      </h2>
      <p style={{ margin: '0 0 28px', fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'rgba(255,255,255,0.65)', fontFamily: serif }}>
        {name}
      </p>
      <a
        href={NOTION_URLS[code]}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block', padding: '11px 24px',
          border: `1px solid ${dimmed ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.6)'}`,
          color: dimmed ? 'rgba(255,255,255,0.6)' : '#fff',
          fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
          fontWeight: 500, fontFamily: sans, textDecoration: 'none',
        }}
      >
        View full profile →
      </a>

      {archetypeStories.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <p style={{ margin: '0 0 24px', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: sans }}>
            People who were where you are
          </p>
          {archetypeStories.map((s) => (
            <StoryCard key={s.name} name={s.name} text={s.text} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DeepReportPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [data, setData]       = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/deep-report/${id}`);
        if (res.status === 402) {
          router.push(`/upgrade?id=${id}`);
          return;
        }
        if (!res.ok) { setError('Report not found'); setLoading(false); return; }
        setData(await res.json());
      } catch {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  if (loading) return (
    <main style={{ backgroundColor: '#0b1428', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: sans }}>
        Preparing your report…
      </p>
    </main>
  );

  if (error || !data) return (
    <main style={{ backgroundColor: '#0b1428', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '24px', fontFamily: sans }}>{error ?? 'Not found'}</p>
        <a href="/" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: sans }}>← Back to home</a>
      </div>
    </main>
  );

  return (
    <main style={{ backgroundColor: '#0b1428', minHeight: '100vh', color: '#fff', fontFamily: serif }}>

      {/* hero */}
      <div style={{ height: 'clamp(160px, 20vw, 240px)', overflow: 'hidden' }}>
        <img src="/mosaic2.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(48px, 7vw, 80px) clamp(24px, 8%, 48px)' }}>

        {/* eyebrow */}
        <p style={{ margin: '0 0 48px', fontSize: '10px', letterSpacing: '3.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: sans }}>
          Deep Report
        </p>

        {/* primary archetype */}
        <ArchetypeSection code={data.primaryCode} name={data.primaryName} label="Primary archetype" />

        {/* secondary archetype */}
        {data.secondaryCode && data.secondaryName && (
          <>
            <Divider />
            <ArchetypeSection code={data.secondaryCode} name={data.secondaryName} label="Secondary archetype" dimmed />
          </>
        )}

        {/* combination analysis */}
        {data.combinationAnalysis && (
          <>
            <Divider />
            <p style={{ margin: '0 0 28px', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: sans }}>
              The combination
            </p>
            <h3 style={{ margin: '0 0 28px', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, lineHeight: 1.2 }}>
              How {data.primaryCode} + {data.secondaryCode} interact
            </h3>
            {data.combinationAnalysis.split('\n\n').filter(Boolean).map((para, i) => (
              <p key={i} style={{ margin: '0 0 20px', fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.8)', fontFamily: sans }}>
                {para}
              </p>
            ))}
          </>
        )}

        <Divider />

        {/* back link */}
        <a
          href={`/result/${id}`}
          style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontFamily: sans }}
        >
          ← Back to your result
        </a>
      </div>

      <footer style={{ padding: '22px clamp(24px, 8%, 120px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: sans }}>
          2026 copyright Life Pattern Engine
        </p>
      </footer>
    </main>
  );
}
