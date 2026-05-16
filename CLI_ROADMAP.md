# CLI Roadmap

debugtools should eventually ship one CLI package instead of scattered scripts. The recommended binary name is `debugtools`, with `dt` as a short alias if the package is published.

## Principles

- Keep commands pipe-friendly: read from stdin, files, or URLs; write clean text or JSON.
- Reuse shared tool logic instead of duplicating browser page code.
- Start with dependency-light commands that already map to existing tools.
- Make release and module proposal workflows scriptable for maintainers.

## MVP Commands

| Command | Purpose | Existing source |
| --- | --- | --- |
| `debugtools json format|minify|repair|validate|query|to-yaml` | Format, repair, validate, query, and convert JSON | JSON tool, `jsonrepair`, `jsonpath`, `ajv`, `jsonschema`, `js-yaml` |
| `debugtools jwt decode` | Decode JWT header/payload and inspect common claims | JWT tool, Node `Buffer` |
| `debugtools base64 encode|decode` | Encode/decode strings or files, strip data URI prefixes | Base64 tool, Node `Buffer` |
| `debugtools diff stats|report` | Compare files and emit text, Markdown, or JSON reports | Code Diff and Build Diff tools |
| `debugtools http-status <code>` | Offline HTTP status lookup and search | HTTP Status tool |

## V1 Commands

| Command | Purpose | Notes |
| --- | --- | --- |
| `debugtools api run` | Run REST requests with headers, body, auth, variables, and timing output | Requires extracting request execution from the API Tester |
| `debugtools api import-collection` | Normalize Postman/debugtools collection JSON | Can reuse `src/app/tools/api/lib/collectionImport.ts` |
| `debugtools db query|schema|tables|export-csv` | Query SQLite files and export results | Requires Node-safe `sql.js` WASM loading |
| `debugtools css format|minify|validate|stats` | Process CSS and report selectors/properties/colors | Can use `js-beautify` and existing CSS logic |
| `debugtools html format|extract|wrap` | Format HTML and extract/wrap body/style content | Can use `js-beautify`; avoid fragile browser-only logic |
| `debugtools icons search|snippet` | Search curated icons and print import snippets | Extract icon registry from Icon Finder |
| `debugtools releases list|latest|changelog` | Print release notes and changelog summaries | Read `RELEASES.md` and `CHANGELOG.md` |

## Later Commands

- `debugtools webhook` for local webhook capture, replay, and export into API collections.
- `debugtools openapi` for spec validation, endpoint preview, and API collection generation.
- `debugtools profile` for React Native startup trace summaries and comparisons.
- `debugtools bundle` for bundle stats, before/after comparison, and CI size budgets.
- `debugtools devops` for Dockerfile, Kubernetes YAML, and config validation.
- `debugtools security` for hash/HMAC/checksum generation, TLS certificate checks, and JWT/JWKS workflows.

## Release Automation Commands

Recommended scripts:

```json
{
  "typecheck": "tsc --noEmit --pretty false",
  "release:status": "git status --short && npm pkg get version && git describe --tags --abbrev=0 2>/dev/null || true",
  "release:verify": "npm test -- --runInBand && npm run typecheck && npm run build",
  "release:preview": "vercel pull --environment=preview && vercel build && vercel deploy --prebuilt",
  "release:prod:dry": "vercel pull --environment=production && vercel build --prod",
  "release:prod": "vercel deploy --prebuilt --prod"
}
```

Recommended tooling:

- `release-it` with `@release-it/conventional-changelog` for versioning and changelog automation.
- `gh release create` for GitHub releases.
- Vercel prebuilt deploys for production promotion.

## Implementation Notes

- Add a `src/lib/tools/*` layer before adding the CLI, because most current tool logic lives in client React pages.
- Add a `src/cli` entrypoint only after at least one tool has browser-independent logic.
- Prefer zero new runtime dependencies for MVP commands. Add a CLI parser only when command complexity justifies it.
- Avoid making the CLI depend on `.next` output or browser APIs like `FileReader`, `Blob`, `localStorage`, `navigator`, `document`, `atob`, or `btoa`.
