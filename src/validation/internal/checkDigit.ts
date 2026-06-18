/**
 * Mod-11 check digit for CPF/CNPJ. Each character contributes its value
 * `charCodeAt(0) - 48` ('0'..'9' → 0–9, 'A'..'Z' → 17–42), so the same routine
 * covers numeric (CPF, legacy CNPJ) and alphanumeric (new CNPJ) documents.
 *
 * @internal
 */
export function checkDigit(value: string, weights: number[]): number {
  let sum = 0;
  weights.forEach((weight, index) => {
    sum += (value.charCodeAt(index) - 48) * weight;
  });

  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}
