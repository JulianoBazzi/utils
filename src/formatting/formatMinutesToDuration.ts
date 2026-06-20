import { type BuildDurationOptions, buildDuration } from './internal/buildDuration.js';

/**
 * Format a number of minutes as a human-readable duration.
 * Sub-minute values render as seconds. Returns an empty string for missing input.
 *
 * @example
 * formatMinutesToDuration(90) // "1h e 30 min"
 * formatMinutesToDuration(120) // "2h"
 * formatMinutesToDuration(45) // "45 min"
 * formatMinutesToDuration(0.5) // "30s"
 * formatMinutesToDuration(90, { spaced: true }) // "1 h e 30 min"
 * formatMinutesToDuration(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatMinutesToDuration(
  minutes?: number | null,
  options: BuildDurationOptions = {},
): string {
  return buildDuration(minutes, options);
}
