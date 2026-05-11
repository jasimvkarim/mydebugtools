'use client';

import Link from 'next/link';
import {
  AdjustmentsHorizontalIcon,
  ArrowsRightLeftIcon,
  BeakerIcon,
  BoltIcon,
  BuildingLibraryIcon,
  ClockIcon,
  CommandLineIcon,
  CubeTransparentIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  KeyIcon,
  PaintBrushIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { CurlyBracesIcon } from 'lucide-react';

const allTools = [
  { name: 'API Tester', description: 'REST client with collections, auth, environments, and imports.', path: '/tools/api', icon: BeakerIcon, category: 'Network' },
  { name: 'JSON Tools', description: 'Format, validate, repair, and inspect JSON payloads.', path: '/tools/json', icon: CurlyBracesIcon, category: 'Data' },
  { name: 'JWT Decoder', description: 'Decode and inspect JSON Web Token claims.', path: '/tools/jwt', icon: KeyIcon, category: 'Security' },
  { name: 'Hash Generator', description: 'Generate SHA hashes for text and payloads.', path: '/tools/hash', icon: ShieldCheckIcon, category: 'Security' },
  { name: 'HTTP Status', description: 'Reference HTTP codes and response meanings.', path: '/tools/http-status', icon: GlobeAltIcon, category: 'Network' },
  { name: 'Code Diff', description: 'Compare snippets during review and debugging.', path: '/tools/code-diff', icon: ArrowsRightLeftIcon, category: 'Code' },
  { name: 'Base64', description: 'Encode and decode Base64 strings and files.', path: '/tools/base64', icon: DocumentCheckIcon, category: 'Data' },
  { name: 'Regex Tester', description: 'Test regular expressions with live matches.', path: '/tools/regex', icon: CommandLineIcon, category: 'Code' },
  { name: 'Color Picker', description: 'Pick, convert, and inspect color values.', path: '/tools/color', icon: PaintBrushIcon, category: 'Design' },
  { name: 'CSS Tools', description: 'Minify, beautify, and validate CSS.', path: '/tools/css', icon: AdjustmentsHorizontalIcon, category: 'Code' },
  { name: 'HTML Tools', description: 'Edit, format, preview, and export HTML.', path: '/tools/html', icon: DocumentTextIcon, category: 'Code' },
  { name: 'Markdown Preview', description: 'Write and preview Markdown content.', path: '/tools/markdown', icon: DocumentTextIcon, category: 'Docs' },
  { name: 'Icon Finder', description: 'Search icon libraries for UI assets.', path: '/tools/icons', icon: SparklesIcon, category: 'Design' },
  { name: 'Crash Beautifier', description: 'Clean up and inspect stack traces.', path: '/tools/crash-beautifier', icon: BoltIcon, category: 'Debugging' },
  { name: 'Build Diff', description: 'Compare build outputs and artifact changes.', path: '/tools/build-diff', icon: CubeTransparentIcon, category: 'Builds' },
  { name: 'Bundle Analyzer', description: 'Inspect bundle size and composition.', path: '/tools/bundle-analyzer', icon: BuildingLibraryIcon, category: 'Builds' },
  { name: 'Database Query', description: 'Run SQLite queries in a focused workspace.', path: '/tools/database', icon: BuildingLibraryIcon, category: 'Data' },
  { name: 'Startup Profiling', description: 'Visualize React Native startup timelines.', path: '/tools/startup-profiling', icon: BoltIcon, category: 'Performance' },
  { name: 'Hash Generator', description: 'Generate SHA hashes locally in the browser.', path: '/tools/hash', icon: ShieldCheckIcon, category: 'Security' },
  { name: 'UUID Generator', description: 'Generate UUID v4 values in bulk.', path: '/tools/uuid', icon: CommandLineIcon, category: 'Utilities' },
  { name: 'URL Encoder', description: 'Encode, decode, and inspect URLs and query strings.', path: '/tools/url', icon: GlobeAltIcon, category: 'Utilities' },
  { name: 'Timestamp Converter', description: 'Convert Unix, ISO, UTC, and local dates.', path: '/tools/timestamp', icon: ClockIcon, category: 'Utilities' },
];

const categories = Array.from(new Set(allTools.map((tool) => tool.category)));

const incorporatableTools = [
  { name: 'OpenAPI Viewer', category: 'API', description: 'Preview Swagger/OpenAPI specs, endpoints, schemas, and examples.' },
  { name: 'GraphQL Explorer', category: 'API', description: 'Run GraphQL queries with variables, headers, and schema introspection.' },
  { name: 'Webhook Inspector', category: 'Network', description: 'Capture, replay, and debug webhook payloads from external services.' },
  { name: 'cURL Converter', category: 'API', description: 'Convert cURL commands into fetch, Python, Go, and Postman-style requests.' },
  { name: 'HAR Viewer', category: 'Network', description: 'Inspect browser network exports with request waterfalls and timing data.' },
  { name: 'DNS Lookup', category: 'Network', description: 'Resolve A, AAAA, CNAME, MX, TXT, and NS records from a simple workbench.' },
  { name: 'SSL Certificate Inspector', category: 'Security', description: 'Check certificate chain, expiry, issuer, SANs, and TLS metadata.' },
  { name: 'YAML/TOML Tools', category: 'Data', description: 'Format, validate, and convert YAML, TOML, and JSON configuration files.' },
  { name: 'SQL Formatter', category: 'Data', description: 'Format SQL queries and highlight common syntax mistakes.' },
  { name: 'Cron Parser', category: 'Ops', description: 'Explain schedules, preview next run times, and validate cron expressions.' },
  { name: 'Dockerfile Linter', category: 'DevOps', description: 'Review Dockerfiles for ordering, caching, security, and image size issues.' },
  { name: 'Kubernetes YAML Validator', category: 'DevOps', description: 'Validate manifests and surface common deployment configuration problems.' },
  { name: 'Accessibility Checker', category: 'Frontend', description: 'Inspect contrast, labels, landmark structure, and common WCAG issues.' },
  { name: 'QR Code Studio', category: 'Utilities', description: 'Generate QR codes for URLs, Wi-Fi, contact cards, and payload testing.' },
];

export default function AllToolsPage() {
  return (
    <div className="mx-auto max-w-[1600px]">
      <section className="rounded-md border border-[#d0d7de] bg-white">
        <div className="border-b border-[#d0d7de] px-5 py-4">
          <p className="font-mono text-xs text-[#57606a]">mydebugtools / tools</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#24292f]">Tool registry</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#57606a]">
            Each tool is a focused module in the project. Pick a utility, open an issue for missing behavior, or contribute improvements through the repository.
          </p>
        </div>

        <div className="grid gap-0 lg:grid-cols-[240px_1fr]">
          <aside className="border-b border-[#d0d7de] bg-[#f6f8fa] p-5 lg:border-b-0 lg:border-r">
            <h2 className="text-sm font-semibold text-[#24292f]">Categories</h2>
            <div className="mt-3 flex flex-wrap gap-2 lg:block lg:space-y-2">
              {categories.map((category) => (
                <a
                  key={category}
                  href={`#category-${category.toLowerCase()}`}
                  className="inline-flex rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-xs font-semibold text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#0969da] lg:flex"
                >
                  {category}
                </a>
              ))}
            </div>
          </aside>

          <div className="p-5">
            <div className="sr-only">
              {categories.map((category) => (
                <span key={category} id={`category-${category.toLowerCase()}`}>
                  {category}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {allTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    href={tool.path}
                    className="group rounded-md border border-[#d0d7de] bg-white p-4 text-[#24292f] hover:border-[#0969da] hover:bg-[#f6f8fa] hover:text-[#24292f]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-2">
                        <Icon className="h-5 w-5 text-[#57606a]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-[#0969da]">{tool.name}</h3>
                          <span className="rounded-full border border-[#d0d7de] px-2 py-0.5 text-xs text-[#57606a]">
                            {tool.category}
                          </span>
                        </div>
                        <p className="mt-1 font-mono text-xs text-[#57606a]">{tool.path.replace(/^\//, '')}</p>
                        <p className="mt-3 text-sm leading-6 text-[#57606a]">{tool.description}</p>
                        <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0969da]">
                          Open module
                          <ArrowRightIcon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-md border border-[#d0d7de] bg-white">
        <div className="border-b border-[#d0d7de] px-5 py-4">
          <p className="font-mono text-xs text-[#57606a]">proposed / modules</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#24292f]">Tools we can incorporate next</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#57606a]">
            This backlog is shaped like OSS issues: each item is small enough to scope, discuss, and build as an independent module.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2 xl:grid-cols-4">
          {incorporatableTools.map((tool) => (
            <a
              key={tool.name}
              href={`https://github.com/jasimvk/mydebugtools/issues/new?title=${encodeURIComponent(`Add ${tool.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4 text-[#24292f] hover:border-[#0969da] hover:bg-white hover:text-[#24292f]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-[#0969da]">{tool.name}</h3>
                <span className="rounded-full border border-[#d0d7de] bg-white px-2 py-0.5 text-xs text-[#57606a]">
                  {tool.category}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#57606a]">{tool.description}</p>
              <div className="mt-4 text-sm font-semibold text-[#0969da]">Open proposal</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
