import { YantraDivider } from '@/components/brand/glyphs';

const HALLMARKS = [
  { value: '22+', label: 'Years of practice' },
  { value: '18k+', label: 'Personal sessions' },
  { value: '42', label: 'Countries served' },
  { value: 'EN / HI', label: 'Bilingual readings' },
];

export function TrustStrip() {
  return (
    <section className="surface-ivory border-b border-[var(--color-ink)]/8 py-12">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-y-8 gap-x-12 md:grid-cols-4">
          {HALLMARKS.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="font-display text-3xl text-[var(--color-midnight)]">{item.value}</p>
              <p className="mt-2 text-xs tracking-[0.18em] uppercase text-[var(--color-muted)]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
        <YantraDivider className="mt-12 opacity-50" />
      </div>
    </section>
  );
}
