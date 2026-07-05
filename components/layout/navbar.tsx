import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wordmark } from '@/components/brand/glyphs';
import { FeatureGate } from '@/components/feature-gate';
import { getFlag } from '@/lib/flags';
import { MobileMenu } from './mobile-menu';
import { NavbarScroll } from './navbar-scroll';
import { NAV_LINKS } from './nav-config';

export function Navbar() {
  const showSignIn = getFlag('marketing.signIn');
  const visibleLinks = NAV_LINKS.filter((link) => !link.flag || getFlag(link.flag));

  return (
    <NavbarScroll>
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" aria-label="Home" className="focus-visible:outline-none">
          <Wordmark className="text-[var(--color-midnight)]" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {visibleLinks.map((link) => (
            <DesktopNavLink key={link.href} href={link.href}>
              {link.label}
            </DesktopNavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <FeatureGate flag="marketing.signIn">
            <Button asChild variant="ghost" size="sm">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </FeatureGate>
          <Button asChild variant="primary" size="sm">
            <Link href="/book">Book a Consultation</Link>
          </Button>
        </div>

        <MobileMenu links={visibleLinks} showSignIn={showSignIn} />
      </div>
    </NavbarScroll>
  );
}

function DesktopNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative text-sm tracking-wide text-[var(--color-ink)]/85 transition-colors hover:text-[var(--color-ink)]"
    >
      <span>{children}</span>
      <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-[var(--color-gold)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
    </Link>
  );
}
