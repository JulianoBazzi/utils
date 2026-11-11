import { readFallback } from './internal/readFallback.js';

export interface BuildInstagramUrlOptions<F extends string | undefined = string> {
  /**
   * Returned when the username is empty/missing. Defaults to `""`. Pass
   * `undefined` explicitly to get `undefined` (handy for an `href`).
   */
  fallback?: F;
}

/**
 * Build an Instagram profile URL from a username. Trims, strips a leading `@`
 * and URL-encodes the handle (so `?`, `#` or `/` can't alter the target path).
 * Empty username → `fallback`.
 *
 * @example
 * buildInstagramUrl("@julianobazzi") // "https://instagram.com/julianobazzi"
 * buildInstagramUrl(null) // ""
 */
export function buildInstagramUrl<F extends string | undefined = string>(
  username?: string | null,
  options: BuildInstagramUrlOptions<F> = {},
): string | F {
  const fallback = readFallback(options, '');
  const handle = username?.trim().replace(/^@+/, '');
  if (!handle) {
    return fallback;
  }

  return `https://instagram.com/${encodeURIComponent(handle)}`;
}
