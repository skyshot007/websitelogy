import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES, getServiceBySlug } from '@/content/services';
import { ServiceJsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/motion/reveal';
import { YantraDivider } from '@/components/brand/glyphs';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { SITE } from '@/lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service not found' };

  const priceStr = `₹${service.priceInr.toLocaleString('en-IN')}`;
  const durationStr = service.durationMin ? ` · ${service.durationMin}-min session` : '';

  return {
    title: `${service.name} — Vedic Astrology`,
    description: `${service.tagline} ${priceStr}${durationStr}. By Anil Joshi — classical Jyotish practitioner.`,
    alternates: { canonical: `${SITE.url}/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — Anil Astro`,
      description: `${service.tagline} ${priceStr}${durationStr}.`,
      url: `${SITE.url}/services/${service.slug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: service.name }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Glyph = service.glyph;

  return (
    <>
      <ServiceJsonLd service={service} />
      <section className="surface-ivory pt-36 pb-20">
        <div className="container-page">
          <div className="grid items-start gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <Link
                href="/services"
                className="text-xs tracking-[0.22em] uppercase text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              >
                &larr; All services
              </Link>
              <p className="eyebrow mt-8">{service.eyebrow}</p>
              <h1 className="mt-4 text-[var(--color-ink)]">{service.name}</h1>
              <p className="display-italic mt-6 max-w-2xl text-2xl leading-relaxed text-[var(--color-midnight)]">
                {service.tagline}
              </p>
              <p className="mt-6 max-w-2xl text-[var(--color-muted)] leading-relaxed">
                {service.description}
              </p>

              <YantraDivider className="my-12 opacity-50" />

              <h2 className="text-[var(--color-ink)]">What&rsquo;s included</h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[var(--color-ink)]/80"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-gold)]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[15px] leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:sticky lg:top-32">
              <div className="rounded-3xl border border-[var(--color-ink)]/10 bg-[var(--color-parchment)] p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-ivory)] text-[var(--color-gold)]">
                    <Glyph className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-[var(--color-muted)]">
                      Starting at
                    </p>
                    <p className="font-display text-3xl text-[var(--color-ink)]">
                      &#8377; {service.priceInr.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <dl className="mt-6 space-y-3 text-sm">
                  {service.durationMin ? (
                    <div className="flex justify-between border-t border-[var(--color-ink)]/10 pt-3">
                      <dt className="text-[var(--color-muted)]">Duration</dt>
                      <dd className="text-[var(--color-ink)]">{service.durationMin} minutes</dd>
                    </div>
                  ) : null}
                  <div className="flex justify-between border-t border-[var(--color-ink)]/10 pt-3">
                    <dt className="text-[var(--color-muted)]">Format</dt>
                    <dd className="text-[var(--color-ink)]">
                      {service.durationMin ? 'Private video session' : 'Delivered to you'}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-[var(--color-ink)]/10 pt-3">
                    <dt className="text-[var(--color-muted)]">Languages</dt>
                    <dd className="text-[var(--color-ink)]">English, Hindi</dd>
                  </div>
                </dl>

                <Button asChild variant="primary" size="md" className="mt-8 w-full">
                  <Link href={`/book?service=${service.slug}`}>
                    Book this session
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <p className="mt-4 text-center text-xs text-[var(--color-muted)]">
                  Or write to us first if you&rsquo;re unsure which fits.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
