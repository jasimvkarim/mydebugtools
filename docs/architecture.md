# DEBUGTOOLS Architecture

DEBUGTOOLS is organized around one product idea: debugging should be fast, local-first, and open source.

## Layers

1. Free open-source tools: browser utilities for everyday debugging jobs.
2. Self-hosted AI debugging workspace: optional analyzers and provider keys under the user's control.
3. Hosted/pro version later: saved history, teams, private projects, integrations, and managed convenience.

## Tool categories

- Core utilities: JSON, JWT, Base64, hash, UUID, timestamp, URL, regex, markdown, and color tools.
- Debugging tools: API Tester, crash beautifier, build diff, code diff, bundle analyzer, startup profiling, HTTP status codes, and SQLite query.
- AI debugging: root cause analysis, fix suggestions, and debugging checklist generation.
- Advanced debugging roadmap: HAR analysis, OpenTelemetry traces, Android Logcat, React Native debug packs, Kubernetes helpers, profilers, and memory event visualization.

## Data boundary

Browser-only tools should not send user input to a DEBUGTOOLS backend. Features that leave the browser must be explicit:

- API Tester sends requests to the URL entered by the user.
- Optional sync stores collections in the configured backend.
- Optional AI analysis sends sanitized prompt text to the selected provider.

## Target repository shape

The long-term open-source structure should move toward:

```text
mydebugtools/
├── apps/web/
├── packages/core/
├── packages/ai/
├── packages/tools/
├── packages/ui/
├── docs/
├── docker-compose.yml
├── README.md
├── LICENSE
└── package.json
```

This keeps parsers, analyzers, formatters, prompts, providers, schemas, and UI pieces reusable across the web app, future CLI, and self-hosted deployments.
