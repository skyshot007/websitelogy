import type { FlagName } from '@/lib/flag-types';

export interface NavLink {
  href: string;
  label: string;
  flag?: FlagName;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Journal', flag: 'marketing.blog' },
  { href: '/contact', label: 'Contact' },
];
