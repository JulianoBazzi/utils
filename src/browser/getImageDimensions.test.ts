// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getImageDimensions } from './getImageDimensions.js';

class FakeImage {
  static shouldFail = false;
  static size = { width: 800, height: 600 };

  width = 0;
  height = 0;
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
      this.onload?.();
    });
  }
}

describe('getImageDimensions', () => {
  beforeEach(() => {
    FakeImage.shouldFail = false;
    FakeImage.size = { width: 800, height: 600 };
    vi.stubGlobal('Image', FakeImage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('resolves the dimensions and the extension from the file name', async () => {
    const file = new File(['image-bytes'], 'photo.png', { type: 'image/png' });

    await expect(getImageDimensions(file)).resolves.toEqual({
      width: 800,
      height: 600,
      extension: 'png',
    });
  });

  it('falls back to the MIME subtype, then "jpeg"', async () => {
    const blobNamed = new File(['image-bytes'], 'blob', { type: 'image/png' });
    await expect(getImageDimensions(blobNamed)).resolves.toMatchObject({ extension: 'png' });

    const untyped = new File(['image-bytes'], '', { type: '' });
    await expect(getImageDimensions(untyped)).resolves.toMatchObject({ extension: 'jpeg' });
  });

  it('rejects when the image fails to load', async () => {
    FakeImage.shouldFail = true;
    const file = new File(['image-bytes'], 'broken.png', { type: 'image/png' });

    await expect(getImageDimensions(file)).rejects.toThrow(
      'Falha ao obter as dimensões da imagem.',
    );
  });

  it('rejects when the file cannot be read', async () => {
    class FakeFileReader {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      readAsDataURL(_file: File) {
        queueMicrotask(() => this.onerror?.());
      }
    }
    vi.stubGlobal('FileReader', FakeFileReader);
    const file = new File(['image-bytes'], 'photo.png', { type: 'image/png' });

    await expect(getImageDimensions(file)).rejects.toThrow(
      'Falha ao obter as dimensões da imagem.',
    );
  });
});
