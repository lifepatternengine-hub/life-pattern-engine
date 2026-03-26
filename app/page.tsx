export default function Home() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/mosaic.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '800px'
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(36px, 8vw, 72px)',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#ffffff',
            fontFamily: "'Playfair Display', serif",
            lineHeight: '1.2'
          }}
        >
          Life Pattern Engine
        </h1>

        <p
          style={{
            fontSize: 'clamp(18px, 3vw, 24px)',
            marginBottom: '48px',
            color: '#e2e8f0',
            fontFamily: "'Playfair Display', serif",
            lineHeight: '1.6'
          }}
        >
          Discover your professional archetype and unlock your next chapter
        </p>

        <a
          href="https://tally.so/r/vG2rO8"
          style={{
            display: 'inline-block',
            padding: '16px 48px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#d1d5db',
            color: '#000000',
            textDecoration: 'none',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            fontFamily: "'Playfair Display', serif"
          }}
        >
          Start Diagnostic
        </a>

        <p
          style={{
            marginTop: '64px',
            fontSize: '14px',
            color: '#94a3b8',
            fontFamily: "'Playfair Display', serif"
          }}
        >
          © Copyright: Life Pattern Engine 2026 - All Rights Reserved
        </p>
      </div>
    </div>
  );
}
