import type { Metadata } from 'next';
import { ServicesSection } from '@/components/sections/services-section';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/sections/cta-band';
import { SITE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Vedic Astrology Services — Consultations, Kundli & More',
  description:
    'Explore all services: private Vedic consultations, hand-prepared Kundli, couple compatibility (Ashtakoot), online pujas, remedies & gemstone guidance, and astrology courses. Transparent pricing.',
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: 'Vedic Astrology Services — Consultations, Kundli & More',
    description:
      'Private consultations, hand-prepared Kundli, couple compatibility, online pujas, gemstone guidance, and astrology courses by Anil Joshi.',
    url: `${SITE.url}/services`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Astro Anil Joshi Services' }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="surface-ivory pt-36 pb-12">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">All services</p>
            <h1 className="mt-6 text-[var(--color-ink)]">
              Different doors,
              <span className="display-italic block text-[var(--color-midnight)]">
                the same quiet room.
              </span>
            </h1>
            <p className="mt-8 text-lg text-[var(--color-muted)]">
              Pick the conversation that fits where you are. Pricing is transparent, sessions
              are unhurried, and every service is held personally.
            </p>
          </Reveal>
        </div>
      </section>
      <ServicesSection />
      <CtaBand />
    </>
  );
}
