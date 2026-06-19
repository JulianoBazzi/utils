import { onlyAlphanumeric } from "../formatting/onlyAlphanumeric.js";
import { isValidCNPJ } from "./isValidCNPJ.js";
import { isValidCPF } from "./isValidCPF.js";

/**
 * Validate a value as either a CPF (11 chars) or a CNPJ (14 chars).
 *
 * @example
 * isValidDocument("529.982.247-25") // true (CPF)
 * isValidDocument("11.222.333/0001-81") // true (CNPJ)
 */
export function isValidDocument(value?: string): boolean {
  const length = onlyAlphanumeric(value).length;

  if (length === 11) return isValidCPF(value);
  if (length === 14) return isValidCNPJ(value);

  return false;
}
