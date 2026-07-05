import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFlag } from '@/lib/flags';
import { JournalTeaser } from '@/components/sections/journal-teaser';
import { Reveal } from '@/components/motion/reveal';
import { SITE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Journal — Vedic Astrology Insights',
  description:
    'Thoughtful writing on Vedic astrology, Jyotish practice, Dasha cycles, and the quiet disciplines that bring clarity. Updated regularly by Anil Joshi.',
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: 'Journal — Vedic Astrology Insights by Anil Joshi',
    description:
      'Slow reading on Vedic astrology, Jyotish practice, and the small disciplines of clarity.',
    url: `${SITE.url}/blog`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Astro Anil Joshi Journal' }],
  },
};

export default function BlogPage() {
  if (!getFlag('marketing.blog')) notFound();

  return (
    <>
      <section className="surface-ivory pt-36 pb-12">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">The journal</p>
            <h1 className="mt-6 text-[var(--color-ink)]">
              Slow reading,
              <span className="display-italic block text-[var(--color-midnight)]">
                honest writing.
              </span>
            </h1>
            <p className="mt-8 text-[var(--color-muted)]">
              Short essays on practice, transits, and the small disciplines of clarity. Updated
              when there is something worth saying.
            </p>
          </Reveal>
        </div>
      </section>
      <JournalTeaser />
    </>
  );
}
