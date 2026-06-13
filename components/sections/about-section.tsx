import Link from 'next/link';
import { Reveal } from '@/components/motion/reveal';
import { YantraGlyph } from '@/components/brand/glyphs';
import { ArrowRight } from 'lucide-react';
import { SITE } from '@/lib/utils';

export function AboutSection() {
  return (
    <section className="surface-parchment section-pad">
      <div className="container-page">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full border border-[var(--color-gold)]/40" />
              <div className="absolute inset-4 rounded-full border border-[var(--color-gold)]/25" />
              <div className="absolute inset-10 rounded-full border border-[var(--color-gold)]/15" />
              <div className="absolute inset-0 flex items-center justify-center">
                <YantraGlyph className="h-24 w-24 text-[var(--color-gold)]/80" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-ivory)] px-4 py-1.5 text-[10px] tracking-[0.22em] uppercase text-[var(--color-muted)] shadow-sm">
                Trained in the Parashari tradition
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow">Meet the astrologer</p>
            <h2 className="mt-4 text-[var(--color-ink)]">
              {SITE.name}
              <span className="display-italic block text-[var(--color-midnight)]">
                read with honesty, held with care.
              </span>
            </h2>
            <div className="mt-8 space-y-5 text-[var(--color-muted)]">
              <p>
                For over two decades I have sat with people at quiet turning points — a job
                decision that won&rsquo;t settle, a marriage being weighed, a parent ageing, a
                question that arrives at 3 a.m. and refuses to leave by morning.
              </p>
              <p>
                My practice is rooted in classical Vedic Jyotish but spoken in plain language.
                The chart is a mirror, not a verdict. Each consultation begins by listening,
                ends with practical clarity, and is followed by gentle, continuing support.
              </p>
              <blockquote className="display-italic border-l-2 border-[var(--color-gold)] pl-5 text-[var(--color-ink)] text-lg leading-relaxed">
                &ldquo;The chart shows the season; you choose how to plant.&rdquo;
              </blockquote>
            </div>
            <div className="mt-10">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-[15px] text-[var(--color-ink)]"
              >
                <span className="gold-underline gold-underline-hover">Read the full story</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
