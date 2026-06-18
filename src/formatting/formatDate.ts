import dayjs from "dayjs";

/**
 * Format a date string as `DD/MM/YY` (or `DD/MM/YYYY` when not simplified).
 * Returns an empty string for missing input.
 *
 * @example
 * formatDate("2024-01-02") // "02/01/24"
 * formatDate("2024-01-02", false) // "02/01/2024"
 * formatDate(null, true, "Não Informado") // "Não Informado"
 */
export function formatDate(value?: string | null, simplified = true, fallback = ""): string {
  if (!value) return fallback;
  return dayjs(value).format(simplified ? "DD/MM/YY" : "DD/MM/YYYY");
}
