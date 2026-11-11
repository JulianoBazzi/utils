import { onlyNumbers } from './onlyNumbers.js';

export interface FormatCPFOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
  /**
   * Left-pad short input with zeros before masking. Defaults to `true`; with
   * `false`, input that is not exactly 11 digits long comes back as plain
   * digits instead of looking like a valid document. The default becomes
   * `false` in 2.0.
   */
  pad?: boolean;
}

/**
 * Format a CPF as `000.000.000-00`. Pads with leading zeros by default (pass
 * `pad: false` to leave incomplete input unmasked); values with more than 11
 * digits are returned as plain digits. Returns `fallback` for missing input.
 *
 * @example
 * formatCPF("52998224725") // "529.982.247-25"
 * formatCPF("1") // "000.000.000-01"
 * formatCPF("1", { pad: false }) // "1"
 * formatCPF("", { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatCPF(value?: string | null, options: FormatCPFOptions = {}): string {
  const { fallback = '', pad = true } = options;
  const cpf = onlyNumbers(value);
  if (!cpf) return fallback;
  if (!pad && cpf.length !== 11) return cpf;

  return cpf.padStart(11, '0').replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}
