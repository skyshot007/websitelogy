import 'server-only';
import crypto from 'node:crypto';
import flagsFile from '@/config/feature-flags.json';
import type { FlagName } from './flag-types';

export type { FlagName };

/**
 * Feature flag system — developer-only, code-gated rollout.
 *
 * Every gated feature has an entry in `config/feature-flags.json` whose value is
 * md5(`<true|false>+<FLAG_SALT>`) in hex. We compute the TRUE/FALSE hashes once at
 * module load and do O(1) equality checks at runtime.
 *
 * Anything that is neither the TRUE_HASH nor FALSE_HASH (typo, tampering, stale
 * hash from a rotated salt) is treated as DISABLED. This is the safe default.
 *
 * `server-only` keeps this module out of any client bundle, so flag names and
 * hashes never reach the browser.
 *
 * Optional env override: FLAG_OVERRIDE_<name>=true|false forces a flag regardless
 * of the file content. Useful for staging tests. Treat it like a power tool.
 */

const DEFAULT_SALT = 'anil_astro+1115';
const SALT = process.env.FLAG_SALT ?? DEFAULT_SALT;

function md5(input: string): string {
  return crypto.createHash('md5').update(input).digest('hex');
}

const TRUE_HASH = md5(`true+${SALT}`);
const FALSE_HASH = md5(`false+${SALT}`);

const rawFlags = flagsFile as Record<string, string>;

function envOverride(name: string): boolean | null {
  const key = `FLAG_OVERRIDE_${name.replace(/\./g, '_')}`;
  const v = process.env[key];
  if (v === 'true') return true;
  if (v === 'false') return false;
  return null;
}

export function getFlag(name: FlagName): boolean {
  const override = envOverride(name);
  if (override !== null) return override;

  const stored = rawFlags[name];
  if (stored === TRUE_HASH) return true;
  if (stored === FALSE_HASH) return false;
  return false;
}

export function getAllFlags(): Record<FlagName, boolean> {
  const out = {} as Record<FlagName, boolean>;
  for (const key of Object.keys(rawFlags)) {
    if (key.startsWith('$')) continue;
    out[key as FlagName] = getFlag(key as FlagName);
  }
  return out;
}

export function listFlagNames(): FlagName[] {
  return Object.keys(rawFlags).filter((k) => !k.startsWith('$')) as FlagName[];
}

export function flagHashes(): { trueHash: string; falseHash: string; salt: string } {
  return { trueHash: TRUE_HASH, falseHash: FALSE_HASH, salt: SALT };
}
