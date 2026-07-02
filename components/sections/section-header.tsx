import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/reveal';

interface SectionHeaderProps {
  badge: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}

/**
 * Centered eyebrow pill + serif heading + subtitle — the section-header
 * pattern used across the site, matching the reference layout.
 */
export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  const headingColor = tone === 'dark' ? 'text-[var(--color-cream)]' : 'text-[var(--color-ink)]';
  const subColor =
    tone === 'dark' ? 'text-[var(--color-cream)]/70' : 'text-[var(--color-muted)]';

  return (
    <Reveal className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className={`badge-pill ${isCenter ? 'mx-auto' : ''}`}>
        <span aria-hidden="true">✦</span>
        {badge}
      </span>
      <h2 className={`mt-5 ${headingColor}`}>{title}</h2>
      {subtitle ? <p className={`mt-5 ${subColor}`}>{subtitle}</p> : null}
    </Reveal>
  );
}
