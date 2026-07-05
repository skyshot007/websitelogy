/**
 * Decorative zodiac wheel for hero backdrops: geometric frame, a ring of
 * zodiac names + glyphs, and a swirling sun at the centre. Slow CSS rotation;
 * reusable across hero sections. Honours prefers-reduced-motion via globals.
 */
export function ZodiacWheel({ className }: { className?: string }) {
  const C = 200;
  const rad = (d: number) => (d * Math.PI) / 180;
  const P = (r: number, deg: number): [number, number] => [
    C + r * Math.cos(rad(deg)),
    C + r * Math.sin(rad(deg)),
  ];

  const names = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
  ];
  const glyphs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

  // Outer geometric frame: dodecagon + {12/5} star polygram
  const verts = Array.from({ length: 12 }, (_, k) => P(196, k * 30 - 90));
  const dodeca = verts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const starOrder = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const star =
    starOrder
      .map((k, i) => `${i === 0 ? 'M' : 'L'}${verts[k][0].toFixed(1)} ${verts[k][1].toFixed(1)}`)
      .join(' ') + ' Z';

  const dividers = Array.from({ length: 12 }, (_, k) => {
    const a = k * 30 - 90 + 15;
    const [x1, y1] = P(116, a);
    const [x2, y2] = P(178, a);
    return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  const nameEls = names.map((n, k) => {
    const a = k * 30 - 90;
    const [x, y] = P(164, a);
    return (
      <text
        key={n}
        x={x}
        y={y}
        transform={`rotate(${a + 90} ${x} ${y})`}
        textAnchor="middle"
        style={{ dominantBaseline: 'central' }}
        fontSize="10"
        letterSpacing="1"
      >
        {n.toUpperCase()}
      </text>
    );
  });

  const glyphEls = glyphs.map((g, k) => {
    const a = k * 30 - 90;
    const [x, y] = P(132, a);
    return (
      <text key={k} x={x} y={y} textAnchor="middle" style={{ dominantBaseline: 'central' }} fontSize="19">
        {g}
      </text>
    );
  });

  const N = 11;
  const blade = 'M0 -6 C 14 -22 30 -48 30 -88 C 40 -54 22 -28 6 -12 C 3 -9 0 -7 0 -6 Z';
  const blades = Array.from({ length: N }, (_, i) => (
    <path key={i} d={blade} transform={`rotate(${(360 / N) * i})`} />
  ));

  return (
    <div className={className} aria-hidden="true">
      <div className="h-full w-full origin-center animate-spin-slow">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <radialGradient id="zw-sun" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="var(--color-gold-soft)" />
              <stop offset="100%" stopColor="var(--color-gold)" />
            </radialGradient>
          </defs>

          <g fill="none" stroke="var(--color-gold)">
            <polygon points={dodeca} strokeOpacity="0.4" strokeWidth="1" />
            <path d={star} strokeOpacity="0.26" strokeWidth="1" />
            <circle cx={C} cy={C} r="178" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx={C} cy={C} r="150" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx={C} cy={C} r="116" strokeOpacity="0.4" strokeWidth="1" />
            <g strokeOpacity="0.3" strokeWidth="1">{dividers}</g>
          </g>

          <g fill="var(--color-gold)" fillOpacity="0.9" stroke="none" fontFamily="var(--font-display)">
            {nameEls}
          </g>
          <g fill="var(--color-gold)" fillOpacity="0.92" stroke="none">
            {glyphEls}
          </g>
          <g transform={`translate(${C} ${C})`} fill="url(#zw-sun)" stroke="none" fillOpacity="0.85">
            {blades}
          </g>
        </svg>
      </div>
    </div>
  );
}
