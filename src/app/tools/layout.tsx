'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowsRightLeftIcon,
  BeakerIcon,
  CommandLineIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  KeyIcon,
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { CurlyBracesIcon, Github, Menu, Terminal, X } from 'lucide-react';
import { useState } from 'react';
import AdSlot from '@/app/components/AdSlot';

const tools = [
  { name: 'All Tools', path: '/tools/all', icon: CommandLineIcon },
  { name: 'API Tester', path: '/tools/api', icon: BeakerIcon },
  { name: 'JSON', path: '/tools/json', icon: CurlyBracesIcon },
  { name: 'JWT', path: '/tools/jwt', icon: KeyIcon },
  { name: 'Hash', path: '/tools/hash', icon: ShieldCheckIcon },
  { name: 'HTML', path: '/tools/html', icon: DocumentTextIcon },
  { name: 'HTTP', path: '/tools/http-status', icon: GlobeAltIcon },
  { name: 'Diff', path: '/tools/code-diff', icon: ArrowsRightLeftIcon },
  { name: 'Base64', path: '/tools/base64', icon: DocumentCheckIcon },
  { name: 'UUID', path: '/tools/uuid', icon: SparklesIcon },
  { name: 'URL', path: '/tools/url', icon: GlobeAltIcon },
  { name: 'Time', path: '/tools/timestamp', icon: ClockIcon },
];

const repoLinks = [
  { label: 'Repository', href: 'https://github.com/jasimvk/mydebugtools' },
  { label: 'Issues', href: 'https://github.com/jasimvk/mydebugtools/issues' },
  { label: 'Sponsor', href: 'https://buymeacoffee.com/jasimvk' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'CLI', href: '/cli' },
  { label: 'Releases', href: '/releases' },
  { label: 'License', href: 'https://github.com/jasimvk/mydebugtools/blob/main/LICENSE' },
];

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f8fa] text-[#24292f]">
      <nav className="border-b border-[#d0d7de] bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-[#24292f] hover:text-[#24292f]">
            <Terminal className="h-5 w-5" />
            <span className="font-semibold">debugtools</span>
            <span className="hidden rounded-full border border-[#d0d7de] px-2 py-0.5 text-xs font-medium text-[#57606a] md:inline">
              tools
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const active = pathname === tool.path;
              return (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                    active
                      ? 'bg-[#eaeef2] text-[#24292f]'
                      : 'text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tool.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="https://github.com/jasimvk/mydebugtools/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]"
            >
              New issue
            </a>
            <a
              href="https://github.com/jasimvk/mydebugtools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#24292f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#32383f] hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md border border-[#d0d7de] p-2 text-[#57606a] hover:bg-[#f6f8fa] lg:hidden"
            aria-label={mobileMenuOpen ? 'Close tools navigation' : 'Open tools navigation'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#d0d7de] bg-white lg:hidden">
            <div className="grid gap-1 px-4 py-3">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const active = pathname === tool.path;
                return (
                  <Link
                    key={tool.path}
                    href={tool.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                      active
                        ? 'bg-[#eaeef2] text-[#24292f]'
                        : 'text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tool.name}
                  </Link>
                );
              })}
              <a
                href="https://github.com/jasimvk/mydebugtools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <div className="oss-tools-surface w-full px-4 py-5 sm:px-6">
          {children}
        </div>

        <div className="w-full px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-[1600px]">
            <AdSlot adSlot="8212501976" />
          </div>
        </div>

        <footer className="mt-10 border-t border-[#d0d7de] bg-white">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-6 text-sm text-[#57606a] sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span>Open-source tools for debugging, formatting, and inspecting code.</span>
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
          </div>
        </footer>
      </main>
    </div>
  );
}
