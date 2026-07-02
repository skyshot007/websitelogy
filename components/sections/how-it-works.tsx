import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SectionHeader } from './section-header';
import { HOW_IT_WORKS } from '@/content/how-it-works';

export function HowItWorks() {
  return (
    <section className="surface-ivory section-pad">
      <div className="container-page">
        <SectionHeader
          badge="A Gentle Process"
          title={
            <>
              How a consultation{' '}
              <span className="display-italic text-[var(--color-gold)]">actually unfolds</span>
            </>
          }
          subtitle="Simple, unhurried, and centred on you — here is what to expect from start to finish."
        />

        <div className="relative mt-16">
          <span className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent md:block" />
          <RevealGroup className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {HOW_IT_WORKS.map((step) => (
              <RevealItem key={step.number} className="relative text-center md:text-left">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold font-display text-2xl text-[var(--color-midnight)] shadow-gold md:mx-0">
                  {step.number}
                </div>
                <h3 className="mt-6 text-[var(--color-ink)]">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
                  {step.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      