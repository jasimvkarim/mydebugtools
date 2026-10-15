'use client';

import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { cellText, pathLabel, toCsv, TableSource } from './table-utils';
export { findTables } from './table-utils';
export type { TableSource } from './table-utils';
const PAGE = 200;
const btn = 'rounded-md px-2.5 py-1.5 text-sm font-semibold text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0969da] disabled:opacity-40';

function NestedValue({ value, name = 'value', depth = 0 }: { value: any; name?: string; depth?: number }) {
  if (value === null || typeof value !== 'object') return <span className="whitespace-pre-wrap break-words font-mono text-xs">{JSON.stringify(value) ?? '(missing)'}</span>;
  const entries = Object.entries(value);
  if (depth >= 8) return <pre className="overflow-auto text-xs">{JSON.stringify(value, null, 2)}</pre>;
  return <details open={depth === 0} className="min-w-0 text-sm">
    <summary className="cursor-pointer py-1 text-[#57606a]">{name} · {entries.length} {Array.isArray(value) ? 'items' : 'keys'}</summary>
    <div className="ml-3 space-y-1 pl-2">
      {entries.slice(0, 100).map(([k, v]) => <div key={k} className="min-w-0"><span className="mr-3 break-all font-mono text-xs text-[#6e7781]">{k}</span><NestedValue value={v} name={k} depth={depth + 1} /></div>)}
      {entries.length > 100 && <p className="text-xs text-[#6e7781]">First 100 entries shown. Copy value or edit JSON for the full value.</p>}
    </div>
  </details>;
}

export default function TableView({ tables, onEdit, onUndo, canUndo = false }: {
  tables: TableSource[]; onEdit?: (table: TableSource, index: number, column: string, value: any) => void; onUndo?: () => void; canUndo?: boolean;
}) {
  const [sourcePath, setSourcePath] = useState(tables[0]?.path);
  const table = tables.find(t => t.path === sourcePath) || tables[0];
  return <TableBody key={table.path} table={table} tables={tables} choose={setSourcePath} onEdit={onEdit} onUndo={onUndo} canUndo={canUndo} />;
}

function TableBody({ table, tables, choose, onEdit, onUndo, canUndo }: {
  table: TableSource; tables: TableSource[]; choose: (path: string) => void;
  onEdit?: (table: TableSource, index: number, column: string, value: any) => void; onUndo?: () => void; canUndo: boolean;
}) {
  const [sort, setSort] = useState<{key: string; asc: boolean} | null>(null);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [filterColumn, setFilterColumn] = useState('');
  const [page, setPage] = useState(0);
  const [hidden, setHidden] = useState<string[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [showColumns, setShowColumns] = useState(false);
  const [selected, setSelected] = useState<{index: number; column: string} | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [editError, setEditError] = useState('');
  const [notice, setNotice] = useState('');
  const grid = useRef<HTMLTableElement>(null);
  const allColumns = useMemo(() => [...new Set(table.rows.flatMap(Object.keys))], [table.rows]);
  const ordered = useMemo(() => [...order.filter(c => allColumns.includes(c)), ...allColumns.filter(c => !order.includes(c))], [allColumns, order]);
  const columns = ordered.filter(c => !hidden.includes(c));
  const indexed = useMemo(() => table.rows.map((row, i) => ({row, index: table.indices[i]})), [table]);
  const searched = useMemo(() => {
    const q = deferredQuery.toLocaleLowerCase();
    return q ? indexed.filter(({row}) => (filterColumn ? [filterColumn] : allColumns).some(c => cellText(row[c]).toLocaleLowerCase().includes(q))) : indexed;
  }, [indexed, deferredQuery, filterColumn, allColumns]);
  const rows = useMemo(() => {
    if (!sort) return searched;
    return [...searched].sort((a, b) => {
      const x = a.row[sort.key], y = b.row[sort.key];
      if (x === y) return a.index - b.index;
      if (x === undefined || x === null) return 1;
      if (y === undefined || y === null) return -1;
      const cmp = typeof x === 'number' && typeof y === 'number' ? x - y : cellText(x).localeCompare(cellText(y), undefined, {numeric: true});
      return sort.asc ? cmp : -cmp;
    });
  }, [searched, sort]);
  const maxPage = Math.max(0, Math.ceil(rows.length / PAGE) - 1);
  const currentPage = Math.min(page, maxPage);
  const visible = rows.slice(currentPage * PAGE, (currentPage + 1) * PAGE);
  const selectedRow = selected ? indexed.find(r => r.index === selected.index) : undefined;
  const value = selected && selectedRow ? selectedRow.row[selected.column] : undefined;
  const selectedLabel = selected ? pathLabel([...table.keys, selected.index, selected.column]) : '';
  useEffect(() => { setPage(0); }, [deferredQuery, filterColumn]);
  const inspect = (index: number, column: string) => { setSelected({index, column}); setEditing(false); setEditError(''); };
  const copy = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); setNotice(label); } catch { setNotice('Clipboard unavailable. Use Download CSV or select the value to copy.'); }
  };
  const exportCsv = () => {
    const url = URL.createObjectURL(new Blob([toCsv(rows.map(r => r.row), columns)], {type: 'text/csv;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'data.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(`Exported ${rows.length} rows and ${columns.length} visible columns.`);
  };
  const move = (column: string, direction: number) => {
    const next = [...ordered], i = next.indexOf(column), j = i + direction;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]]; setOrder(next);
  };
  const navigateCell = (e: React.KeyboardEvent<HTMLButtonElement>, row: number, col: number) => {
    const offsets: Record<string, [number, number]> = {ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1], Home: [0, -col], End: [0, columns.length - col - 1]};
    if (e.key === 'Escape') {setSelected(null); return;}
    if (!offsets[e.key]) return;
    e.preventDefault(); const [dr, dc] = offsets[e.key];
    grid.current?.querySelector<HTMLButtonElement>(`[data-cell="${row + dr}:${col + dc}"]`)?.focus();
  };
  return <div data-testid="table-view" className="min-w-0">
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3">
      <div className="flex min-w-0 flex-wrap items-center gap-3 text-xs text-[#57606a]">
        {tables.length > 1 ? <select aria-label="Choose array" value={table.path} onChange={e => choose(e.target.value)} className="h-9 max-w-full rounded-md border border-[#d0d7de] bg-white px-2 text-sm">{tables.map(t => <option key={t.path} value={t.path}>{t.path} ({t.rows.length})</option>)}</select> : <span className="break-all font-mono">{table.path}</span>}
        <span>{table.rows.length.toLocaleString()} rows · {columns.length}/{allColumns.length} columns</span>
        {table.total !== table.rows.length && <span>{table.total - table.rows.length} non-object entries not shown</span>}
      </div>
      <div className="flex flex-wrap gap-1">
        <button className={btn} aria-expanded={showColumns} onClick={() => setShowColumns(!showColumns)}>Columns</button>
        {canUndo && <button className={btn} onClick={() => {onUndo?.(); setSelected(null); setNotice('Last edit undone.');}}>Undo edit</button>}
        <button className={btn} disabled={!columns.length} onClick={() => copy(toCsv(rows.map(r => r.row), columns), `Copied ${rows.length} rows as CSV.`)}>Copy CSV</button>
        <button className={btn} disabled={!columns.length} onClick={exportCsv}>Download CSV</button>
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-2 px-4 py-3">
      <input type="search" aria-label="Filter table rows" placeholder="Filter rows…" value={query} onChange={e => setQuery(e.target.value)} className="h-9 min-w-0 flex-1 rounded-md border border-[#d0d7de] bg-white px-3 text-sm outline-none focus:border-[#0969da]" />
      <select aria-label="Filter column" value={filterColumn} onChange={e => setFilterColumn(e.target.value)} className="h-9 max-w-[180px] rounded-md border border-[#d0d7de] bg-white px-2 text-sm"><option value="">All columns</option>{allColumns.map(c => <option key={c} value={c}>{c}</option>)}</select>
      {query && <button className={btn} onClick={() => setQuery('')}>Clear filter</button>}
    </div>
    {showColumns && <section aria-label="Column settings" className="mx-4 mb-3 rounded-md bg-[#f6f8fa] p-3">
      <div className="flex items-center justify-between gap-2"><p className="text-xs text-[#57606a]">Choose columns and their order. CSV uses this view.</p><button className={btn} onClick={() => {setHidden([]); setOrder([]);}}>Reset</button></div>
      <div className="max-h-52 overflow-auto">{ordered.map((c, i) => <div key={c} className="flex items-center gap-2 py-1">
        <label className="flex min-w-0 flex-1 items-center gap-2 text-sm"><input type="checkbox" checked={!hidden.includes(c)} onChange={() => setHidden(prev => prev.includes(c) ? prev.filter(k => k !== c) : [...prev, c])} /><span className="truncate">{c}</span></label>
        <button className={btn} aria-label={`Move ${c} left`} disabled={i === 0} onClick={() => move(c, -1)}>←</button><button className={btn} aria-label={`Move ${c} right`} disabled={i === ordered.length - 1} onClick={() => move(c, 1)}>→</button>
      </div>)}</div>
    </section>}
    <div className="max-h-[520px] overflow-auto" role="region" aria-label="JSON data table" tabIndex={0}>
      <table ref={grid} className="w-full border-collapse text-left text-sm" aria-label="JSON rows">
        <thead className="sticky top-0 z-10 bg-white"><tr className="border-y border-[#d0d7de]">
          <th scope="col" className="px-3 py-3 text-right font-mono text-xs font-normal text-[#8c959f]">#</th>
          {columns.map(c => <th scope="col" key={c} aria-sort={sort?.key === c ? (sort.asc ? 'ascending' : 'descending') : 'none'} className="whitespace-nowrap px-3 py-3 font-semibold">
            <button className="flex items-center gap-2 hover:text-[#0969da] focus-visible:outline focus-visible:outline-[#0969da]" onClick={() => {setSort(sort?.key === c ? (sort.asc ? {key: c, asc: false} : null) : {key: c, asc: true}); setPage(0);}}>{c}<span className="text-xs text-[#8c959f]">{sort?.key === c ? (sort.asc ? '↑' : '↓') : '↕'}</span></button>
          </th>)}
        </tr></thead>
        <tbody>{visible.map(({row, index}, ri) => <tr key={index} className="border-b border-[#eaeef2] hover:bg-[#f6f8fa]">
          <th scope="row" className="px-3 py-2 text-right font-mono text-xs font-normal text-[#8c959f]">{index + 1}</th>
          {columns.map((c, ci) => {
            const v = row[c], nested = v !== null && typeof v === 'object';
            const text = nested ? `${Array.isArray(v) ? 'Array' : 'Object'} · ${Object.keys(v).length} ${Array.isArray(v) ? 'items' : 'keys'}` : v === undefined ? '(missing)' : cellText(v);
            return <td key={c} className="p-0"><button data-cell={`${ri}:${ci}`} className={`block w-full min-w-[100px] max-w-[320px] truncate px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0969da] ${nested ? 'font-mono text-xs text-[#0969da]' : v === null || v === undefined ? 'text-[#8c959f]' : 'text-[#24292f]'} ${selected?.index === index && selected.column === c ? 'bg-[#ddf4ff]' : ''}`} aria-label={`Row ${index + 1}, ${c}: ${text.slice(0, 100)}`} onClick={() => inspect(index, c)} onKeyDown={e => navigateCell(e, ri, ci)}>{nested ? '▸ ' : ''}{text || '""'}</button></td>;
          })}
        </tr>)}</tbody>
      </table>
      {!columns.length && <p className="p-5 text-sm text-[#57606a]">No columns selected. Open Columns to show them.</p>}
      {!rows.length && <p className="p-5 text-sm text-[#57606a]">No matching rows. Try a different filter.</p>}
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-[#6e7781]">
      <span>{rows.length ? currentPage * PAGE + 1 : 0}-{Math.min((currentPage + 1) * PAGE, rows.length)} of {rows.length.toLocaleString()}{query ? ` matching / ${table.rows.length.toLocaleString()} total` : ' rows'} · CSV includes all matching rows.</span>
      {maxPage > 0 && <div className="flex items-center gap-2"><button className={btn} disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>Previous</button><span>{currentPage + 1} / {maxPage + 1}</span><button className={btn} disabled={currentPage === maxPage} onClick={() => setPage(currentPage + 1)}>Next</button></div>}
    </div>
    {selected && selectedRow && <section aria-label="Cell inspector" className="border-t border-[#d0d7de] px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2"><p className="min-w-0 break-all font-mono text-xs text-[#57606a]">{selectedLabel}</p><div className="flex gap-1"><button className={btn} onClick={() => copy(JSON.stringify(value, null, 2) ?? '', 'Value copied as JSON.')}>Copy value</button>{onEdit && <button className={btn} onClick={() => {setDraft(JSON.stringify(value, null, 2) ?? 'null'); setEditing(true); setEditError('');}}>Edit JSON</button>}<button className={btn} onClick={() => setSelected(null)}>Close</button></div></div>
      {editing ? <div className="mt-2"><label htmlFor="table-cell-editor" className="mb-2 block text-xs text-[#57606a]">Valid JSON only. Strings need double quotes. Save updates Text, Tree and Table.</label><textarea id="table-cell-editor" aria-label="Edit cell JSON" autoFocus value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => {if (e.key === 'Escape') setEditing(false);}} className="h-32 w-full rounded-md border border-[#d0d7de] p-3 font-mono text-sm" />{editError && <p role="alert" className="py-2 text-sm text-red-700">{editError}</p>}<div className="flex gap-2"><button className={btn} onClick={() => {try {const next = JSON.parse(draft); onEdit?.(table, selected.index, selected.column, next); setEditing(false); setNotice('Cell saved. Text and Tree updated.');} catch {setEditError('Invalid JSON. Check quotes, commas and brackets. Nothing changed.');}}}>Save value</button><button className={btn} onClick={() => setEditing(false)}>Cancel</button></div></div> : <div className="mt-2 max-h-64 overflow-auto"><NestedValue value={value} name={selected.column} /></div>}
    </section>}
    <p className="px-4 pb-3 text-xs text-[#8c959f]">Select a cell to inspect or edit. Arrow keys move between cells; Enter opens a value. Escape closes it.</p>
    {notice && <p role="status" className="px-4 pb-3 text-xs text-[#57606a]">{notice}</p>}
  </div>;
}
