export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'I came in confused about a career move and left with a quiet clarity I hadn\u2019t felt in months. The reading wasn\u2019t mystical \u2014 it was practical, warm, and specific.',
    author: 'Aditi R.',
    context: 'Bengaluru \u00b7 Career consultation',
  },
  {
    quote:
      'Anil ji read our charts together with such honesty. He named the friction in our marriage we had stopped speaking about. We left lighter, and closer.',
    author: 'Karan & Sneha',
    context: 'Mumbai \u00b7 Couple compatibility',
  },
  {
    quote:
      'The remedies he suggested were small, gentle, and easy to fit into my day. Six months in, the difference in how I show up at work is real.',
    author: 'Rohit S.',
    context: 'Delhi NCR \u00b7 Remedies plan',
  },
  {
    quote:
      'Years of going to astrologers who told me what I wanted to hear. This was the first reading where I felt seen, and challenged with kindness.',
    author: 'Meera J.',
    context: 'London \u00b7 Premium kundli',
  },
];
