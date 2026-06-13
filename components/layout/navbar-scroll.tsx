'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Wraps the navbar so it can react to scroll position. Adds a translucent
 * frosted background once the user has scrolled past the hero.
 */
export function NavbarScroll({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        scrolled
          ? 'bg-[var(--color-ivory)]/92 border-b border-[var(--color-ink)]/8 shadow-[0_8px_24px_-20px_rgba(11,20,55,0.25)]'
          : 'bg-[var(--color-ivory)]/70',
      )}
    >
      {children}
    </header>
  );
}
