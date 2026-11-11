export interface ReadResponseWithProgressOptions {
  /** Abort the download; the promise rejects with `signal.reason`. */
  signal?: AbortSignal;
  /**
   * Called every `stepBytes` and once at the end. `total` comes from
   * `Content-Length`; it is `0` when unknown — including when more bytes
   * arrive than announced (a compressed response), so a percentage never
   * passes 100%.
   */
  onProgress?: (received: number, total: number) => void;
  /** Minimum bytes between progress calls. Defaults to 256 KiB. */
  stepBytes?: number;
}

/**
 * Read a `fetch` `Response` body into a `Blob`, reporting progress. Honours an
 * already-aborted signal, cancels the stream on abort and always removes its
 * abort listener.
 *
 * @example
 * const response = await fetch(url, { signal });
 * const blob = await readResponseWithProgress(response, {
 *   signal,
 *   onProgress: (received, total) => setProgress(percentOf(received, total)),
 * });
 */
export async function readResponseWithProgress(
  response: Response,
  options: ReadResponseWithProgressOptions = {},
): Promise<Blob> {
  const { signal, onProgress, stepBytes = 256 * 1024 } = options;
  if (signal?.aborted) {
    throw signal.reason;
  }

  const announced = Number(response.headers.get('content-length')) || 0;
  const type = response.headers.get('content-type') ?? '';
  let received = 0;
  const report = () => onProgress?.(received, received <= announced ? announced : 0);

  if (!response.body) {
    const blob = await response.blob();
    received = blob.size;
    report();
    return blob;
  }

  const reader = response.body.getReader();
  const cancel = () => {
    reader.cancel(signal?.reason).catch(() => undefined);
  };
  signal?.addEventListener('abort', cancel, { once: true });

  const chunks: Uint8Array[] = [];
  let reported = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (signal?.aborted) {
        throw signal.reason;
      }
      if (done) break;
      chunks.push(value);
      received += value.byteLength;
      if (received - reported >= stepBytes) {
        reported = received;
        report();
      }
    }
  } finally {
    signal?.removeEventListener('abort', cancel);
  }

  report();
  return new Blob(chunks as BlobPart[], { type });
}
