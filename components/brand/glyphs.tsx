import type { SVGProps } from 'react';

export function LotusGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M24 38c-7 0-13-4-13-10 4 0 6 2 7 4 1-2 3-5 6-5s5 3 6 5c1-2 3-4 7-4 0 6-6 10-13 10Z" />
      <path d="M24 33c-3-3-4-7-4-11s2-7 4-9c2 2 4 5 4 9s-1 8-4 11Z" />
      <path d="M19 24c-3 1-5 3-6 6" />
      <path d="M29 24c3 1 5 3 6 6" />
      <circle cx="24" cy="38" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function MoonGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M32 24c0 7-6 13-13 13a13 13 0 0 1-3-26c-3 4-4 9-2 14s7 8 12 8c2 0 4 0 6-1v-8Z" />
      <circle cx="36" cy="14" r="1" fill="currentColor" />
      <circle cx="40" cy="20" r="0.6" fill="currentColor" />
      <circle cx="34" cy="22" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function SunGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="24" cy="24" r="7" />
      <path d="M24 8v4M24 36v4M8 24h4M36 24h4M13 13l3 3M32 32l3 3M35 13l-3 3M16 32l-3 3" />
    </svg>
  );
}

export function StarGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M24 8v32M8 24h32M14 14l20 20M34 14L14 34" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}

export function YantraGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="24" cy="24" r="18" />
      <path d="M24 8l16 24H8L24 8Z" />
      <path d="M24 40 8 16h32L24 40Z" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  );
}

export function ScrollGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 10h22a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V14a4 4 0 0 1 2-3.5Z" />
      <path d="M10 14a4 4 0 0 0 4 4h20" />
      <path d="M16 24h14M16 30h14M16 36h8" />
    </svg>
  );
}

export function ChatGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M10 18a8 8 0 0 1 8-8h12a8 8 0 0 1 8 8v8a8 8 0 0 1-8 8h-9l-7 6v-6a8 8 0 0 1-4-7v-9Z" />
      <circle cx="20" cy="22" r="1" fill="currentColor" />
      <circle cx="24" cy="22" r="1" fill="currentColor" />
      <circle cx="28" cy="22" r="1" fill="currentColor" />
    </svg>
  );
}

export function HandsGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M24 6c-3 6-6 9-12 11 2 8 6 14 12 17 6-3 10-9 12-17-6-2-9-5-12-11Z" />
      <path d="M18 22l4 3 4-7 4 6" />
    </svg>
  );
}

export function YantraDivider({ className }: { className?: string }) {
  return (
    <div
      className={`flex w-full items-center justify-center gap-4 ${className ?? ''}`}
      aria-hidden="true"
    >
      <span className="hairline flex-1 max-w-32" />
      <svg
        viewBox="0 0 32 32"
        className="text-[var(--color-gold)] h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M16 4l12 12-12 12L4 16 16 4Z" />
        <circle cx="16" cy="16" r="2.5" />
      </svg>
      <span className="hairline flex-1 max-w-32" />
    </div>
  );
}

export function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 132" className={className} fill="currentColor" aria-hidden="true">
      {/* outer sweeping petals */}
      <path d="M100 120 C74 118 40 110 20 92 C40 99 78 108 100 122 Z" />
      <path d="M100 120 C126 118 160 110 180 92 C160 99 122 108 100 122 Z" />
      {/* outer side petals */}
      <path d="M100 118 C76 108 48 92 44 60 C62 74 90 100 100 118 Z" />
      <path d="M100 118 C124 108 152 92 156 60 C138 74 110 100 100 118 Z" />
      {/* inner side petals */}
      <path d="M100 118 C84 100 66 70 72 38 C86 60 96 92 100 118 Z" />
      <path d="M100 118 C116 100 134 70 128 38 C114 60 104 92 100 118 Z" />
      {/* central petal */}
      <path d="M100 118 C88 96 88 48 100 20 C112 48 112 96 100 118 Z" />
      {/* base boat sweep */}
      <path d="M26 108 C56 128 144 128 174 108 C148 120 52 120 26 108 Z" />
    </svg>
  );
}

export function Wordmark({
  className,
  layout = 'horizontal',
}: {
  className?: string;
  layout?: 'horizontal' | 'stacked';
}) {
  if (layout === 'stacked') {
    return (
      <span className={`inline-flex flex-col items-center text-center ${className ?? ''}`}>
        <LotusMark className="h-14 w-auto" />
        <span className="mt-2 font-display text-xl font-bold uppercase leading-none tracking-[0.16em]">
          Astro Anil Joshi
        </span>
        <span className="mt-1.5 text-[9px] uppercase leading-none tracking-[0.34em] opacity-75">
          Jivan Margdarshak
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <LotusMark className="h-9 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.1rem] font-bold uppercase leading-none tracking-[0.1em]">
          Astro Anil Joshi
        </span>
        <span className="mt-1 text-[7.5px] uppercase leading-none tracking-[0.28em] opacity-75">
          Jivan Margdarshak
        </span>
      </span>
    </span>
  );
}
