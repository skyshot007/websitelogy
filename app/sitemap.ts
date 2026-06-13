import type { MetadataRoute } from 'next';
import { SERVICES } from '@/content/services';
import { SITE } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, '');

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/book',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
    '/refund',
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...SERVICES.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
