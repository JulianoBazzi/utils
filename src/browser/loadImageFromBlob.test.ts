// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadImageFromBlob } from './loadImageFromBlob.js';

class FakeImage {
  static shouldFail = false;

  onload: (() => void) | null = null;
  onerror: ((error: unknown) => void) | null = null;

  set src(_value: string) {
    queueMicrotask(() => {
      if (FakeImage.shouldFail) {
        this.onerror?.(new Error('decode error'));
      } else {
        this.onload?.();
      }
    });
  }
}

const createObjectURL = vi.fn(() => 'blob:mock-url');
const revokeObjectURL = vi.fn();

describe('loadImageFromBlob', () => {
  beforeEach(() => {
    FakeImage.shouldFail = false;
    createObjectURL.mockClear();
    revokeObjectURL.mockClear();
    vi.stubGlobal('Image', FakeImage);
    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('resolves with the image and revokes the object URL', async () => {
    const blob = new Blob(['image-bytes']);
    const img = await loadImageFromBlob(blob);

    expect(img).toBeInstanceOf(FakeImage);
    expect(createObjectURL).toHaveBeenCalledWith(blob);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('rejects on load error and still revokes the object URL', async () => {
    FakeImage.shouldFail = true;

    await expect(loadImageFromBlob(new Blob(['bad']))).rejects.toThrow('decode error');
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });
});
