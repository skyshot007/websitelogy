import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { LotusGlyph } from '@/components/brand/glyphs';

export function CtaBand() {
  return (
    <section className="surface-midnight relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--color-gold)]/12 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-[var(--color-vermillion)]/8 blur-3xl" />
      </div>

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center text-[var(--color-cream)]">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-astral)] animate-breathe">
            <LotusGlyph className="h-7 w-7 text-[var(--color-gold)]" />
          </div>

          <h2 className="mt-8 text-[var(--color-cream)]">
            One conversation
            <span className="display-italic block text-[var(--color-gold-soft)]">
              can change everything.
            </span>
          </h2>

          <p className="mt-6 text-lg text-[var(--color-cream)]/75">
            Sit with the question that won&rsquo;t let you sleep. Bring it to a private,
            unhurried session — and walk away with clarity you can act on.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Button asChild variant="gold" size="lg">
              <Link href="/book">
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link href="/contact">Ask a question first</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
