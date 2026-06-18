import dayjs from "dayjs";

/**
 * Format a date string as `MM/YYYY`.
 * Returns an empty string for missing input.
 *
 * @example
 * formatMonth("2024-01-02") // "01/2024"
 */
export function formatMonth(value?: string | null): string {
  if (!value) return "";
  return dayjs(value).format("MM/YYYY");
}
