import { Fraunces, Inter, Tiro_Devanagari_Hindi } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

export const inter = Inter({
  subsets: ['latin'],
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

export const fontVariables = `${fraunces.variable} ${inter.variable} ${tiroDevanagari.variable}`;
