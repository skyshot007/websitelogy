import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SERVICES } from '@/content/services';

export function ServicesSection() {
  return (
    <section id="services" className="surface-ivory section-pad">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Our practice</p>
          <h2 className="mt-4 text-[var(--color-ink)]">
            Six paths,{' '}
            <span className="display-italic text-[var(--color-midnight)]">one intention</span>
          </h2>
          <p className="mt-6 text-[var(--color-muted)]">
            Choose the conversation that fits where you are. Each service is held personally,
            with the same care, regardless of the door you walk through.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--color-ink)]/8 bg-[var(--color-ink)]/8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Glyph = service.glyph;
            return (
              <RevealItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group surface-ivory relative flex h-full flex-col gap-6 p-8 transition-all duration-500 hover:bg-[var(--color-parchment)] md:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-ivory)] text-[var(--color-gold)] transition-colors group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-ivory)]">
                      <Glyph className="h-7 w-7" />
                    </div>
                    <span className="text-[10px] tracking-[0.22em] uppercase text-[var(--color-muted)]">
                      {service.eyebrow}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[var(--color-ink)]">{service.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
                      {service.tagline}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--color-ink)]/8 pt-5">
                    <span className="text-xs tracking-[0.16em] uppercase text-[var(--color-muted)]">
                      {service.durationMin
                        ? `${service.durationMin} min`
                        : 'Delivered to you'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-gold)]">
                      Explore
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
