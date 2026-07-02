// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isPhotoLandscape } from './isPhotoLandscape.js';

class FakeImage {
  static shouldFail = false;
  static size = { width: 800, height: 600 };

  width = 0;
  height = 0;
  naturalWidth = 0;
  naturalHeight = 0;
  onload: (() => void) | null = null;
  onerror: ((error: unknown) => void) | null = null;

  set src(_value: string) {
    queueMicrotask(() => {
      if (FakeImage.shouldFail) {
        this.onerror?.(new Error('decode error'));
        return;
      }

      this.width = FakeImage.size.width;
      this.height = FakeImage.size.height;
      this.naturalWidth = FakeImage.size.width;
      this.naturalHeight = FakeImage.size.height;
      this.onload?.();
    });
  }
}

describe('isPhotoLandscape', () => {
  beforeEach(() => {
    FakeImage.shouldFail = false;
    FakeImage.size = { width: 800, height: 600 };
    vi.stubGlobal('Image', FakeImage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('resolves true for a landscape File', async () => {
    const file = new File(['image-bytes'], 'photo.png', { type: 'image/png' });

    await expect(isPhotoLandscape(file)).resolves.toBe(true);
  });

  it('resolves false for a portrait File', async () => {
    FakeImage.size = { width: 600, height: 800 };
    const file = new File(['image-bytes'], 'photo.png', { type: 'image/png' });

    await expect(isPhotoLandscape(file)).resolves.toBe(false);
  });

  it('resolves from an image URL using the natural dimensions', async () => {
    await expect(isPhotoLandscape('https://example.com/photo.png')).resolves.toBe(true);
  });

  it('resolves false when the URL fails to load', async () => {
    FakeImage.shouldFail = true;

    await expect(isPhotoLandscape('https://example.com/broken.png')).resolves.toBe(false);
  });

  it('resolves false when reading the File fails', async () => {
    FakeImage.shouldFail = true;
    const file = new File(['image-bytes'], 'broken.png', { type: 'image/png' });

    await expect(isPhotoLandscape(file)).resolves.toBe(false);
  });
});
