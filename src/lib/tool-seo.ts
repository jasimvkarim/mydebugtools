import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const toolSeo = {
  all: {
    title: 'All Developer Tools | debugtools',
    description: 'Browse the full debugtools registry of open-source developer tools for API testing, JSON formatting, JWT decoding, code diffing, Base64 conversion, and more.',
    path: '/tools/all/',
    keywords: ['developer tools', 'open source developer tools', 'debugging tools', 'api tester', 'json formatter'],
  },
  api: {
    title: 'API Tester - Send HTTP Requests | debugtools',
    description: 'Test APIs with a browser-based REST client. Send GET, POST, PUT, DELETE requests and inspect headers, auth, collections, and responses.',
    path: '/tools/api/',
    keywords: ['api tester', 'http client', 'rest client', 'test api', 'http request tool'],
  },
  base64: {
    title: 'Base64 Encoder and Decoder | debugtools',
    description: 'Encode and decode Base64 strings and files locally in your browser with a fast open-source developer utility.',
    path: '/tools/base64/',
    keywords: ['base64 encoder', 'base64 decoder', 'decode base64', 'encode base64', 'base64 tool'],
  },
  'build-diff': {
    title: 'Build Diff Tool | debugtools',
    description: 'Compare build outputs and artifacts to spot regressions, changed files, and release differences during debugging.',
    path: '/tools/build-diff/',
    keywords: ['build diff', 'compare build output', 'artifact diff', 'release diff', 'debug build changes'],
  },
  'bundle-analyzer': {
    title: 'Bundle Analyzer | debugtools',
    description: 'Inspect JavaScript bundle size and composition to understand what changed and where optimization work should start.',
    path: '/tools/bundle-analyzer/',
    keywords: ['bundle analyzer', 'javascript bundle size', 'bundle inspection', 'web performance tools'],
  },
  'code-diff': {
    title: 'Code Diff Tool - Compare Two Snippets | debugtools',
    description: 'Compare two code snippets side by side in a focused browser-based diff tool for reviews and debugging.',
    path: '/tools/code-diff/',
    keywords: ['code diff', 'compare code', 'text diff', 'diff checker', 'code comparison'],
  },
  color: {
    title: 'Color Picker and Converter | debugtools',
    description: 'Pick, convert, and inspect HEX, RGB, HSL, CMYK, and transparent color values for web interfaces.',
    path: '/tools/color/',
    keywords: ['color picker', 'hex to rgb', 'rgb to hex', 'color converter', 'web color tool'],
  },
  'crash-beautifier': {
    title: 'Crash Log Beautifier | debugtools',
    description: 'Clean up crash logs and stack traces so errors, frames, and runtime context are easier to inspect.',
    path: '/tools/crash-beautifier/',
    keywords: ['crash log beautifier', 'stack trace formatter', 'error log parser', 'debug crash logs'],
  },
  css: {
    title: 'CSS Formatter, Minifier, and Validator | debugtools',
    description: 'Format, minify, beautify, and validate CSS in a privacy-focused browser tool for frontend debugging.',
    path: '/tools/css/',
    keywords: ['css formatter', 'css minifier', 'css beautifier', 'css validator', 'frontend tools'],
  },
  database: {
    title: 'SQLite Database Query Tool | debugtools',
    description: 'Run SQLite queries in a local browser workspace for quick database inspection and debugging.',
    path: '/tools/database/',
    keywords: ['sqlite query tool', 'database query tool', 'sql runner', 'sqlite browser', 'developer database tool'],
  },
  html: {
    title: 'HTML Formatter, Validator, and Preview | debugtools',
    description: 'Format, inspect, preview, and export HTML snippets in a focused open-source developer tool.',
    path: '/tools/html/',
    keywords: ['html formatter', 'html validator', 'html preview', 'html beautifier', 'web developer tools'],
  },
  hash: {
    title: 'Hash Generator | debugtools',
    description: 'Generate SHA hashes locally in your browser for text, payloads, and debugging checksums.',
    path: '/tools/hash/',
    keywords: ['hash generator', 'sha256 generator', 'sha hash tool', 'checksum tool', 'developer security tools'],
  },
  'http-status': {
    title: 'HTTP Status Codes Reference | debugtools',
    description: 'Look up HTTP status codes with concise meanings, categories, and debugging context for API and web development.',
    path: '/tools/http-status/',
    keywords: ['http status codes', 'http codes', 'status code reference', 'api status codes', 'rest api debugging'],
  },
  icons: {
    title: 'Icon Finder | debugtools',
    description: 'Search popular icon libraries for UI assets, SVGs, and React icons from one open-source browser tool.',
    path: '/tools/icons/',
    keywords: ['icon finder', 'icon search', 'svg icons', 'react icons', 'lucide icons'],
  },
  json: {
    title: 'JSON Formatter, Validator, and Beautifier | debugtools',
    description: 'Format, validate, repair, and inspect JSON with a fast browser-based tool for developers.',
    path: '/tools/json/',
    keywords: ['json formatter', 'json beautifier', 'json validator', 'format json', 'pretty json'],
  },
  jwt: {
    title: 'JWT Decoder - Decode JSON Web Tokens | debugtools',
    description: 'Decode JWT headers and payload claims locally in your browser without sending tokens to a server.',
    path: '/tools/jwt/',
    keywords: ['jwt decoder', 'decode jwt', 'json web token decoder', 'jwt claims', 'jwt tool'],
  },
  markdown: {
    title: 'Markdown Previewer | debugtools',
    description: 'Write and preview Markdown content in a fast open-source editor for documentation, READMEs, and notes.',
    path: '/tools/markdown/',
    keywords: ['markdown preview', 'markdown editor', 'readme preview', 'markdown tool', 'developer docs'],
  },
  regex: {
    title: 'Regex Tester - Test Regular Expressions | debugtools',
    description: 'Test regular expressions with live matches, sample text, and quick debugging feedback.',
    path: '/tools/regex/',
    keywords: ['regex tester', 'regular expression tester', 'test regex', 'regex checker', 'pattern matching'],
  },
  'startup-profiling': {
    title: 'Startup Profiling Tool | debugtools',
    description: 'Visualize React Native startup timelines and inspect performance events during app launch.',
    path: '/tools/startup-profiling/',
    keywords: ['startup profiling', 'react native startup', 'performance timeline', 'app launch profiling'],
  },
  uuid: {
    title: 'UUID Generator | debugtools',
    description: 'Generate UUID v4 values in bulk with copy-friendly output for fixtures, tests, and local development.',
    path: '/tools/uuid/',
    keywords: ['uuid generator', 'guid generator', 'random uuid', 'bulk uuid generator', 'developer utilities'],
  },
  url: {
    title: 'URL Encoder and Decoder | debugtools',
    description: 'Encode, decode, and inspect URLs, query strings, and URI components in a browser-based utility.',
    path: '/tools/url/',
    keywords: ['url encoder', 'url decoder', 'uri component encoder', 'query string parser', 'developer utilities'],
  },
  timestamp: {
    title: 'Timestamp Converter | debugtools',
    description: 'Convert Unix timestamps, milliseconds, ISO strings, UTC, and local date-time values for debugging.',
    path: '/tools/timestamp/',
    keywords: ['timestamp converter', 'unix timestamp', 'epoch converter', 'iso date converter', 'utc converter'],
  },
} as const

export type ToolSlug = keyof typeof toolSeo

export function toolMetadata(slug: ToolSlug): Metadata {
  return buildMetadata(toolSeo[slug])
}

export function toolItemListJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://debugtools.org/tools/all/#tool-registry',
    name: 'debugtools tool registry',
    itemListElement: Object.values(toolSeo)
      .filter((tool) => tool.path.startsWith('/tools/') && tool.path !== '/tools/all/')
      .map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.title.replace(' | debugtools', '').replace(' - debugtools', ''),
        url: `https://debugtools.org${tool.path}`,
        description: tool.description,
      })),
  }
}
