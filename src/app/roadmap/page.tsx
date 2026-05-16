'use client';

import Navigation from '../components/Navigation';
import { liveTools, proposedTools } from '../tools/lib/tool-registry';

const shippedItems = [
  {
    title: 'Tool catalog route',
    description: '`/tools/all` lists the live registry and links to implemented tool routes. It is a catalog, not a standalone tool.',
    scope: 'tools/all',
  },
  {
    title: 'Inspect and transform tools',
    description: 'JSON Tools, JWT Decoder, Base64, Hash Generator, Regex Tester, and URL Encoder have routed client implementations.',
    scope: 'json, jwt, base64, hash, regex, url',
  },
  {
    title: 'API reference utility',
    description: 'HTTP Status is implemented as a searchable local reference for status codes, causes, and fixes.',
    scope: 'http-status',
  },
  {
    title: 'Runtime debugging tools',
    description: 'Crash Beautifier, Code Diff, and Build Diff are usable browser tools with copy/download flows.',
    scope: 'crash-beautifier, code-diff, build-diff',
  },
  {
    title: 'Frontend workbench tools',
    description: 'HTML Tools, CSS Tools, Markdown Preview, Color Picker, and Icon Finder have implemented UI workflows.',
    scope: 'html, css, markdown, color, icons',
  },
  {
    title: 'Small utilities',
    description: 'UUID Generator and Timestamp Converter are implemented as focused local utilities.',
    scope: 'uuid, timestamp',
  },
];

const betaItems = [
  {
    title: 'API Tester workbench',
    description: 'Flagship workflow for REST requests, tabs, headers, auth helpers, environments, history, local collections, imports, and optional authenticated collection sync. Cloud rename/update polish and broader request-runner hardening are still needed.',
    scope: 'tools/api',
  },
  {
    title: 'SQLite database query',
    description: 'Upload, inspect, query, preview tables, keep local query history, and export CSV are implemented. The visualization tab is still a placeholder.',
    scope: 'tools/database',
  },
  {
    title: 'Bundle Analyzer',
    description: 'Parses pasted module-size lines and produces a summary, top modules, copy, and download output. It does not yet ingest native webpack stats JSON or analyzer HTML directly.',
    scope: 'tools/bundle-analyzer',
  },
  {
    title: 'React Native startup profiling',
    description: 'Parses `[Performance] Name: 123ms` style logs into phase totals and a simple timeline. Broader log formats and imported trace support are not implemented yet.',
    scope: 'tools/startup-profiling',
  },
];

const nextItems = [
  {
    title: 'Finish beta tool gaps',
    description: 'Either implement or remove the SQLite visualization tab, add real bundle/stats import support, and tighten API Tester cloud update behavior.',
    scope: 'beta tools',
  },
  {
    title: 'Shared logic extraction',
    description: 'Continue moving reusable parsing and transform logic out of client pages so browser tools, tests, and a future CLI can share implementations.',
    scope: 'tools/lib + src/lib/tools',
  },
  {
    title: 'Route-level smoke coverage',
    description: 'Add focused tests for the catalog and high-risk tools so registry claims stay aligned with routed code.',
    scope: 'tool tests',
  },
  {
    title: 'CLI foundation',
    description: 'Start with pipe-friendly commands for tools that already have shared or easily extractable logic: JSON, JWT, Base64, hash, regex, URL, diff, and HTTP status.',
    scope: 'CLI_ROADMAP.md',
  },
];

const proposedBacklogItems = proposedTools.map((tool) => ({
  title: tool.name,
  description: tool.description,
  scope: `${tool.pillar} / ${tool.category}`,
}));

function statusClass(status: string) {
  if (status === 'shipped') return 'border-[#1a7f37] bg-[#dafbe1] text-[#1a7f37]';
  if (status === 'beta') return 'border-[#bf8700] bg-[#fff8c5] text-[#7d4e00]';
  if (status === 'next') return 'border-[#0969da] bg-[#ddf4ff] text-[#0969da]';
  return 'border-[#d0d7de] bg-[#f6f8fa] text-[#57606a]';
}

function RoadmapSection({
  title,
  status,
  items,
}: {
  title: string;
  status: 'shipped' | 'beta' | 'next' | 'backlog';
  items: Array<{ title: string; description: string; scope: string }>;
}) {
  return (
    <section className="border-t border-[#d0d7de]">
      <div className="border-b border-[#d0d7de] bg-[#f6f8fa] px-5 py-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-[#24292f]">{title}</h2>
          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(status)}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="divide-y divide-[#d0d7de]">
        {items.map((item) => (
          <article key={`${status}-${item.title}`} className="grid gap-3 p-5 md:grid-cols-[180px_1fr] md:items-start">
            <div className="font-mono text-xs text-[#57606a]">{item.scope}</div>
            <div>
              <h3 className="text-base font-semibold text-[#0969da]">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#57606a]">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function RoadmapPage() {
  const stableToolCount = liveTools.filter((tool) => tool.maturity === 'Stable').length;
  const betaToolCount = liveTools.filter((tool) => tool.maturity !== 'Stable').length;

  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#24292f]">
      <Navigation />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-md border border-[#d0d7de] bg-white">
          <div className="border-b border-[#d0d7de] px-5 py-4">
            <p className="font-mono text-xs text-[#57606a]">ROADMAP.md</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24292f]">Project roadmap</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
              This roadmap reflects the current tool routes in the codebase. API Tester is the flagship workflow; the live registry has {liveTools.length} implemented tool routes: {stableToolCount} stable local tools and {betaToolCount} beta or experimental tools that work but need polish.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://github.com/jasimvkarim/mydebugtools/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#1f883d] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1a7f37] hover:text-white"
              >
                Open a GitHub issue
              </a>
              <a
                href="https://github.com/jasimvkarim/mydebugtools/blob/main/CLI_ROADMAP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                CLI roadmap
              </a>
            </div>
          </div>

          <RoadmapSection title="Shipped in the codebase" status="shipped" items={shippedItems} />
          <RoadmapSection title="Beta or needs polish" status="beta" items={betaItems} />
          <RoadmapSection title="Next work" status="next" items={nextItems} />
          <RoadmapSection title="Backlog proposals" status="backlog" items={proposedBacklogItems} />
        </div>
      </section>
    </main>
  );
}
