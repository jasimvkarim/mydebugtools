# Self-hosting DEBUGTOOLS

DEBUGTOOLS is a Next.js and TypeScript app. The core tools are local-first and do not need a database, account system, or AI provider to run.

## Run locally

```bash
git clone https://github.com/jasimvkarim/mydebugtools.git
cd mydebugtools
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Optional services

The free browser tools work without environment variables.

Optional layers:

- AI debugging: bring your own OpenAI key when using the AI tool.
- Cloud sync: NextAuth, Google OAuth, and Supabase for API Tester collections.
- Analytics: only configure if your deployment needs public usage metrics.

## Privacy boundary

Local-first by default. Pasted logs, tokens, stack traces, crash reports, HAR files, and build failures should stay in the browser unless a user explicitly chooses a network action such as API Tester requests, cloud sync, or AI analysis.

## Docker

Docker setup is on the roadmap. Until then, use the standard Next.js production build or deploy to any platform that supports Node.js.
