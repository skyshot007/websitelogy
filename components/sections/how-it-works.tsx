import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { HOW_IT_WORKS } from '@/content/how-it-works';

export function HowItWorks() {
  return (
    <section className="surface-ivory section-pad">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">A gentle process</p>
          <h2 className="mt-4 text-[var(--color-ink)]">
            How a consultation
            <span className="display-italic block text-[var(--color-midnight)]">
              actually unfolds.
            </span>
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <span className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent md:block" />
          <RevealGroup className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {HOW_IT_WORKS.map((step) => (
              <RevealItem key={step.number} className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-ivory)] font-display text-xl text-[var(--color-midnight)] shadow-sm">
                  {step.number}
                </div>
                <h3 className="mt-6 text-[var(--color-ink)]">{step.title}</h3>
                <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
                  {step.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
