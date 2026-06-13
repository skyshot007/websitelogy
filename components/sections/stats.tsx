'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { STATS } from '@/content/stats';
import { YantraDivider } from '@/components/brand/glyphs';

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section ref={ref} className="surface-midnight section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--color-gold)]/8 blur-3xl" />
      </div>
      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center text-[var(--color-cream)]">
          <p className="eyebrow">A practice with a long arc</p>
          <h2 className="mt-4 text-[var(--color-cream)]">
            Built on trust,{' '}
            <span className="display-italic text-[var(--color-gold-soft)]">
              tested by time.
            </span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-x-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <Counter
                target={stat.value}
                inView={inView}
                suffix={stat.suffix}
                delay={i * 0.12}
              />
              <p className="mt-3 font-display text-sm tracking-wider uppercase text-[var(--color-gold-soft)]">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-[var(--color-cream)]/55">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <YantraDivider className="mt-20 opacity-60" />
      </div>
    </section>
  );
}

function Counter({
  target,
  inView,
  suffix,
  delay,
}: {
  target: number;
  inView: boolean;
  suffix: string;
  delay: number;
}) {
  const shouldReduce = useReducedMotion();
  const [value, setValue] = useState(shouldReduce ? target : 0);

  useEffect(() => {
    if (!inView || shouldReduce) return;
    let start: number | null = null;
    const duration = 1600;
    const initialDelay = delay * 1000;
    let frame: number;

    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start - initialDelay;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, delay, shouldReduce]);

  return (
    <p className="font-display text-5xl md:text-6xl text-[var(--color-cream)]">
      <span className="tabular-nums">{value.toLocaleString()}</span>
      <span className="text-[var(--color-gold)]">{suffix}</span>
    </p>
  );
}
