interface BuildFacebookUrlOptions {
  /** Returned when the username is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Build a Facebook profile URL from a username. Trims and strips a leading `@`.
 * Empty username → `fallback`.
 *
 * @example
 * buildFacebookUrl("julianobazzi") // "https://facebook.com/julianobazzi"
 * buildFacebookUrl(null) // ""
 */
export function buildFacebookUrl(
  username?: string | null,
  options: BuildFacebookUrlOptions = {},
): string {
  const { fallback = '' } = options;
  const handle = username?.trim().replace(/^@+/, '');
  if (!handle) {
    return fallback;
  }

  return `https://facebook.com/${handle}`;
}
