import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/motion/reveal';
import { YantraDivider } from '@/components/brand/glyphs';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/utils';
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Anil Astro',
  description:
    'Get in touch with Anil Joshi for questions about Vedic astrology, consultations, or remedies. We always reply within a working day.',
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: 'Contact Anil Astro',
    description: 'Write to Anil Joshi for questions about astrology, consultations, or remedies. We always reply.',
    url: `${SITE.url}/contact`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Contact Anil Astro' }],
  },
};

export default function ContactPage() {
  return (
    <section className="surface-ivory pt-36 pb-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-6 text-[var(--color-ink)]">
            Write to us,
            <span className="display-italic block text-[var(--color-midnight)]">
              we always reply.
            </span>
          </h1>
          <p className="mt-8 text-[var(--color-muted)] leading-relaxed">
            For questions that don&rsquo;t need a full session, simply write. For everything
            else, book a consultation — it&rsquo;s the only way to get the chart-rooted
            answer your situation deserves.
          </p>
        </Reveal>

        <YantraDivider className="mx-auto my-16 max-w-md opacity-50" />

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--color-ink)]/10 bg-[var(--color-ink)]/8 md:grid-cols-3">
          <Channel
            icon={Mail}
            label="Email"
            primary={SITE.email}
            href={`mailto:${SITE.email}`}
            note="Replies within one working day."
          />
          <Channel
            icon={Phone}
            label="Call"
            primary={SITE.phone}
            href={`tel:${SITE.phone.replace(/\s/g, '')}`}
            note="By appointment, after booking."
          />
          <Channel
            icon={MessageCircle}
            label="Chat"
            primary="Coming soon"
            note="Continuous chat is being polished."
          />
        </div>

        <div className="mt-16 flex justify-center">
          <Button asChild variant="primary" size="lg">
            <Link href="/book">
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Channel({
  icon: Icon,
  label,
  primary,
  href,
  note,
}: {
  icon: typeof Mail;
  label: string;
  primary: string;
  href?: string;
  note: string;
}) {
  const Wrapper: React.ElementType = href ? 'a' : 'div';
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="surface-ivory group flex flex-col items-center gap-4 p-8 text-center transition-colors hover:bg-[var(--color-parchment)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-gold)]">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-muted)]">{label}</p>
        <p className="mt-2 font-display text-lg text-[var(--color-ink)]">{primary}</p>
        <p className="mt-3 text-sm text-[var(--color-muted)]">{note}</p>
      </div>
    </Wrapper>
  );
}
