import { Philosopher, Poppins, Tiro_Devanagari_Hindi } from 'next/font/google';

// Display / headings — elegant rounded serif, matching the reference site's headline voice.
export const philosopher = Philosopher({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

// Body — clean geometric sans for readable, modern copy.
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ['latin', 'devanagari'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-devanagari',
  display: 'swap',
});

export const fontVariables = `${philosopher.variable} ${poppins.variable} ${tiroDevanagari.variable}`;
