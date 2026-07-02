import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SectionHeader } from './section-header';
import { PILLARS } from '@/content/pillars';

export function WhyChooseUs() {
  return (
    <section className="surface-parchment section-pad">
      <div className="container-page">
        <SectionHeader
          badge="Why Choose Us"
          title={
            <>
              Held by a person,{' '}
              <span className="display-italic text-[var(--color-gold)]">never an algorithm</span>
            </>
          }
          subtitle="Real guidance, rooted in your chart and delivered with honesty — here is what sets the practice apart."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PILLARS.map((pillar) => {
            const Glyph = pillar.glyph;
            return (
              <RevealItem key={pillar.title}>
                <article className="group flex h-full gap-5 rounded-3xl border border-[var(--color-gold)]/15 bg-[var(--color-ivory)] p-7 shadow-[0_10px_40px_-24px_rgba(64,20,7,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)]/45 hover:shadow-[0_22px_50px_-20px_rgba(245,130,10,0.4)] md:p-8">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-gold text-[var(--color-midnight)] shadow-gold">
                    <Glyph className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-[var(--color-ink)]">{pillar.title}</h3>
                    <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
                      {pillar.description}
       