'use client';

import { useState } from 'react';

const sans = '"Inter", system-ui, sans-serif';

export default function AdminPage() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function run() {
    if (!id.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/admin/send-report/${id.trim()}?notify=false`);
      setResult(await res.json());
    } catch (e: any) {
      setResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ backgroundColor: '#0b1428', minHeight: '100vh', color: '#fff', fontFamily: sans, padding: '60px 40px' }}>
      <p style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '40px' }}>
        Admin — Generate Combination
      </p>

      <div style={{ maxWidth: '480px' }}>
        <input
          value={id}
          onChange={e => setId(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && run()}
          placeholder="Report ID"
          style={{
            width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
            fontSize: '14px', fontFamily: sans, outline: 'none', boxSizing: 'border-box', marginBottom: '16px',
          }}
        />
        <button
          onClick={run}
          disabled={loading || !id.trim()}
          style={{
            padding: '14px 32px', background: loading ? 'rgba(255,255,255,0.2)' : '#fff',
            color: '#0b1428', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase',
            fontWeight: 700, fontFamily: sans, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Generating…' : 'Generate + Log to Notion'}
        </button>

        {result && (
          <div style={{ marginTop: '32px', padding: '24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {result.error ? (
              <p style={{ color: '#ff6b6b', margin: 0, fontSize: '13px' }}>{result.error}</p>
            ) : (
              <>
                <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                  {result.primary}{result.secondary ? ` + ${result.secondary}` : ''}
                </p>
                <p style={{ margin: '0 0 8px', fontSize: '13px', color: result.combinationSource === 'generated' ? '#6bffb8' : 'rgba(255,255,255,0.6)' }}>
                  {result.combinationSource === 'generated' && `✓ Generated (${result.combinationLength} chars) — logged to Notion`}
                  {result.combinationSource === 'cached' && 'Already cached — skipped Notion'}
                  {result.combinationSource === 'no-api-key' && '✗ ANTHROPIC_API_KEY not set'}
                  {result.combinationSource === 'no-secondary' && 'No secondary pattern — nothing to combine'}
                  {result.combinationSource === 'error' && '✗ Generation failed — check server logs'}
                </p>
                {result.combinationSource === 'generated' && (
                  <a
                    href={`/deep-report/${id.trim()}`}
                    target="_blank"
                    style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
                  >
                    View report →
                  </a>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
