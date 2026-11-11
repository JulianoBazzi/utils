import { readFallback } from './internal/readFallback.js';

export interface BuildFacebookUrlOptions<F extends string | undefined = string> {
  /**
   * Returned when the username is empty/missing. Defaults to `""`. Pass
   * `undefined` explicitly to get `undefined` (handy for an `href`).
   */
  fallback?: F;
}

/**
 * Build a Facebook profile URL from a username. Trims, strips a leading `@`
 * and URL-encodes the handle (so `?`, `#` or `/` can't alter the target path).
 * Empty username → `fallback`.
 *
 * @example
 * buildFacebookUrl("julianobazzi") // "https://facebook.com/julianobazzi"
 * buildFacebookUrl(null) // ""
 */
export function buildFacebookUrl<F extends string | undefined = string>(
  username?: string | null,
  options: BuildFacebookUrlOptions<F> = {},
): string | F {
  const fallback = readFallback(options, '');
  const handle = username?.trim().replace(/^@+/, '');
  if (!handle) {
    return fallback;
  }

  return `https://facebook.com/${encodeURIComponent(handle)}`;
}
