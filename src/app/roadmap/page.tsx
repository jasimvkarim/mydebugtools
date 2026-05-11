'use client';

import Navigation from '../components/Navigation';

const shippedItems = [
  {
    title: 'Core tool registry',
    description: 'Seventeen shipped browser tools are wired into the shared `/tools/all` registry and route tree.',
    scope: 'src/app/tools/*',
  },
  {
    title: 'API Tester workbench',
    description: 'REST requests, collections, auth helpers, environments, cloud persistence, and native/Postman imports.',
    scope: 'tools/api',
  },
  {
    title: 'Data and encoding tools',
    description: 'JSON, JWT, Base64, SQLite database query, HTTP status, and icon search modules are live.',
    scope: 'tools/json + data',
  },
  {
    title: 'Code and frontend tools',
    description: 'HTML, CSS, Markdown, Regex, Code Diff, Color Picker, and crash formatting workflows are live.',
    scope: 'tools/code',
  },
  {
    title: 'Build and performance tools',
    description: 'Build Diff, Bundle Analyzer, and React Native Startup Profiling are part of the shipped catalog.',
    scope: 'tools/builds',
  },
  {
    title: 'OSS project surface',
    description: 'Repository-style homepage, About, Releases, CLI roadmap, changelog, sponsor links, and docs-style shell are live.',
    scope: 'site/oss',
  },
  {
    title: 'Chrome extension package',
    description: 'The repository includes a `chrome-extension` package and extension build scripts.',
    scope: 'chrome-extension',
  },
];

const activeItems = [
  {
    title: 'Shared tool logic extraction',
    description: 'Move reusable logic out of client pages into `src/lib/tools/*` so browser tools and the future CLI share one implementation.',
    scope: 'src/lib/tools',
  },
  {
    title: 'CLI foundation',
    description: 'Start with pipe-friendly `mydebugtools json`, `jwt`, `base64`, `diff`, and `http-status` commands from the CLI roadmap.',
    scope: 'CLI_ROADMAP.md',
  },
  {
    title: 'Release automation',
    description: 'Add scripts for typecheck, release verification, changelog/release generation, and Vercel prebuilt deployment.',
    scope: 'release scripts',
  },
  {
    title: 'Module proposal automation',
    description: 'Move proposed tools into a structured registry and optionally open GitHub issues from that source of truth.',
    scope: 'tools registry',
  },
];

const nextItems = [
  {
    title: 'OpenAPI Viewer',
    description: 'Preview specs, endpoints, schemas, and generate API Tester collections.',
    scope: 'proposed/api',
  },
  {
    title: 'GraphQL Explorer',
    description: 'Run GraphQL queries with variables, headers, and schema introspection.',
    scope: 'proposed/api',
  },
  {
    title: 'Webhook Inspector',
    description: 'Capture, replay, and debug webhook payloads; export captured requests into collections.',
    scope: 'proposed/network',
  },
  {
    title: 'cURL Converter',
    description: 'Convert cURL commands into fetch, Python, Go, and MyDebugTools request JSON.',
    scope: 'proposed/api',
  },
  {
    title: 'YAML/TOML and SQL formatters',
    description: 'Extend the data toolkit beyond JSON and SQLite query execution.',
    scope: 'proposed/data',
  },
  {
    title: 'Security utilities',
    description: 'Hash/HMAC/checksum generation, SSL certificate inspection, and JWT/JWKS verification helpers.',
    scope: 'proposed/security',
  },
];

const laterItems = [
  {
    title: 'DevOps validators',
    description: 'Dockerfile linting, Kubernetes YAML validation, cron parsing, and config explainers.',
    scope: 'proposed/devops',
  },
  {
    title: 'Accessibility checker',
    description: 'Contrast, labels, landmark structure, and common WCAG checks for frontend snippets.',
    scope: 'proposed/frontend',
  },
  {
    title: 'VS Code extension',
    description: 'Expose common transforms and inspection flows inside editor workflows after shared logic extraction.',
    scope: 'extension',
  },
  {
    title: 'CLI v1 API and database commands',
    description: 'Run saved API collections and SQLite queries in CI once shared logic is stable.',
    scope: 'cli/v1',
  },
];

function statusClass(status: string) {
  if (status === 'shipped') return 'border-[#1a7f37] bg-[#dafbe1] text-[#1a7f37]';
  if (status === 'active') return 'border-[#bf8700] bg-[#fff8c5] text-[#7d4e00]';
  if (status === 'next') return 'border-[#0969da] bg-[#ddf4ff] text-[#0969da]';
  return 'border-[#d0d7de] bg-[#f6f8fa] text-[#57606a]';
}

function RoadmapSection({
  title,
  status,
  items,
}: {
  title: string;
  status: 'shipped' | 'active' | 'next' | 'later';
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
  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#24292f]">
      <Navigation />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-md border border-[#d0d7de] bg-white">
          <div className="border-b border-[#d0d7de] px-5 py-4">
            <p className="font-mono text-xs text-[#57606a]">ROADMAP.md</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24292f]">Project roadmap</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
              This roadmap reflects the current codebase: shipped routes and packages first, active extraction and release work next, then proposed modules from the tool registry backlog.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://github.com/jasimvk/mydebugtools/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#1f883d] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1a7f37] hover:text-white"
              >
                Open a GitHub issue
              </a>
              <a
                href="https://github.com/jasimvk/mydebugtools/blob/main/CLI_ROADMAP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                CLI roadmap
              </a>
            </div>
          </div>

          <RoadmapSection title="Shipped in the codebase" status="shipped" items={shippedItems} />
          <RoadmapSection title="Active foundation work" status="active" items={activeItems} />
          <RoadmapSection title="Next incorporatable tools" status="next" items={nextItems} />
          <RoadmapSection title="Later expansion" status="later" items={laterItems} />
        </div>
      </section>
    </main>
  );
}
