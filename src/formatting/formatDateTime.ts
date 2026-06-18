import dayjs from "dayjs";

/**
 * Format a date string as `DD/MM/YY HH:mm` (or `DD/MM/YYYY HH:mm` when not simplified).
 * Returns an empty string for missing input.
 *
 * @example
 * formatDateTime("2024-01-02T13:45:00") // "02/01/24 13:45"
 * formatDateTime("2024-01-02T13:45:00", false) // "02/01/2024 13:45"
 * formatDateTime(null, true, "Não Informado") // "Não Informado"
 */
export function formatDateTime(date?: string | null, simplified = true, fallback = ""): string {
  if (!date) return fallback;
  return dayjs(date).format(simplified ? "DD/MM/YY HH:mm" : "DD/MM/YYYY HH:mm");
}
