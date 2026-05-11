import {
  bytesToHex,
  formatTimestamp,
  generateUuidBatch,
} from '../simple-tools';

describe('simple tool helpers', () => {
  it('formats bytes as lowercase hex', () => {
    expect(bytesToHex(new Uint8Array([0, 15, 16, 255]))).toBe('000f10ff');
  });

  it('generates the requested number of UUIDs', () => {
    const ids = generateUuidBatch(3);

    expect(ids).toHaveLength(3);
    ids.forEach((id) => {
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });
  });

  it('formats unix seconds and milliseconds consistently', () => {
    expect(formatTimestamp('1704067200')?.iso).toBe('2024-01-01T00:00:00.000Z');
    expect(formatTimestamp('1704067200000')?.unixSeconds).toBe(1704067200);
  });
});
