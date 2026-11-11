import { type RoundIntegerOptions, roundInteger } from './roundInteger.js';

/** Options of {@link formatInteger}; same as {@link RoundIntegerOptions}. */
export type FormatIntegerOptions = RoundIntegerOptions;

/**
 * Legacy name of {@link roundInteger} (it returns a number, it does not
 * format), kept for compatibility. It will be removed in 2.0.
 *
 * @example
 * formatInteger(1.6) // 2
 */
export const formatInteger: typeof roundInteger = roundInteger;
