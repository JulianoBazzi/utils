import dayjs from "dayjs";

/**
 * Format a date string as `HH:mm` (or `HH:mm:ss` when not simplified).
 * Returns an empty string for missing input.
 *
 * @example
 * formatHour("2024-01-02T13:45:30") // "13:45"
 * formatHour("2024-01-02T13:45:30", false) // "13:45:30"
 * formatHour(null, true, "Não Informado") // "Não Informado"
 */
export function formatHour(value?: string | null, simplified = true, fallback = ""): string {
  if (!value) return fallback;
  return dayjs(value).format(simplified ? "HH:mm" : "HH:mm:ss");
}
