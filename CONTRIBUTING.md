# Contributing to debugtools

Thanks for helping improve debugtools. The best contributions are small, reproducible, and tied to a real debugging workflow.

## Start with an Issue

Use GitHub issues: https://github.com/jasimvkarim/mydebugtools/issues.

For bug reports, include:

- Summary: one sentence describing the failure.
- Affected tool or route: for example `/tools/api` or `/tools/json`.
- Steps to reproduce: numbered, minimal, and repeatable.
- Sample input: sanitized request, token shape, JSON, HTML, curl command, or file contents.
- Expected result.
- Actual result.
- Environment: browser, OS, Node version when relevant.
- Screenshots or screen recordings for UI bugs.

For feature proposals, include:

- Workflow: what debugging job this solves.
- Input and output examples.
- Privacy model: local-only, network request, or optional cloud sync.
- Suggested route or module.
- Notes about tests, edge cases, and docs.

Do not include production secrets, private API tokens, cookies, credentials, customer data, or internal URLs that should not be public.

## Local Setup

```bash
git clone https://github.com/jasimvkarim/mydebugtools.git
cd mydebugtools
npm install
npm run dev
```

The app works without environment variables for local-first tools. Optional API Tester sync requires local NextAuth, Google OAuth, and Supabase settings.

## Development Commands

```bash
npm run dev
npx tsc --noEmit --pretty false
npm test
npm run build
```

Use focused tests while developing, for example:

```bash
npm test -- src/app/tools/api/lib/__tests__/collectionImport.test.ts --runInBand
```

Before opening a pull request, run the smallest relevant test suite, then `npx tsc --noEmit --pretty false`. Run `npm run build` for TSX page, route, metadata, registry, or layout changes.

## Pull Request Expectations

- Keep the patch scoped to one tool, route, parser, workflow, or docs update.
- Preserve the `debugtools` name and canonical links:
  - https://debugtools.org
  - https://github.com/jasimvkarim/mydebugtools
  - https://buymeacoffee.com/jasimvk
- Add or update tests for parser, import/export, storage, auth, and transformation logic.
- Include before/after screenshots for visible UI changes.
- Update README, CHANGELOG, SECURITY, route copy, or docs when behavior changes.
- Keep local-first behavior explicit. Browser-only tools should not send user input to a backend.

## Code Style

- TypeScript first.
- Prefer small pure helpers for parsing and transformation logic.
- Keep tool behavior accessible without sign-in unless the feature explicitly depends on sync.
- Avoid broad refactors inside feature PRs.
- Use existing app patterns before adding new dependencies.

## License

By contributing, you agree that your contributions are licensed under the same MIT License as the project.
