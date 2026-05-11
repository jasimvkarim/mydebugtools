'use client';

import { useState } from 'react';
import { ClipboardIcon, PlusIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { generateUuidBatch } from '@/app/tools/lib/simple-tools';

export default function UuidGeneratorPage() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => generateUuidBatch(5));
  const [copied, setCopied] = useState(false);

  const generate = () => setUuids(generateUuidBatch(count));

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <section className="rounded-md border border-[#d0d7de] bg-white">
        <div className="border-b border-[#d0d7de] px-5 py-4">
          <div className="flex items-center gap-3">
            <SparklesIcon className="h-6 w-6 text-[#0969da]" />
            <div>
              <h1 className="text-2xl font-semibold text-[#24292f]">UUID Generator</h1>
              <p className="mt-1 text-sm text-[#57606a]">Generate RFC 4122 version 4 UUIDs for fixtures, tests, and records.</p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div>
              <label htmlFor="uuid-count" className="text-sm font-semibold text-[#24292f]">Count</label>
              <input
                id="uuid-count"
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(event) => setCount(Number(event.target.value))}
                className="mt-2 w-32 rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm text-[#24292f] focus:border-[#0969da] focus:outline-none focus:ring-2 focus:ring-[#0969da]/20"
              />
            </div>
            <button
              type="button"
              onClick={generate}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0969da] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0757b8]"
            >
              <PlusIcon className="h-4 w-4" />
              Generate
            </button>
            <button
              type="button"
              onClick={copyAll}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d0d7de] px-4 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa]"
            >
              <ClipboardIcon className="h-4 w-4" />
              {copied ? 'Copied' : 'Copy all'}
            </button>
          </div>

          <div className="rounded-md border border-[#d0d7de] bg-[#f6f8fa]">
            {uuids.map((uuid) => (
              <div key={uuid} className="border-b border-[#d0d7de] px-4 py-2 font-mono text-sm text-[#24292f] last:border-b-0">
                {uuid}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
