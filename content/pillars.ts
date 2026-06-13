import type { ComponentType, SVGProps } from 'react';
import { HandsGlyph, LotusGlyph, ScrollGlyph, StarGlyph } from '@/components/brand/glyphs';

export interface Pillar {
  title: string;
  description: string;
  glyph: ComponentType<SVGProps<SVGSVGElement>>;
}

export const PILLARS: Pillar[] = [
  {
    title: 'Authentic Vedic Lineage',
    description:
      'Trained in classical Jyotish under traditional teachers, with modern interpretive clarity. No shortcuts, no astrologer-by-app.',
    glyph: ScrollGlyph,
  },
  {
    title: 'Personalised, not Generic',
    description:
      'Every reading is held by hand. Your chart, your moment, your question \u2014 not a template printed from software.',
    glyph: LotusGlyph,
  },
  {
    title: 'Confidential, Always',
    description:
      'What you share stays between us. Sessions are private, notes are never sold, and your details belong to you.',
    glyph: HandsGlyph,
  },
  {
    title: 'Continuous Companionship',
    description:
      'A reading is rarely the end. Follow-up support, check-ins through chat, and gentle course-corrections are part of the work.',
    glyph: StarGlyph,
  },
];
