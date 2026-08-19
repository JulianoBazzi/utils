// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadJson } from './downloadJson.js';

const createObjectURL = vi.fn((_blob: Blob) => 'blob:mock-url');
const revokeObjectURL = vi.fn();

function downloadedBlob(): Blob {
  return createObjectURL.mock.calls[0]?.[0] as Blob;
}

beforeEach(() => {
  createObjectURL.mockClear();
  revokeObjectURL.mockClear();

  vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('downloadJson', () => {
  it('downloads pretty-printed JSON by default', async () => {
    downloadJson({ a: 1 }, 'backup.json');

    const blob = downloadedBlob();

    expect(blob.type).toBe('application/json');
    await expect(blob.text()).resolves.toBe('{\n  "a": 1\n}');
  });

  it('minifies when space is 0', async () => {
    downloadJson({ a: 1 }, 'backup.json');
    createObjectURL.mockClear();

    downloadJson({ a: 1 }, 'backup.json', { space: 0 });

    await expect(downloadedBlob().text()).resolves.toBe('{"a":1}');
  });
});
