import dayjs from "dayjs";

/**
 * Format a date string as `HH:mm`.
 * Returns an empty string for missing input.
 *
 * @example
 * formatHour("2024-01-02T13:45:00") // "13:45"
 */
export function formatHour(value?: string | null): string {
  if (!value) return "";
  return dayjs(value).format("HH:mm");
}
