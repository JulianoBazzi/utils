/**
 * Format a boolean as a Portuguese yes/no label.
 *
 * @example
 * formatBoolean(true) // "Sim"
 * formatBoolean(false) // "Não"
 */
export function formatBoolean(value?: boolean | null): string {
  return value ? "Sim" : "Não";
}
