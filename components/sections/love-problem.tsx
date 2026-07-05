import { Reveal } from '@/components/motion/reveal';
import { SITE } from '@/lib/utils';

const WA_LINK = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  'Hello Astro Anil Joshi, I need guidance for a love, relationship or marriage problem.',
)}`;

export function LoveProblem() {
  return (
    <section className="section-pad bg-gradient-to-b from-[var(--color-ivory)] to-[var(--color-parchment)]">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <Reveal>
            <h2 className="text-4xl font-bold uppercase leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              <span className="block text-[var(--color-ink)]">All Love Problem</span>
              <span className="block text-[var(--color-vermillion)]">Solution</span>
            </h2>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-14 bg-[var(--color-gold)]/60" />
              <HeartTiny className="h-4 w-4 text-[var(--color-gold)]" />
              <span className="h-px w-14 bg-[var(--color-gold)]/60" />
            </div>

            <p className="mt-6 max-w-md text-[var(--color-muted)]">
              Get expert astrology guidance for love, relationship and marriage.
            </p>

            <div className="mt-9">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[var(--color-vermillion)] px-8 text-[15px] font-semibold text-white shadow-[0_16px_34px_-14px_rgba(217,72,15,0.65)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Talk to Astrologer
              </a>
            </div>
          </Reveal>

          {/* Graphic */}
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center">
              <HeartZodiac className="w-full max-w-[22rem]" />
              <p className="mt-3 font-display text-2xl font-bold text-[var(--color-ink)]">
                Astro Anil Joshi
              </p>
              <span className="mt-1 text-[10px] uppercase tracking-[0.34em] text-[var(--color-gold)]">
                Jivan Margdarshak
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HeartTiny({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.004 0h-.008C7.174 0 .01 7.166.01 16c0 3.5 1.13 6.744 3.05 9.38L1.06 31.62l6.44-2.06A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.834 32 16S24.83 0 16.004 0zm9.31 22.59c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.7-1.948-7.726-6.724-7.962-7.034-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.206-3.424 1.634-3.89.386-.42.844-.512 1.126-.512.274 0 .548.002.788.014.252.012.59-.096.922.704.34.82 1.156 2.836 1.256 3.042.1.206.166.448.03.756-.128.31-.192.5-.384.77-.192.27-.406.6-.58.806-.192.226-.392.47-.168.86.226.388 1 1.65 2.15 2.672 1.48 1.32 2.726 1.73 3.114 1.926.388.194.612.166.84-.1.226-.27.966-1.128 1.226-1.516.256-.388.516-.322.87-.194.354.128 2.246 1.06 2.634 1.252.388.194.646.29.74.452.096.164.096.938-.29 1.842z" />
    </svg>
  );
}

function HeartZodiac({ className }: { className?: string }) {
  const heartD =
    'M32 58 C11 43 4 31 4 20 C4 10 12 4 20 4 C26 4 30 8 32 12 C34 8 38 4 44 4 C52 4 60 10 60 20 C60 31 53 43 32 58 Z';
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="heartFill" cx="42%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#f0603f" />
          <stop offset="60%" stopColor="#d5342a" />
          <stop offset="100%" stopColor="#a5140f" />
        </radialGradient>
      </defs>

      <path
        d="M160 250 C92 200 52 152 52 114 C52 86 74 66 100 66 C126 66 148 84 160 110 C172 84 194 66 220 66 C246 66 268 86 268 114 C268 152 228 200 160 250 Z"
        fill="none"
        stroke="#c0271f"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <g transform="translate(112 118) scale(1.05)">
        <path d={heartD} fill="url(#heartFill)" />
      </g>
      <g transform="translate(150 128) scale(0.92)">
        <path d={heartD} fill="url(#heartFill)" opacity="0.96" />
      </g>

      <g fill="var(--color-gold)" fillOpacity="0.7">
        <path d="M250 92 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" />
        <path d="M74 214 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" />
        <path d="M236 220 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" />
      </g>
    </svg>
  );
}
