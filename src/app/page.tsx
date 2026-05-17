'use client';

import Link from 'next/link';
import { ArrowRightIcon, BeakerIcon, CodeBracketSquareIcon, SparklesIcon, WrenchIcon } from '@heroicons/react/24/outline';
import { Github, ShieldCheck, Terminal } from 'lucide-react';
import SiteHeader from './components/SiteHeader';
import { getFeaturedTools } from './tools/lib/tool-registry';

const entryPoints = [
  {
    title: 'Free OSS tools',
    copy: 'JSON, JWT, Base64, URL, hashes, diffs, API testing.',
    href: '/tools/all',
    icon: WrenchIcon,
  },
  {
    title: 'Self-hosted workspace',
    copy: 'Local-first debugging flows with transparent analyzers.',
    href: '/architecture',
    icon: CodeBracketSquareIcon,
  },
  {
    title: 'Optional AI debug',
    copy: 'Bring your own OpenAI key when you explicitly choose AI.',
    href: '/tools/ai',
    icon: SparklesIcon,
  },
];

const debugInputs = [
  'Stack traces',
  'Logs',
  'API errors',
  'Crash reports',
  'HAR files',
  'Build failures',
];

const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/jasimvkarim/mydebugtools' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Contribute', href: '/contributing' },
];

export default function Home() {
  const featuredTools = getFeaturedTools().slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#24292f]">
      <SiteHeader />

      <section className="border-b border-[#d0d7de] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#6e7781]">
              DEBUGTOOLS
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-[#24292f] sm:text-5xl">
              Open-source AI debugging toolkit for logs, stack traces, crashes, and API failures.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#57606a]">
              Paste stack traces, logs, API errors, crash reports, HAR files, and build failures. Get clear root cause analysis, fix suggestions, and debugging checklists.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {debugInputs.map((input) => (
                <span key={input} className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-2.5 py-1 font-mono text-xs font-medium text-[#57606a]">
                  {input}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/all"
                className="inline-flex items-center gap-2 rounded-md bg-[#24292f] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#32383f] hover:text-white"
              >
                Browse tools
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/tools/api"
                className="inline-flex items-center gap-2 rounded-md border border-[#d0d7de] bg-white px-4 py-2 text-sm font-semibold text-[#24292f] transition-colors hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                Open API Tester
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-3 md:grid-cols-3">
          {entryPoints.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-md border border-[#d0d7de] bg-white p-4 transition-colors hover:border-[#0969da] hover:bg-[#f6f8fa]"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#d0d7de] bg-[#f6f8fa] text-[#57606a]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-[#24292f]">{item.title}</span>
                    <span className="mt-1 block text-sm leading-5 text-[#57606a]">{item.copy}</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-md border border-[#d0d7de] bg-white p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#d0d7de] bg-[#f6f8fa] text-[#57606a]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[#24292f]">Local-first by default.</h2>
                <p className="mt-2 text-sm leading-6 text-[#57606a]">
                  Your pasted logs, tokens, stack traces, and crash reports stay in your browser unless you explicitly choose AI analysis.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-[#d0d7de] bg-white p-5">
            <h2 className="text-lg font-semibold text-[#24292f]">Open-source and self-hostable</h2>
            <div className="mt-3 grid gap-2 text-sm text-[#57606a] sm:grid-cols-2">
              {['Browser tools', 'Run locally', 'Bring your own AI key', 'No forced account', 'Transparent analyzers', 'Next.js + TypeScript'].map((item) => (
                <span key={item} className="rounded-md bg-[#f6f8fa] px-3 py-2 font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <div className="mb-4 flex items-center justify-between border-b border-[#d0d7de] pb-3">
          <h2 className="text-lg font-semibold text-[#24292f]">Popular tools</h2>
          <Link href="/tools/all" className="text-sm font-semibold text-[#0969da] hover:text-[#0969da]">
            View all
          </Link>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                href={tool.path}
                className="flex items-center gap-3 rounded-md border border-[#d0d7de] bg-white px-4 py-3 transition-colors hover:border-[#0969da] hover:bg-[#f6f8fa]"
              >
                <Icon className="h-4 w-4 shrink-0 text-[#57606a]" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[#24292f]">{tool.name}</span>
                  <span className="block truncate font-mono text-xs text-[#6e7781]">{tool.path.replace(/^\//, '')}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-[#d0d7de] px-4 py-6 text-sm text-[#57606a] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span>DEBUGTOOLS is MIT licensed and built in public.</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link key={link.label} href={link.href} className="font-medium text-[#57606a] hover:text-[#0969da]">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-[#57606a] hover:text-[#0969da]">
                <Github className="h-4 w-4" />
                {link.label}
              </a>
            )
          ))}
        </div>
      </footer>
    </main>
  );
}
