'use client';

import { useMemo, useState } from 'react';
import { ClipboardIcon, HashtagIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { bytesToHex } from '@/app/tools/lib/simple-tools';

const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const;

export default function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<(typeof algorithms)[number]>('SHA-256');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const byteCount = useMemo(() => new Blob([input]).size, [input]);

  const generateHash = async () => {
    try {
      setError('');
      const bytes = new TextEncoder().encode(input);
      const digest = await crypto.subtle.digest(algorithm, bytes);
      setOutput(bytesToHex(new Uint8Array(digest)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to generate hash');
      setOutput('');
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <section className="rounded-md border border-[#d0d7de] bg-white">
        <div className="border-b border-[#d0d7de] px-5 py-4">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="h-6 w-6 text-[#0969da]" />
            <div>
              <h1 className="text-2xl font-semibold text-[#24292f]">Hash Generator</h1>
              <p className="mt-1 text-sm text-[#57606a]">Generate SHA hashes locally in your browser.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#24292f]" htmlFor="hash-input">Input</label>
            <textarea
              id="hash-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="h-72 w-full resize-none rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-3 font-mono text-sm text-[#24292f] focus:border-[#0969da] focus:outline-none focus:ring-2 focus:ring-[#0969da]/20"
              placeholder="Paste text to hash..."
            />
            <p className="text-xs text-[#57606a]">{byteCount} bytes</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#24292f]" htmlFor="hash-algorithm">Algorithm</label>
              <select
                id="hash-algorithm"
                value={algorithm}
                onChange={(event) => setAlgorithm(event.target.value as (typeof algorithms)[number])}
                className="mt-2 w-full rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm text-[#24292f] focus:border-[#0969da] focus:outline-none focus:ring-2 focus:ring-[#0969da]/20"
              >
                {algorithms.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={generateHash}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0969da] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0757b8]"
            >
              <HashtagIcon className="h-4 w-4" />
              Generate
            </button>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#24292f]">Digest</span>
                <button
                  type="button"
                  onClick={copyOutput}
                  disabled={!output}
                  className="inline-flex items-center gap-1 rounded-md border border-[#d0d7de] px-2 py-1 text-xs font-semibold text-[#57606a] disabled:opacity-50"
                >
                  <ClipboardIcon className="h-4 w-4" />
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="min-h-28 whitespace-pre-wrap break-all rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-3 font-mono text-sm text-[#24292f]">
                {output || 'Digest will appear here.'}
              </pre>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
