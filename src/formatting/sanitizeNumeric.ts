export interface SanitizeNumericOptions {
  /** Keep the first `.` or `,` as the decimal separator. Defaults to `false`. */
  allowDecimal?: boolean;
  /** Keep one leading `-`. Defaults to `false`. */
  allowNegative?: boolean;
}

/**
 * Keep only what a numeric input may contain: digits, plus optionally the
 * first decimal separator and a leading minus. Use it in `onChange`, since
 * paste, autofill and virtual keyboards slip past `keydown` filters.
 *
 * @example
 * sanitizeNumeric("a1b2") // "12"
 * sanitizeNumeric("1.2,3", { allowDecimal: true }) // "1.23"
 * sanitizeNumeric("12-3", { allowNegative: true }) // "123"
 * sanitizeNumeric("-1-2", { allowNegative: true }) // "-12"
 */
export function sanitizeNumeric(
  value?: string | null,
  options: SanitizeNumericOptions = {},
): string {
  const { allowDecimal = false, allowNegative = false } = options;
  let output = '';
  let hasDecimal = false;

  for (const char of value ?? '') {
    if (char >= '0' && char <= '9') {
      output += char;
    } else if (allowDecimal && !hasDecimal && (char === '.' || char === ',')) {
      output += char;
      hasDecimal = true;
    } else if (allowNegative && char === '-' && output === '') {
      output = '-';
    }
  }

  return output;
}
