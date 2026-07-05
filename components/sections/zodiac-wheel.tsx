/**
 * Decorative zodiac wheel for hero backdrops, modelled on the reference art:
 * geometric frame, a ring of curved zodiac names, a ring of glyphs, and a
 * swirling sun at the centre. Slow CSS rotation; reusable across hero sections.
 */
export function ZodiacWheel({ className }: { className?: string }) {
  const C = 200;
  const rad = (d: number) => (d * Math.PI) / 180;
  const P = (r: number, deg: number): [number, number] => [
    C + r * Math.cos(rad(deg)),
    C + r * Math.sin(rad(deg)),
  ];

  // Taurus sits at top (matching the reference), signs run clockwise.
  const names = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
  ];
  const glyphs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  const angleOf = (k: number) => (k - 1) * 30 - 90;

  // Outer geometric frame: dodecagon + {12/5} star polygram.
  const verts = Array.from({ length: 12 }, (_, k) => P(196, k * 30 - 90));
  const dodeca = verts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const star =
    [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7]
      .map((k, i) => `${i === 0 ? 'M' : 'L'}${verts[k][0].toFixed(1)} ${verts[k][1].toFixed(1)}`)
      .join(' ') + ' Z';

  // Per-segment arcs for curved names.
  const nameArcs = names.map((n, k) => {
    const a = angleOf(k);
    const [sx, sy] = P(163, a - 15);
    const [ex, ey] = P(163, a + 15);
    return {
      id: `zw-arc-${k}`,
      n: n.toUpperCase(),
      d: `M ${sx.toFixed(1)} ${sy.toFixed(1)} A 163 163 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`,
    };
  });

  const dividers = Array.from({ length: 12 }, (_, k) => {
    const a = angleOf(k) - 15;
    const [x1, y1] = P(116, a);
    const [x2, y2] = P(178, a);
    return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  const glyphEls = glyphs.map((g, k) => {
    const [x, y] = P(132, angleOf(k));
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
            <radialGradient id="zw-sun" cx="50%" cy="45%" r="58%">
              <stop offset="0%" stopColor="var(--color-gold-soft)" />
              <stop offset="100%" stopColor="var(--color-gold)" />
            </radialGradient>
            {nameArcs.map((a) => (
              <path key={a.id} id={a.id} d={a.d} fill="none" />
            ))}
          </defs>

          <g fill="none" stroke="var(--color-gold)">
            <polygon points={dodeca} strokeOpacity="0.4" strokeWidth="1" />
            <path d={star} strokeOpacity="0.26" strokeWidth="1" />
            <circle cx={C} cy={C} r="178" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx={C} cy={C} r="150" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx={C} cy={C} r="116" strokeOpacity="0.4" strokeWidth="1" />
            <g strokeOpacity="0.3" strokeWidth="1">{dividers}</g>
          </g>

          <g fill="var(--color-gold)" fillOpacity="0.9" stroke="none" fontFamily="var(--font-display)" letterSpacing="1">
            {nameArcs.map((a) => (
              <text key={a.id} fontSize="10" textAnchor="middle">
                <textPath href={`#${a.id}`} startOffset="50%">
                  {a.n}
                </textPath>
              </text>
            ))}
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
