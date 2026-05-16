# Releases

Release notes for debugtools are kept alongside the changelog so users and contributors can see what shipped and what is next.

## 2026-05-16 - OSS Bookkeeping Polish

### Highlights

- Rewrote README, CONTRIBUTING, SECURITY, CHANGELOG, and project metadata pages in a concise open-source style.
- Documented debugtools as a local-first developer workbench with API Tester as the flagship module.
- Clarified API Tester network behavior, optional collection sync, secrets handling, and private security reporting.
- Updated roadmap and release surfaces around shipped tools, CLI/shared logic extraction, and deeper API workflows.
- Refreshed GitHub issue and pull request templates and added Buy Me a Coffee funding metadata.

### Verification

- `npx tsc --noEmit --pretty false`
- `npm run build`

## 2026-05-11 - OSS Project Refresh

### Highlights

- Reworked the public site into a repository/docs-style open-source project surface.
- Added a tool registry and proposed module backlog for future contributions.
- Normalized individual tool pages so older product styling fits the OSS shell.
- Fixed API collection imports for native exports and nested Postman collections.
- Restored full TypeScript validation by removing unused legacy layout code and moving auth configuration out of the route handler.

### Verification

- `npm test -- src/app/tools/api/lib/__tests__/collectionImport.test.ts --runInBand`
- `npx tsc --noEmit --pretty false`
- `npm run build`

## 2025-04-25 - Database Query Tool

- Added the SQLite database query workspace.
- Added query execution, quick query helpers, CSV export, and result visualization entry points.

## 2025-04-17 - Tool Expansion

- Added and improved Regex, HTML, CSS, Markdown, Color, and Code Diff tools.
- Improved JSON tool layout and navigation.

## 2025-04-03 - Base64 Converter

- Added image and PDF Base64 conversion support.

## 2025-04-02 - JSON Tools Upgrade

- Expanded JSON formatting, repair, export, large document support, and tree inspection.
- Added initial Chrome extension integration.

## 2025-03-28 - Initial Release

- Released the first debugtools project shell with core developer utilities.
