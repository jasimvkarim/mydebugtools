# Changelog

All notable debugtools changes are tracked here. This project follows a practical Keep a Changelog style; released versions are dated when a semantic version is not yet assigned.

## [Unreleased]

### Added

- OSS bookkeeping refresh across README, contributing guidance, security guidance, roadmap, releases, and changelog surfaces.
- Clear local-first project positioning for debugtools and its browser-only tools.
- Roadmap language that treats API Tester as the flagship module and CLI/shared logic extraction as the next engineering step.

### Changed

- Refined public roadmap copy to match the current codebase: API Tester, JSON, JWT, Hash, HTML, HTTP Status, Diff, Base64, UUID, URL, Timestamp, SQLite, Crash Beautifier, Bundle Analyzer, and other shipped modules.
- Updated release notes for recent API Tester collection import fixes, typography/header polish, local-first positioning, OSS docs, and roadmap cleanup.
- Tightened contributing docs around reproducible bugs, issue shape, local commands, tests, and build expectations.

### Security

- Added SECURITY.md with the local-first model, API Tester network behavior, sync/storage guidance, secrets handling, and vulnerability reporting path.

## [2026-05-16] - OSS Bookkeeping Polish

### Added

- Practical open-source documentation for setup, contribution, security, and project direction.
- Metadata page copy for releases, changelog, roadmap, and contributing routes.

### Changed

- Kept naming as `debugtools`, public links as `https://debugtools.org`, repository links as `jasimvkarim/mydebugtools`, and sponsor links as `https://buymeacoffee.com/jasimvk`.

## [2026-05-11] - OSS Project Refresh

### Added

- Repository-style public site direction with Menlo/monospace-friendly presentation.
- Releases page, changelog page, CLI roadmap, and sponsor links.
- Tool registry and proposed module backlog.

### Fixed

- API Tester imports now handle native debugtools exports and nested Postman collections without creating empty `undefined` collections.
- TypeScript validation issues from stale layout/auth/icon code were cleaned up.

### Changed

- Shifted positioning toward a local-first open-source debugging workbench.
- Normalized tool pages toward a shared OSS shell.

## [1.5.0] - 2025-04-25

### Added

- SQLite Database Query tool with local query execution and result export workflows.

## [1.4.0] - 2025-04-17

### Added

- Regex Tester, HTML Tools, CSS Tools, Markdown Preview, Color Picker, and Code Diff.

### Changed

- Improved JSON tool layout and navigation structure.

## [1.3.0] - 2025-04-03

### Added

- Base64 file workflows for images and PDFs.

## [1.2.0] - 2025-04-03

### Changed

- Expanded API Tester authentication, response handling, and collection workflows.

## [1.1.0] - 2025-04-02

### Added

- Advanced JSON formatting, repair, export, large document support, and tree inspection.
- Initial Chrome extension integration.

## [1.0.0] - 2025-03-28

### Added

- Initial debugtools project shell.
- JSON Formatter and Color Converter foundations.
