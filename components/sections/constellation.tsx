'use client';

import { useMemo } from 'react';

interface Star {
  cx: number;
  cy: number;
  r: number;
  delay: number;
}

/**
 * Decorative constellation field for the hero. Pre-computed positions so the
 * server and client render the same SVG. Quietly twinkles via CSS keyframes.
 */
export function Constellation({ className }: { className?: string }) {
  const stars = useMemo<Star[]>(() => {
    const seed = [
      [12, 18, 1.4],
      [26, 8, 0.9],
      [42, 22, 1.1],
      [55, 12, 1.5],
      [68, 28, 0.8],
      [80, 16, 1.0],
      [92, 30, 1.3],
      [18, 42, 0.9],
      [35, 54, 1.4],
      [50, 38, 1.2],
      [62, 60, 0.9],
      [74, 48, 1.1],
      [88, 58, 1.4],
      [22, 72, 1.0],
      [38, 82, 0.8],
      [54, 76, 1.3],
      [70, 86, 1.1],
      [84, 78, 0.9],
      [6, 60, 1.2],
      [10, 90, 0.8],
      [46, 6, 0.7],
      [76, 6, 0.7],
    ];
    return seed.map(([cx, cy, r], i) => ({
      cx,
      cy,
      r,
      delay: (i * 0.37) % 4,
    }));
  }, []);

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FAF6EE" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FAF6EE" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Soft connecting filaments */}
      <g stroke="#C9A55C" strokeOpacity="0.12" strokeWidth="0.08" fill="none">
        <path d="M12 18 L26 8 L42 22 L55 12 L68 28 L80 16 L92 30" />
        <path d="M18 42 L35 54 L50 38 L62 60 L74 48 L88 58" />
        <path d="M22 72 L38 82 L54 76 L70 86 L84 78" />
      </g>
      {/* Stars */}
      {stars.map((s, i) => (
        <g key={i}>
          <circle
            cx={s.cx}
            cy={s.cy}
            r={s.r * 1.6}
            fill="url(#star-glow)"
            className="animate-twinkle"
            style={{ animationDelay: `${s.delay}s` }}
          />
          <circle
            cx={s.cx}
            cy={s.cy}
            r={s.r * 0.35}
            fill="#FAF6EE"
            className="animate-twinkle"
            style={{ animationDelay: `${s.delay}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
