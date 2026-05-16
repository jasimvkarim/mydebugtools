const boundaries = [
  ['Local-first tools', 'JSON, JWT, Hash, HTML, HTTP Status, Diff, Base64, UUID, URL, Timestamp, and most inspectors process data in the browser.'],
  ['API Tester network requests', 'API Tester sends headers, bodies, tokens, and cookies only to the target URLs entered by the user, subject to browser CORS rules.'],
  ['Optional sync', 'Authenticated collection sync is optional and stores saved API Tester collections through the configured Supabase project.'],
  ['Secrets handling', 'Use throwaway tokens for reports, redact credentials, and keep production secrets out of issues, screenshots, fixtures, and exports.'],
  ['Private reporting', 'Security issues should go through GitHub Security Advisories before any public issue or disclosure.'],
];

export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-[#24292f] sm:px-6">
      <p className="font-mono text-xs text-[#57606a]">debugtools / security</p>
      <h1 className="mt-2 text-3xl font-semibold">Security and privacy model</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
        debugtools is designed around explicit data boundaries. A tool should make it clear whether data stays in the browser, leaves through a user-triggered request, or syncs through an authenticated cloud feature.
      </p>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {boundaries.map(([title, text]) => (
          <section key={title} className="rounded-md border border-[#d0d7de] bg-white p-5">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#57606a]">{text}</p>
          </section>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="https://github.com/jasimvkarim/mydebugtools/security/advisories/new" className="rounded-md bg-[#24292f] px-4 py-2 text-sm font-semibold text-white">Report privately</a>
        <a href="https://github.com/jasimvkarim/mydebugtools/blob/main/SECURITY.md" className="rounded-md border border-[#d0d7de] px-4 py-2 text-sm font-semibold text-[#24292f]">Read SECURITY.md</a>
      </div>
    </main>
  );
}
