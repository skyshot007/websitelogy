import type { Metadata } from 'next';
import { SITE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <article className="surface-ivory pt-36 pb-24">
      <div className="container-page mx-auto max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-[var(--color-ink)]">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
        </p>

        <div className="mt-12 space-y-6 text-[var(--color-muted)] leading-relaxed">
          <p>
            This privacy policy describes how {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;)
            collects, uses, and protects information you share when you visit this website,
            book a consultation, or otherwise contact us. This is a template stub — please
            replace with your final, lawyer-reviewed text before going live.
          </p>

          <h2 className="mt-10 text-[var(--color-ink)]">Information we collect</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Identification details you share (name, email, phone).</li>
            <li>Birth details (date, time, place) when you book a consultation.</li>
            <li>Notes and questions you choose to share with us.</li>
            <li>Standard technical data (IP, browser, device) via analytics.</li>
          </ul>

          <h2 className="mt-10 text-[var(--color-ink)]">How we use it</h2>
          <p>
            Solely to prepare for and conduct your consultation, to reply to your queries, and
            to send you the follow-up documents from your session. We do not sell, rent, or
            share your data with third parties for marketing.
          </p>

          <h2 className="mt-10 text-[var(--color-ink)]">Your rights</h2>
          <p>
            You can request a copy of your data, ask us to correct it, or request deletion at
            any time by writing to{' '}
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
