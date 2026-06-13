/**
 * Astrology engine adapter — Phase 2 scaffold.
 *
 * Phase 2 will plug a real engine (Prokerala / VedicRishi / AstrologyAPI) behind
 * this interface. Phase 1.5 booking flow can already accept birth details that
 * this adapter will later compute against.
 *
 * Implementations will live alongside this file, e.g. `prokerala.ts`, and the
 * default export will be chosen via env var `ASTRO_PROVIDER`.
 */

export interface BirthDetails {
  dob: string; // ISO date (YYYY-MM-DD)
  tob: string; // 24h time (HH:mm)
  pob: string; // location string
  lat?: number;
  lon?: number;
  tz?: string;
}

export interface AstroAdapter {
  kundli(input: BirthDetails): Promise<unknown>;
  matching(boy: BirthDetails, girl: BirthDetails): Promise<unknown>;
  panchang(date: string, lat: number, lon: number): Promise<unknown>;
  moonSign(input: BirthDetails): Promise<{ sign: string; nakshatra: string }>;
}

export function getAstroAdapter(): AstroAdapter {
  throw new Error(
    'No astrology adapter configured. Phase 2 will wire this up (e.g. Prokerala).',
  );
}
