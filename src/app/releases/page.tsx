'use client';

import Navigation from '../components/Navigation';

const releases = [
  {
    version: '2026-05-11',
    title: 'OSS Project Refresh',
    status: 'latest',
    summary: 'Repository-style redesign, anomaly cleanup, API import fixes, and a visible module backlog.',
    changes: [
      'Reworked the public site into an open-source project surface.',
      'Added a proposed tools backlog for incorporatable modules.',
      'Normalized individual tool pages through the shared OSS shell.',
      'Fixed native and nested Postman collection imports.',
      'Restored full TypeScript validation.',
    ],
  },
  {
    version: '1.5.0',
    title: 'Database Query Tool',
    status: 'stable',
    summary: 'SQLite query workspace with quick queries, CSV export, and local inspection flows.',
    changes: ['Added SQLite upload workflow.', 'Added query execution and result views.', 'Added CSV download support.'],
  },
  {
    version: '1.4.0',
    title: 'Tool Expansion',
    status: 'stable',
    summary: 'Regex, HTML, CSS, Markdown, Color, and Code Diff tools joined the toolkit.',
    changes: ['Expanded the public tool catalog.', 'Improved JSON layout and navigation.', 'Added more debugging workflows.'],
  },
  {
    version: '1.3.0',
    title: 'Base64 Converter',
    status: 'stable',
    summary: 'Image and PDF conversion support for Base64 workflows.',
    changes: ['Added image conversion.', 'Added PDF conversion.', 'Improved file handling states.'],
  },
  {
    version: '1.2.0',
    title: 'API Tester',
    status: 'stable',
    summary: 'Authentication, response handling, and collection workflows for API debugging.',
    changes: ['Improved REST request handling.', 'Added auth and response tooling.', 'Expanded collection UX.'],
  },
];

function badgeClass(status: string) {
  if (status === 'latest') return 'border-[#1a7f37] bg-[#dafbe1] text-[#1a7f37]';
  return 'border-[#d0d7de] bg-[#f6f8fa] text-[#57606a]';
}

export default function ReleasesPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#24292f]">
      <Navigation />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-md border border-[#d0d7de] bg-white">
          <div className="border-b border-[#d0d7de] px-5 py-4">
            <p className="font-mono text-xs text-[#57606a]">RELEASES.md</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24292f]">Releases</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
              Human-readable release notes for users, contributors, and future maintainers. Detailed change history stays in the changelog.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://github.com/jasimvk/mydebugtools/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#24292f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#32383f] hover:text-white"
              >
                GitHub releases
              </a>
              <a
                href="https://github.com/jasimvk/mydebugtools/blob/main/CHANGELOG.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                Changelog
              </a>
            </div>
          </div>

          <div className="divide-y divide-[#d0d7de]">
            {releases.map((release) => (
              <article key={release.version} className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-xs text-[#57606a]">{release.version}</p>
                    <h2 className="mt-1 text-xl font-semibold text-[#0969da]">{release.title}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[#57606a]">{release.summary}</p>
                  </div>
                  <span className={`w-fit rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClass(release.status)}`}>
                    {release.status}
                  </span>
                </div>
                <ul className="mt-4 grid gap-2 md:grid-cols-2">
                  {release.changes.map((change) => (
                    <li key={change} className="flex gap-2 text-sm leading-6 text-[#57606a]">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1f883d]" />
                      {change}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
