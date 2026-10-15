import type { ComponentType } from 'react';
import {
  AdjustmentsHorizontalIcon,
  ArrowsRightLeftIcon,
  BeakerIcon,
  BoltIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
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
import { CurlyBracesIcon } from 'lucide-react';

export type ToolMaturity = 'Stable' | 'Beta' | 'Experimental';
export type ToolPrivacy = 'Local' | 'Network' | 'Cloud optional';
export type ToolPillarName =
  | 'APIs'
  | 'AI'
  | 'Data & Formats'
  | 'Debugging'
  | 'Build & Performance'
  | 'Frontend'
  | 'Utilities';

export type ToolModule = {
  name: string;
  description: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  category: string;
  maturity: ToolMaturity;
  privacy: ToolPrivacy;
  pillar: ToolPillarName;
  priority: number;
  featured?: boolean;
};

export type ProposedTool = {
  name: string;
  category: string;
  description: string;
  pillar: ToolPillarName;
};

export const toolPillars: Array<{
  name: ToolPillarName;
  description: string;
}> = [
  { name: 'APIs', description: 'Send, inspect, and understand HTTP requests.' },
  { name: 'AI', description: 'AI assistants for debugging and prompt work.' },
  { name: 'Data & Formats', description: 'Convert, encode, and query data.' },
  { name: 'Debugging', description: 'Make sense of errors, crashes, and logs.' },
  { name: 'Build & Performance', description: 'Compare outputs and measure your app.' },
  { name: 'Frontend', description: 'Edit and preview UI work.' },
  { name: 'Utilities', description: 'Small everyday helpers.' },
];

export const liveTools: ToolModule[] = [
  { name: 'API Tester', description: 'REST workbench with collections, auth, environments, imports, and response inspection.', path: '/tools/api', icon: BeakerIcon, category: 'Network', maturity: 'Beta', privacy: 'Network', pillar: 'APIs', priority: 1, featured: true },
  { name: 'AI Debug Assistant', description: 'Analyze errors, API responses, cURL notes, JSON issues, and stack traces with optional OpenAI BYOK support.', path: '/tools/ai', icon: SparklesIcon, category: 'AI', maturity: 'Beta', privacy: 'Network', pillar: 'AI', priority: 1, featured: true },
  { name: 'HTTP Status', description: 'Reference HTTP codes and response meanings while debugging requests.', path: '/tools/http-status', icon: GlobeAltIcon, category: 'Network', maturity: 'Stable', privacy: 'Local', pillar: 'APIs', priority: 3 },
  { name: 'HTTP Traffic Inspector', description: 'Inspect HAR exports for timing, redirects, failures, payload sizes, and slow requests.', path: '/tools/http-profiler', icon: ChartBarIcon, category: 'Network', maturity: 'Beta', privacy: 'Local', pillar: 'APIs', priority: 2 },
  { name: 'JSON Tools', description: 'Format, validate, repair, and inspect JSON payloads without sending data to a server.', path: '/tools/json', icon: CurlyBracesIcon, category: 'Data', maturity: 'Stable', privacy: 'Local', pillar: 'Data & Formats', priority: 1, featured: true },
  { name: 'JWT Decoder', description: 'Decode and inspect JSON Web Token claims during auth debugging.', path: '/tools/jwt', icon: KeyIcon, category: 'Security', maturity: 'Stable', privacy: 'Local', pillar: 'Data & Formats', priority: 4 },
  { name: 'Base64', description: 'Encode and decode Base64 strings and files.', path: '/tools/base64', icon: DocumentCheckIcon, category: 'Data', maturity: 'Stable', privacy: 'Local', pillar: 'Data & Formats', priority: 2 },
  { name: 'Hash Generator', description: 'Generate SHA hashes locally in the browser.', path: '/tools/hash', icon: ShieldCheckIcon, category: 'Security', maturity: 'Stable', privacy: 'Local', pillar: 'Data & Formats', priority: 5 },
  { name: 'Regex Tester', description: 'Test regular expressions with live matches.', path: '/tools/regex', icon: CommandLineIcon, category: 'Code', maturity: 'Stable', privacy: 'Local', pillar: 'Data & Formats', priority: 6 },
  { name: 'URL Encoder', description: 'Encode, decode, and inspect URLs and query strings.', path: '/tools/url', icon: GlobeAltIcon, category: 'Utilities', maturity: 'Stable', privacy: 'Local', pillar: 'Data & Formats', priority: 3 },
  { name: 'Crash Beautifier', description: 'Clean up and inspect stack traces from mobile and web runtimes.', path: '/tools/crash-beautifier', icon: BoltIcon, category: 'Debugging', maturity: 'Stable', privacy: 'Local', pillar: 'Debugging', priority: 1, featured: true },
  { name: 'Stack Trace Explainer', description: 'Extract error type, root frame, app frames, dependencies, and likely cause from pasted stack traces.', path: '/tools/stack-trace', icon: BoltIcon, category: 'Debugging', maturity: 'Beta', privacy: 'Local', pillar: 'Debugging', priority: 2, featured: true },
  { name: 'Log Trace Rebuilder', description: 'Group multiline logs by trace ID, request ID, correlation ID, severity, and related details.', path: '/tools/log-trace', icon: DocumentTextIcon, category: 'Debugging', maturity: 'Beta', privacy: 'Local', pillar: 'Debugging', priority: 3 },
  { name: 'HAR Analyzer', description: 'Summarize HAR traffic, redirects, failures, payload size, status groups, and slowest requests.', path: '/tools/http-profiler', icon: GlobeAltIcon, category: 'Network', maturity: 'Beta', privacy: 'Local', pillar: 'APIs', priority: 4 },
  { name: 'Error Tracker', description: 'Fingerprint repeated errors into deduplicated triage groups with likely causes.', path: '/tools/error-tracker', icon: ShieldCheckIcon, category: 'Debugging', maturity: 'Beta', privacy: 'Local', pillar: 'Debugging', priority: 4 },
  { name: 'Code Diff', description: 'Compare snippets during review and debugging sessions.', path: '/tools/code-diff', icon: ArrowsRightLeftIcon, category: 'Code', maturity: 'Stable', privacy: 'Local', pillar: 'Build & Performance', priority: 1, featured: true },
  { name: 'Build Diff', description: 'Compare build outputs and artifact changes.', path: '/tools/build-diff', icon: CubeTransparentIcon, category: 'Builds', maturity: 'Stable', privacy: 'Local', pillar: 'Build & Performance', priority: 2 },
  { name: 'Bundle Analyzer', description: 'Inspect bundle size and composition.', path: '/tools/bundle-analyzer', icon: BuildingLibraryIcon, category: 'Builds', maturity: 'Experimental', privacy: 'Local', pillar: 'Build & Performance', priority: 3 },
  { name: 'Startup Profiling', description: 'Visualize React Native startup timelines.', path: '/tools/startup-profiling', icon: BoltIcon, category: 'Performance', maturity: 'Experimental', privacy: 'Local', pillar: 'Build & Performance', priority: 4 },
  { name: 'HTML Tools', description: 'Edit, format, preview, and export HTML.', path: '/tools/html', icon: DocumentTextIcon, category: 'Code', maturity: 'Stable', privacy: 'Local', pillar: 'Frontend', priority: 1 },
  { name: 'CSS Tools', description: 'Minify, beautify, and validate CSS.', path: '/tools/css', icon: AdjustmentsHorizontalIcon, category: 'Code', maturity: 'Stable', privacy: 'Local', pillar: 'Frontend', priority: 2 },
  { name: 'Markdown Preview', description: 'Write and preview Markdown content.', path: '/tools/markdown', icon: DocumentTextIcon, category: 'Docs', maturity: 'Stable', privacy: 'Local', pillar: 'Frontend', priority: 3 },
  { name: 'Color Picker', description: 'Pick, convert, and inspect color values.', path: '/tools/color', icon: PaintBrushIcon, category: 'Design', maturity: 'Stable', privacy: 'Local', pillar: 'Frontend', priority: 4 },
  { name: 'Icon Finder', description: 'Search icon libraries for UI assets.', path: '/tools/icons', icon: SparklesIcon, category: 'Design', maturity: 'Stable', privacy: 'Local', pillar: 'Frontend', priority: 5 },
  { name: 'Database Query', description: 'Run SQLite queries in a focused local workspace.', path: '/tools/database', icon: BuildingLibraryIcon, category: 'Data', maturity: 'Beta', privacy: 'Local', pillar: 'Data & Formats', priority: 9 },
  { name: 'UUID Generator', description: 'Generate UUID v4 values in bulk.', path: '/tools/uuid', icon: CommandLineIcon, category: 'Utilities', maturity: 'Stable', privacy: 'Local', pillar: 'Data & Formats', priority: 8 },
  { name: 'Timestamp Converter', description: 'Convert Unix, ISO, UTC, and local dates.', path: '/tools/timestamp', icon: ClockIcon, category: 'Utilities', maturity: 'Stable', privacy: 'Local', pillar: 'Data & Formats', priority: 7 },
  { name: 'Prompt Generator', description: 'Compose structured prompts for any AI task - coding, image, video, and more.', path: '/tools/prompt-generator', icon: SparklesIcon, category: 'AI', maturity: 'Beta', privacy: 'Local', pillar: 'AI', priority: 2 },
];

export const proposedTools: ProposedTool[] = [
  { name: 'OpenAPI Viewer', category: 'API', description: 'Preview Swagger/OpenAPI specs, endpoints, schemas, and examples.', pillar: 'APIs' },
  { name: 'GraphQL Explorer', category: 'API', description: 'Run GraphQL queries with variables, headers, and schema introspection.', pillar: 'APIs' },
  { name: 'Webhook Inspector', category: 'Network', description: 'Capture, replay, and debug webhook payloads from external services.', pillar: 'APIs' },
  { name: 'cURL Converter', category: 'API', description: 'Convert cURL commands into fetch, Python, Go, and Postman-style requests.', pillar: 'APIs' },
  { name: 'HAR Viewer', category: 'Network', description: 'Inspect browser network exports with request waterfalls and timing data.', pillar: 'APIs' },
  { name: 'DNS Lookup', category: 'Network', description: 'Resolve A, AAAA, CNAME, MX, TXT, and NS records from a simple workbench.', pillar: 'APIs' },
  { name: 'SSL Certificate Inspector', category: 'Security', description: 'Check certificate chain, expiry, issuer, SANs, and TLS metadata.', pillar: 'Data & Formats' },
  { name: 'YAML/TOML Tools', category: 'Data', description: 'Format, validate, and convert YAML, TOML, and JSON configuration files.', pillar: 'Utilities' },
  { name: 'SQL Formatter', category: 'Data', description: 'Format SQL queries and highlight common syntax mistakes.', pillar: 'Utilities' },
  { name: 'Cron Parser', category: 'Ops', description: 'Explain schedules, preview next run times, and validate cron expressions.', pillar: 'Utilities' },
  { name: 'Dockerfile Linter', category: 'DevOps', description: 'Review Dockerfiles for ordering, caching, security, and image size issues.', pillar: 'Utilities' },
  { name: 'Kubernetes YAML Validator', category: 'DevOps', description: 'Validate manifests and surface common deployment configuration problems.', pillar: 'Utilities' },
  { name: 'Accessibility Checker', category: 'Frontend', description: 'Inspect contrast, labels, landmark structure, and common WCAG issues.', pillar: 'Frontend' },
  { name: 'QR Code Studio', category: 'Utilities', description: 'Generate QR codes for URLs, Wi-Fi, contact cards, and payload testing.', pillar: 'Utilities' },
];

export function getFeaturedTools() {
  return liveTools.filter((tool) => tool.featured).sort((a, b) => a.priority - b.priority);
}

export function getToolsByPillar(pillar: ToolPillarName) {
  return liveTools
    .filter((tool) => tool.pillar === pillar)
    .sort((a, b) => a.priority - b.priority);
}
