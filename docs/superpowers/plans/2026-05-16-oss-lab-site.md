# OSS Lab Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition DebugTools as a serious local-first open-source engineering workbench on `debugtools.org`.

**Architecture:** Keep the existing Next.js App Router structure and OSS shell. Make shared identity/domain changes in metadata, robots, sitemap generation, and navigation; make product-positioning changes in the homepage and `/tools/all`; add lightweight trust pages as static App Router pages.

**Tech Stack:** Next.js 14 App Router, React client components where already used, Tailwind CSS utility classes, Heroicons, lucide-react, Jest, Playwright smoke scripts, Vercel.

---

## File Structure

- Modify `src/app/layout.tsx`: canonical domain, metadata, Open Graph, Twitter, and structured data.
- Modify `public/robots.txt`: host and sitemap URL.
- Modify `scripts/generate-sitemap.js`: canonical domain and new trust pages.
- Modify `src/app/components/Navigation.tsx`: repo-like navigation with API Tester, Docs/Answers, GitHub, Sponsor.
- Modify `src/app/page.tsx`: homepage OSS lab positioning, proof blocks, flagship API Tester, lab notebook links.
- Modify `src/app/tools/all/page.tsx`: module registry cards with maturity and privacy labels.
- Create `src/app/architecture/page.tsx`: architecture notes and data/privacy boundaries.
- Create `src/app/security/page.tsx`: security and privacy model.
- Create `src/app/contributing/page.tsx`: lightweight contribution entrypoint linked to GitHub.
- Create `src/app/changelog/page.tsx`: release/changelog hub linking to releases and recent work.

## Task 1: Canonical Domain And Site Metadata

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `public/robots.txt`
- Modify: `scripts/generate-sitemap.js`

- [ ] **Step 1: Update global metadata domain and copy**

In `src/app/layout.tsx`, set a shared constant near the imports:

```ts
const SITE_URL = 'https://debugtools.org';
const SITE_NAME = 'DebugTools';
const SITE_DESCRIPTION = 'A local-first open-source workbench for API testing, data inspection, build debugging, and everyday developer operations.';
```

Then update `metadata` to use:

```ts
title: 'DebugTools - Local-first open-source developer workbench',
description: SITE_DESCRIPTION,
metadataBase: new URL(SITE_URL),
keywords: 'debugtools, developer tools, api tester, json formatter, jwt decoder, code diff, local-first tools, open source developer tools, debugging, formatting',
alternates: {
  canonical: SITE_URL,
},
openGraph: {
  type: 'website',
  locale: 'en_US',
  url: `${SITE_URL}/`,
  siteName: SITE_NAME,
  title: 'DebugTools - Local-first open-source developer workbench',
  description: SITE_DESCRIPTION,
  images: [
    {
      url: `${SITE_URL}/og-image.svg`,
      width: 1200,
      height: 630,
      alt: 'DebugTools - Local-first open-source developer workbench',
      type: 'image/svg+xml',
    },
  ],
},
twitter: {
  card: 'summary_large_image',
  site: '@jasimvk',
  creator: '@jasimvk',
  title: 'DebugTools - Local-first open-source developer workbench',
  description: SITE_DESCRIPTION,
  images: [`${SITE_URL}/og-image.svg`],
},
```

- [ ] **Step 2: Update structured data**

In `src/app/layout.tsx`, update `siteJsonLd` URLs and names:

```ts
'@id': `${SITE_URL}/#website`,
name: SITE_NAME,
url: `${SITE_URL}/`,
target: `${SITE_URL}/tools/all/?q={search_term_string}`,
'@id': `${SITE_URL}/#app`,
name: SITE_NAME,
url: `${SITE_URL}/`,
description: SITE_DESCRIPTION,
```

- [ ] **Step 3: Update robots**

In `public/robots.txt`, replace:

```txt
Host: https://mydebugtools.com
Sitemap: https://mydebugtools.com/sitemap.xml
```

with:

```txt
Host: https://debugtools.org
Sitemap: https://debugtools.org/sitemap.xml
```

- [ ] **Step 4: Update sitemap generator**

In `scripts/generate-sitemap.js`, replace:

```js
const siteUrl = 'https://mydebugtools.com';
```

with:

```js
const siteUrl = 'https://debugtools.org';
```

Do not add the new trust-page sitemap entries in this task. Those routes do not exist until Task 5, so the sitemap entries are added there.

- [ ] **Step 5: Verify metadata text references**

Run:

```bash
rg -n "mydebugtools.com|MyDebugTools - All-in-one" src/app/layout.tsx public/robots.txt scripts/generate-sitemap.js
```

Expected: no output for the old domain or old title in those files.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx public/robots.txt scripts/generate-sitemap.js
git commit -m "Update DebugTools canonical metadata"
```

## Task 2: Navigation And Trust Surface Links

**Files:**
- Modify: `src/app/components/Navigation.tsx`

- [ ] **Step 1: Update nav items**

In `src/app/components/Navigation.tsx`, replace `navItems` with:

```ts
const navItems = [
  { name: 'Tools', href: '/tools/all', icon: WrenchIcon },
  { name: 'API Tester', href: '/tools/api', icon: BeakerIcon },
  { name: 'CLI', href: '/cli', icon: CommandLineIcon },
  { name: 'Docs', href: '/answers', icon: InformationCircleIcon },
  { name: 'Roadmap', href: '/roadmap', icon: MapIcon },
  { name: 'Releases', href: '/releases', icon: RocketLaunchIcon },
];
```

Add `BeakerIcon` to the Heroicons import list.

- [ ] **Step 2: Update brand label**

Change the brand text from:

```tsx
<span className="font-semibold">MyDebugTools</span>
```

to:

```tsx
<span className="font-semibold">DebugTools</span>
<span className="hidden rounded-full border border-[#d0d7de] px-2 py-0.5 text-xs font-medium text-[#57606a] lg:inline">
  OSS lab
</span>
```

- [ ] **Step 3: Add trust links to desktop actions**

Keep `New issue`, `Sponsor`, and `GitHub`, but ensure `Sponsor` points to:

```txt
https://buymeacoffee.com/jasimvk
```

- [ ] **Step 4: Verify mobile menu**

Ensure mobile menu includes all `navItems`, GitHub, and Sponsor. It can inherit from the current mapped list and existing external links.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/Navigation.tsx
git commit -m "Refine OSS lab navigation"
```

## Task 3: Homepage OSS Lab Refresh

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update homepage brand and hero copy**

In `src/app/page.tsx`, update the header brand from `MyDebugTools` to `DebugTools`.

Set the hero `h1` text to:

```tsx
Local-first open-source tools for debugging real software.
```

Set the hero paragraph to:

```tsx
DebugTools is a browser workbench for API testing, JSON and token inspection, code comparison, crash parsing, build analysis, and everyday developer operations. It is built in public, MIT licensed, and designed so sensitive workflows stay local where possible.
```

- [ ] **Step 2: Update primary actions**

Use these hero actions:

```tsx
<Link href="/tools/all">Browse tools</Link>
<Link href="/tools/api">Open API Tester</Link>
<a href="https://github.com/jasimvk/mydebugtools">View GitHub</a>
```

Keep Sponsor as a secondary link in the project links area.

- [ ] **Step 3: Update proof block**

Use these status labels in the project status aside:

```txt
30+ modules / browser workbench
MIT / license
Local-first / privacy model
CLI / roadmap
```

- [ ] **Step 4: Add flagship module section**

Add a section after the featured modules header or before the README section:

```tsx
<section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
  <div className="rounded-md border border-[#d0d7de] bg-white p-5">
    <p className="font-mono text-xs text-[#57606a]">flagship / tools/api</p>
    <h2 className="mt-2 text-2xl font-semibold text-[#24292f]">API Tester is the flagship module</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
      A browser-native API workbench with collections, environments, import/export, private mode, CORS guidance, response inspection, and optional Cloud Sync.
    </p>
    <div className="mt-4 flex flex-wrap gap-2">
      {['Local workspace', 'Private mode', 'Import/export', 'Cloud Sync optional', 'CORS-aware'].map((item) => (
        <span key={item} className="rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1 text-xs font-semibold text-[#57606a]">
          {item}
        </span>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 5: Add lab notebook links**

Add a compact section linking to:

```ts
[
  { label: 'Architecture', href: '/architecture', text: 'How the browser tools, API routes, auth, and local-first boundaries fit together.' },
  { label: 'Security model', href: '/security', text: 'What stays local, what touches network, and where Cloud Sync applies.' },
  { label: 'Contributing', href: '/contributing', text: 'Small module-focused contribution path for issues and tools.' },
  { label: 'Changelog', href: '/changelog', text: 'Release notes and implementation log.' },
]
```

- [ ] **Step 6: Verify homepage old wording**

Run:

```bash
rg -n "MyDebugTools|All-in-one|powerful collection" src/app/page.tsx
```

Expected: no broad marketing phrasing in homepage copy. `MyDebugTools` should not appear in public-facing homepage text.

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx
git commit -m "Refresh homepage as OSS lab"
```

## Task 4: Tool Registry Upgrade

**Files:**
- Modify: `src/app/tools/all/page.tsx`

- [ ] **Step 1: Add maturity and privacy fields**

Update every entry in `allTools` to include:

```ts
maturity: 'Stable' | 'Beta' | 'Experimental';
privacy: 'Local' | 'Network' | 'Cloud optional';
```

Use these assignments:

- `API Tester`: `Beta`, `Network`
- `Database Query`: `Beta`, `Local`
- `Bundle Analyzer`: `Experimental`, `Local`
- `Startup Profiling`: `Experimental`, `Local`
- all other existing tools: `Stable`, `Local`

- [ ] **Step 2: Remove duplicate Hash Generator**

Delete the second `Hash Generator` item so every `path` is unique.

- [ ] **Step 3: Update page heading**

Change the heading copy to:

```tsx
<p className="font-mono text-xs text-[#57606a]">debugtools / modules</p>
<h1 className="mt-2 text-3xl font-semibold text-[#24292f]">Module registry</h1>
<p className="mt-2 max-w-3xl text-sm leading-6 text-[#57606a]">
  Each module is a focused debugging workflow with an explicit maturity level and privacy model. Open a tool, inspect its behavior, or propose the next module through GitHub.
</p>
```

- [ ] **Step 4: Render maturity and privacy badges**

Inside each tool card, next to the category badge, render:

```tsx
<span className="rounded-full border border-[#d0d7de] px-2 py-0.5 text-xs text-[#57606a]">
  {tool.maturity}
</span>
<span className="rounded-full border border-[#d0d7de] px-2 py-0.5 text-xs text-[#57606a]">
  {tool.privacy}
</span>
```

- [ ] **Step 5: Update proposed modules language**

Keep the existing `incorporatableTools`, but change the section title to:

```tsx
<h2 className="mt-2 text-2xl font-semibold text-[#24292f]">Proposed modules</h2>
```

and keep the issue-link behavior.

- [ ] **Step 6: Verify unique paths**

Run:

```bash
node -e "const fs=require('fs'); const s=fs.readFileSync('src/app/tools/all/page.tsx','utf8'); const paths=[...s.matchAll(/path: '([^']+)'/g)].map(m=>m[1]); const dup=paths.filter((p,i)=>paths.indexOf(p)!==i); if(dup.length){console.error(dup); process.exit(1)} console.log('unique paths', paths.length)"
```

Expected: `unique paths 21` or another count with no duplicates.

- [ ] **Step 7: Commit**

```bash
git add src/app/tools/all/page.tsx
git commit -m "Upgrade tools page to module registry"
```

## Task 5: Lightweight Trust Pages

**Files:**
- Create: `src/app/architecture/page.tsx`
- Create: `src/app/security/page.tsx`
- Create: `src/app/contributing/page.tsx`
- Create: `src/app/changelog/page.tsx`

- [ ] **Step 1: Create architecture page**

Create `src/app/architecture/page.tsx` with:

```tsx
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
```

- [ ] **Step 2: Create security page**

Create `src/app/security/page.tsx` with:

```tsx
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
        DebugTools is designed around explicit data boundaries. A tool should make it clear whether data stays in the browser, leaves through a user-triggered request, or syncs through an authenticated cloud feature.
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
```

- [ ] **Step 3: Create contributing page**

Create `src/app/contributing/page.tsx` with:

```tsx
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
        DebugTools works best when contributions are small, reproducible, and attached to a real debugging workflow.
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
```

- [ ] **Step 4: Create changelog page**

Create `src/app/changelog/page.tsx` with:

```tsx
import Link from 'next/link';

const entries = [
  ['API Tester request handling', 'Normalized plain domains, cleaned GET/HEAD behavior, and made Import a real button.'],
  ['OSS lab direction', 'Defined DebugTools as a serious local-first open-source engineering workbench.'],
  ['Domain launch', 'Attached debugtools.org to the production Vercel deployment.'],
];

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-[#24292f] sm:px-6">
      <p className="font-mono text-xs text-[#57606a]">debugtools / changelog</p>
      <h1 className="mt-2 text-3xl font-semibold">Changelog</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
        A compact implementation log for shipped improvements. Formal release notes live on the releases page.
      </p>
      <div className="mt-8 divide-y divide-[#d0d7de] rounded-md border border-[#d0d7de] bg-white">
        {entries.map(([title, text]) => (
          <article key={title} className="p-5">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#57606a]">{text}</p>
          </article>
        ))}
      </div>
      <Link href="/releases" className="mt-6 inline-flex text-sm font-semibold text-[#0969da]">View releases</Link>
    </main>
  );
}
```

- [ ] **Step 5: Add trust pages to sitemap generator**

In `scripts/generate-sitemap.js`, add these page entries before the CLI/Roadmap/Releases entries:

```js
{ url: '/architecture/', changefreq: 'monthly', priority: 0.7 },
{ url: '/security/', changefreq: 'monthly', priority: 0.7 },
{ url: '/contributing/', changefreq: 'monthly', priority: 0.7 },
{ url: '/changelog/', changefreq: 'weekly', priority: 0.7 },
```

- [ ] **Step 5: Commit**

```bash
git add src/app/architecture/page.tsx src/app/security/page.tsx src/app/contributing/page.tsx src/app/changelog/page.tsx scripts/generate-sitemap.js
git commit -m "Add OSS trust pages"
```

## Task 6: Verification And Deployment

**Files:**
- No source edits unless verification finds a bug.

- [ ] **Step 1: Run unit tests**

```bash
npm test -- --runInBand src/app/components/__tests__/Navigation.test.tsx src/app/tools/api/lib/__tests__/collectionImport.test.ts src/app/tools/api/hooks/__tests__/useCollections.test.ts
```

Expected: all suites pass. If `Navigation.test.tsx` expects old nav text, update the test expectation to the new nav names and commit with the relevant task.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: build completes successfully. This regenerates `public/sitemap.xml`; include it in the final commit only if the diff contains intentional `debugtools.org` URLs and new trust pages.

- [ ] **Step 3: Browser smoke test**

Use Playwright or Browser plugin to verify:

```txt
/
/tools/all
/tools/api
/architecture
/security
/contributing
/changelog
```

Expected:

- No blank pages.
- No overlapping hero/nav text at desktop width.
- `/tools/all` shows maturity and privacy labels.
- `/tools/api` still loads and Import is visible.

- [ ] **Step 4: Metadata spot check**

Run:

```bash
rg -n "https://debugtools.org|mydebugtools.com" src/app/layout.tsx public/robots.txt public/sitemap.xml scripts/generate-sitemap.js
```

Expected: canonical files use `https://debugtools.org`; no `mydebugtools.com` remains in these four files.

- [ ] **Step 5: Commit generated sitemap if intentional**

If `public/sitemap.xml` now contains `debugtools.org` URLs and new trust pages, commit it:

```bash
git add public/sitemap.xml
git commit -m "Regenerate sitemap for debugtools domain"
```

- [ ] **Step 6: Deploy production**

```bash
vercel deploy . --prod -y
```

Expected: deployment completes and aliases to `https://debugtools.org`.

- [ ] **Step 7: Production header check**

```bash
curl -sI https://debugtools.org
```

Expected: response is served by Vercel, not GoDaddy DPS, and returns 200 or an expected redirect handled by Vercel.
