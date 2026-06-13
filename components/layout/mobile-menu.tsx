'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Wordmark, YantraDivider } from '@/components/brand/glyphs';
import { SITE } from '@/lib/utils';
import type { NavLink } from './nav-config';

interface MobileMenuProps {
  links: NavLink[];
  showSignIn?: boolean;
}

export function MobileMenu({ links, showSignIn = false }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink)] transition hover:bg-[var(--color-ink)]/5 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex items-center justify-between">
          <Wordmark />
        </div>

        <YantraDivider className="my-2" />

        <nav className="flex flex-col gap-1" aria-label="Mobile primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-[var(--color-ink)]/90 transition-colors hover:text-[var(--color-midnight)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-[var(--color-ink)]/10 pt-6">
          {showSignIn ? (
            <Button asChild variant="outline" size="md" className="w-full">
              <Link href="/sign-in" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            </Button>
          ) : null}
          <Button asChild variant="primary" size="md" className="w-full">
            <Link href="/book" onClick={() => setOpen(false)}>
              Book a Consultation
            </Link>
          </Button>
          <p className="text-xs text-[var(--color-muted)] text-center">
            Or write to{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="text-[var(--color-ink)] hover:text-[var(--color-gold)]"
            >
              {SITE.email}
            </a>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
