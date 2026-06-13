import Link from 'next/link';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { ArrowUpRight } from 'lucide-react';

interface JournalPreview {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMin: number;
}

const SAMPLE_POSTS: JournalPreview[] = [
  {
    slug: 'reading-saturn-with-kindness',
    title: 'Reading Saturn with kindness',
    excerpt:
      'Saturn is feared and misread. A gentler way to see the long teacher of the chart, and how to work with its lessons instead of against them.',
    category: 'Practice',
    readMin: 6,
  },
  {
    slug: 'what-a-good-muhurat-actually-does',
    title: 'What a good muhurat actually does',
    excerpt:
      'Muhurat is not magic. It\u2019s the practice of starting things with awareness. A short note on choosing time well \u2014 for weddings, surgeries, and Sundays.',
    category: 'Essay',
    readMin: 4,
  },
  {
    slug: 'three-questions-before-a-reading',
    title: 'Three questions to sit with before a reading',
    excerpt:
      'Before you bring your chart to anyone, including me, three quiet questions worth holding. They sharpen what the session can do for you.',
    category: 'Guidance',
    readMin: 3,
  },
];

export function JournalTeaser() {
  return (
    <section className="surface-ivory section-pad">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">From the journal</p>
            <h2 className="mt-4 text-[var(--color-ink)]">
              Slow reading,{' '}
              <span className="display-italic text-[var(--color-midnight)]">honest writing.</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-[var(--color-ink)]"
          >
            <span className="gold-underline gold-underline-hover">All entries</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SAMPLE_POSTS.map((post) => (
            <RevealItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-[var(--color-ink)]/10 p-8 transition-all duration-500 hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-parchment)]/50"
              >
                <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[var(--color-muted)]">
                  <span className="text-[var(--color-gold)]">{post.category}</span>
                  <span>{post.readMin} min read</span>
                </div>
                <h3 className="text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-midnight)]">
                  {post.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--color-muted)]">
                  {post.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-[var(--color-ink)]">
                  Read
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
