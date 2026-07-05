/**
 * Decorative, slowly-rotating zodiac wheel for hero backdrops.
 * Reusable across every hero section. Pure SVG (gold via currentColor token),
 * rotation via CSS; honours prefers-reduced-motion through globals.
 */
export function ZodiacWheel({ className }: { className?: string }) {
  const C = 200;
  const signs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  const rad = (d: number) => (d * Math.PI) / 180;
  const pt = (r: number, deg: number): [number, number] => [
    C + r * Math.cos(rad(deg)),
    C + r * Math.sin(rad(deg)),
  ];

  const spokes = Array.from({ length: 12 }, (_, i) => {
    const a = i * 30 - 90;
    const [x1, y1] = pt(150, a);
    const [x2, y2] = pt(176, a);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  const ticks = Array.from({ length: 48 }, (_, i) => {
    const a = i * 7.5 - 90;
    const [x1, y1] = pt(i % 4 === 0 ? 183 : 190, a);
    const [x2, y2] = pt(196, a);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  const glyphs = signs.map((s, i) => {
    const a = i * 30 - 90 + 15;
    const [x, y] = pt(163, a);
    return (
      <text
        key={i}
        x={x}
        y={y}
        transform={`rotate(${a + 90} ${x} ${y})`}
        textAnchor="middle"
        style={{ dominantBaseline: 'central' }}
      >
        {s}
      </text>
    );
  });

  const starPts = Array.from({ length: 12 }, (_, i) => [pt(118, i * 30), pt(95, i * 30 + 15)])
    .flat()
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');

  return (
    <div className={className} aria-hidden="true">
      <div className="h-full w-full origin-center animate-spin-slow">
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none" stroke="var(--color-gold)">
          <g strokeOpacity="0.3" strokeWidth="1">
            <circle cx={C} cy={C} r="198" />
            <circle cx={C} cy={C} r="176" />
            <circle cx={C} cy={C} r="150" />
            <circle cx={C} cy={C} r="120" />
            <circle cx={C} cy={C} r="9" />
          </g>
          <g strokeOpacity="0.4" strokeWidth="1">{ticks}</g>
          <g strokeOpacity="0.32" strokeWidth="1">{spokes}</g>
          <polygon points={starPts} strokeOpacity="0.24" strokeWidth="1" />
          <g fill="var(--color-gold)" fillOpacity="0.55" stroke="none" fontSize="19">
            {glyphs}
          </g>
        </svg>
      </div>
    </div>
  );
}
