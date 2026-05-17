# DEBUGTOOLS

Open-source AI debugging tools for developers.

![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Open Source](https://img.shields.io/badge/open--source-yes-brightgreen)

- Website: https://debugtools.org
- Repository: https://github.com/jasimvkarim/mydebugtools
- Sponsor: https://buymeacoffee.com/jasimvk
- License: MIT

DEBUGTOOLS is an open-source developer toolbox for debugging stack traces, logs, API failures, crash reports, build errors, HAR files, and production issues with AI-assisted explanations and fix suggestions.

Most developer tools solve one small task. DEBUGTOOLS is focused on one bigger problem: debugging. It combines everyday developer utilities with AI-powered debugging workflows for stack traces, logs, crashes, API failures, and build issues.

## Local-first promise

Local-first by default. Your pasted logs, tokens, stack traces, and crash reports stay in your browser unless you explicitly choose AI analysis.

## Product model

DEBUGTOOLS is open source first, not SaaS-only:

1. Free open-source tools
2. Self-hosted AI debugging workspace
3. Optional hosted/pro version later

The hosted layer should monetize convenience, not lock away the core tools.

## Tools

Core utilities:

- JSON Formatter
- JWT Decoder
- Base64 Converter
- Hash Generator
- UUID Generator
- Timestamp Converter
- URL Encoder
- Regex Tester
- Markdown Previewer
- Color Converter

Debugging tools:

- API Tester
- Stack Trace Explainer
- Log Trace Rebuilder
- Crash Beautifier
- Build Diff
- Code Diff
- Bundle Analyzer
- Startup Profiling
- HTTP Status Codes
- SQLite Query Tool

AI debugging:

- AI Debug Assistant
- Root Cause Analyzer
- Fix Suggestion Generator
- Debugging Checklist Generator

Advanced debugging roadmap:

- HAR Analyzer
- OpenTelemetry Trace Viewer
- Android Logcat Analyzer
- React Native Debug Pack
- Kubernetes Debug Helper
- Python Profiler
- Memory Event Visualizer

See the live catalog at https://debugtools.org/tools/all.

## Local development

```bash
git clone https://github.com/jasimvkarim/mydebugtools.git
cd mydebugtools
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

No environment variables are required for the local-first tools.

Optional AI analysis uses bring-your-own provider keys. Optional cloud sync for API Tester collections uses NextAuth, Google OAuth, and Supabase:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-local-secret
GOOGLE_CLIENT_ID=replace-me
GOOGLE_CLIENT_SECRET=replace-me
NEXT_PUBLIC_SUPABASE_URL=replace-me
NEXT_PUBLIC_SUPABASE_ANON_KEY=replace-me
SUPABASE_SERVICE_ROLE_KEY=replace-me
```

Keep real credentials out of issues, screenshots, fixtures, and committed files.

## Scripts

```bash
npm run dev                 # Start the Next.js dev server
npx tsc --noEmit --pretty false
npm test                    # Run Jest tests
npm run build               # Generate sitemap and build the app
npm run build:extension     # Package the Chrome extension
```

For targeted work, run the smallest relevant Jest file first, then `tsc` and `build` before opening a pull request.

## Self-hosting

DEBUGTOOLS is built with Next.js and TypeScript. The free tools run in the browser by default. See [docs/self-hosting.md](docs/self-hosting.md) for local, Docker, and deployment notes.

## Contributing

Issues and pull requests are welcome. Please keep reports reproducible and patches scoped to one tool, parser, workflow, or docs surface.

- Bug reports: include steps, sample input, expected behavior, actual behavior, browser/OS, and screenshots when UI is involved.
- Feature proposals: describe the debugging workflow, privacy model, input/output examples, and why it belongs in DEBUGTOOLS.
- Pull requests: include verification commands and update docs or changelog entries when behavior changes.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contributor guide.

## Security

DEBUGTOOLS is designed around a local-first model, but API Tester can contact arbitrary URLs and optional sync can store collections remotely. Do not paste production secrets into public issues or shared recordings. See [SECURITY.md](SECURITY.md) for reporting and handling guidance.

## Roadmap

The near-term roadmap is:

1. Better homepage
2. Tools catalog page
3. Stack Trace Explainer
4. Log Trace Rebuilder
5. HAR Analyzer
6. GitHub README
7. Self-hosting docs
8. Docker setup
9. Public roadmap
10. Contribution guide

Full roadmap: https://debugtools.org/roadmap.
