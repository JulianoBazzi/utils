import { type BuildDurationOptions, buildDuration } from './internal/buildDuration.js';

/**
 * Format a number of minutes as a human-readable duration.
 *
 * @deprecated Use {@link formatMinutesToDuration} (or `formatSecondsToDuration`
 * for seconds). Kept as an alias for backward compatibility.
 *
 * @example
 * formatDuration(90) // "1h e 30 min"
 */
export function formatDuration(
  minutes?: number | null,
  options: BuildDurationOptions = {},
): string {
  return buildDuration(minutes, options);
}
