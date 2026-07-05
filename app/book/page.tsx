import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/reveal';
import { YantraDivider, LotusGlyph } from '@/components/brand/glyphs';
import { BookingFormShell } from '@/components/sections/booking-form-shell';
import { SITE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Book a Vedic Astrology Consultation',
  description:
    'Reserve a private Vedic astrology consultation with Anil Joshi. Share your birth date, time, and place — get clarity on life, career, relationships, or any turning point.',
  alternates: { canonical: `${SITE.url}/book` },
  openGraph: {
    title: 'Book a Vedic Astrology Consultation',
    description:
      'Reserve your private session with Anil Joshi. Honest, chart-rooted guidance for the question that won\'t leave you.',
    url: `${SITE.url}/book`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Book Astro Anil Joshi' }],
  },
};

export default function BookPage() {
  return (
    <section className="surface-ivory pt-36 pb-24">
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Reserve your hour</p>
            <h1 className="mt-6 text-[var(--color-ink)]">
              Begin with a quiet
              <span className="display-italic block text-[var(--color-midnight)]">
                conversation.
              </span>
            </h1>
            <p className="mt-8 text-[var(--color-muted)] leading-relaxed">
              Share what you can, in your own words. We&rsquo;ll write back within a working
              day with an available slot and a brief intake form so the session starts where
              you actually need it to.
            </p>

            <YantraDivider className="my-10 opacity-50" />

            <div className="space-y-6 text-[var(--color-muted)]">
              <Detail label="Format" value="Private video over Google Meet or Zoom" />
              <Detail label="Languages" value="English / Hindi" />
              <Detail label="Confidentiality" value="Always honoured, never shared" />
              <Detail label="Or write directly" value={SITE.email} link={`mailto:${SITE.email}`} />
            </div>

            <div className="mt-12 flex items-center gap-4 rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-parchment)]/40 p-5">
              <LotusGlyph className="h-8 w-8 shrink-0 text-[var(--color-gold)]" />
              <p className="text-sm text-[var(--color-muted)]">
                If you don&rsquo;t know your exact birth time, share the closest possible
                window — we can refine it during the session.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <BookingFormShell />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-[var(--color-ink)]/10 pb-4">
      <dt className="text-xs tracking-[0.18em] uppercase text-[var(--color-muted)]">{label}</dt>
      <dd className="text-right text-[var(--color-ink)]">
        {link ? (
          <a href={link} className="hover:text-[var(--color-gold)]">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
