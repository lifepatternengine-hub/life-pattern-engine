'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <section className="relative min-h-screen flex items-center justify-center px-8 py-24 bg-gradient-to-br from-[#1a0a1f] via-[#0a0a0f] to-[#0f0a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-light leading-tight tracking-tight text-white mb-8">
            You are not lost.<br />
            You are in a pattern.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            A diagnostic tool that maps your professional situation against 15 recognizable patterns experienced in midlife.
          </p>
          
          <a
            href="https://tally.so/r/vG2rO8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-white text-black text-lg font-medium hover:bg-gray-100 transition-colors duration-200 rounded-sm"
          >
            Start the diagnostic
          </a>
        </div>
      </section>

      <section id="about" className="py-24 md:py-32 px-8 bg-[#0f0a1a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-12">About</h2>
          
          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed font-light">
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

      <section id="diagnostics" className="py-24 md:py-32 px-8 bg-gradient-to-b from-[#0f0a1a] to-[#0a0a0f]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-16">How it works</h2>
          
          <div className="grid gap-16">
            <div className="space-y-4">
              <div className="text-5xl md:text-6xl font-light text-white/20">01</div>
              <h3 className="text-2xl md:text-3xl font-light text-white">28 questions</h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                The diagnostic presents 28 carefully constructed questions designed to surface the underlying dynamics of your professional situation. Each question targets specific dimensions: value alignment, skill utilization, identity coherence, structural constraints, and future orientation.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-5xl md:text-6xl font-light text-white/20">02</div>
              <h3 className="text-2xl md:text-3xl font-light text-white">15 patterns</h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                Your responses are mapped against 15 distinct archetypes — each representing a coherent professional pattern. These aren't personality types. They're situational configurations: combinations of internal states and external circumstances that create recognizable trajectories.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-5xl md:text-6xl font-light text-white/20">03</div>
              <h3 className="text-2xl md:text-3xl font-light text-white">Your result</h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                You receive a detailed breakdown of your dominant pattern (or patterns, if you're in a hybrid state). The result page includes trajectory stories — real scenarios showing how others in the same pattern have navigated forward. Not advice. Just visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 md:py-32 px-8 bg-[#0a0a0f]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-12">Contact</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-light text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-white/30 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-light text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-white/30 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-light text-gray-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-white/30 focus:outline-none transition-colors resize-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={submitStatus === 'sending'}
              className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {submitStatus === 'sending' ? 'Sending...' : submitStatus === 'sent' ? 'Sent!' : 'Send message'}
            </button>
            
            {submitStatus === 'error' && (
              <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </section>

      <footer className="py-12 px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          2026 Life Pattern Engine
        </div>
      </footer>
    </main>
  );
}
