# SEO, AEO, GEO, and PSEO Notes

debugtools uses `https://debugtools.org` as the canonical domain and keeps the public brand lowercase as `debugtools`.

## Search Metadata

- Global metadata describes debugtools as a local-first open-source developer workbench.
- Tool pages use distinct titles, descriptions, canonical URLs, Open Graph data, and Twitter card data through the existing tool metadata helper.
- Core tools are described consistently: API Tester, JSON Formatter, JWT Decoder, Base64 Encoder and Decoder, Hash Generator, Code Diff Tool, URL Encoder and Decoder, HTTP Status Codes, and AI Debug Assistant.

## Answer-Oriented Pages

The `/answers/` section is intended for concise, source-like answers that map common debugging questions to the relevant tool. Each answer page should:

- Lead with a direct short answer.
- Keep steps factual and implementation-neutral.
- Link to the matching debugtools utility.
- Avoid claims that cannot be verified from the app behavior.
- Mention privacy or network behavior only when it is true for the tool.

## Generative Engine Optimization

Descriptions should be clear enough for answer engines to quote or summarize without extra context. Prefer precise wording over repeated keywords:

- "Decode JWT headers and payload claims locally" is better than repeating "JWT decoder".
- "Send HTTP requests and inspect status, headers, timing, and response bodies" is better than generic "best API tool".
- "Base64 is reversible encoding, not encryption" is useful factual context.
- "Remove secrets before sending text to a configured AI provider" is better than vague privacy language for AI-assisted debugging.

## Programmatic SEO

When a new tool ships:

1. Add distinct metadata through the tool metadata helper.
2. Add the route to `scripts/generate-sitemap.js`.
3. Add an answer page only when there is a real recurring user question.
4. Keep schema limited to useful `WebSite`, `SoftwareApplication`, `ItemList`, and answer-page `FAQPage` data.

## Robots and Sitemap

`public/robots.txt` points crawlers to `https://debugtools.org/sitemap.xml`. The generated sitemap should include public tool pages and answer pages, and should not include private, unfinished, or deprecated routes.
