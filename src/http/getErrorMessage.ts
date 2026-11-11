import { read } from './internal/read.js';

export interface GetErrorMessageOptions {
  /** Returned when no message is found. Defaults to `""`. */
  fallback?: string;
}

const text = (value: unknown) => (typeof value === 'string' && value.trim() ? value : undefined);

/**
 * Best human-readable message of an error: the API's `response.data.message`
 * (axios), then `error.message`, then the error itself when it is a string.
 *
 * @example
 * getErrorMessage(axiosError) // "O e-mail já está em uso." (from the API body)
 * getErrorMessage(new Error("Timeout")) // "Timeout"
 * getErrorMessage(null, { fallback: "Erro inesperado" }) // "Erro inesperado"
 */
export function getErrorMessage(error: unknown, options: GetErrorMessageOptions = {}): string {
  return (
    text(read(read(read(error, 'response'), 'data'), 'message')) ??
    text(read(error, 'message')) ??
    text(error) ??
    options.fallback ??
    ''
  );
}
