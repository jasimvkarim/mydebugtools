export interface RegexResults {
  match: boolean;
  matches: string[];
  groups: string[][];
}

export interface DiffChange {
  type: 'added' | 'removed' | 'modified';
  path: string;
  oldSize?: number;
  newSize?: number;
  diff?: number;
}

export interface DiffData {
  changes: DiffChange[];
  totalAdded: number;
  totalRemoved: number;
  totalModified: number;
}

export function decodeJwtSegment(segment: string): unknown {
  const normalized = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const binary = globalThis.atob
    ? globalThis.atob(padded)
    : Buffer.from(padded, 'base64').toString('binary');
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const decoded = typeof TextDecoder !== 'undefined'
    ? new TextDecoder().decode(bytes)
    : decodeURIComponent(binary.split('').map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`).join(''));

  return JSON.parse(decoded);
}

export function runRegexTest(pattern: string, testString: string, selectedFlags: string[]): RegexResults {
  const flags = Array.from(new Set(selectedFlags)).join('');
  const regex = new RegExp(pattern, flags);
  const match = regex.test(testString);
  const matches: string[] = [];
  const groups: string[][] = [];

  if (match) {
    const globalFlags = flags.includes('g') ? flags : `${flags}g`;
    const regexWithGlobal = new RegExp(pattern, globalFlags);
    let result: RegExpExecArray | null;

    while ((result = regexWithGlobal.exec(testString)) !== null) {
      matches.push(result[0]);
      groups.push(result.slice(1));

      if (result[0] === '') {
        regexWithGlobal.lastIndex += 1;
      }
    }
  }

  return { match, matches, groups };
}

function parseBuildData(build: string): Map<string, number> {
  const files = new Map<string, number>();

  build.split('\n').forEach((line) => {
    const match = line.match(/(.+?)\s+(\d+\.?\d*)/);
    if (match) {
      const [, path, size] = match;
      files.set(path, parseFloat(size));
    }
  });

  return files;
}

export function buildDiffFromText(oldBuild: string, newBuild: string): DiffData {
  const oldFiles = parseBuildData(oldBuild);
  const newFiles = parseBuildData(newBuild);
  const changes: DiffChange[] = [];
  let totalAdded = 0;
  let totalRemoved = 0;
  let totalModified = 0;

  newFiles.forEach((newSize, path) => {
    const oldSize = oldFiles.get(path);
    if (oldSize === undefined) {
      changes.push({ type: 'added', path, newSize });
      totalAdded += newSize;
    } else if (oldSize !== newSize) {
      changes.push({
        type: 'modified',
        path,
        oldSize,
        newSize,
        diff: newSize - oldSize,
      });
      totalModified += Math.abs(newSize - oldSize);
    }
  });

  oldFiles.forEach((oldSize, path) => {
    if (!newFiles.has(path)) {
      changes.push({ type: 'removed', path, oldSize });
      totalRemoved += oldSize;
    }
  });

  return {
    changes: changes.sort((a, b) => {
      const typeOrder = { added: 0, modified: 1, removed: 2 };
      const typeDiff = typeOrder[a.type] - typeOrder[b.type];
      if (typeDiff !== 0) return typeDiff;

      const aSize = Math.abs(a.diff || a.newSize || a.oldSize || 0);
      const bSize = Math.abs(b.diff || b.newSize || b.oldSize || 0);
      return bSize - aSize;
    }),
    totalAdded,
    totalRemoved,
    totalModified,
  };
}
