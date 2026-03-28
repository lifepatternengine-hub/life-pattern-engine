export default function ThankYou() {
  return (
    <main style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: '#ffffff', display: 'flex', flexDirection: 'column' }}>

      {/* Hero band */}
      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 8%',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px' }}>

          {/* Small label */}
          <p style={{
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '32px',
            fontFamily: '"Inria Serif", Georgia, serif',
          }}>
            Diagnostic submitted
          </p>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.18,
            marginBottom: '28px',
            fontFamily: '"Inria Serif", Georgia, serif',
            color: '#ffffff',
          }}>
            Your pattern<br />
            is being mapped.
          </h1>

          <p style={{
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '16px',
            maxWidth: '400px',
            margin: '0 auto 16px',
          }}>
            We have received your responses. Your primary and secondary pattern archetypes are being calculated and will arrive in your inbox shortly.
          </p>

          <p style={{
            fontSize: '13px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.35)',
            maxWidth: '380px',
            margin: '0 auto 52px',
          }}>
            Check your spam folder if you don&apos;t see it within a few minutes.
          </p>

          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '11px 26px',
              border: '1px solid rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '11px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontWeight: 500,
              backgroundColor: 'transparent',
              textDecoration: 'none',
            }}
          >
            Back to home
          </a>

        </div>
      </section>

      {/* Footer */}
      <footer style={{
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
