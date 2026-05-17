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

const futureDebugTools = [
  {
    priority: 'P1',
    title: 'OpenTelemetry Trace Viewer',
    route: '/tools/otel-trace-viewer',
    description: 'Load OTLP-style JSON traces locally, show spans, durations, parent-child relationships, errors, and slow service hops.',
  },
  {
    priority: 'P1',
    title: 'Mobile Network Debug Checklist',
    route: '/tools/mobile-network-debug',
    description: 'Generate setup steps for Charles, Proxyman, HTTP Toolkit, Requestly, Android Network Inspector, Chucker, OkHttp logging, and device proxy debugging.',
  },
  {
    priority: 'P1',
    title: 'React Native Debug Pack',
    route: '/tools/react-native-debug',
    description: 'Combine Metro logs, Hermes errors, React Native stack traces, network notes, startup markers, and Flipper-alternative guidance.',
  },
  {
    priority: 'P1',
    title: 'Android Logcat Analyzer',
    route: '/tools/android-logcat',
    description: 'Analyze Logcat, fatal exceptions, ANRs, process IDs, package names, device info, and root-cause candidates.',
  },
  {
    priority: 'P1',
    title: 'Android Debug Helper',
    route: '/tools/android-debug',
    description: 'Turn symptoms into adb, emulator, profiler, network, and device-inspection commands for Android investigations.',
  },
  {
    priority: 'P1',
    title: 'Mobile Feedback Parser',
    route: '/tools/mobile-feedback',
    description: 'Normalize tester reports into repro steps, environment details, attachments, expected behavior, actual behavior, and triage labels.',
  },
  {
    priority: 'P1',
    title: 'Monitoring Snapshot Inspector',
    route: '/tools/monitoring-inspector',
    description: 'Inspect pasted metrics, alerts, logs, and traces to highlight anomalies, saturation, latency spikes, and error-rate shifts.',
  },
  {
    priority: 'P1',
    title: 'Chrome Mobile DevTools Guide',
    route: '/tools/mobile-devtools',
    description: 'Provide checklist-driven debugging for mobile browser layout, network, console, performance, and remote inspection workflows.',
  },
  {
    priority: 'P1',
    title: 'API Auth Config Tester',
    route: '/tools/api-auth-config',
    description: 'Generate and test API auth headers, tokens, sample credentials, request signing inputs, and endpoint-specific auth fixtures.',
  },
  {
    priority: 'P2',
    title: 'Python Debug Log Formatter',
    route: '/tools/python-debug-log',
    description: 'Format Python tracebacks, logging output, PySnooper-style traces, and execution notes into a compact debug report.',
  },
  {
    priority: 'P2',
    title: 'Python Stack Sampler Inspector',
    route: '/tools/python-profiler',
    description: 'Summarize sampling profiler output, hot frames, blocking calls, and CPython stack snapshots.',
  },
  {
    priority: 'P2',
    title: 'GDB / LLDB Session Viewer',
    route: '/tools/native-debug-session',
    description: 'Parse debugger transcripts into breakpoints, signals, frames, variables, commands, and next actions.',
  },
  {
    priority: 'P2',
    title: 'Kubernetes Debug Helper',
    route: '/tools/k8s-debug',
    description: 'Generate kubectl logs, describe, events, exec, debug-container, and manifest checks from pod/service symptoms.',
  },
  {
    priority: 'P2',
    title: 'Binary / Hex Inspector',
    route: '/tools/binary-inspector',
    description: 'Inspect pasted hex or Base64 bytes, detect magic numbers, convert endian values, and surface file signatures.',
  },
  {
    priority: 'P2',
    title: 'Heap / Memory Event Visualizer',
    route: '/tools/heap-visualizer',
    description: 'Visualize allocation/free event logs, heap growth, suspicious leaks, and memory lifecycle patterns.',
  },
  {
    priority: 'P2',
    title: 'Runtime Inspector Notes',
    route: '/tools/runtime-inspector',
    description: 'Organize app state, storage, network logs, feature flags, and runtime observations into a repeatable debug report.',
  },
  {
    priority: 'P2',
    title: 'Apple Debug Helper',
    route: '/tools/apple-debug',
    description: 'Assist with iOS/macOS crash snippets, Xcode notes, Instruments profiling, symbolication, device logs, and signing clues.',
  },
  {
    priority: 'P2',
    title: 'Remote Web Debug Helper',
    route: '/tools/remote-web-debug',
    description: 'Create setup steps for Safari Web Inspector, Chrome remote devices, Weinre-style legacy debugging, and same-network device checks.',
  },
  {
    priority: 'P2',
    title: 'Java Process Diagnosis Helper',
    route: '/tools/java-process-debug',
    description: 'Parse JVM logs, thread dumps, heap hints, GC snippets, stack traces, and process-health symptoms.',
  },
  {
    priority: 'P2',
    title: 'Go Struct Dump Formatter',
    route: '/tools/go-dump',
    description: 'Format Go dumps, structs, maps, slices, and panic output into readable tree and table views.',
  },
  {
    priority: 'P2',
    title: 'Certificate Chain Viewer',
    route: '/tools/certificate-viewer',
    description: 'Inspect pasted PEM certificates, chains, issuers, subjects, SANs, expiry, fingerprints, and validation warnings.',
  },
  {
    priority: 'P2',
    title: 'Sample Data Generator',
    route: '/tools/sample-data-generator',
    description: 'Generate structured arrays of sample objects with custom fields, value types, API response shapes, and export formats.',
  },
  {
    priority: 'P2',
    title: 'OpenBadge Validator',
    route: '/tools/openbadge-validator',
    description: 'Validate OpenBadge credential JSON, required fields, issuer metadata, evidence links, expiry, and verification status.',
  },
  {
    priority: 'P2',
    title: 'PNG Text Decoder',
    route: '/tools/png-text-decoder',
    description: 'Extract PNG text chunks, metadata, dimensions, color details, and hidden diagnostic payloads from uploaded images.',
  },
  {
    priority: 'P3',
    title: 'Chrome DevTools MCP Helper',
    route: '/tools/chrome-devtools-mcp',
    description: 'Generate browser automation, DevTools Protocol, screenshot, console, network, and performance-debugging playbooks.',
  },
  {
    priority: 'P3',
    title: 'DWARF Debug Info Explainer',
    route: '/tools/dwarf-explorer',
    description: 'Explain DWARF debug-info snippets, symbols, compilation units, line tables, and native-debug metadata.',
  },
  {
    priority: 'P3',
    title: 'Time Travel Debugging Notes',
    route: '/tools/time-travel-debug',
    description: 'Compare replay debugging, rr, Redux DevTools, browser timelines, and record/replay investigation patterns.',
  },
  {
    priority: 'P3',
    title: 'Debugging Playbook Generator',
    route: '/tools/debugging-playbook',
    description: 'Convert a symptom, stack trace, or incident note into a step-by-step debugging plan and evidence checklist.',
  },
  {
    priority: 'P3',
    title: 'Qt Debug Helper',
    route: '/tools/qt-debug',
    description: 'Format Qt logs, signals/slots notes, platform plugin errors, build metadata, and cross-platform runtime symptoms.',
  },
  {
    priority: 'P3',
    title: 'Android Emulator Matrix',
    route: '/tools/android-emulator',
    description: 'Plan emulator coverage by API level, device class, density, architecture, Play Services, and network profile.',
  },
  {
    priority: 'P3',
    title: 'Unity Debug UI Planner',
    route: '/tools/unity-debug-ui',
    description: 'Plan in-game debug overlays, runtime toggles, metrics panels, logs, and QA-only controls.',
  },
  {
    priority: 'P3',
    title: 'AI Debug Question Builder',
    route: '/tools/debug-question-builder',
    description: 'Turn logs, traces, failing tests, and repro notes into concise questions for AI-assisted debugging sessions.',
  },
  {
    priority: 'P3',
    title: 'Product Planning Timeline',
    route: '/tools/product-planning',
    description: 'Prioritize debug-tool ideas, score effort and impact, and visualize delivery order on a lightweight Gantt-style timeline.',
  },
];

const researchSources = [
  {
    title: 'GitHub debugging-tools topic',
    url: 'https://github.com/topics/debugging-tools',
    description: 'Open-source debugging utilities such as HTTP troubleshooters, GDB frontends, profilers, dump formatters, debug containers, and trace tools.',
  },
  {
    title: 'GitHub observability topic',
    url: 'https://github.com/topics/observability',
    description: 'Monitoring, logs, metrics, traces, OpenTelemetry, Prometheus, Grafana, APM, and production diagnosis signals.',
  },
  {
    title: 'debugtools.dev',
    url: 'https://debugtools.dev/',
    description: 'Adjacent tool hub with API Debugger, Certificate Viewer, Product Planning, Base64, Sample Data Generator, and hidden/upcoming validators.',
  },
  {
    title: 'DebugTools IntelliJ plugin',
    url: 'https://debug-tools.cc/en/',
    description: 'Java-focused debugging ideas including hot reload, hot deploy, quick Java method calls, Groovy scripts, SQL timing, and URL-to-method lookup.',
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

function CurrentToolsSection() {
  return (
    <section className="border-t border-[#d0d7de]">
      <div className="border-b border-[#d0d7de] bg-[#f6f8fa] px-5 py-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-[#24292f]">Current tool routes</h2>
          <span className="rounded-full border border-[#1a7f37] bg-[#dafbe1] px-2.5 py-1 text-xs font-semibold text-[#1a7f37]">
            live
          </span>
        </div>
      </div>
      <div className="grid gap-2 p-4 md:grid-cols-2 xl:grid-cols-3">
        {liveTools.map((tool) => (
          <article key={tool.path} className="rounded-md border border-[#d0d7de] bg-white p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-[#0969da]">{tool.name}</h3>
                <p className="mt-1 font-mono text-xs text-[#57606a]">{tool.path}</p>
              </div>
              <span className="rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-2 py-0.5 text-[11px] font-semibold text-[#57606a]">
                {tool.maturity}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#57606a]">{tool.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FutureToolsSection() {
  const groupedTools = ['P0', 'P1', 'P2', 'P3'].map((priority) => ({
    priority,
    tools: futureDebugTools.filter((tool) => tool.priority === priority),
  })).filter((group) => group.tools.length > 0);

  return (
    <section className="border-t border-[#d0d7de]">
      <div className="border-b border-[#d0d7de] bg-[#f6f8fa] px-5 py-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-[#24292f]">Future debugging tools to implement</h2>
          <span className="rounded-full border border-[#0969da] bg-[#ddf4ff] px-2.5 py-1 text-xs font-semibold text-[#0969da]">
            {futureDebugTools.length} planned
          </span>
        </div>
      </div>
      <div className="divide-y divide-[#d0d7de]">
        {groupedTools.map((group) => (
          <div key={group.priority} className="grid gap-3 p-5 lg:grid-cols-[88px_1fr]">
            <div>
              <span className="inline-flex rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-2.5 py-1 font-mono text-xs font-semibold text-[#57606a]">
                {group.priority}
              </span>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {group.tools.map((tool) => (
                <article key={tool.route} className="rounded-md border border-[#d0d7de] bg-white p-3">
                  <h3 className="text-sm font-semibold text-[#0969da]">{tool.title}</h3>
                  <p className="mt-1 font-mono text-xs text-[#57606a]">{tool.route}</p>
                  <p className="mt-2 text-xs leading-5 text-[#57606a]">{tool.description}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResearchSourcesSection() {
  return (
    <section className="border-t border-[#d0d7de]">
      <div className="border-b border-[#d0d7de] bg-[#f6f8fa] px-5 py-3">
        <h2 className="text-sm font-semibold text-[#24292f]">Research sources</h2>
      </div>
      <div className="grid gap-2 p-4 md:grid-cols-2">
        {researchSources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[#d0d7de] bg-white p-3 transition-colors hover:border-[#0969da] hover:bg-[#f6f8fa]"
          >
            <h3 className="text-sm font-semibold text-[#0969da]">{source.title}</h3>
            <p className="mt-2 text-xs leading-5 text-[#57606a]">{source.description}</p>
          </a>
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

          <CurrentToolsSection />
          <FutureToolsSection />
          <ResearchSourcesSection />
          <RoadmapSection title="Shipped in the codebase" status="shipped" items={shippedItems} />
          <RoadmapSection title="Beta or needs polish" status="beta" items={betaItems} />
          <RoadmapSection title="Next work" status="next" items={nextItems} />
          <RoadmapSection title="Backlog proposals" status="backlog" items={proposedBacklogItems} />
        </div>
      </section>
    </main>
  );
}
