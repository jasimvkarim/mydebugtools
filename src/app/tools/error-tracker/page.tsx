'use client';

import { useMemo, useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { analyzeErrors } from '@/app/tools/lib/debug-analyzers';

const sampleErrors = `TypeError: Cannot read properties of undefined
    at getUser (/app/src/users.ts:42:18)

TypeError: Cannot read properties of undefined
    at getUser (/app/src/users.ts:42:18)

TimeoutError: Request timed out
    at fetchUser (/app/src/api.ts:8:2)`;

export default function ErrorTrackerPage() {
  const [input, setInput] = useState(sampleErrors);
  const result = useMemo(() => analyzeErrors(input), [input]);

  const copySummary = async () => {
    await navigator.clipboard.writeText(result.issues.map((issue) => `${issue.count}x ${issue.title}\n${issue.sample.likelyCause}`).join('\n\n'));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <section className="rounded-md border border-[#d0d7de] bg-white">
        <div className="border-b border-[#d0d7de] px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#6e7781]">tools / error-tracker</p>
              <h1 className="mt-2 text-2xl font-semibold text-[#24292f]">Error Tracker</h1>
              <p className="mt-2 text-sm leading-6 text-[#57606a]">Paste repeated errors to fingerprint, deduplicate, rank, and turn them into triage-ready issues.</p>
            </div>
            <button type="button" onClick={copySummary} className="inline-flex items-center gap-2 rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa]">
              <ClipboardDocumentIcon className="h-4 w-4" />
              Copy summary
            </button>
          </div>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1fr]">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-[560px] rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4 font-mono text-sm text-[#24292f] outline-none focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da]/15"
            spellCheck={false}
          />

          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label="Errors" value={result.summary.totalErrors} />
              <Stat label="Issues" value={result.summary.uniqueIssues} />
              <Stat label="Repeated" value={result.summary.repeatedIssues} />
            </div>

            <section className="rounded-md border border-[#d0d7de] bg-white">
              <div className="border-b border-[#d0d7de] px-4 py-3">
                <h2 className="text-sm font-semibold text-[#24292f]">Issue groups</h2>
              </div>
              <div className="divide-y divide-[#d0d7de]">
                {result.issues.map((issue) => (
                  <article key={issue.fingerprint} className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-[#0969da]">{issue.title}</h3>
                        <p className="mt-1 break-all font-mono text-xs text-[#6e7781]">{issue.fingerprint}</p>
                      </div>
                      <span className="rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-2 py-0.5 font-mono text-xs font-semibold text-[#57606a]">{issue.count}x</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#24292f]">{issue.sample.likelyCause}</p>
                    {issue.sample.rootFrame && (
                      <p className="mt-2 break-all font-mono text-xs text-[#57606a]">
                        Root: {issue.sample.rootFrame.functionName} ({issue.sample.rootFrame.file}:{issue.sample.rootFrame.line || '?'})
                      </p>
                    )}
                  </article>
                ))}
                {result.issues.length === 0 && <p className="p-4 text-sm text-[#57606a]">Paste errors separated by blank lines to create issue groups.</p>}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: number | string; value: number }) {
  return (
    <div className="rounded-md border border-[#d0d7de] bg-white p-3">
      <div className="font-mono text-2xl font-semibold text-[#24292f]">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6e7781]">{label}</div>
    </div>
  );
}
