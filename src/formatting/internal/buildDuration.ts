export interface BuildDurationOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
  /** Add a space between the value and unit-attached symbols (`h`, `s`). Defaults to `false`. */
  spaced?: boolean;
}

/**
 * Shared core for the duration formatters. Receives a value in minutes and
 * renders a human-readable string. Not exported from the package barrel.
 */
export function buildDuration(minutes?: number | null, options: BuildDurationOptions = {}): string {
  const { fallback = '', spaced = false } = options;
  if (!minutes) {
    return fallback;
  }

  const gap = spaced ? ' ' : '';

  if (minutes < 1) {
    return `${minutes * 60}${gap}s`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}${gap}h e ${remainingMinutes} min`;
  }

  if (hours > 0) {
    return `${hours}${gap}h`;
  }

  return `${remainingMinutes} min`;
}
