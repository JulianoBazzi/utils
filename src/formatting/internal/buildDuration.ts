import { presentNumber } from '../../number/internal/presentNumber.js';

export interface BuildDurationOptions {
  /** Returned for missing or non-finite input (zero is formatted). Defaults to `""`. */
  fallback?: string;
  /** Add a space between the value and unit-attached symbols (`h`, `s`). Defaults to `false`. */
  spaced?: boolean;
}

/**
 * Shared core for the duration formatters. Receives a value in minutes and
 * renders a human-readable string. Zero is formatted (`"0s"`) and negatives
 * keep their sign (`"-1h e 30 min"`); the value is rounded to whole seconds (< 1 min) or whole minutes before
 * being split, so `119.6` reads as `"2h"` rather than `"1h e 60 min"`.
 * Not exported from the package barrel.
 */
export function buildDuration(minutes?: number | null, options: BuildDurationOptions = {}): string {
  const { fallback = '', spaced = false } = options;
  const value = presentNumber(minutes);
  if (value === undefined) {
    return fallback;
  }

  const gap = spaced ? ' ' : '';
  const total = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  const seconds = Math.round(total * 60);
  if (seconds < 60) {
    // A value that rounds to 0 seconds never gets a sign ("-0s").
    return `${seconds === 0 ? '' : sign}${seconds}${gap}s`;
  }

  const rounded = Math.round(total);
  const hours = Math.floor(rounded / 60);
  const remainingMinutes = rounded % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${sign}${hours}${gap}h e ${remainingMinutes} min`;
  }

  if (hours > 0) {
    return `${sign}${hours}${gap}h`;
  }

  return `${sign}${remainingMinutes} min`;
}
