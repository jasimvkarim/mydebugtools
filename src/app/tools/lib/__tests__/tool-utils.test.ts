import {
  buildDiffFromText,
  decodeJwtSegment,
  parseSizeToBytes,
  runRegexTest,
} from '../tool-utils';

describe('tool utilities', () => {
  describe('decodeJwtSegment', () => {
    it('decodes base64url JWT segments without padding', () => {
      expect(decodeJwtSegment('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')).toEqual({
        alg: 'HS256',
        typ: 'JWT',
      });
    });
  });

  describe('runRegexTest', () => {
    it('does not duplicate the global flag when collecting matches', () => {
      expect(runRegexTest('\\d+', 'a1 b22', ['g'])).toMatchObject({
        match: true,
        matches: ['1', '22'],
      });
    });

    it('terminates when a pattern matches an empty string', () => {
      expect(runRegexTest('.*?', 'abc', ['g']).matches.length).toBeGreaterThan(0);
    });
  });

  describe('buildDiffFromText', () => {
    it('parses common size units as bytes', () => {
      expect(parseSizeToBytes('1', 'KB')).toBe(1024);
      expect(parseSizeToBytes('1.5', 'MB')).toBe(1572864);
      expect(parseSizeToBytes('512', 'B')).toBe(512);
    });

    it('compares supplied old and new build text directly', () => {
      const diff = buildDiffFromText('a.js 1024\nzero.js 0', 'a.js 2048\nb.js 512\nzero.js 0');

      expect(diff.totalAdded).toBe(512);
      expect(diff.totalModified).toBe(1024);
      expect(diff.totalRemoved).toBe(0);
      expect(diff.changes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'modified', path: 'a.js', oldSize: 1024, newSize: 2048 }),
          expect.objectContaining({ type: 'added', path: 'b.js', newSize: 512 }),
        ])
      );
    });

    it('compares build text with explicit size units', () => {
      const diff = buildDiffFromText('a.js 1 KB', 'a.js 2 KB\nb.js 1 MB');

      expect(diff.totalAdded).toBe(1048576);
      expect(diff.totalModified).toBe(1024);
    });
  });
});
