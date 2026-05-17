'use client';

import { useMemo, useState } from 'react';
import { BoltIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { analyzeStackTrace } from '@/app/tools/lib/debug-analyzers';

const sampleTrace = `TypeError: Cannot read properties of undefined (reading 'id')
    at getUser (/app/src/users.ts:42:18)
    at async GET (/app/src/api/users/route.ts:12:5)
    at node_modules/next/dist/server.js:10:1`;

export default function StackTracePage() {
  const [input, setInput] = useState(sampleTrace);
  const result = useMemo(() => analyzeStackTrace(input), [input]);

  const copyReport = async () => {
    await navigator.clipboard.writeText([
      `${result.errorType}: ${result.message}`,
      `Likely cause: ${result.likelyCause}`,
      result.rootFrame ? `Root frame: ${result.rootFrame.functionName} (${result.rootFrame.file}:${result.rootFrame.line || '?'})` : 'Root frame: not found',
    ].join('\n'));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <section className="rounded-md border border-[#d0d7de] bg-white">
        <div className="border-b border-[#d0d7de] px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#6e7781]">tools / stack-trace</p>
              <h1 className="mt-2 text-2xl font-semibold text-[#24292f]">Stack Trace Explainer</h1>
              <p className="mt-2 text-sm leading-6 text-[#57606a]">Paste a stack trace to identify the error, root frame, app frames, dependency frames, and likely cause.</p>
            </div>
            <button type="button" onClick={copyReport} className="inline-flex items-center gap-2 rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa]">
              <ClipboardDocumentIcon className="h-4 w-4" />
              Copy report
            </button>
          </div>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1fr]">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-[520px] rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4 font-mono text-sm text-[#24292f] outline-none focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da]/15"
            spellCheck={false}
          />

          <div className="space-y-4">
            <div className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4">
              <div className="flex items-center gap-2">
                <BoltIcon className="h-5 w-5 text-[#0969da]" />
                <h2 className="text-base font-semibold text-[#24292f]">{result.errorType}</h2>
              </div>
              <p className="mt-2 break-words font-mono text-sm text-[#57606a]">{result.message || 'No error message detected.'}</p>
              <p className="mt-3 text-sm leading-6 text-[#24292f]">{result.likelyCause}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label="Frames" value={result.frames.length} />
              <Stat label="App frames" value={result.appFrames.length} />
              <Stat label="Dependencies" value={result.dependencyFrames.length} />
            </div>

            {result.rootFrame && (
              <div className="rounded-md border border-[#d0d7de] bg-white p-4">
                <h2 className="text-sm font-semibold text-[#24292f]">Root application frame</h2>
                <p className="mt-2 font-mono text-sm text-[#0969da]">{result.rootFrame.functionName}</p>
                <p className="mt-1 break-all font-mono text-xs text-[#57606a]">{result.rootFrame.file}:{result.rootFrame.line || '?'}</p>
              </div>
            )}

            <div className="rounded-md border border-[#d0d7de] bg-white">
              <div className="border-b border-[#d0d7de] px-4 py-3 text-sm font-semibold text-[#24292f]">Frames</div>
              <div className="divide-y divide-[#d0d7de]">
                {result.frames.map((frame, index) => (
                  <div key={`${frame.raw}-${index}`} className="p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#0969da]">{frame.functionName}</span>
                      <span className="rounded-full border border-[#d0d7de] px-2 py-0.5 text-[11px] font-semibold text-[#57606a]">{frame.isDependency ? 'dependency' : 'app'}</span>
                    </div>
                    <p className="mt-1 break-all font-mono text-xs text-[#57606a]">{frame.file}:{frame.line || '?'}</p>
                  </div>
                ))}
                {result.frames.length === 0 && <p className="p-4 text-sm text-[#57606a]">No stack frames detected yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-[#d0d7de] bg-white p-3">
      <div className="font-mono text-2xl font-semibold text-[#24292f]">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6e7781]">{label}</div>
    </div>
  );
}
