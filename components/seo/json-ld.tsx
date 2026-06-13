/**
 * JSON-LD structured data components for SEO rich results.
 *
 * Usage:
 *   import { SiteJsonLd } from '@/components/seo/json-ld';
 *   // In a Server Component or layout:
 *   <SiteJsonLd />
 *
 *   import { ServiceJsonLd } from '@/components/seo/json-ld';
 *   // On a service detail page:
 *   <ServiceJsonLd service={service} />
 */

import { SITE } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Generic script wrapper
// ---------------------------------------------------------------------------

function JsonLdScript({ id, data }: { id: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD only
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Site-wide: Person + ProfessionalService
// ---------------------------------------------------------------------------

export function SiteJsonLd() {
  const base = SITE.url.replace(/\/$/, '');

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${base}/#person`,
        name: 'Anil Joshi',
        jobTitle: 'Vedic Astrologer',
        description:
          'Classical Parashari Jyotish practitioner with over 22 years of experience. Trained in Varanasi and Bengaluru.',
        url: base,
        knowsAbout: [
          'Vedic Astrology',
          'Jyotish',
          'Kundli',
          'Birth Chart Reading',
          'Dasha System',
          'Remedies',
          'Puja',
        ],
        knowsLanguage: ['English', 'Hindi'],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${base}/#business`,
        name: SITE.name,
        url: base,
        description: SITE.description,
        founder: { '@id': `${base}/#person` },
        employee: { '@id': `${base}/#person` },
        serviceType: 'Vedic Astrology',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Hindi'],
        priceRange: '₹₹',
        email: SITE.email,
        telephone: SITE.phone,
        image: `${base}/opengraph-image`,
        sameAs: [],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Astrology Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'One-on-One Consultation',
                url: `${base}/services/one-on-one-consultation`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Premium Personalised Kundli',
                url: `${base}/services/premium-kundli`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Couple Compatibility',
                url: `${base}/services/couple-compatibility`,
              },
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: base,
        name: SITE.name,
        description: SITE.description,
        publisher: { '@id': `${base}/#business` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${base}/services?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return <JsonLdScript id="json-ld-site" data={data} />;
}

// ---------------------------------------------------------------------------
// Per-service page: Service schema
// ---------------------------------------------------------------------------

interface ServiceData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  durationMin: number;
  priceInr: number;
}

export function ServiceJsonLd({ service }: { service: ServiceData }) {
  const base = SITE.url.replace(/\/$/, '');

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${base}/services/${service.slug}/#service`,
    name: service.name,
    description: service.description,
    slogan: service.tagline,
    provider: { '@id': `${base}/#business` },
    url: `${base}/services/${service.slug}`,
    serviceOutput: service.bullets,
    ...(service.durationMin > 0 && {
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        description: `Session duration: ${service.durationMin} minutes`,
      },
    }),
    offers: {
      '@type': 'Offer',
      price: service.priceInr,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${base}/book`,
    },
  };

  return <JsonLdScript id={`json-ld-service-${service.slug}`} data={data} />;
}

// ---------------------------------------------------------------------------
// FAQ page schema (reusable for any page with an FAQ section)
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <JsonLdScript id="json-ld-faq" data={data} />;
}
