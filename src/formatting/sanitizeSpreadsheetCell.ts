/**
 * Neutralize CSV/spreadsheet formula injection: if the value starts with a
 * dangerous character (`=`, `+`, `-`, `@`, tab or CR), prefix a single quote so
 * spreadsheet apps treat it as text. Otherwise returns the value unchanged.
 * Empty input → `""`.
 *
 * @example
 * sanitizeSpreadsheetCell("=SUM(A1:A2)") // "'=SUM(A1:A2)"
 * sanitizeSpreadsheetCell("João") // "João"
 */
export function sanitizeSpreadsheetCell(value?: string | null): string {
  if (!value) {
    return '';
  }

  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}
