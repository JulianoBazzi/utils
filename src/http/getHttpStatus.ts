import { read } from './internal/read.js';

/**
 * HTTP status carried by an error, read structurally (no axios import):
 * `error.response.status` (axios, ky), then `error.status` (`Response`, fetch
 * wrappers), then `error.statusCode` (Node, some SDKs). `undefined` otherwise
 * — e.g. a network error.
 *
 * @example
 * getHttpStatus(axiosError) // 422
 * getHttpStatus(new Error("offline")) // undefined
 */
export function getHttpStatus(error: unknown): number | undefined {
  const candidates = [
    read(read(error, 'response'), 'status'),
    read(error, 'status'),
    read(error, 'statusCode'),
  ];
  return candidates.find((status): status is number => typeof status === 'number');
}
