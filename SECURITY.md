# Security Policy

debugtools is designed as a local-first developer workbench. Most tools run in the browser and should not send pasted input to debugtools servers.

## Supported Surface

Security reports may cover:

- https://debugtools.org
- https://github.com/jasimvkarim/mydebugtools
- API Tester request handling, collection import/export, and optional sync behavior
- Local-first tools that process JSON, JWTs, hashes, HTML, URLs, Base64, timestamps, diffs, and similar inputs
- Chrome extension files in this repository

## Local-First Model

Most modules process data locally in the browser. Examples include JSON Tools, JWT Decoder, Hash Generator, HTML Tools, HTTP Status, Code Diff, Base64, UUID, URL, and Timestamp tools.

Contributors should preserve this behavior. If a new feature sends user input over the network, document it clearly in the UI and docs.

## API Tester Network Behavior

API Tester is different from local-only tools:

- It sends requests from the browser to the URL entered by the user.
- Headers, request bodies, tokens, and cookies used in a request may be sent to that target server.
- Browser CORS rules still apply.
- Collection import/export is intended to run locally unless optional sync is configured.
- Optional cloud sync can store saved collections through the configured Supabase project when authentication is enabled.

Do not paste production secrets into public demos, screenshots, issue reports, test fixtures, or exported collections attached to GitHub issues.

## Secrets Guidance

- Use throwaway tokens for reproduction cases.
- Redact `Authorization`, `Cookie`, API keys, OAuth client secrets, database URLs, service role keys, and customer data.
- Keep `.env.local` private.
- Do not commit real Supabase service role keys, Google OAuth secrets, NextAuth secrets, session cookies, or captured production requests.
- Prefer minimal sample payloads that reproduce the bug without sensitive data.

## Reporting a Vulnerability

Please report security issues privately before opening a public issue.

- GitHub: https://github.com/jasimvkarim/mydebugtools/security/advisories/new
- If advisories are unavailable, contact the maintainer through the repository profile and include `debugtools security` in the subject.

Include:

- Affected route, tool, or package.
- Reproduction steps.
- Impact and likely data exposure.
- Browser/OS and deployment context.
- Sanitized proof of concept.

We will acknowledge valid reports as quickly as possible and coordinate a fix before public disclosure.
