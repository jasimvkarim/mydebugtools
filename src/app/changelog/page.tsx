import Link from 'next/link';

const entries = [
  ['OSS bookkeeping polish', 'Refreshed README, CONTRIBUTING, SECURITY, changelog, releases, and roadmap copy for a practical open-source project surface.'],
  ['API Tester import fixes', 'Native debugtools exports and nested Postman collections import without empty undefined collections.'],
  ['Typography and header polish', 'Recent site work moved the public shell toward a compact Menlo-friendly OSS interface.'],
  ['Local-first positioning', 'Docs now state which tools run in the browser and how API Tester network requests differ from local-only modules.'],
  ['Roadmap cleanup', 'The roadmap now tracks the current modules first, then CLI extraction and deeper API workflows.'],
];

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-[#24292f] sm:px-6">
      <p className="font-mono text-xs text-[#57606a]">debugtools / changelog</p>
      <h1 className="mt-2 text-3xl font-semibold">Changelog</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
        A compact implementation log for shipped improvements. The full file lives at GitHub; release summaries live on the releases page.
      </p>
      <div className="mt-8 divide-y divide-[#d0d7de] rounded-md border border-[#d0d7de] bg-white">
        {entries.map(([title, text]) => (
          <article key={title} className="p-5">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#57606a]">{text}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
        <Link href="/releases" className="text-[#0969da]">View releases</Link>
        <a href="https://github.com/jasimvkarim/mydebugtools/blob/main/CHANGELOG.md" className="text-[#0969da]">Read CHANGELOG.md</a>
      </div>
    </main>
  );
}
