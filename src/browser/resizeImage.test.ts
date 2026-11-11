// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resizeImage } from './resizeImage.js';

class FakeContext {
  calls: unknown[][] = [];
  translate(...args: unknown[]) {
    this.calls.push(['translate', ...args]);
  }
  scale(...args: unknown[]) {
    this.calls.push(['scale', ...args]);
  }
  drawImage(...args: unknown[]) {
    this.calls.push(['drawImage', ...args.slice(1)]);
  }
}

class FakeCanvas {
  static context: FakeContext | null = new FakeContext();
  static blob: Blob | null = new Blob(['jpeg'], { type: 'image/jpeg' });
  width = 0;
  height = 0;
  getContext() {
    return FakeCanvas.context;
  }
  toDataURL(type: string, quality: number) {
    return `data:${type};q=${quality};${this.width}x${this.height}`;
  }
  toBlob(callback: (blob: Blob | null) => void) {
    callback(FakeCanvas.blob);
  }
}

const createElement = document.createElement.bind(document);

class FakeImage {
  static shouldFail = false;
  static natural = { width: 4000, height: 3000 };
  naturalWidth = 0;
  naturalHeight = 0;
  width = 0;
  height = 0;
  onload: (() => void) | null = null;
  onerror: ((error: unknown) => void) | null = null;
  set src(_value: string) {
    queueMicrotask(() => {
      if (FakeImage.shouldFail) {
        this.onerror?.(new Error('decode'));
        return;
      }
      this.naturalWidth = FakeImage.natural.width;
      this.naturalHeight = FakeImage.natural.height;
      this.width = FakeImage.natural.width;
      this.height = FakeImage.natural.height;
      this.onload?.();
    });
  }
}

describe('resizeImage', () => {
  beforeEach(() => {
    FakeImage.shouldFail = false;
    FakeImage.natural = { width: 4000, height: 3000 };
    FakeCanvas.context = new FakeContext();
    FakeCanvas.blob = new Blob(['jpeg'], { type: 'image/jpeg' });
    vi.stubGlobal('Image', FakeImage);
    vi.stubGlobal('URL', { createObjectURL: () => 'blob:x', revokeObjectURL: () => undefined });
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) =>
      tag === 'canvas' ? (new FakeCanvas() as unknown as HTMLElement) : createElement(tag),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('resizes to a Blob by default', async () => {
    const blob = await resizeImage(new Blob(['x']), { maxEdge: 1000 });
    expect(blob).toBe(FakeCanvas.blob);
    expect(FakeCanvas.context?.calls[0]).toEqual(['drawImage', 0, 0, 1000, 750]);
  });

  it('returns a data URL on request', async () => {
    const url = await resizeImage(new Blob(['x']), {
      maxEdge: 1000,
      output: 'dataUrl',
      quality: 0.75,
    });
    expect(url).toBe('data:image/jpeg;q=0.75;1000x750');
  });

  it('rejects an empty image (no natural or plain size)', async () => {
    FakeImage.natural = { width: 0, height: 0 };
    await expect(resizeImage(new Blob(['x']), { maxEdge: 100 })).rejects.toThrow(
      'Não foi possível redimensionar a imagem.',
    );
  });

  it('rejects when the image cannot be decoded or encoded', async () => {
    FakeImage.shouldFail = true;
    await expect(resizeImage(new Blob(['x']), { maxEdge: 100 })).rejects.toThrow(
      'Não foi possível redimensionar a imagem.',
    );
    FakeImage.shouldFail = false;
    FakeCanvas.blob = null;
    await expect(resizeImage(new Blob(['x']), { maxEdge: 100 })).rejects.toThrow(
      'Não foi possível redimensionar a imagem.',
    );
  });
});
