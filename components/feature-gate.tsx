import 'server-only';
import type { ReactNode } from 'react';
import { getFlag } from '@/lib/flags';
import type { FlagName } from '@/lib/flag-types';

interface FeatureGateProps {
  flag: FlagName;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Wrap any subtree in a feature flag check. Renders `children` only when the
 * flag is enabled, otherwise renders `fallback` (defaults to nothing).
 *
 * Server Component — the flag value is decided at request time on the server,
 * and the disabled branch never reaches the browser.
 *
 * Usage:
 *   <FeatureGate flag="chat.widget">
 *     <ChatWidget />
 *   </FeatureGate>
 */
export function FeatureGate({ flag, children, fallback = null }: FeatureGateProps) {
  return getFlag(flag) ? <>{children}</> : <>{fallback}</>;
}
