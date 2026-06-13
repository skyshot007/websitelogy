import Link from 'next/link';
import { FeatureGate } from '@/components/feature-gate';

/**
 * Floating "Book a consultation" pill, mobile-only, fixed to the bottom of the
 * viewport. Honours iOS safe-area inset. Gated by marketing.stickyBookButton.
 */
export function StickyBookButton() {
  return (
    <FeatureGate flag="marketing.stickyBookButton">
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 md:hidden"
        aria-hidden="false"
      >
        <Link
          href="/book"
          className="pointer-events-auto inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-midnight)] px-6 text-[15px] font-medium text-[var(--color-cream)] shadow-[0_10px_30px_-10px_rgba(11,20,55,0.55)] transition hover:bg-[var(--color-astral)]"
        >
          Book a consultation
        </Link>
      </div>
    </FeatureGate>
  );
}
