export default function Home() {
  return (
    <main style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: '#ffffff' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', height: '480px' }}>

        {/* Hero background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/mosaic.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }} />

        {/* Dark overlay so text stays readable */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10,14,30,0.45)',
        }} />

        {/* Hero text — centered */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: '0 6%',
        }}>
          <div style={{ maxWidth: '580px' }}>
            <h1 style={{
              fontSize: 'clamp(38px, 5.6vw, 65px)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '20px',
              fontFamily: '"Inria Serif", Georgia, serif',
              color: '#ffffff',
              letterSpacing: '-0.3px',
            }}>
              You are not lost,<br />
              you are in a pattern.
            </h1>

            <p style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.72)',
              marginBottom: '36px',
              maxWidth: '380px',
              margin: '0 auto 36px',
            }}>
              A diagnostic tool that maps your professional situation against
              15 recognizable patterns experienced in midlife.
            </p>

            <a
              href="https://tally.so/r/vG2rO8"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '11px 26px',
                border: '1px solid rgba(255,255,255,0.65)',
                color: '#ffffff',
                fontSize: '11px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                fontWeight: 500,
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
            >
              Enter Diagnostics
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ backgroundColor: '#0d1220', padding: '72px 8% 64px' }}>
        <div style={{ maxWidth: '520px' }}>
          <h2 style={{
            fontSize: 'clamp(52px, 9vw, 88px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.38)',
            marginBottom: '24px',
            fontFamily: '"Inria Serif", Georgia, serif',
            lineHeight: 1,
          }}>
            About
          </h2>

          <div style={{ fontSize: '12.5px', lineHeight: 1.75, color: 'rgba(255,255,255,0.52)' }}>
            <p style={{ marginBottom: '12px' }}>
              Feeling stuck or lost professionally is not unique — it follows patterns. The Life Pattern Engine is built on the observation that midlife professional transitions cluster around specific, recognizable configurations.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Rather than treating career uncertainty as a formless crisis, this tool identifies the underlying structure. Once visible, paths forward become clearer.
            </p>
            <p style={{ marginBottom: '12px' }}>
              The framework emerged from analyzing recurring themes in professional transitions: value conflicts, identity shifts, skill-market mismatches, creative reawakenings, and structural constraints.
            </p>
            <p style={{ marginBottom: '12px' }}>
              These aren&apos;t abstract concepts — they&apos;re lived experiences that appear in predictable combinations.
            </p>
            <p>
              The diagnostic isolates which pattern (or patterns) you&apos;re experiencing. The result isn&apos;t prescriptive — it&apos;s diagnostic. A map of where you are, not instructions for where to go.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ backgroundColor: '#0d1220', padding: '16px 8% 100px' }}>
        <div style={{ maxWidth: '520px' }}>
          <h2 style={{
            fontSize: 'clamp(36px, 6vw, 60px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.38)',
            marginBottom: '48px',
            fontFamily: '"Inria Serif", Georgia, serif',
            lineHeight: 1,
          }}>
            How it works
          </h2>

          {[
            {
              num: '01',
              label: '28 questions',
              body: 'The diagnostic presents 28 carefully constructed questions designed to surface the underlying dynamics of your professional situation. Each question targets specific dimensions: value alignment, skill utilization, identity coherence, structural constraints, and future orientation.',
            },
            {
              num: '02',
              label: '15 patterns',
              body: "Your responses are mapped against 15 distinct archetypes — each representing a coherent professional pattern. These aren't personality types. They're situational configurations: combinations of internal states and external circumstances that create recognizable trajectories.",
            },
            {
              num: '03',
              label: 'Your result',
              body: "You receive a detailed breakdown of your dominant pattern (or patterns, if you're in a hybrid state). The result page includes trajectory stories — real scenarios showing how others in the same pattern have navigated forward. Not advice. Just visibility.",
            },
          ].map(({ num, label, body }) => (
            <div key={num} style={{ marginBottom: '52px' }}>
              <p style={{
                fontSize: 'clamp(64px, 12vw, 100px)',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.18)',
                lineHeight: 0.9,
                marginBottom: '10px',
                fontFamily: '"Inria Serif", Georgia, serif',
              }}>{num}</p>
              <p style={{
                fontSize: '10px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.42)',
                marginBottom: '10px',
                fontWeight: 600,
              }}>{label}</p>
              <p style={{
                fontSize: '12.5px',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.48)',
                maxWidth: '440px',
              }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        backgroundColor: '#0b0f1a',
        padding: '22px 8%',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <p style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}>
          2026 copyright LIFE PATTERN ENGINE
        </p>
      </footer>

    </main>
  );
}
