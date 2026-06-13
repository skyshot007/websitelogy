'use client';

import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/content/services';
import { Mail } from 'lucide-react';

/**
 * Phase 1 booking form. Renders the full UX; submission currently logs locally
 * and shows a confirmation. Phase 1.5 wires this to /api/book which writes to
 * Postgres, fires Telegram + Resend + CRM webhook, and emails the user.
 */
export function BookingFormShell() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    setSubmitting(false);
    toast.success(
      'Request received. We will reply within a working day.',
    );
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[var(--color-gold)]/40 bg-[var(--color-parchment)]/60 p-10 text-center">
        <Mail className="mx-auto h-10 w-10 text-[var(--color-gold)]" />
        <h2 className="mt-6 text-[var(--color-ink)]">Your request is with us</h2>
        <p className="mx-auto mt-4 max-w-md text-[var(--color-muted)]">
          We&rsquo;ll write back within a working day with an available slot and a small intake
          form. Until then, breathe well.
        </p>
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
        Everything below stays between us.
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
        <Button type="submit" disabled={submitting} variant="primary" size="lg">
          {submitting ? 'Sending\u2026' : 'Request my session'}
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
          defaultValue=""
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
