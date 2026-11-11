// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { captureVideoFrame } from './captureVideoFrame.js';

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

const video = (width: number, height: number) =>
  ({ videoWidth: width, videoHeight: height }) as HTMLVideoElement;

describe('captureVideoFrame', () => {
  beforeEach(() => {
    FakeCanvas.context = new FakeContext();
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) =>
      tag === 'canvas' ? (new FakeCanvas() as unknown as HTMLElement) : createElement(tag),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('captures the frame at the video size by default', () => {
    expect(captureVideoFrame(video(640, 480))).toBe('data:image/jpeg;q=0.75;640x480');
  });

  it('scales down and mirrors', () => {
    const frame = captureVideoFrame(video(1920, 1080), {
      maxEdge: 960,
      mirror: true,
      mimeType: 'image/webp',
      quality: 0.5,
    });
    expect(frame).toBe('data:image/webp;q=0.5;960x540');
    expect(FakeCanvas.context?.calls.slice(0, 2)).toEqual([
      ['translate', 960, 0],
      ['scale', -1, 1],
    ]);
  });

  it('throws without a frame or a 2D context', () => {
    expect(() => captureVideoFrame(video(0, 0))).toThrow(
      'Não foi possível capturar a imagem da câmera.',
    );
    FakeCanvas.context = null;
    expect(() => captureVideoFrame(video(640, 480))).toThrow();
  });
});
