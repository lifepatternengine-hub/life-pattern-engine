'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { archetypeNames } from '@/lib/scoring';

const archetypeLinks: Record<string, string> = {
  BOA: 'https://subdued-castanet-545.notion.site/BOA-Burned-out-Achiever-324a21b2a01b80539c77c8d4032b8c28',
  SBM: 'https://subdued-castanet-545.notion.site/SBM-Stable-But-Meaningless-324a21b2a01b80a2a8d5dcd6ef405fa8',
  LCA: 'https://subdued-castanet-545.notion.site/LCA-Late-Creative-Awakening-324a21b2a01b80f8a05cf1c0c1094a13',
  CE: 'https://subdued-castanet-545.notion.site/CE-Corporate-Exit-324a21b2a01b8095b0c3f8a3dba21c01',
  CP: 'https://subdued-castanet-545.notion.site/CP-Career-Plateau-324a21b2a01b80a6ab3cf4620fcc16cf',
  RE: 'https://subdued-castanet-545.notion.site/RE-Reluctant-Entrepreneur-324a21b2a01b80439f97d7c65b854d81',
  VR: 'https://subdued-castanet-545.notion.site/VR-Values-Rupture-324a21b2a01b805c9a3cfa01e2ecae49',
  RO: 'https://subdued-castanet-545.notion.site/RO-Responsibility-Overload-324a21b2a01b80d6ad7effc1c85ab11a',
  PCT: 'https://subdued-castanet-545.notion.site/PCT-Portfolio-Career-Transition-324a21b2a01b80ee8b63d0243c1c4cd2',
  ISG: 'https://subdued-castanet-545.notion.site/ISG-Identity-Skill-Gap-324a21b2a01b80a889ecdaaa290c42c8',
  DA: 'https://subdued-castanet-545.notion.site/DA-Delayed-Ambition-324a21b2a01b800498e3cd947f96efde',
  SC: 'https://subdued-castanet-545.notion.site/SC-Specialist-Ceiling-324a21b2a01b8050a73beabe97bd195b',
  PSV: 'https://subdued-castanet-545.notion.site/PSV-Post-Success-Vacuum-324a21b2a01b80439eb2c414d9fc905b',
  GD: 'https://subdued-castanet-545.notion.site/GD-Geographic-Displacement-324a21b2a01b80e6a2c4eabc45067210',
  LRP: 'https://subdued-castanet-545.notion.site/LRP-Late-Reinvention-Path-324a21b2a01b8087803afa0de4b32df1'
};

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResult() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data, error } = await supabase
        .from('responses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error loading result:', error);
        setLoading(false);
        return;
      }

      setResult(data);
      setLoading(false);
    }

    loadResult();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-light text-gray-400">Loading your result...</div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-light text-gray-400">Result not found</div>
        </div>
      </div>
    );
  }

  const primaryCode = result.primary_archetype;
  const secondaryCode = result.secondary_archetype;
  const primaryName = archetypeNames[primaryCode as keyof typeof archetypeNames];
  const secondaryName = secondaryCode ? archetypeNames[secondaryCode as keyof typeof archetypeNames] : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0f0a1a] p-12 border border-white/10">
          <h1 className="text-5xl font-light text-white mb-4">Your pattern</h1>
          
          <div className="space-y-8">
            <div>
              <div className="text-sm font-light text-gray-400 mb-2">PRIMARY ARCHETYPE</div>
              <div className="text-4xl font-light text-white mb-4">
                {primaryCode} — {primaryName}
              </div>
              <a
                href={archetypeLinks[primaryCode]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
              >
                View full result →
              </a>
            </div>

            {secondaryCode && secondaryName && (
              <div className="pt-8 border-t border-white/10">
                <div className="text-sm font-light text-gray-400 mb-2">SECONDARY ARCHETYPE</div>
                <div className="text-2xl font-light text-white mb-4">
                  {secondaryCode} — {secondaryName}
                </div>
                <a
                  href={archetypeLinks[secondaryCode]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/20"
                >
                  View secondary pattern →
                </a>
              </div>
            )}

            <div className="pt-8 border-t border-white/10 space-y-4">
              <h2 className="text-2xl font-light text-white">What this means</h2>
              <p className="text-gray-300 font-light leading-relaxed">
                Your responses indicate you're primarily in the <strong>{primaryName}</strong> pattern.
                {secondaryCode && ` You also show characteristics of ${secondaryName}.`}
              </p>
              <p className="text-gray-300 font-light leading-relaxed">
                The full result page includes a detailed breakdown of your pattern, trajectory stories showing how others in the same pattern have navigated forward, and specific dynamics to pay attention to.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-gray-400 hover:text-white font-light">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
