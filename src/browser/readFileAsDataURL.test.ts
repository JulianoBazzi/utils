// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFileAsDataURL } from './readFileAsDataURL.js';

describe('readFileAsDataURL', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reads a blob as a data URL', async () => {
    const dataUrl = await readFileAsDataURL(new Blob(['hi'], { type: 'text/plain' }));
    expect(dataUrl).toBe('data:text/plain;base64,aGk=');
  });

  it('rejects when the read fails', async () => {
    class FailingReader {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      readAsDataURL() {
        queueMicrotask(() => this.onerror?.());
      }
    }
    vi.stubGlobal('FileReader', FailingReader);
    await expect(readFileAsDataURL(new Blob(['x']))).rejects.toThrow('Falha ao ler o arquivo.');
  });
});
