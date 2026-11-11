// A formula trigger, possibly after leading whitespace, or a leading tab/CR.
const DANGEROUS = /^(\s*[=+\-@]|[\t\r])/;
// Plain negative numbers ("-5", "-1,5", "-1.234,56") are data, not formulas.
const NEGATIVE_NUMBER = /^-\d+([.,]\d+)*$/;

/**
 * Neutralize CSV/spreadsheet formula injection: if the value starts with a
 * dangerous character (`=`, `+`, `-`, `@` — even after leading spaces — or a
 * tab/CR), prefix a single quote so spreadsheet apps treat it as text. Plain
 * negative numbers are left alone. Empty input → `""`.
 *
 * @example
 * sanitizeSpreadsheetCell("=SUM(A1:A2)") // "'=SUM(A1:A2)"
 * sanitizeSpreadsheetCell(" =1+1") // "' =1+1"
 * sanitizeSpreadsheetCell("-5") // "-5"
 * sanitizeSpreadsheetCell("João") // "João"
 */
export function sanitizeSpreadsheetCell(value?: string | null): string {
  if (!value) {
    return '';
  }

  if (NEGATIVE_NUMBER.test(value.trim())) {
    return value;
  }

  return DANGEROUS.test(value) ? `'${value}` : value;
}
