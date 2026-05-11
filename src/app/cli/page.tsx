'use client';

import Navigation from '../components/Navigation';

const mvpCommands = [
  { command: 'mydebugtools json', purpose: 'Format, minify, repair, validate, query, and convert JSON.' },
  { command: 'mydebugtools jwt decode', purpose: 'Decode JWT header and payload locally.' },
  { command: 'mydebugtools base64', purpose: 'Encode and decode text or files from stdin or disk.' },
  { command: 'mydebugtools diff', purpose: 'Compare files and emit text, Markdown, or JSON reports.' },
  { command: 'mydebugtools http-status', purpose: 'Look up HTTP codes and search status references offline.' },
];

const nextCommands = [
  { command: 'mydebugtools api run', purpose: 'Run saved API requests and collections in local terminals or CI.' },
  { command: 'mydebugtools api import-collection', purpose: 'Normalize Postman and MyDebugTools collection exports.' },
  { command: 'mydebugtools db query', purpose: 'Run SQLite queries and export results as CSV.' },
  { command: 'mydebugtools css/html/md', purpose: 'Format, validate, and report on frontend files.' },
  { command: 'mydebugtools releases', purpose: 'List release notes, latest changes, and changelog summaries.' },
];

const laterCommands = [
  'webhook inspector and replay',
  'OpenAPI validation and collection generation',
  'bundle and startup profile comparison',
  'Dockerfile and Kubernetes YAML checks',
  'hash, HMAC, checksum, JWT/JWKS, and TLS certificate utilities',
];

export default function CliPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#24292f]">
      <Navigation />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-md border border-[#d0d7de] bg-white">
          <div className="border-b border-[#d0d7de] px-5 py-4">
            <p className="font-mono text-xs text-[#57606a]">CLI_ROADMAP.md</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24292f]">CLI roadmap</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
              The CLI should make the web tools scriptable: same developer utilities, but pipe-friendly for terminals, CI jobs, release checks, and local workflows.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://github.com/jasimvk/mydebugtools/blob/main/CLI_ROADMAP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#24292f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#32383f] hover:text-white"
              >
                Read roadmap
              </a>
              <a
                href="https://github.com/jasimvk/mydebugtools/issues/new?title=Add%20MyDebugTools%20CLI"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                Propose CLI issue
              </a>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
            <div className="p-5">
              <h2 className="text-xl font-semibold text-[#24292f]">MVP commands</h2>
              <div className="mt-4 grid gap-3">
                {mvpCommands.map((item) => (
                  <div key={item.command} className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4">
                    <code className="bg-white font-mono text-sm text-[#0969da]">{item.command}</code>
                    <p className="mt-2 text-sm leading-6 text-[#57606a]">{item.purpose}</p>
                  </div>
                ))}
              </div>

              <h2 className="mt-8 text-xl font-semibold text-[#24292f]">V1 commands</h2>
              <div className="mt-4 grid gap-3">
                {nextCommands.map((item) => (
                  <div key={item.command} className="rounded-md border border-[#d0d7de] bg-white p-4">
                    <code className="bg-[#f6f8fa] font-mono text-sm text-[#0969da]">{item.command}</code>
                    <p className="mt-2 text-sm leading-6 text-[#57606a]">{item.purpose}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-[#d0d7de] bg-[#f6f8fa] p-5 lg:border-l lg:border-t-0">
              <h2 className="text-sm font-semibold text-[#24292f]">Recommended shape</h2>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-[#57606a]">
                <li>One binary: <code className="bg-white">mydebugtools</code>, with <code className="bg-white">mdt</code> as an alias later.</li>
                <li>Extract shared logic into <code className="bg-white">src/lib/tools/*</code> before adding CLI entrypoints.</li>
                <li>Keep MVP commands dependency-light and CI-friendly.</li>
                <li>Use release automation after the first CLI module lands.</li>
              </ul>

              <h2 className="mt-8 text-sm font-semibold text-[#24292f]">Later possibilities</h2>
              <ul className="mt-3 space-y-3">
                {laterCommands.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-[#57606a]">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1f883d]" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
