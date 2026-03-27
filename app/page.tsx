export default function Home() {
  return (
    <main style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: '#ffffff' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', height: '480px' }}>

        {/* Background: left dark navy, right warm/red abstract */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'grid', gridTemplateColumns: '55% 45%',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a0a2e 0%, #0d1220 50%, #0b0f1a 100%)',
          }} />
          <div style={{
            background: 'linear-gradient(135deg, #3d1500 0%, #7a2000 25%, #b83200 50%, #d44020 70%, #c8a090 90%)',
          }} />
        </div>

        {/* Subtle grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }} />

        {/* Wavy divider between the two halves */}
        <svg
          style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', height: '100%', width: '120px', overflow: 'visible', zIndex: 2 }}
          viewBox="0 0 120 480"
          preserveAspectRatio="none"
        >
          <path d="M60,0 C30,120 90,240 50,360 C30,420 55,460 60,480" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Corner plus marks */}
        <span style={{ position: 'absolute', top: 30, left: 30, fontSize: 20, color: 'rgba(255,255,255,0.35)', lineHeight: 1, zIndex: 5 }}>+</span>
        <span style={{ position: 'absolute', top: 82, left: 72, fontSize: 16, color: 'rgba(255,255,255,0.2)', lineHeight: 1, zIndex: 5 }}>+</span>
        <span style={{ position: 'absolute', bottom: 44, right: 44, fontSize: 24, color: 'rgba(255,255,255,0.3)', lineHeight: 1, zIndex: 5 }}>+</span>

        {/* Hero text */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', alignItems: 'center',
          paddingLeft: '8%', paddingRight: '4%',
        }}>
          <div style={{ maxWidth: '540px' }}>
            <h1 style={{
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '20px',
              fontFamily: 'Georgia, "Times New Roman", serif',
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
              maxWidth: '360px',
            }}>
              A diagnostic tool that maps your professional situation against<br />
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
      <section style={{ backgroundColor: '#0d1220', padding: '80px 8%' }}>
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '40px',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}>
            About
          </h2>

          <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'rgba(255,255,255,0.55)' }}>
            <p style={{ marginBottom: '18px' }}>
              Feeling stuck or lost professionally is not unique — it follows patterns. The Life Pattern Engine is built on the observation that midlife professional transitions cluster around specific, recognizable configurations.
            </p>
            <p style={{ marginBottom: '18px' }}>
              Rather than treating career uncertainty as a formless crisis, this tool identifies the underlying structure. Once visible, paths forward become clearer.
            </p>
            <p style={{ marginBottom: '18px' }}>
              The framework emerged from analyzing recurring themes in professional transitions: value conflicts, identity shifts, skill-market mismatches, creative reawakenings, and structural constraints.
            </p>
            <p style={{ marginBottom: '18px' }}>
              These aren&apos;t abstract concepts — they&apos;re lived experiences that appear in predictable combinations.
            </p>
            <p>
              The diagnostic isolates which pattern (or patterns) you&apos;re experiencing. The result isn&apos;t prescriptive — it&apos;s diagnostic. A map of where you are, not instructions for where to go.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ backgroundColor: '#0d1220', padding: '0 8% 100px' }}>
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '60px',
            fontFamily: 'Georgia, "Times New Roman", serif',
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
            <div key={num} style={{ marginBottom: '60px' }}>
              <p style={{
                fontSize: 'clamp(40px, 7vw, 72px)',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.22)',
                lineHeight: 1,
                marginBottom: '8px',
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}>{num}</p>
              <p style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '14px',
                fontWeight: 600,
              }}>{label}</p>
              <p style={{
                fontSize: '14px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '480px',
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
