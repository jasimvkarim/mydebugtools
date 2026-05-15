# DebugTools OSS Lab Site Design

## Goal

Make DebugTools feel like a serious open-source engineering lab project: rigorous, useful, inspectable, and maintained in public. The site should signal the standard of a strong MIT/Stanford-level student systems project without claiming affiliation with any university.

## Positioning

Primary identity:

> DebugTools is a local-first open-source workbench for API testing, data inspection, build debugging, and everyday developer operations.

The current site already has a repo-like visual language. The upgrade should deepen that direction rather than replace it with a marketing homepage. The result should feel closer to a strong GitHub project, research lab README, and production devtool shell than a generic tools directory.

## Non-Goals

- Do not claim the project is made by MIT, Stanford, or any university.
- Do not turn the homepage into a SaaS sales page.
- Do not add broad visual decoration that distracts from tools, docs, releases, roadmap, and contribution paths.
- Do not refactor every individual tool in this pass unless a shared shell change requires it.

## Design Direction

Use the "Serious OSS Lab" direction with production-grade polish:

- Dense but readable information architecture.
- Menlo/monospace-led technical identity, already present across the site.
- Repo-like navigation and module language.
- Visible proof of maintenance: roadmap, releases, changelog, issues, license, sponsor, CLI.
- Strong privacy model: local-first by default, network/cloud features clearly labeled.
- Tool cards should read like modules in a package registry, not app-store cards.

## Homepage

The homepage should lead with a technical promise and concrete proof.

Hero content:

- Title focused on local-first open-source debugging.
- Supporting copy that names API testing, JSON/data inspection, auth debugging, build analysis, crash parsing, and CLI workflows.
- Primary actions: Browse tools, Open API Tester, View GitHub.
- Secondary actions: Roadmap, Releases, Sponsor.

Credibility blocks:

- MIT licensed.
- Local-first where possible.
- 30+ browser tools.
- API Tester and CLI roadmap.
- Built in public.
- Issues, releases, roadmap.

Add a compact "lab notebook" or "project log" section that links to:

- Latest release.
- Roadmap.
- CLI.
- Contributing.
- Tool proposals.

## Navigation

Navigation should prioritize project trust and direct workflow access:

- Tools
- API Tester
- CLI
- Roadmap
- Releases
- Docs or Answers
- GitHub
- Sponsor

The site title can remain `MyDebugTools` in code for continuity, but public-facing copy should prefer `DebugTools` and `debugtools.org` where practical.

## Tool Registry

`/tools/all` should become a proper module registry.

Each tool card should include:

- Tool name.
- Module path, such as `/tools/api`.
- Category.
- Maturity label: Stable, Beta, Experimental, or Planned.
- Privacy label: Local, Network, or Cloud optional.
- Short description focused on the workflow.
- Link to open the module.

The page should also include a "proposed modules" backlog that looks like OSS issues. Existing proposed tools can remain, but each should be framed as a scoped module proposal.

## Trust And Documentation Surfaces

Add or strengthen visible links to:

- Architecture notes.
- Contributing guide.
- Changelog.
- Roadmap.
- Releases.
- Security and privacy model.
- CLI possibilities.
- Tool proposals.

For the first implementation pass, these can be lightweight pages or sections with clear copy and strong internal links. They do not need to be exhaustive.

## API Tester Integration

The API Tester should be presented as the flagship module:

- It should be called out on the homepage and tool registry.
- Its local-first behavior, optional Cloud Sync, import/export, CORS guidance, and private mode should be part of the credibility story.
- Avoid overselling it as a Postman replacement. Position it as a browser-native API workbench with explicit browser constraints.

## Visual System

Keep the current OSS shell:

- White and GitHub-like grays.
- Thin borders.
- 6-8px radius.
- Menlo/monospace typography.
- Restrained green/blue status accents.
- Minimal decoration.

Avoid:

- Large gradient hero sections.
- Card-heavy marketing layouts.
- Fake university-style badges.
- Dense claims without proof.

## SEO And Domain Updates

Because `debugtools.org` is now the intended domain, canonical metadata should move toward `https://debugtools.org`:

- `metadataBase`
- canonical URL
- Open Graph URLs
- structured data URLs
- robots host
- sitemap URLs

This should be done deliberately in the implementation plan because many references currently point to `mydebugtools.com`.

## Implementation Scope

Recommended first implementation pass:

1. Update global metadata and canonical domain to `debugtools.org`.
2. Refresh homepage copy and sections to the OSS lab direction.
3. Upgrade `/tools/all` into a module registry with maturity and privacy labels.
4. Add or update lightweight credibility pages/sections for architecture, changelog, contribution, privacy/security model, and CLI possibilities.
5. Ensure the footer/navigation exposes GitHub, Issues, Sponsor, Roadmap, Releases, CLI, and License.
6. Run build and browser checks, then deploy.

## Testing And Verification

Verification should include:

- `npm run build`
- existing focused tests for tools and navigation
- browser check of homepage at desktop and mobile widths
- browser check of `/tools/all`
- browser check of `/tools/api`
- metadata spot check for canonical `debugtools.org`
- production deployment verification after Vercel deploy

## Decision

No additional product decision is needed before planning. The chosen direction is "Serious OSS Lab with production-grade polish."
