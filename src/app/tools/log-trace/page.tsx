'use client';

import { useMemo, useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { analyzeLogs } from '@/app/tools/lib/debug-analyzers';

const sampleLogs = `[2026-05-17T07:00:00Z] INFO trace_id=checkout-42 request started
[2026-05-17T07:00:01Z] WARN trace_id=checkout-42 slow inventory lookup
[2026-05-17T07:00:02Z] ERROR trace_id=checkout-42 payment failed
    at chargeCard (/app/payments.ts:18:4)
[2026-05-17T07:00:03Z] INFO trace_id=profile-11 request complete`;

export default function LogTracePage() {
  const [input, setInput] = useState(sampleLogs);
  const result = useMemo(() => analyzeLogs(input), [input]);

  const copyTrace = async (traceId: string) => {
    const trace = result.traces.find((item) => item.id === traceId);
    if (!trace) return;
    await navigator.clipboard.writeText(trace.entries.map((entry) => [entry.message, ...entry.details].join('\n')).join('\n'));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <section className="rounded-md border border-[#d0d7de] bg-white">
        <div className="border-b border-[#d0d7de] px-5 py-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#6e7781]">tools / log-trace</p>
          <h1 className="mt-2 text-2xl font-semibold text-[#24292f]">Log Trace Rebuilder</h1>
          <p className="mt-2 text-sm leading-6 text-[#57606a]">Paste logs to group entries by trace ID, request ID, correlation ID, severity, and multiline details.</p>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1fr]">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-[560px] rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4 font-mono text-sm text-[#24292f] outline-none focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da]/15"
            spellCheck={false}
          />

          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-4">
              {['ERROR', 'WARN', 'INFO', 'DEBUG'].map((severity) => (
                <div key={severity} className="rounded-md border border-[#d0d7de] bg-white p-3">
                  <div className="font-mono text-2xl font-semibold text-[#24292f]">{result.severityCounts[severity] || 0}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6e7781]">{severity}</div>
                </div>
              ))}
            </div>

            <section className="rounded-md border border-[#d0d7de] bg-white">
              <div className="border-b border-[#d0d7de] px-4 py-3">
                <h2 className="text-sm font-semibold text-[#24292f]">Trace groups</h2>
              </div>
              <div className="divide-y divide-[#d0d7de]">
                {result.traces.map((trace) => (
                  <article key={trace.id} className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-mono text-sm font-semibold text-[#0969da]">{trace.id}</h3>
                        <p className="mt-1 text-xs text-[#57606a]">{trace.entries.length} entries {trace.hasError ? 'with errors' : 'without errors'}</p>
                      </div>
                      <button type="button" onClick={() => copyTrace(trace.id)} className="inline-flex items-center gap-1 rounded-md border border-[#d0d7de] px-2 py-1 text-xs font-semibold text-[#57606a] hover:bg-[#f6f8fa]">
                        <ClipboardDocumentIcon className="h-4 w-4" />
                        Copy
                      </button>
                    </div>
                    <div className="mt-3 space-y-2">
                      {trace.entries.map((entry, index) => (
                        <div key={`${trace.id}-${index}`} className="rounded-md bg-[#f6f8fa] p-3">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-[#d0d7de] px-2 py-0.5 text-[11px] font-semibold text-[#57606a]">{entry.severity}</span>
                            {entry.timestamp && <span className="font-mono text-xs text-[#6e7781]">{entry.timestamp}</span>}
                          </div>
                          <p className="mt-2 break-words font-mono text-xs text-[#24292f]">{entry.message}</p>
                          {entry.details.length > 0 && <pre className="mt-2 whitespace-pre-wrap break-words rounded bg-white p-2 font-mono text-xs text-[#57606a]">{entry.details.join('\n')}</pre>}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
                {result.traces.length === 0 && <p className="p-4 text-sm text-[#57606a]">No trace IDs detected. Try logs with trace_id, request_id, correlation_id, or rid.</p>}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
