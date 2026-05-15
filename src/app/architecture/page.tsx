import Link from 'next/link';

const layers = [
  ['Browser tools', 'Local-first utilities for formatting, decoding, editing, diffing, and inspection.'],
  ['API workbench', 'Network-capable API testing with explicit browser CORS constraints, private mode, and optional Cloud Sync.'],
  ['Persistence', 'LocalStorage for local workspaces and authenticated API routes for synced collections.'],
  ['Project shell', 'Navigation, roadmap, releases, answers, and docs surfaces that make the project inspectable.'],
];

export default function ArchitecturePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-[#24292f] sm:px-6">
      <p className="font-mono text-xs text-[#57606a]">debugtools / architecture</p>
      <h1 className="mt-2 text-3xl font-semibold">Architecture notes</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
        DebugTools is structured as a set of focused browser modules wrapped in an open-source project shell. The default boundary is local execution; network and cloud behavior is called out when a tool needs it.
      </p>
      <div className="mt-8 grid gap-3">
        {layers.map(([title, text]) => (
          <section key={title} className="rounded-md border border-[#d0d7de] bg-white p-5">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#57606a]">{text}</p>
          </section>
        ))}
      </div>
      <div className="mt-8 rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-5">
        <h2 className="text-lg font-semibold">Next architecture work</h2>
        <p className="mt-2 text-sm leading-6 text-[#57606a]">
          The next milestone is separating shared tool primitives, request persistence, and module metadata so each tool can be tested and documented independently.
        </p>
        <Link href="/roadmap" className="mt-4 inline-flex text-sm font-semibold text-[#0969da]">View roadmap</Link>
      </div>
    </main>
  );
}
