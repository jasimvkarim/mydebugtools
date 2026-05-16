const boundaries = [
  ['Local', 'Formatters, encoders, decoders, diff tools, and most inspectors run in the browser.'],
  ['Network', 'API Tester sends requests to the URLs you enter and exposes browser CORS limits clearly.'],
  ['Cloud optional', 'Authenticated collection sync is optional and separate from the local workspace.'],
  ['Private mode', 'API Tester can avoid saving tabs, history, auth tokens, passwords, and environment secrets locally.'],
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
    </main>
  );
}
