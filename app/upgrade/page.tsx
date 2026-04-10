'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

const serif = '"Inria Serif", Georgia, serif';
const sans  = '"Inter", system-ui, -apple-system, sans-serif';

function UpgradeContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultId: id }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <main style={{ backgroundColor: '#0b1428', minHeight: '100vh', color: '#fff', fontFamily: serif }}>

      {/* ── header bar ── */}
      <div style={{ padding: '28px clamp(24px, 8%, 120px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <a
          href={id ? `/result/${id}` : '/'}
          style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontFamily: sans }}
        >
          ← Back
        </a>
      </div>

      {/* ── main content ── */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: 'clamp(60px, 10vw, 100px) clamp(24px, 8%, 48px)' }}>

        {/* eyebrow */}
        <p style={{ fontSize: '10px', letterSpacing: '3.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '32px', fontFamily: sans }}>
          Deep Report
        </p>

        {/* headline */}
        <h1 style={{ fontSize: 'clamp(32px, 5.5vw, 54px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>
          The full picture.<br />Both patterns.
        </h1>

        {/* subheading */}
        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: '52px', fontFamily: sans }}>
          Your primary archetype tells you where you are.
          Your secondary pattern explains why you&apos;re still stuck there.
          Together, they form the complete map.
        </p>

        {/* divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* what's included */}
        <p style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '24px', fontFamily: sans }}>
          What&apos;s included
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 52px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            'Primary archetype — deep profile',
            'Secondary archetype — how it shapes the primary',
            'The interaction between your two patterns',
            'Practical next steps for your specific combination',
          ].map((item) => (
            <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', fontFamily: sans, fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)' }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', marginTop: '2px', flexShrink: 0 }}>—</span>
              {item}
            </li>
          ))}
        </ul>

        {/* divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* price */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '12px', fontFamily: sans }}>
            One-time payment
          </p>
          <p style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, lineHeight: 1, marginBottom: '8px' }}>
            €39
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontFamily: sans }}>
            Instant access. No subscription.
          </p>
        </div>

        {/* CTA button */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          style={{
            display: 'block',
            width: '100%',
            padding: '16px 32px',
            backgroundColor: loading ? 'rgba(255,255,255,0.7)' : '#fff',
            color: '#0b1428',
            border: 'none',
            fontSize: '12px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            fontWeight: 700,
            fontFamily: sans,
            cursor: loading ? 'default' : 'pointer',
            marginBottom: '16px',
            transition: 'background-color 0.2s',
          }}
        >
          {loading ? 'Redirecting…' : 'Get the Deep Report →'}
        </button>

        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', fontFamily: sans, lineHeight: 1.6 }}>
          Secure payment. Delivered to your email within minutes.
        </p>

      </div>

      {/* footer */}
      <footer style={{ padding: '22px clamp(24px, 8%, 120px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: sans }}>
          2026 copyright Life Pattern Engine
        </p>
      </footer>

    </main>
  );
}

export default function UpgradePage() {
  return (
    <Suspense fallback={
      <main style={{ backgroundColor: '#0b1428', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: sans }}>Loading…</p>
      </main>
    }>
      <UpgradeContent />
    </Suspense>
  );
}
