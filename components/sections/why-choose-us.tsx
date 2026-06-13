import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { PILLARS } from '@/content/pillars';

export function WhyChooseUs() {
  return (
    <section className="surface-parchment section-pad">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What makes this different</p>
          <h2 className="mt-4 text-[var(--color-ink)]">
            Held by a person,
            <span className="display-italic block text-[var(--color-midnight)]">
              never by an algorithm.
            </span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--color-ink)]/8 bg-[var(--color-ink)]/8 sm:grid-cols-2">
          {PILLARS.map((pillar) => {
            const Glyph = pillar.glyph;
            return (
              <RevealItem key={pillar.title}>
                <article className="surface-ivory flex h-full gap-6 p-8 md:p-10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-gold)]">
                    <Glyph className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-[var(--color-ink)]">{pillar.title}</h3>
                    <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
