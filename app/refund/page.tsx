import type { Metadata } from 'next';
import { SITE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Our policy on refunds and rescheduling.',
};

export default function RefundPage() {
  return (
    <article className="surface-ivory pt-36 pb-24">
      <div className="container-page mx-auto max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-[var(--color-ink)]">Refund &amp; Reschedule Policy</h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
        </p>

        <div className="mt-12 space-y-6 text-[var(--color-muted)] leading-relaxed">
          <p>
            This is a template stub — please replace with your final policy text before
            going live.
          </p>

          <h2 className="mt-10 text-[var(--color-ink)]">Rescheduling</h2>
          <p>
            You can reschedule a booked session free of charge with at least 24 hours&rsquo;
            notice. Rescheduling closer to the session is honoured once, at our discretion.
          </p>

          <h2 className="mt-10 text-[var(--color-ink)]">Refunds</h2>
          <p>
            Refunds are issued in full when a session cannot be conducted due to our reasons,
            or when cancelled at least 48 hours in advance by you. After a session has
            occurred, refunds are not provided, but follow-up support is included.
          </p>

          <h2 className="mt-10 text-[var(--color-ink)]">Reach us</h2>
          <p>
            For any concern, write to{' '}
            <a href={`mailto:${SITE.email}`} className="text-[var(--color-ink)] underline">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
