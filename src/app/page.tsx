'use client';

import Link from 'next/link';
import {
  ArrowRightIcon,
  BeakerIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { GitFork, Star, Terminal } from 'lucide-react';
import SiteHeader from './components/SiteHeader';
import { getFeaturedTools } from './tools/lib/tool-registry';

const repoLinks = [
  { label: 'Repository', href: 'https://github.com/jasimvkarim/mydebugtools' },
  { label: 'Issues', href: 'https://github.com/jasimvkarim/mydebugtools/issues' },
  { label: 'Sponsor', href: 'https://buymeacoffee.com/jasimvk' },
  { label: 'License', href: 'https://github.com/jasimvkarim/mydebugtools/blob/main/LICENSE' },
  { label: 'Releases', href: '/releases' },
  { label: 'Contribute', href: '/contributing' },
];

const principles = [
  'MIT licensed',
  'Built in public',
  'Local-first where possible',
  'Small tools with clear boundaries',
];

export default function Home() {
  const featuredTools = getFeaturedTools().filter((tool) => tool.path !== '/tools/ai');

  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#24292f]">
      <SiteHeader />

      <section className="border-b border-[#d0d7de] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:py-16">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1 text-xs font-semibold text-[#57606a]">
              <GitFork className="h-3.5 w-3.5" />
              debugtools is open source
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-[#24292f] sm:text-5xl lg:text-6xl">
              Developer tools for everyday debugging.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#57606a]">
              API testing, JSON formatting, JWT decoding, hashing, diffs, URL inspection, timestamps, crash parsing, and small utilities that are quick to open and easy to inspect.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tools/api"
                className="inline-flex items-center gap-2 rounded-md bg-[#1f883d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1a7f37] hover:text-white"
              >
                Open API Tester
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/tools/all"
                className="inline-flex items-center gap-2 rounded-md border border-[#d0d7de] bg-white px-4 py-2.5 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                Browse tools
              </Link>
              <a
                href="https://github.com/jasimvkarim/mydebugtools"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[#d0d7de] bg-white px-4 py-2.5 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                View GitHub
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {principles.map((principle) => (
                <div key={principle} className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 py-2 text-xs font-semibold text-[#57606a]">
                  {principle}
                </div>
              ))}
            </div>
          </div>

          <aside className="overflow-hidden rounded-md border border-[#d0d7de] bg-[#f6f8fa]">
            <div className="border-b border-[#d0d7de] bg-white px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-[#57606a]">GET /tools/api</p>
                <span className="rounded-full bg-[#dafbe1] px-2 py-0.5 text-xs font-semibold text-[#1a7f37]">200 OK</span>
              </div>
            </div>
            <div className="space-y-3 p-4">
              {[
                ['Method', 'GET, POST, PUT, PATCH, DELETE'],
                ['Auth', 'Bearer, Basic, API key'],
                ['Import', 'Postman, Insomnia, OpenAPI'],
                ['Response', 'Body, headers, timing, size'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-[#d0d7de] bg-white p-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6e7781]">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#24292f]">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: BeakerIcon,
              title: 'Test APIs',
              copy: 'Send requests, manage collections, use environments, import files, and inspect responses.',
              href: '/tools/api',
            },
            {
              icon: CodeBracketIcon,
              title: 'Inspect data',
              copy: 'Format JSON, decode JWTs, encode URLs, generate hashes, and convert Base64.',
              href: '/tools/json',
            },
            {
              icon: DocumentTextIcon,
              title: 'Compare and clean up',
              copy: 'Review code diffs, parse crash logs, inspect bundles, and format HTML or CSS.',
              href: '/tools/code-diff',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} className="rounded-md border border-[#d0d7de] bg-white p-5 hover:border-[#0969da] hover:bg-[#f6f8fa]">
                <Icon className="h-5 w-5 text-[#57606a]" />
                <h2 className="mt-4 text-lg font-semibold text-[#24292f]">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#57606a]">{item.copy}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-7 flex flex-col justify-between gap-3 border-b border-[#d0d7de] pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs text-[#57606a]">tools</p>
            <h2 className="mt-1 text-2xl font-semibold text-[#24292f]">Start with these</h2>
          </div>
          <Link href="/tools/all" className="inline-flex items-center gap-1 text-sm font-semibold text-[#0969da] hover:text-[#0969da]">
            View all tools
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                href={tool.path}
                className="group rounded-md border border-[#d0d7de] bg-white p-5 text-[#24292f] hover:border-[#0969da] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-2">
                    <Icon className="h-5 w-5 text-[#57606a]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-[#0969da]">{tool.name}</h3>
                    <p className="mt-1 font-mono text-xs text-[#57606a]">{tool.path.replace(/^\//, '')}</p>
                    <p className="mt-3 text-sm leading-6 text-[#57606a]">{tool.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#d0d7de] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="font-mono text-xs text-[#57606a]">open source</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#24292f]">Built to be inspected</h2>
            <p className="mt-3 text-sm leading-7 text-[#57606a]">
              The project keeps tool behavior visible: local-first utilities stay in the browser, network tools say when they send requests, and release notes track what changed.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://github.com/jasimvkarim/mydebugtools"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa]"
              >
                <Star className="h-4 w-4" />
                GitHub
              </a>
              <Link href="/security" className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa]">
                <ShieldCheckIcon className="h-4 w-4" />
                Security
              </Link>
            </div>
          </div>
          <div className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-5">
            <ul className="space-y-4">
              {principles.map((principle) => (
                <li key={principle} className="flex items-center gap-3 text-sm text-[#24292f]">
                  <span className="h-2 w-2 rounded-full bg-[#1f883d]" />
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-7 border-b border-[#d0d7de] pb-5">
          <p className="font-mono text-xs text-[#57606a]">project</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#24292f]">Read more</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            { label: 'Architecture', href: '/architecture', copy: 'How the browser tools, API routes, auth, and local-first boundaries fit together.' },
            { label: 'Security model', href: '/security', copy: 'What stays local, what touches network, and where Cloud Sync applies.' },
            { label: 'Contributing', href: '/contributing', copy: 'Small module-focused contribution path for issues and tools.' },
            { label: 'Changelog', href: '/changelog', copy: 'Release notes and implementation log.' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md border border-[#d0d7de] bg-white p-5 hover:border-[#0969da] hover:bg-[#f6f8fa]">
              <h3 className="text-sm font-semibold text-[#0969da]">{item.label}</h3>
              <p className="mt-2 text-sm leading-6 text-[#57606a]">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-[#57606a] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span>debugtools is open source developer infrastructure.</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {repoLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link key={link.label} href={link.href} className="font-medium text-[#57606a] hover:text-[#0969da]">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="font-medium text-[#57606a] hover:text-[#0969da]">
                {link.label}
              </a>
            )
          ))}
        </div>
      </footer>
    </main>
  );
}
