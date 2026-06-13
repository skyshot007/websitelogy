import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/reveal';
import { YantraDivider } from '@/components/brand/glyphs';
import { CtaBand } from '@/components/sections/cta-band';
import { SITE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Anil Joshi — Vedic Astrologer',
  description:
    'Meet Anil Joshi — a Vedic astrologer with 22 years of classical Parashari Jyotish practice. Trained in Varanasi and Bengaluru. Honest readings, no fear, no theatre.',
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: 'About Anil Joshi — Vedic Astrologer',
    description:
      'Meet Anil Joshi — 22 years of classical Parashari Jyotish. Trained in Varanasi and Bengaluru. Bilingual sessions in English and Hindi.',
    url: `${SITE.url}/about`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'About Anil Astro' }],
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="surface-ivory pt-36 pb-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">A short introduction</p>
            <h1 className="mt-6 text-[var(--color-ink)]">
              Astrology read with honesty,
              <span className="display-italic block text-[var(--color-midnight)]">
                held with care.
              </span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-[var(--color-muted)]">
              {SITE.name} has spent twenty-two years sitting with people at quiet turning
              points. The work is rooted in classical Parashari Jyotish and spoken in plain
              language. No fear, no theatre. The chart is a mirror, and you remain the author.
            </p>
          </Reveal>

          <YantraDivider className="mt-16 opacity-60" />

          <Reveal className="mx-auto mt-16 max-w-3xl space-y-6 text-[var(--color-muted)]">
            <h2 className="text-[var(--color-ink)]">The practice</h2>
            <p>
              Trained under traditional teachers in Varanasi and Bengaluru, the practice
              combines classical Vedic methodology with a contemporary therapeutic sensibility.
              Each chart is read by hand. Software is used for calculation, never for
              interpretation — because the meaning of a chart is found in the room, not in
              the report.
            </p>
            <p>
              Most sessions begin with a small ritual: a moment of quiet, an intention spoken
              out loud, then the chart opened together. The aim is to leave with one or two
              clear next steps — not with a printout of fate.
            </p>

            <h2 className="mt-12 text-[var(--color-ink)]">What you can expect</h2>
            <ul className="space-y-3">
              <li>A bilingual session in English or Hindi, conducted over secure video.</li>
              <li>
                A short written follow-up, with the key points of the reading and your
                personalised remedies.
              </li>
              <li>
                Continued chat support for the questions that arrive after the session
                ends — because clarity often unfolds slowly.
              </li>
              <li>Complete confidentiality, always.</li>
            </ul>

            <h2 className="mt-12 text-[var(--color-ink)]">A note on remedies</h2>
            <p>
              Remedies prescribed here are simple, dignified, and proportionate. Mantras,
              charity, small disciplines aligned to your chart. Gemstones are recommended only
              when a planet meaningfully needs strengthening, never as a sales pitch. If a
              remedy ever feels expensive or coercive, it is not coming from this practice.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
