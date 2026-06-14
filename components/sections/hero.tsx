import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Constellation } from './constellation';
import { ArrowRight } from 'lucide-react';
import { SITE } from '@/lib/utils';

const PORTRAIT_FILE = 'anil.png';
const portraitPath = resolve(process.cwd(), 'public/images/portrait', PORTRAIT_FILE);
const hasPortrait = existsSync(portraitPath);

export function Hero() {
  return (
    <section className="surface-midnight relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
      <Constellation className="absolute inset-0 h-full w-full opacity-90" />

      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-[100%] bg-[var(--color-gold)]/8 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-24 hidden h-[520px] w-[520px] rounded-full bg-[var(--color-gold)]/14 blur-3xl lg:block" />

      <div className="container-page relative">
        <div
          className={
            hasPortrait
              ? 'grid items-end gap-10 md:gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-14'
              : 'grid items-center gap-12 md:gap-14 lg:gap-16'
          }
        >
          <div className={hasPortrait ? 'order-1 pb-2 lg:order-1 lg:max-w-[34rem] lg:pb-10' : ''}>
            <p className="eyebrow inline-flex items-center gap-2">
              <span className="block h-1 w-1 rounded-full bg-[var(--color-gold)]" />
              Vedic Astrology &middot; Personal Consultation
            </p>
            <h1
              className={`mt-6 text-[var(--color-cream)] ${hasPortrait ? 'text-[clamp(2.15rem,2.8vw+1rem,3.65rem)] leading-[1.08]' : ''}`}
            >
              A deeper understanding
              <br />
              of your life
              <span className="display-italic block text-[var(--color-gold-soft)]">
                begins here.
              </span>
            </h1>

            {/* Mobile-only portrait — shown between heading and description */}
            {hasPortrait ? (
              <div className="mt-8 lg:hidden">
                <HeroPortraitMobile />
              </div>
            ) : null}

            <p
              className={`mt-8 text-[17px] leading-relaxed text-[var(--color-cream)]/75 ${hasPortrait ? 'max-w-lg' : 'max-w-xl'}`}
            >
              {SITE.description} A private conversation with {SITE.name}, rooted in your birth
              chart, held with honesty and care.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Button
                asChild
                variant="gold"
                size="lg"
                className="focus-visible:ring-offset-[var(--color-midnight)]"
              >
                <Link href="/book">
                  Book a Consultation
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-[15px] text-[var(--color-cream)]/85 transition hover:text-[var(--color-cream)]"
              >
                <span className="gold-underline gold-underline-hover">Explore our services</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="mt-12 max-w-md text-[13px] text-[var(--color-cream)]/55">
              Sessions are conducted in English and Hindi. Available worldwide over video.
            </p>
          </div>

          {/* Desktop-only portrait — right column, hidden on mobile */}
          {hasPortrait ? (
            <div className="order-2 hidden justify-center lg:flex lg:order-2 lg:justify-end lg:-mr-2 xl:-mr-4">
              <HeroPortrait />
            </div>
          ) : null}
        </div>

        <div className="mt-24 hidden md:block">
          <ScrollHint />
        </div>
      </div>
    </section>
  );
}

function HeroPortraitMobile() {
  return (
    <div className="relative mx-auto w-48">
      <div className="pointer-events-none absolute -inset-3 rounded-full bg-[var(--color-gold)]/10 blur-2xl" />
      <div className="pointer-events-none absolute -inset-[10%] rounded-full border border-[var(--color-gold)]/20 animate-breathe" />
      <div className="relative h-48 w-48 overflow-hidden rounded-full ring-1 ring-[var(--color-gold)]/40 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-[var(--color-midnight)]/30 to-transparent" />
        <Image
          src={`/images/portrait/${PORTRAIT_FILE}`}
          alt={`Portrait of ${SITE.name}`}
          fill
          priority
          sizes="192px"
          className="object-cover object-[center_8%]"
        />
      </div>
    </div>
  );
}

function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,26rem)] sm:max-w-[30rem] md:max-w-[34rem] lg:max-w-[38rem] xl:max-w-[42rem]">
      <HeroPortraitGeometry className="pointer-events-none absolute -inset-[12%] -z-10 h-[132%] w-[132%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold)]" />

      <div className="pointer-events-none absolute -inset-8 rounded-[2.75rem] bg-[var(--color-gold)]/16 blur-3xl" />
      <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[var(--color-gold-soft)]/10 blur-2xl" />

      <div className="pointer-events-none absolute -inset-[12%] rounded-full border border-[var(--color-gold)]/25 animate-breathe" />
      <div className="pointer-events-none absolute -inset-[5%] rounded-full border border-[var(--color-cream)]/12" />

      <div className="relative h-[min(72vh,540px)] w-full overflow-hidden rounded-[2rem] ring-1 ring-[var(--color-gold)]/40 shadow-[0_32px_100px_-24px_rgba(0,0,0,0.72)] sm:h-[min(74vh,580px)] lg:h-[min(78vh,660px)] xl:h-[min(82vh,720px)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[var(--color-midnight)]/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[var(--color-midnight)]/45 to-transparent" />

        <Image
          src={`/images/portrait/${PORTRAIT_FILE}`}
          alt={`Portrait of ${SITE.name}`}
          fill
          priority
          sizes="(max-width: 640px) 416px, (max-width: 1024px) 544px, 672px"
          className="object-cover object-[center_10%]"
        />
      </div>

      <div className="pointer-events-none absolute -right-3 top-[16%] h-2.5 w-2.5 rounded-full bg-[var(--color-gold-soft)] animate-twinkle" />
      <div
        className="pointer-events-none absolute -left-2 bottom-[26%] h-2 w-2 rounded-full bg-[var(--color-cream)] animate-twinkle"
        style={{ animationDelay: '1.2s' }}
      />
      <div
        className="pointer-events-none absolute right-[6%] -bottom-2 h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] animate-twinkle"
        style={{ animationDelay: '2.4s' }}
      />
    </div>
  );
}

function HeroPortraitGeometry({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 240"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="100" cy="118" r="92" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.75" />
      <circle cx="100" cy="118" r="72" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.6" />
      <circle cx="100" cy="118" r="52" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />

      <path
        d="M100 26 L170 118 L100 210 L30 118 Z"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="0.65"
      />
      <path
        d="M100 46 L150 118 L100 190 L50 118 Z"
        stroke="currentColor"
        strokeOpacity="0.08"
        strokeWidth="0.5"
      />

      <g stroke="currentColor" strokeOpacity="0.16" strokeWidth="0.55">
        <path d="M28 118 A72 72 0 0 1 172 118" />
        <path d="M100 46 A72 72 0 0 0 100 190" />
      </g>

      <g stroke="#F4ECDB" strokeOpacity="0.1" strokeWidth="0.45">
        <path d="M100 18 L100 38 M100 198 L100 218 M18 118 L38 118 M162 118 L182 118" />
        <path d="M52 52 L64 64 M148 52 L136 64 M52 184 L64 172 M148 184 L136 172" />
      </g>

      <circle cx="100" cy="118" r="2.5" fill="currentColor" fillOpacity="0.35" />
      <circle cx="100" cy="26" r="1.5" fill="#F4ECDB" fillOpacity="0.45" className="animate-twinkle" />
      <circle
        cx="170"
        cy="118"
        r="1.2"
        fill="currentColor"
        fillOpacity="0.4"
        className="animate-twinkle"
        style={{ animationDelay: '1.8s' }}
      />
      <circle
        cx="30"
        cy="118"
        r="1.2"
        fill="currentColor"
        fillOpacity="0.4"
        className="animate-twinkle"
        style={{ animationDelay: '0.6s' }}
      />
    </svg>
  );
}

function ScrollHint() {
  return (
    <div className="flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-[var(--color-cream)]/55">
      <span>Scroll for the philosophy</span>
      <span className="flex items-center gap-3">
        <span className="h-px w-12 bg-[var(--color-cream)]/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] animate-twinkle" />
      </span>
    </div>
  );
}
