interface FormatDurationOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a number of minutes as a human-readable duration.
 * Sub-minute values render as seconds. Returns an empty string for missing input.
 *
 * @example
 * formatDuration(90) // "1h e 30 min"
 * formatDuration(120) // "2h"
 * formatDuration(45) // "45 min"
 * formatDuration(0.5) // "30s"
 * formatDuration(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatDuration(
  minutes?: number | null,
  options: FormatDurationOptions = {},
): string {
  const { fallback = '' } = options;
  if (!minutes) {
    return fallback;
  }

  if (minutes < 1) {
    return `${minutes * 60}s`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}h e ${remainingMinutes} min`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${remainingMinutes} min`;
}
