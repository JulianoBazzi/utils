import { type BuildDurationOptions, buildDuration } from './internal/buildDuration.js';

/**
 * Format a number of seconds as a human-readable duration.
 * Sub-minute values render as seconds; values >= 60s are rounded to whole
 * minutes (e.g. `90` → `"2 min"`). Returns an empty string for missing input.
 *
 * @example
 * formatSecondsToDuration(30) // "30s"
 * formatSecondsToDuration(90) // "2 min"
 * formatSecondsToDuration(3600) // "1h"
 * formatSecondsToDuration(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatSecondsToDuration(
  seconds?: number | null,
  options: BuildDurationOptions = {},
): string {
  return buildDuration(seconds == null ? seconds : seconds / 60, options);
}
