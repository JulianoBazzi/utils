import { readFallback } from './internal/readFallback.js';

export interface BuildMapsUrlOptions<F extends string | undefined = string> {
  /**
   * Returned when the address is empty/missing. Defaults to `""`. Pass
   * `undefined` explicitly to get `undefined` (handy for an `href`).
   */
  fallback?: F;
}

/**
 * Build a Google Maps search link for an address (the URL is encoded).
 * Combine with `formatAddress` to search a structured address.
 *
 * @example
 * buildMapsUrl("Av. Paulista, 1000, São Paulo")
 * // "https://www.google.com/maps/search/?api=1&query=Av.%20Paulista%2C%201000%2C%20S%C3%A3o%20Paulo"
 * buildMapsUrl("", { fallback: undefined }) // undefined
 */
export function buildMapsUrl<F extends string | undefined = string>(
  address?: string | null,
  options: BuildMapsUrlOptions<F> = {},
): string | F {
  const value = address?.trim();
  if (!value) {
    return readFallback(options, '');
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
}
