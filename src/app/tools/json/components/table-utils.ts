export type Row = Record<string, any>;
export interface TableSource { path: string; keys: string[]; rows: Row[]; indices: number[]; total: number }
const isRow = (v: any): v is Row => v !== null && typeof v === 'object' && !Array.isArray(v);
export const pathLabel = (keys: (string | number)[]) => '$' + keys.map(k => typeof k === 'number' ? `[${k}]` : `[${JSON.stringify(k)}]`).join('');
export function findTables(value: any): TableSource[] {
  const found: TableSource[] = [];
  const walk = (v: any, keys: string[], depth: number) => {
    if (Array.isArray(v) && v.length) {
      const indices: number[] = [];
      v.forEach((r, i) => { if (isRow(r)) indices.push(i); });
      if (indices.length >= Math.max(1, Math.ceil(v.length * 0.8))) {
        found.push({ path: pathLabel(keys), keys, rows: indices.map(i => v[i]), indices, total: v.length });
        return;
      }
    }
    if (depth >= 3 || !isRow(v)) return;
    Object.keys(v).forEach(k => walk(v[k], [...keys, k], depth + 1));
  };
  walk(value, [], 0);
  return found;
}
export const cellText = (v: any): string => v === undefined ? '' : v !== null && typeof v === 'object' ? JSON.stringify(v) : String(v);
// Spreadsheet apps interpret formula-looking fields even when CSV-quoted.
export const csvEscape = (s: string, neutralize = true) => {
  const safe = neutralize && /^[\s]*[=+@-]/.test(s) ? `'${s}` : s;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
};
export const toCsv = (rows: Row[], columns: string[]) => [columns.map(c => csvEscape(c)).join(','), ...rows.map(r => columns.map(c => csvEscape(cellText(r[c]), typeof r[c] === 'string')).join(','))].join('\r\n');
export function replaceCell(root: any, keys: string[], index: number, column: string, value: any) {
  // Clone through JSON, then use own properties only (including literal __proto__ keys).
  const copy = JSON.parse(JSON.stringify(root));
  let array = copy;
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(array, key)) throw new Error('Array no longer exists');
    array = array[key];
  }
  if (!Array.isArray(array) || !isRow(array[index])) throw new Error('Row no longer exists');
  Object.defineProperty(array[index], column, { value, enumerable: true, configurable: true, writable: true });
  return copy;
}
