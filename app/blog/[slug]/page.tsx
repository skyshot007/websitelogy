import { notFound } from 'next/navigation';
import { getFlag } from '@/lib/flags';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!getFlag('marketing.blog')) notFound();
  await params;
  notFound();
}
