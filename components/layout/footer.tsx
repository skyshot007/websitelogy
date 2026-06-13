import Link from 'next/link';
import { Wordmark, YantraDivider } from '@/components/brand/glyphs';
import { FeatureGate } from '@/components/feature-gate';
import { SITE } from '@/lib/utils';
import { Instagram, Youtube, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="surface-midnight relative overflow-hidden">
      <div className="container-page section-pad relative">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-2 max-w-md">
            <Wordmark className="text-[var(--color-cream)]" />
            <p className="mt-6 text-[var(--color-cream)]/70 text-[15px] leading-relaxed">
              Refined Vedic insights for clarity in life, career, and relationships. Personal
              consultations, honest counsel, and a continuous companion through life&apos;s seasons.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <SocialLink href={`mailto:${SITE.email}`} label="Email">
                <Mail className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="YouTube">
                <Youtube className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-[var(--color-gold)]">Explore</h3>
            <ul className="mt-5 space-y-3 text-[15px] text-[var(--color-cream)]/75">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/book">Book a Consultation</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FeatureGate flag="marketing.blog">
                <FooterLink href="/blog">Journal</FooterLink>
              </FeatureGate>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-[var(--color-gold)]">Considered Reading</h3>
            <ul className="mt-5 space-y-3 text-[15px] text-[var(--color-cream)]/75">
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
              <FooterLink href="/refund">Refund Policy</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <YantraDivider />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 text-xs text-[var(--color-cream)]/55 md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Crafted with care.
          </p>
          <p className="italic font-display">सर्वे भवन्तु सुखिनः</p>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-32 left-1/2 -z-0 h-64 w-[110%] -translate-x-1/2 rounded-[100%] bg-[var(--color-gold)]/10 blur-3xl" />
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="inline-block transition-colors hover:text-[var(--color-gold-soft)]"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-cream)]/15 text-[var(--color-cream)]/75 transition hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)]"
    >
      {children}
    </a>
  );
}
