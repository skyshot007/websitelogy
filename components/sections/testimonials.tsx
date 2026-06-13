'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/content/testimonials';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const shouldReduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (shouldReduce) return;
    timer.current = setInterval(() => advance(1), 7000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [shouldReduce]);

  const t = TESTIMONIALS[index];

  return (
    <section className="surface-ivory section-pad">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">In their own words</p>
          <h2 className="mt-4 text-[var(--color-ink)]">
            Quiet shifts,{' '}
            <span className="display-italic text-[var(--color-midnight)]">honestly named.</span>
          </h2>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <Quote
            className="absolute -top-6 -left-2 h-12 w-12 text-[var(--color-gold)]/30 md:-top-8 md:-left-8"
            strokeWidth={1.2}
          />
          <div className="relative min-h-[16rem] overflow-hidden">
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.figure
                key={index}
                custom={direction}
                initial={
                  shouldReduce ? { opacity: 0 } : { opacity: 0, x: direction * 24 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  shouldReduce ? { opacity: 0 } : { opacity: 0, x: direction * -24 }
                }
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-8 text-center"
              >
                <blockquote className="display-italic text-2xl leading-relaxed text-[var(--color-ink)] md:text-3xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-medium text-[var(--color-ink)]">{t.author}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{t.context}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => advance(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-ink)]/15 text-[var(--color-ink)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-500',
                    i === index
                      ? 'w-8 bg-[var(--color-gold)]'
                      : 'w-1.5 bg-[var(--color-ink)]/20 hover:bg-[var(--color-ink)]/40',
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => advance(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-ink)]/15 text-[var(--color-ink)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
