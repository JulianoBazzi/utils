import { describe, expect, it, vi } from 'vitest';
import { readResponseWithProgress } from './readResponseWithProgress.js';

const streamOf = (...chunks: string[]) =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });

describe('readResponseWithProgress', () => {
  it('reads the body and reports progress against Content-Length', async () => {
    const response = new Response(streamOf('abc', 'de'), {
      headers: { 'content-length': '5', 'content-type': 'text/plain' },
    });
    const onProgress = vi.fn();
    const blob = await readResponseWithProgress(response, { onProgress, stepBytes: 3 });
    expect(await blob.text()).toBe('abcde');
    expect(blob.type).toBe('text/plain');
    expect(onProgress.mock.calls).toEqual([
      [3, 5],
      [5, 5],
    ]);
  });

  it('reports total 0 when more bytes arrive than announced', async () => {
    const response = new Response(streamOf('abcdef'), { headers: { 'content-length': '2' } });
    const onProgress = vi.fn();
    await readResponseWithProgress(response, { onProgress });
    expect(onProgress).toHaveBeenLastCalledWith(6, 0);
  });

  it('handles a response without a body', async () => {
    const onProgress = vi.fn();
    const blob = await readResponseWithProgress(new Response(null), { onProgress });
    expect(blob.size).toBe(0);
    expect(onProgress).toHaveBeenCalledWith(0, 0);
  });

  it('rejects for an already-aborted signal', async () => {
    const controller = new AbortController();
    controller.abort(new Error('stop'));
    await expect(
      readResponseWithProgress(new Response('x'), { signal: controller.signal }),
    ).rejects.toThrow('stop');
  });

  it('cancels the stream when aborted mid-download and removes the listener', async () => {
    const controller = new AbortController();
    const remove = vi.spyOn(controller.signal, 'removeEventListener');
    let push: (chunk: string) => void = () => undefined;
    const body = new ReadableStream<Uint8Array>({
      start(stream) {
        push = (chunk) => stream.enqueue(new TextEncoder().encode(chunk));
      },
      cancel() {
        // A failing cancel must not surface as an unhandled rejection.
        throw new Error('cancel failed');
      },
    });
    const promise = readResponseWithProgress(new Response(body), { signal: controller.signal });
    push('a');
    await Promise.resolve();
    controller.abort(new Error('cancelled'));
    await expect(promise).rejects.toThrow('cancelled');
    expect(remove).toHaveBeenCalledWith('abort', expect.any(Function));
  });

  it('stops reading when the signal aborts between chunks', async () => {
    const controller = new AbortController();
    const body = new ReadableStream<Uint8Array>({
      pull(stream) {
        controller.abort(new Error('late'));
        stream.enqueue(new TextEncoder().encode('a'));
      },
    });
    await expect(
      readResponseWithProgress(new Response(body), { signal: controller.signal }),
    ).rejects.toThrow('late');
  });
});
