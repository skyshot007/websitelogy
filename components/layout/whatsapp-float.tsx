import { SITE } from '@/lib/utils';

const WA_LINK = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  'Hello Astro Anil Joshi, I would like a consultation.',
)}`;

/** Fixed WhatsApp chat button, bottom-right on every screen. */
export function WhatsAppFloat() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 md:bottom-6 md:right-6"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 motion-safe:animate-ping" />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.004 0h-.008C7.174 0 .01 7.166.01 16c0 3.5 1.13 6.744 3.05 9.38L1.06 31.62l6.44-2.06A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.834 32 16S24.83 0 16.004 0zm9.31 22.59c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.7-1.948-7.726-6.724-7.962-7.034-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.206-3.424 1.634-3.89.386-.42.844-.512 1.126-.512.274 0 .548.002.788.014.252.012.59-.096.922.704.34.82 1.156 2.836 1.256 3.042.1.206.166.448.03.756-.128.31-.192.5-.384.77-.192.27-.406.6-.58.806-.192.226-.392.47-.168.86.226.388 1 1.65 2.15 2.672 1.48 1.32 2.726 1.73 3.114 1.926.388.194.612.166.84-.1.226-.27.966-1.128 1.226-1.516.256-.388.516-.322.87-.194.354.128 2.246 1.06 2.634 1.252.388.194.646.29.74.452.096.164.096.938-.29 1.842z" />
      </svg>
    </a>
  );
}
