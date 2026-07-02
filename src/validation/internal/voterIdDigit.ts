/**
 * TSE check-digit rule for voter registration numbers: rest 0 → 0 (but 1 in
 * SP/MG), rest 10 → 0, otherwise the rest itself.
 *
 * @internal
 */
export function voterIdDigit(sum: number, isSpOrMg: boolean): number {
  const rest = sum % 11;
  if (rest === 0) return isSpOrMg ? 1 : 0;
  if (rest === 10) return 0;
  return rest;
}
