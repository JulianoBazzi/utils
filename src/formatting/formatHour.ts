import { type FormatTimeOptions, formatTime } from './formatTime.js';

/** Options of {@link formatHour}; same as {@link FormatTimeOptions}. */
export type FormatHourOptions = FormatTimeOptions;

/**
 * Legacy name of {@link formatTime}, kept for compatibility. It will be
 * removed in 2.0; prefer `formatTime`.
 *
 * @example
 * formatHour("2024-01-02T13:45:30") // "13:45"
 * formatHour("13:45:00") // "13:45"
 */
export const formatHour: typeof formatTime = formatTime;
