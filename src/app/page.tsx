'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
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
  'MIT licensed and built in public',
  'Local-first utilities where possible',
  'Small tools that do one job clearly',
  'Issue-driven roadmap and contribution flow',
];

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#24292f]">
      <SiteHeader />

      <section className="border-b border-[#d0d7de] bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-24">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1 text-xs font-semibold text-[#57606a]">
              <GitFork className="h-3.5 w-3.5" />
              debugtools / public repo
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-normal text-[#24292f] sm:text-5xl lg:text-6xl">
              Local-first open-source tools for debugging real software.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#57606a]">
              A browser workbench for API testing, JSON inspection, token decoding, diffs, crash parsing, build analysis, and everyday developer operations. Built in public, MIT licensed, and local-first where it matters.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/tools/all"
                className="inline-flex items-center gap-2 rounded-md bg-[#1f883d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1a7f37] hover:text-white"
              >
                Browse tools
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/tools/api"
                className="inline-flex items-center gap-2 rounded-md border border-[#d0d7de] bg-white px-4 py-2.5 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                Open API Tester
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
          </div>

          <aside className="self-start rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-5">
            <p className="font-mono text-xs text-[#57606a]">project status</p>
            <div className="mt-5 space-y-5">
              {[
                ['30+', 'browser modules'],
                ['MIT', 'license'],
                ['Local-first', 'privacy model'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-semibold text-[#24292f]">{value}</p>
                  <p className="mt-1 text-xs text-[#57606a]">{label}</p>
                </div>
              ))}
            </div>
            <a
              href="https://github.com/jasimvkarim/mydebugtools"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-xs font-semibold text-[#24292f] hover:bg-[#f6f8fa]"
            >
              <Star className="h-3.5 w-3.5" />
              Star on GitHub
            </a>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-md border border-[#d0d7de] bg-white p-6 sm:p-8">
          <p className="font-mono text-xs text-[#57606a]">flagship / tools/api</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#24292f]">API Tester is the flagship module</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
            A browser-native API workbench with collections, environments, import/export, private mode, CORS guidance, response inspection, and optional Cloud Sync.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Local workspace', 'Private mode', 'Import/export', 'Cloud Sync optional', 'CORS-aware'].map((item) => (
              <span key={item} className="rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1 text-xs font-semibold text-[#57606a]">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <Link href="/tools/api" className="inline-flex items-center gap-2 rounded-md bg-[#24292f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#32383f] hover:text-white">
              Open API Tester
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-7 flex flex-col justify-between gap-3 border-b border-[#d0d7de] pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs text-[#57606a]">/packages/tools</p>
            <h2 className="mt-1 text-2xl font-semibold text-[#24292f]">Featured modules</h2>
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
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="font-mono text-xs text-[#57606a]">README.md</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#24292f]">Why this project exists</h2>
            <p className="mt-3 text-sm leading-7 text-[#57606a]">
              Developers reach for quick web utilities all day, but many of them are noisy, opaque, or too narrow. debugtools keeps the workflows simple and keeps the project inspectable.
            </p>
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-7 border-b border-[#d0d7de] pb-5">
          <p className="font-mono text-xs text-[#57606a]">lab notebook</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#24292f]">Project notes</h2>
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
