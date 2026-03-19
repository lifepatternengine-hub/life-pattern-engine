'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&display=swap');
        h1, h2, h3 { 
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 300;
        }
      `}</style>

      <section className="relative min-h-screen flex items-center px-8 py-24 overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden">
          <img 
            src="/mosaic.png" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div 
          className="absolute top-0 bottom-0 right-0 w-1/2"
          style={{
            background: 'linear-gradient(135deg, #1a0a1f 0%, #0a0a0f 50%, #0f0a1a 100%)'
          }}
        />
        
        <div className="relative z-10 w-1/2 max-w-[800px] ml-auto pl-32 pr-20" style={{ color: '#ffffff' }}>
          <h1 className="text-8xl leading-[0.9] tracking-tight mb-12" style={{ color: '#ffffff' }}>
            You're not lost.<br />You're in a pattern.
          </h1>
          <p className="text-2xl font-light leading-relaxed mb-12" style={{ color: '#d1d5db' }}>
            A diagnostic tool that maps your professional situation against 15 recognizable patterns experienced in midlife.
          </p>
          <a
            href="https://tally.so/r/vG2rO8"
            target="_blank"
            rel="noopener noreferrer"
           lassName="inline-block px-8 py-4 bg-transparent border-2 border-gray-400 text-white font-medium hover:bg-white hover:text-black transition-colors"
          >
            Start the diagnostic
          </a>
        </div>
      </section>

      <section className="py-32 px-8 bg-[#0f0a1a]" style={{ color: '#ffffff' }}>
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-5xl mb-12" style={{ color: '#ffffff' }}>About</h2>
          <div className="space-y-6 text-lg font-light leading-relaxed" style={{ color: '#d1d5db' }}>
            <p>
              Feeling stuck or lost professionally is not unique — it follows patterns. The Life Pattern Engine is built on the observation that midlife professional transitions cluster around specific, recognizable configurations.
            </p>
            <p>
              Rather than treating career uncertainty as a formless crisis, this tool identifies the underlying structure. Once visible, paths forward become clearer.
            </p>
            <p>
              The framework emerged from analyzing recurring themes in professional transitions: value conflicts, identity shifts, skill-market mismatches, creative reawakenings, and structural constraints. These aren't abstract concepts — they're lived experiences that appear in predictable combinations.
            </p>
            <p>
              The diagnostic isolates which pattern (or patterns) you're experiencing. The result isn't prescriptive — it's diagnostic. A map of where you are, not instructions for where to go.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 bg-gradient-to-b from-[#0f0a1a] to-[#0a0a0f]" style={{ color: '#ffffff' }}>
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-5xl text-white mb-12">How it works</h2>
          <div className="space-y-16">
            <div>
              <div className="text-6xl text-white/10 mb-4">01</div>
              <h3 className="text-3xl text-white mb-4">28 questions</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                The diagnostic presents 28 carefully constructed questions designed to surface the underlying dynamics of your professional situation. Each question targets specific dimensions: value alignment, skill utilization, identity coherence, structural constraints, and future orientation.
              </p>
            </div>
            <div>
              <div className="text-6xl text-white/10 mb-4">02</div>
              <h3 className="text-3xl text-white mb-4">15 patterns</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                Your responses are mapped against 15 distinct archetypes — each representing a coherent professional pattern. These aren't personality types. They're situational configurations: combinations of internal states and external circumstances that create recognizable trajectories.
              </p>
            </div>
            <div>
              <div className="text-6xl text-white/10 mb-4">03</div>
              <h3 className="text-3xl text-white mb-4">Your result</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                You receive a detailed breakdown of your dominant pattern (or patterns, if you're in a hybrid state). The result page includes trajectory stories — real scenarios showing how others in the same pattern have navigated forward. Not advice. Just visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-8 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-sm text-gray-500">
          <div>Life Pattern Engine</div>
          <div>— Zdnk</div>
        </div>
      </footer>
    </main>
  );
}
