'use client';

export default function Home() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #0a0a0f;
          color: #fff;
          line-height: 1.6;
        }
        
        h1, h2, h3 {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-weight: 300;
        }
      `}</style>

      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }}>
          <div style={{
            position: 'relative',
            background: 'url(/mosaic.png) center/cover'
          }} />
          <div style={{
            background: 'linear-gradient(135deg, #1a0a1f 0%, #0a0a0f 50%, #0f0a1a 100%)'
          }} />
        </div>
        
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '6rem 2rem',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <div />
          <div style={{ paddingLeft: '2rem' }}>
            <h1 style={{
              fontSize: '4.5rem',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: '2rem'
            }}>
              You're not lost.<br />You're in a pattern.
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#9ca3af',
              maxWidth: '600px',
              fontWeight: 300,
              lineHeight: 1.8,
              marginBottom: '2rem'
            }}>
              A diagnostic tool that maps your professional situation against 15 recognizable patterns experienced in midlife.
            </p>
            <a
              href="https://tally.so/r/vG2rO8"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: '#fff',
                color: '#000',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'background 0.2s'
              }}
            >
              Start the diagnostic
            </a>
          </div>
        </div>
      </section>

      <section style={{
        padding: '8rem 2rem',
        background: '#0f0a1a'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem' }}>About</h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            marginBottom: '1.5rem',
            fontWeight: 300,
            lineHeight: 1.8
          }}>
            Feeling stuck or lost professionally is not unique — it follows patterns. The Life Pattern Engine is built on the observation that midlife professional transitions cluster around specific, recognizable configurations.
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            marginBottom: '1.5rem',
            fontWeight: 300,
            lineHeight: 1.8
          }}>
            Rather than treating career uncertainty as a formless crisis, this tool identifies the underlying structure. Once visible, paths forward become clearer.
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            marginBottom: '1.5rem',
            fontWeight: 300,
            lineHeight: 1.8
          }}>
            The framework emerged from analyzing recurring themes in professional transitions: value conflicts, identity shifts, skill-market mismatches, creative reawakenings, and structural constraints. These aren't abstract concepts — they're lived experiences that appear in predictable combinations.
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            marginBottom: '1.5rem',
            fontWeight: 300,
            lineHeight: 1.8
          }}>
            The diagnostic isolates which pattern (or patterns) you're experiencing. The result isn't prescriptive — it's diagnostic. A map of where you are, not instructions for where to go.
          </p>
        </div>
      </section>

      <section style={{
        padding: '8rem 2rem',
        background: 'linear-gradient(to bottom, #0f0a1a 0%, #0a0a0f 100%)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem' }}>How it works</h2>
          
          <div style={{ marginBottom: '4rem' }}>
            <div style={{
              fontSize: '4rem',
              color: 'rgba(255,255,255,0.1)',
              fontWeight: 300,
              marginBottom: '1rem'
            }}>01</div>
            <h3 style={{ fontSize: '1.875rem', marginBottom: '1rem' }}>28 questions</h3>
            <p style={{
              fontSize: '1.125rem',
              color: '#9ca3af',
              fontWeight: 300,
              lineHeight: 1.8
            }}>
              The diagnostic presents 28 carefully constructed questions designed to surface the underlying dynamics of your professional situation. Each question targets specific dimensions: value alignment, skill utilization, identity coherence, structural constraints, and future orientation.
            </p>
          </div>
          
          <div style={{ marginBottom: '4rem' }}>
            <div style={{
              fontSize: '4rem',
              color: 'rgba(255,255,255,0.1)',
              fontWeight: 300,
              marginBottom: '1rem'
            }}>02</div>
            <h3 style={{ fontSize: '1.875rem', marginBottom: '1rem' }}>15 patterns</h3>
            <p style={{
              fontSize: '1.125rem',
              color: '#9ca3af',
              fontWeight: 300,
              lineHeight: 1.8
            }}>
              Your responses are mapped against 15 distinct archetypes — each representing a coherent professional pattern. These aren't personality types. They're situational configurations: combinations of internal states and external circumstances that create recognizable trajectories.
            </p>
          </div>
          
          <div style={{ marginBottom: '4rem' }}>
            <div style={{
              fontSize: '4rem',
              color: 'rgba(255,255,255,0.1)',
              fontWeight: 300,
              marginBottom: '1rem'
            }}>03</div>
            <h3 style={{ fontSize: '1.875rem', marginBottom: '1rem' }}>Your result</h3>
            <p style={{
              fontSize: '1.125rem',
              color: '#9ca3af',
              fontWeight: 300,
              lineHeight: 1.8
            }}>
              You receive a detailed breakdown of your dominant pattern (or patterns, if you're in a hybrid state). The result page includes trajectory stories — real scenarios showing how others in the same pattern have navigated forward. Not advice. Just visibility.
            </p>
          </div>
        </div>
      </section>

      <footer style={{
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <div>Life Pattern Engine</div>
          <div>— Zdnk</div>
        </div>
      </footer>
    </>
  );
}
