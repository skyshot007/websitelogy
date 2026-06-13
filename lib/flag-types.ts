import flagsFile from '@/config/feature-flags.json';

/**
 * Type-only exports for feature flags. Safe to import in client components.
 * Runtime logic (md5, env, getFlag) lives in `lib/flags.ts`, which is
 * `server-only`.
 */
type RawFlagsFile = typeof flagsFile;
type MetaKey = '$comment' | '$salt';
export type FlagName = Exclude<keyof RawFlagsFile, MetaKey>;
