const steps = [
  ['Pick a module', 'Start with a single tool, bug, parser, import format, or documentation gap.'],
  ['Open an issue', 'Describe the workflow, sample input, expected behavior, and failure mode.'],
  ['Keep changes scoped', 'Small module-focused patches are easier to review and safer to ship.'],
  ['Verify behavior', 'Run focused tests, build the app, and include screenshots for UI changes.'],
];

export default function ContributingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-[#24292f] sm:px-6">
      <p className="font-mono text-xs text-[#57606a]">debugtools / contributing</p>
      <h1 className="mt-2 text-3xl font-semibold">Contributing</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
        debugtools works best when contributions are small, reproducible, and attached to a real debugging workflow.
      </p>
      <div className="mt-8 grid gap-3">
        {steps.map(([title, text]) => (
          <section key={title} className="rounded-md border border-[#d0d7de] bg-white p-5">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#57606a]">{text}</p>
          </section>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="https://github.com/jasimvk/mydebugtools/issues/new" className="rounded-md bg-[#24292f] px-4 py-2 text-sm font-semibold text-white">Open issue</a>
        <a href="https://github.com/jasimvk/mydebugtools" className="rounded-md border border-[#d0d7de] px-4 py-2 text-sm font-semibold text-[#24292f]">View repository</a>
      </div>
    </main>
  );
}
