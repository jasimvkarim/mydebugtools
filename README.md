# debugtools

Local-first debugging tools for developers.

- Website: https://debugtools.org
- Repository: https://github.com/jasimvkarim/mydebugtools
- Sponsor: https://buymeacoffee.com/jasimvk
- License: MIT

debugtools is a Next.js app with focused browser tools for API requests, payload inspection, encoding, diffs, timestamps, hashes, frontend snippets, and runtime debugging. The API Tester is the flagship module; most other tools run fully in the browser.

## Tools

- API Tester: REST requests, headers, auth helpers, collections, import/export, response inspection, and optional sync.
- JSON Tools: format, validate, repair, inspect, and transform JSON locally.
- JWT Decoder: inspect token headers and claims.
- Hash Generator: generate hashes in the browser.
- HTML Tools, CSS Tools, Markdown Preview, Regex Tester, Color Picker, and Icon Finder.
- HTTP Status, URL Encoder, Base64, UUID Generator, Timestamp Converter, and SQLite Database Query.
- Code Diff, Build Diff, Bundle Analyzer, Crash Beautifier, and Startup Profiling.

See the live catalog at https://debugtools.org/tools/all.

## Local Development

```bash
git clone https://github.com/jasimvkarim/mydebugtools.git
cd mydebugtools
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

No environment variables are required for the local-first tools.

Optional cloud sync for API Tester collections uses NextAuth, Google OAuth, and Supabase:

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

## Project Notes

- API Tester requests are made from the browser to the target URL the user enters.
- Local-first tools should not send user input to debugtools servers.
- Optional API Tester sync stores collections through the configured Supabase project when authentication is enabled.
- Shared tool logic should move toward reusable modules so the future CLI can use the same parsers and transforms.

## Contributing

Issues and pull requests are welcome. Please keep reports reproducible and patches scoped to one tool, parser, workflow, or docs surface.

- Bug reports: include steps, sample input, expected behavior, actual behavior, browser/OS, and screenshots when UI is involved.
- Feature proposals: describe the debugging workflow, privacy model, input/output examples, and why it belongs in debugtools.
- Pull requests: include verification commands and update docs or changelog entries when behavior changes.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contributor guide.

## Security

debugtools is designed around a local-first model, but API Tester can contact arbitrary URLs and optional sync can store collections remotely. Do not paste production secrets into public issues or shared recordings. See [SECURITY.md](SECURITY.md) for reporting and handling guidance.

## Roadmap

The near-term roadmap is:

- Keep API Tester as the flagship workflow.
- Harden import/export, auth, environments, and request history.
- Extract shared tool logic for CLI reuse.
- Add deeper API workflows such as OpenAPI, GraphQL, cURL conversion, HAR inspection, and webhook debugging.

Full roadmap: https://debugtools.org/roadmap.
