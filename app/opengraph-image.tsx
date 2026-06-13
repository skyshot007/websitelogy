/**
 * Root OG image — auto-served at /opengraph-image by Next.js App Router.
 * Picked up automatically by the `metadataBase` in layout.tsx.
 *
 * Dimensions: 1200 × 630 (standard Open Graph)
 * Runtime:    edge  (fast, no cold-start)
 */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Anil Astro — Vedic Astrology Guidance';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B1437',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Top decorative line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div style={{ width: 80, height: 1, background: '#C9A84C', opacity: 0.5 }} />
          <div style={{ fontSize: 28, color: '#C9A84C' }}>✦</div>
          <div style={{ width: 80, height: 1, background: '#C9A84C', opacity: 0.5 }} />
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 300,
            color: '#FAF6EE',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          Anil Astro
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#C9A84C',
            marginTop: 28,
            fontStyle: 'italic',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          A deeper understanding of your life begins here
        </div>

        {/* Service chips */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 52,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Vedic Astrology', 'Kundli', 'Compatibility', 'Pujas & Remedies'].map(
            (label) => (
              <div
                key={label}
                style={{
                  padding: '8px 20px',
                  border: '1px solid rgba(201,168,76,0.35)',
                  borderRadius: 40,
                  fontSize: 18,
                  color: '#8894B0',
                  letterSpacing: '0.04em',
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            fontSize: 18,
            color: 'rgba(136,148,176,0.6)',
            letterSpacing: '0.1em',
          }}
        >
          astroaniljoshi.tech
        </div>
      </div>
    ),
    { ...size },
  );
}
