import type { ComponentType, SVGProps } from 'react';
import {
  ChatGlyph,
  HandsGlyph,
  LotusGlyph,
  MoonGlyph,
  ScrollGlyph,
  StarGlyph,
} from '@/components/brand/glyphs';

export interface Service {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  bullets: string[];
  durationMin: number;
  priceInr: number;
  glyph: ComponentType<SVGProps<SVGSVGElement>>;
}

export const SERVICES: Service[] = [
  {
    slug: 'one-on-one-consultation',
    name: 'One-on-One Consultation',
    eyebrow: 'Most personal',
    tagline: 'A private hour for the question that won\u2019t leave you.',
    description:
      'A focused conversation rooted in your birth chart. We sit with the patterns shaping your present, what\u2019s being asked of you, and the steps that bring real movement.',
    bullets: [
      'Detailed Vedic birth-chart reading',
      'Current Dasha and transit insight',
      'Practical guidance you can act on this week',
      'Confidential, judgement-free space',
    ],
    durationMin: 60,
    priceInr: 4500,
    glyph: ChatGlyph,
  },
  {
    slug: 'premium-kundli',
    name: 'Premium Personalised Kundli',
    eyebrow: 'Foundational',
    tagline: 'Your life on paper, prepared with hand and heart.',
    description:
      'A hand-prepared Janma Kundli with annotated planetary positions, yogas, Mahadasha timeline, and remedies. Yours to keep and revisit.',
    bullets: [
      'Full Vedic birth chart (Lagna, Navamsa, divisional)',
      'Mahadasha & Antardasha timeline',
      'Yogas, doshas, key transits',
      'Custom remedy guide',
    ],
    durationMin: 0,
    priceInr: 3500,
    glyph: ScrollGlyph,
  },
  {
    slug: 'couple-compatibility',
    name: 'Couple Compatibility',
    eyebrow: 'For two',
    tagline: 'Understand the chemistry, the friction, the long arc.',
    description:
      'Honest matchmaking that goes beyond Guna Milan. Compatibility across emotional, mental, and life-stage layers, with what to nurture and what to watch.',
    bullets: [
      'Detailed Ashtakoot + deep dive analysis',
      'Long-term harmony forecast',
      'Communication patterns & remedies',
      'Joint or solo session',
    ],
    durationMin: 75,
    priceInr: 6000,
    glyph: HandsGlyph,
  },
  {
    slug: 'online-puja',
    name: 'Sankalp Online Puja',
    eyebrow: 'Sacred',
    tagline: 'Ritual performed in your name, with your intention.',
    description:
      'Personalised pujas conducted on auspicious muhurat by trained pandits. You receive video, sankalp details, and prasad delivered to your door.',
    bullets: [
      'Muhurat-aligned ritual',
      'Live or recorded video',
      'Sankalp with your name & gotra',
      'Blessed prasad shipped to you',
    ],
    durationMin: 0,
    priceInr: 2100,
    glyph: LotusGlyph,
  },
  {
    slug: 'remedies-gemstones',
    name: 'Remedies & Gemstone Guidance',
    eyebrow: 'Continuous',
    tagline: 'Practical remedies tuned to your chart, not generic lists.',
    description:
      'Daily rituals, mantras, charity, and gemstone choices selected for your planetary balance. Real, sustainable practice that fits your life.',
    bullets: [
      'Personal remedy plan',
      'Gemstone & rudraksha selection',
      'Mantra & charity guidance',
      'Quarterly check-in',
    ],
    durationMin: 45,
    priceInr: 2500,
    glyph: StarGlyph,
  },
  {
    slug: 'horoscope-courses',
    name: 'Learn Vedic Astrology',
    eyebrow: 'For seekers',
    tagline: 'Read your own chart. Read others, with integrity.',
    description:
      'Cohort-based courses for beginners and serious students. Foundational Jyotish, Dasha systems, predictive technique, and ethical practice.',
    bullets: [
      'Live cohort sessions',
      'Lifetime recording access',
      'Practice charts & feedback',
      'Certificate of completion',
    ],
    durationMin: 0,
    priceInr: 12000,
    glyph: MoonGlyph,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
