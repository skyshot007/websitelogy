import type { Metadata } from 'next';
import { SITE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing the use of this website and our services.',
};

export default function TermsPage() {
  return (
    <article className="surface-ivory pt-36 pb-24">
      <div className="container-page mx-auto max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-[var(--color-ink)]">Terms of Service</h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
        </p>

        <div className="mt-12 space-y-6 text-[var(--color-muted)] leading-relaxed">
          <p>
            These terms govern your use of {SITE.name}&rsquo;s website and services. This is a
            template stub — please replace with your final, lawyer-reviewed text.
          </p>

          <h2 className="mt-10 text-[var(--color-ink)]">Nature of the service</h2>
          <p>
            Astrology consultations are offered for guidance, awareness, and reflection. They
            are not a substitute for medical, legal, financial, or psychological advice.
            Decisions you make remain entirely yours.
          </p>

          <h2 className="mt-10 text-[var(--color-ink)]">Bookings &amp; payments</h2>
          <p>
            Bookings are confirmed once payment is received. Sessions are conducted at the
            scheduled time over video call.
          </p>

          <h2 className="mt-10 text-[var(--color-ink)]">Conduct</h2>
          <p>
            Sessions are confidential, respectful conversations. We reserve the right to end a
            session and refund proportionately in the case of abusive or disrespectful conduct.
          </p>
        </div>
      </div>
    </article>
  );
}
