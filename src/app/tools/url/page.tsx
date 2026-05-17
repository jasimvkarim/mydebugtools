'use client';

import { useMemo, useState } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return 'Invalid percent-encoded input';
  }
}

export default function UrlToolPage() {
  const [input, setInput] = useState('https://example.com/search?q=hello world&debug=true');
  const [copied, setCopied] = useState('');

  const encoded = useMemo(() => encodeURIComponent(input), [input]);
  const decoded = useMemo(() => safeDecode(input), [input]);
  const parsed = useMemo(() => {
    try {
      const url = new URL(input);
      return {
        href: url.href,
        protocol: url.protocol,
        host: url.host,
        pathname: url.pathname,
        query: Array.from(url.searchParams.entries()),
      };
    } catch {
      return null;
    }
  }, [input]);

  const copy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-md border border-[#d0d7de] bg-white">
      <div className="border-b border-[#d0d7de] px-5 py-4">
        <p className="font-mono text-xs text-[#57606a]">tools / url</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24292f]">URL Encoder and Decoder</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#57606a]">
          Encode URI components, decode percent-encoded values, and inspect URL parts and query parameters.
        </p>
      </div>

      <div className="grid min-w-0 gap-5 p-5 lg:grid-cols-2">
        <section className="min-w-0">
          <label htmlFor="url-input" className="text-sm font-semibold text-[#24292f]">Input</label>
          <textarea
            id="url-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="mt-2 min-h-[260px] w-full max-w-full rounded-md border border-[#d0d7de] bg-white p-4 font-mono text-sm"
          />
        </section>

        <section className="min-w-0 space-y-3">
          {[
            ['Encoded', encoded],
            ['Decoded', decoded],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-[#24292f]">{label}</h2>
                <button
                  type="button"
                  onClick={() => copy(label, value)}
                  className="inline-flex items-center gap-1 rounded-md border border-[#d0d7de] bg-white px-2 py-1 text-xs font-semibold"
                >
                  <ClipboardIcon className="h-3.5 w-3.5" />
                  {copied === label ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="mt-3 whitespace-pre-wrap break-words font-mono text-xs leading-5 text-[#57606a]">{value}</pre>
            </div>
          ))}

          <div className="rounded-md border border-[#d0d7de] bg-white p-4">
            <h2 className="text-sm font-semibold text-[#24292f]">Parsed URL</h2>
            {parsed ? (
              <dl className="mt-3 grid gap-2 text-sm">
                {Object.entries(parsed).map(([key, value]) => (
                  <div key={key} className="grid gap-1 sm:grid-cols-[110px_1fr]">
                    <dt className="font-semibold text-[#57606a]">{key}</dt>
                    <dd className="min-w-0 break-all font-mono text-xs text-[#24292f]">{Array.isArray(value) ? JSON.stringify(value) : value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-3 text-sm text-[#57606a]">Enter a full URL to inspect protocol, host, path, and query parameters.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
