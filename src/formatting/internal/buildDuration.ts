export interface BuildDurationOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
  /** Add a space between the value and unit-attached symbols (`h`, `s`). Defaults to `false`. */
  spaced?: boolean;
}

/**
 * Shared core for the duration formatters. Receives a value in minutes and
 * renders a human-readable string. Negative values are treated as positive;
 * the value is rounded to whole seconds (< 1 min) or whole minutes before
 * being split, so `119.6` reads as `"2h"` rather than `"1h e 60 min"`.
 * Not exported from the package barrel.
 */
export function buildDuration(minutes?: number | null, options: BuildDurationOptions = {}): string {
  const { fallback = '', spaced = false } = options;
  if (!minutes) {
    return fallback;
  }

  const gap = spaced ? ' ' : '';
  const total = Math.abs(minutes);

  const seconds = Math.round(total * 60);
  if (seconds < 60) {
    return `${seconds}${gap}s`;
  }

  const rounded = Math.round(total);
  const hours = Math.floor(rounded / 60);
  const remainingMinutes = rounded % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}${gap}h e ${remainingMinutes} min`;
  }

  if (hours > 0) {
    return `${hours}${gap}h`;
  }

  return `${remainingMinutes} min`;
}
