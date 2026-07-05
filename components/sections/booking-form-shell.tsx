'use client';

import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/content/services';
import { SITE } from '@/lib/utils';

type Detail = { label: string; value: string };

/**
 * Booking form. On submit it composes a tidy, card-style WhatsApp message with
 * all the details and opens a chat to the astrologer, then shows the client a
 * summary card with a fallback "Open WhatsApp" button.
 */
export function BookingFormShell({ defaultService = '' }: { defaultService?: string }) {
  const [details, setDetails] = useState<Detail[] | null>(null);
  const [waUrl, setWaUrl] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => (data.get(k)?.toString() ?? '').trim();

    const serviceName =
      SERVICES.find((s) => s.slug === get('service'))?.name || get('service') || '—';

    const collected: Detail[] = [
      { label: 'Service', value: serviceName },
      { label: 'Name', value: get('name') },
      { label: 'Email', value: get('email') },
      { label: 'Phone', value: get('phone') || '—' },
      { label: 'Date of birth', value: get('dob') },
      { label: 'Time of birth', value: get('tob') || '—' },
      { label: 'Place of birth', value: get('pob') },
      { label: 'Guidance needed', value: get('notes') || '—' },
    ];

    const message = [
      '🙏 *New Consultation Request*',
      '',
      ...collected.slice(0, -1).map((d) => `*${d.label}:* ${d.value}`),
      '',
      `*${collected[collected.length - 1].label}:*`,
      collected[collected.length - 1].value,
      '',
      `— sent from ${SITE.name}`,
    ].join('\n');

    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

    // Fired inside the click gesture so the browser allows the new tab.
    window.open(url, '_blank', 'noopener,noreferrer');

    setDetails(collected);
    setWaUrl(url);
    toast.success('Opening WhatsApp — tap send to confirm your request.');
  };

  if (details) {
    return (
      <div className="rounded-3xl border border-[var(--color-gold)]/40 bg-[var(--color-ivory)] p-8 md:p-10">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white">
            <WhatsAppIcon className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-[var(--color-ink)]">Almost there</h2>
            <p className="text-sm text-[var(--color-muted)]">
              Tap <strong>send</strong> in WhatsApp to deliver your request.
            </p>
          </div>
        </div>

        <dl className="mt-8 divide-y divide-[var(--color-ink)]/10 overflow-hidden rounded-2xl border border-[var(--color-ink)]/10">
          {details.map((d) => (
            <div key={d.label} className="flex gap-4 bg-[var(--color-parchment)]/40 px-5 py-3">
              <dt className="w-32 shrink-0 text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
                {d.label}
              </dt>
              <dd className="flex-1 text-[15px] text-[var(--color-ink)]">{d.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col items-start gap-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 text-[15px] font-semibold text-white shadow-[0_14px_32px_-12px_rgba(37,211,102,0.6)] transition hover:-translate-y-0.5 hover:brightness-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Open WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setDetails(null)}
            className="text-sm text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
          >
            Edit details / start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-[var(--color-ink)]/10 bg-[var(--color-ivory)] p-8 md:p-10"
    >
      <h2 className="text-[var(--color-ink)]">Tell us a little</h2>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Everything below stays between us. Your request is sent to us over WhatsApp.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone (WhatsApp)" name="phone" />
        <Field
          label="Service"
          name="service"
          as="select"
          required
          defaultValue={defaultService}
          options={[
            { value: '', label: 'Choose one' },
            ...SERVICES.map((s) => ({ value: s.slug, label: s.name })),
          ]}
        />
        <Field label="Date of birth" name="dob" type="date" required />
        <Field label="Time of birth" name="tob" type="time" />
        <Field
          label="Place of birth"
          name="pob"
          required
          className="md:col-span-2"
          placeholder="City, state, country"
        />
        <Field
          label="What would you like guidance on?"
          name="notes"
          as="textarea"
          rows={4}
          className="md:col-span-2"
          placeholder="A sentence or two is enough."
        />
      </div>

      <div className="mt-8 flex flex-col items-start gap-4">
        <Button type="submit" variant="gold" size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          Request my session
        </Button>
        <p className="text-xs text-[var(--color-muted)]">
          By submitting you agree to our privacy policy. We never share your details.
        </p>
      </div>
    </form>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  as?: 'input' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
  rows?: number;
}

function Field({ label, name, as = 'input', options, rows, className, ...props }: FieldProps) {
  const baseClasses =
    'mt-2 w-full rounded-xl border border-[var(--color-ink)]/15 bg-[var(--color-ivory)] px-4 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 transition-colors focus:border-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/20';

  return (
    <label className={className}>
      <span className="text-xs tracking-[0.16em] uppercase text-[var(--color-muted)]">
        {label}
      </span>
      {as === 'select' ? (
        <select
          name={name}
          required={props.required}
          defaultValue={(props.defaultValue as string) ?? ''}
          className={baseClasses}
        >
          {options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={props.placeholder}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input name={name} className={baseClasses} {...props} />
      )}
    </label>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.004 0h-.008C7.174 0 .01 7.166.01 16c0 3.5 1.13 6.744 3.05 9.38L1.06 31.62l6.44-2.06A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.834 32 16S24.83 0 16.004 0zm9.31 22.59c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.7-1.948-7.726-6.724-7.962-7.034-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.206-3.424 1.634-3.89.386-.42.844-.512 1.126-.512.274 0 .548.002.788.014.252.012.59-.096.922.704.34.82 1.156 2.836 1.256 3.042.1.206.166.448.03.756-.128.31-.192.5-.384.77-.192.27-.406.6-.58.806-.192.226-.392.47-.168.86.226.388 1 1.65 2.15 2.672 1.48 1.32 2.726 1.73 3.114 1.926.388.194.612.166.84-.1.226-.27.966-1.128 1.226-1.516.256-.388.516-.322.87-.194.354.128 2.246 1.06 2.634 1.252.388.194.646.29.74.452.096.164.096.938-.29 1.842z" />
    </svg>
  );
}
