'use client';

import Link from 'next/link';
import {
  ArrowRightIcon,
  BeakerIcon,
  CodeBracketIcon,
  CommandLineIcon,
  DocumentCheckIcon,
  KeyIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline';
import { CurlyBracesIcon, GitFork, Github, Star, Terminal } from 'lucide-react';

const repoLinks = [
  { label: 'Repository', href: 'https://github.com/jasimvk/mydebugtools' },
  { label: 'Issues', href: 'https://github.com/jasimvk/mydebugtools/issues' },
  { label: 'Sponsor', href: 'https://buymeacoffee.com/jasimvk' },
  { label: 'License', href: 'https://github.com/jasimvk/mydebugtools/blob/main/LICENSE' },
  { label: 'Releases', href: '/releases' },
  { label: 'Contribute', href: '/contributing' },
];

const featuredTools = [
  {
    name: 'API Tester',
    slug: 'tools/api',
    description: 'REST workbench with collections, auth, environments, import/export, and response inspection.',
    href: '/tools/api',
    icon: BeakerIcon,
  },
  {
    name: 'JSON Tools',
    slug: 'tools/json',
    description: 'Format, validate, repair, and inspect JSON without sending data to a server.',
    href: '/tools/json',
    icon: CurlyBracesIcon,
  },
  {
    name: 'JWT Decoder',
    slug: 'tools/jwt',
    description: 'Decode token payloads and inspect claims quickly during auth debugging.',
    href: '/tools/jwt',
    icon: KeyIcon,
  },
  {
    name: 'HTML Editor',
    slug: 'tools/html',
    description: 'Edit, preview, and export HTML snippets from a focused browser workspace.',
    href: '/tools/html',
    icon: CodeBracketIcon,
  },
  {
    name: 'Code Diff',
    slug: 'tools/code-diff',
    description: 'Compare snippets with readable highlighting for reviews and debugging sessions.',
    href: '/tools/code-diff',
    icon: CommandLineIcon,
  },
  {
    name: 'Base64',
    slug: 'tools/base64',
    description: 'Encode and decode strings or files with a small, predictable utility surface.',
    href: '/tools/base64',
    icon: DocumentCheckIcon,
  },
];

const principles = [
  'MIT licensed and built in public',
  'Local-first utilities where possible',
  'Small tools that do one job clearly',
  'Issue-driven roadmap and contribution flow',
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#24292f]">
      <header className="border-b border-[#d0d7de] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-[#24292f] hover:text-[#24292f]">
            <Terminal className="h-5 w-5" />
            <span className="font-semibold">debugtools</span>
            <span className="hidden rounded-full border border-[#d0d7de] px-2 py-0.5 text-xs font-medium text-[#57606a] sm:inline">
              OSS lab
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
              <Link href="/tools/all" className="rounded-md px-3 py-2 font-medium text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]">
                Tools
              </Link>
              <Link href="/cli" className="hidden rounded-md px-3 py-2 font-medium text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f] sm:inline-flex">
                CLI
              </Link>
              <Link href="/roadmap" className="hidden rounded-md px-3 py-2 font-medium text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f] sm:inline-flex">
                Roadmap
              </Link>
            <a
              href="https://github.com/jasimvk/mydebugtools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[#d0d7de] bg-[#24292f] px-3 py-2 font-semibold text-white hover:bg-[#32383f] hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <section className="border-b border-[#d0d7de] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:py-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1 text-xs font-semibold text-[#57606a]">
              <GitFork className="h-3.5 w-3.5" />
              debugtools / public repo
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-[#24292f] sm:text-5xl lg:text-6xl">
              Local-first open-source tools for debugging real software.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#57606a]">
              debugtools is a browser workbench for API testing, JSON and token inspection, code comparison, crash parsing, build analysis, and everyday developer operations. It is built in public, MIT licensed, and designed so sensitive workflows stay local where possible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
                href="https://github.com/jasimvk/mydebugtools"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[#d0d7de] bg-white px-4 py-2.5 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                View GitHub
              </a>
            </div>
          </div>

          <aside className="rounded-md border border-[#d0d7de] bg-[#f6f8fa]">
            <div className="border-b border-[#d0d7de] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#24292f]">Project status</h2>
            </div>
            <div className="divide-y divide-[#d0d7de]">
              <div className="grid grid-cols-2 gap-3 p-4">
                <div>
                  <p className="text-2xl font-semibold text-[#24292f]">30+</p>
                  <p className="text-xs text-[#57606a]">modules / browser workbench</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#24292f]">MIT</p>
                  <p className="text-xs text-[#57606a]">license</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#24292f]">Local-first</p>
                  <p className="text-xs text-[#57606a]">privacy model</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#24292f]">CLI</p>
                  <p className="text-xs text-[#57606a]">roadmap</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://github.com/jasimvk/mydebugtools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-xs font-semibold text-[#24292f] hover:bg-[#f6f8fa]"
                  >
                    <Star className="h-3.5 w-3.5" />
                    Star
                  </a>
                  {repoLinks.slice(1).map((link) => (
                    link.href.startsWith('/') ? (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-xs font-semibold text-[#24292f] hover:bg-[#f6f8fa]"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-xs font-semibold text-[#24292f] hover:bg-[#f6f8fa]"
                      >
                        {link.label}
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6">
        <div className="rounded-md border border-[#d0d7de] bg-white p-5">
          <p className="font-mono text-xs text-[#57606a]">flagship / tools/api</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#24292f]">API Tester is the flagship module</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
            A browser-native API workbench with collections, environments, import/export, private mode, CORS guidance, response inspection, and optional Cloud Sync.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Local workspace', 'Private mode', 'Import/export', 'Cloud Sync optional', 'CORS-aware'].map((item) => (
              <span key={item} className="rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1 text-xs font-semibold text-[#57606a]">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <Link href="/tools/api" className="inline-flex items-center gap-2 rounded-md bg-[#24292f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#32383f] hover:text-white">
              Open API Tester
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="mb-5 flex flex-col justify-between gap-3 border-b border-[#d0d7de] pb-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs text-[#57606a]">/packages/tools</p>
            <h2 className="mt-1 text-2xl font-semibold text-[#24292f]">Featured modules</h2>
          </div>
          <Link href="/tools/all" className="inline-flex items-center gap-1 text-sm font-semibold text-[#0969da] hover:text-[#0969da]">
            View all tools
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-md border border-[#d0d7de] bg-white p-4 text-[#24292f] hover:border-[#0969da] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-2">
                    <Icon className="h-5 w-5 text-[#57606a]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-[#0969da]">{tool.name}</h3>
                    <p className="mt-1 font-mono text-xs text-[#57606a]">{tool.slug}</p>
                    <p className="mt-3 text-sm leading-6 text-[#57606a]">{tool.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#d0d7de] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs text-[#57606a]">README.md</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#24292f]">Why this project exists</h2>
            <p className="mt-3 text-sm leading-7 text-[#57606a]">
              Developers reach for quick web utilities all day, but many of them are noisy, opaque, or too narrow. debugtools keeps the workflows simple and keeps the project inspectable.
            </p>
          </div>
          <div className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4">
            <ul className="space-y-3">
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

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-5 border-b border-[#d0d7de] pb-4">
          <p className="font-mono text-xs text-[#57606a]">lab notebook</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#24292f]">Project notes</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Architecture', href: '/architecture', copy: 'How the browser tools, API routes, auth, and local-first boundaries fit together.' },
            { label: 'Security model', href: '/security', copy: 'What stays local, what touches network, and where Cloud Sync applies.' },
            { label: 'Contributing', href: '/contributing', copy: 'Small module-focused contribution path for issues and tools.' },
            { label: 'Changelog', href: '/changelog', copy: 'Release notes and implementation log.' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md border border-[#d0d7de] bg-white p-4 hover:border-[#0969da] hover:bg-[#f6f8fa]">
              <h3 className="text-sm font-semibold text-[#0969da]">{item.label}</h3>
              <p className="mt-2 text-sm leading-6 text-[#57606a]">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[#57606a] sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
