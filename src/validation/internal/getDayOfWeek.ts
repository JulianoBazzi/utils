import dayjs from 'dayjs';

/**
 * Day of week index (0 = Sunday .. 6 = Saturday) for a date, or `null` for
 * missing/invalid input. `dayjs(undefined)` would resolve to "now", so empty
 * values are rejected before parsing.
 */
export function getDayOfWeek(value?: Date | string | null): number | null {
  if (!value) return null;

  const date = dayjs(value);
  return date.isValid() ? date.day() : null;
}
