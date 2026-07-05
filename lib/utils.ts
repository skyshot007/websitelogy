import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Astro Anil Joshi',
  tagline: 'A deeper understanding of your life begins here',
  description:
    'Refined Vedic astrology guidance for clear decisions in life, career, relationships, and inner growth.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://anil-astro.example',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'astroaniljoshi01@gmail.com',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+91 90019 58696',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '919001958696',
  defaultLocale: 'en',
} as const;
