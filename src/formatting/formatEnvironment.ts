import { normalizeEnvironment } from './normalizeEnvironment.js';

/**
 * Legacy name of {@link normalizeEnvironment} (it normalizes, it does not
 * format), kept for compatibility. It will be removed in 2.0.
 *
 * @example
 * formatEnvironment(" Homologation ") // "homologation"
 */
export const formatEnvironment: typeof normalizeEnvironment = normalizeEnvironment;
