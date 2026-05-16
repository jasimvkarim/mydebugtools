## Summary

What changed, and which issue does this close?

Fixes #

## Scope

- [ ] API Tester
- [ ] Local-first tool
- [ ] CLI or shared logic
- [ ] Documentation or project metadata
- [ ] UI polish
- [ ] Other

## Data boundary

- [ ] Local-only browser behavior
- [ ] User-triggered network request
- [ ] Optional authenticated sync
- [ ] Build-time or docs-only change

## Verification

List the exact commands you ran:

```bash
npx tsc --noEmit --pretty false
npm test
npm run build
```

## Screenshots

Add before/after screenshots for visible UI changes.

## Checklist

- [ ] I kept the patch scoped and avoided unrelated refactors.
- [ ] I updated tests for parser, import/export, storage, auth, or transformation changes.
- [ ] I updated README, CHANGELOG, SECURITY, route copy, or docs when behavior changed.
- [ ] I removed secrets, credentials, cookies, tokens, private URLs, and customer data.
- [ ] I preserved the `debugtools` name and canonical links to `https://debugtools.org`, `jasimvkarim/mydebugtools`, and `https://buymeacoffee.com/jasimvk`.
