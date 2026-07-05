import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontVariables } from '@/lib/fonts';
import { SITE } from '@/lib/utils';
import { SiteJsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { StickyBookButton } from '@/components/layout/sticky-book-button';
import { WhatsAppFloat } from '@/components/layout/whatsapp-float';
import { LenisProvider } from '@/components/motion/lenis-provider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'Vedic astrology',
    'Jyotish',
    'astrologer consultation',
    'Kundli',
    'birth chart reading',
    'horoscope',
    'spiritual guidance',
    'Anil Joshi astrologer',
    'online astrology consultation',
    'Parashari Jyotish',
    'couple compatibility',
    'online puja',
  ],
  authors: [{ name: 'Anil Joshi' }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Vedic Astrology`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF7EC' },
    { media: '(prefers-color-scheme: dark)', color: '#401407' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="bg-ivory text-ink flex min-h-screen flex-col antialiased">
        <SiteJsonLd />
        <LenisProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyBookButton />
          <WhatsAppFloat />
        </LenisProvider>
        <Toaster
          position="bottom-right"
          theme="light"
          toastOptions={{
            classNames: {
              toast: 'border-gold/30 bg-ivory text-ink',
            },
          }}
        />
      </body>
    </html>
  );
}
