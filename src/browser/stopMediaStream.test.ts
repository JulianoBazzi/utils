import { describe, expect, it, vi } from 'vitest';
import { stopMediaStream } from './stopMediaStream.js';

describe('stopMediaStream', () => {
  it('stops every track', () => {
    const tracks = [{ stop: vi.fn() }, { stop: vi.fn() }];
    stopMediaStream({ getTracks: () => tracks } as unknown as MediaStream);
    for (const track of tracks) expect(track.stop).toHaveBeenCalledTimes(1);
  });

  it('ignores a missing stream', () => {
    expect(() => stopMediaStream(null)).not.toThrow();
    expect(() => stopMediaStream()).not.toThrow();
  });
});
