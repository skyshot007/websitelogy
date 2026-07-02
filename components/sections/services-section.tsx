import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SectionHeader } from './section-header';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/content/services';

export function ServicesSection() {
  return (
    <section id="services" className="surface-parchment section-pad">
      <div className="container-page">
        <SectionHeader
          badge="Our Services"
          title={
            <>
              Choose the path that{' '}
              <span className="display-italic text-[var(--color-gold)]">fits your journey</span>
            </>
          }
          subtitle="Every service is held personally, with the same care — pick the door that matches where you are."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Glyph = service.glyph;
            const meta = service.durationMin
              ? `${service.durationMin} min session`
              : 'Delivered to you';
            return (
              <RevealItem key={service.slug}>
                <div className="group relative flex h-full flex-col rounded-3xl border border-[var(--color-gold)]/15 bg-[var(--color-ivory)] p-7 shadow-[0_10px_40px_-24px_rgba(64,20,7,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)]/45 hover:shadow-[0_22px_50px_-20px_rgba(245,130,10,0.4)]">
                  <span className="badge-pill absolute right-5 top-5">{service.eyebrow}</span>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold text-[var(--color-midnight)] shadow-gold">
                    <Glyph className="h-8 w-8" />
                  </div>

                  <h3 className="mt-6 text-[var(--color-ink)]">{service.name}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {service.tagline}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[var(--color-gold)]/15 pt-5">
                    <span className="text-[11px] tracking-[0.14em] uppercase text-[var(--color-muted)]">
                      {meta}
                    </span>
                    <Button asChild variant="gold" size="sm">
                      <Link href={`/services/${service.slug}`}>
                        Explore
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
