'use client';

import { useEffect, useMemo, useState } from 'react';
import { ClockIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { formatTimestamp } from '@/app/tools/lib/simple-tools';

export default function TimestampConverterPage() {
  const [input, setInput] = useState('1704067200');
  const result = useMemo(() => formatTimestamp(input), [input]);
  const rows = result
    ? [
        ['ISO 8601', result.iso],
        ['Local', result.local],
        ['UTC', result.utc],
        ['Unix seconds', String(result.unixSeconds)],
        ['Unix milliseconds', String(result.unixMilliseconds)],
      ]
    : [];

  const copyValue = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  useEffect(() => {
    setInput(Math.floor(Date.now() / 1000).toString());
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <section className="rounded-md border border-[#d0d7de] bg-white">
        <div className="border-b border-[#d0d7de] px-5 py-4">
          <div className="flex items-center gap-3">
            <ClockIcon className="h-6 w-6 text-[#0969da]" />
            <div>
              <h1 className="text-2xl font-semibold text-[#24292f]">Timestamp Converter</h1>
              <p className="mt-1 text-sm text-[#57606a]">Convert Unix seconds, milliseconds, and date strings.</p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <label htmlFor="timestamp-input" className="text-sm font-semibold text-[#24292f]">Timestamp or date</label>
            <input
              id="timestamp-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="mt-2 w-full rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 py-2 font-mono text-sm text-[#24292f] focus:border-[#0969da] focus:outline-none focus:ring-2 focus:ring-[#0969da]/20"
              placeholder="1704067200, 1704067200000, or 2024-01-01T00:00:00Z"
            />
          </div>

          {result ? (
            <div className="overflow-hidden rounded-md border border-[#d0d7de]">
              {rows.map(([label, value]) => (
                <div key={label} className="grid gap-2 border-b border-[#d0d7de] p-3 last:border-b-0 sm:grid-cols-[180px_1fr_auto]">
                  <div className="text-sm font-semibold text-[#57606a]">{label}</div>
                  <div className="break-all font-mono text-sm text-[#24292f]">{value}</div>
                  <button
                    type="button"
                    onClick={() => copyValue(value)}
                    className="inline-flex items-center gap-1 rounded-md border border-[#d0d7de] px-2 py-1 text-xs font-semibold text-[#57606a] hover:bg-[#f6f8fa]"
                  >
                    <ClipboardIcon className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Enter a valid Unix timestamp or parseable date string.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
