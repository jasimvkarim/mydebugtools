'use client';

import Link from 'next/link';
import { Terminal } from 'lucide-react';
import AdSlot from '@/app/components/AdSlot';
import SiteHeader from '@/app/components/SiteHeader';

const repoLinks = [
  { label: 'Repository', href: 'https://github.com/jasimvkarim/mydebugtools' },
  { label: 'Issues', href: 'https://github.com/jasimvkarim/mydebugtools/issues' },
  { label: 'Sponsor', href: 'https://buymeacoffee.com/jasimvk' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'CLI', href: '/cli' },
  { label: 'Releases', href: '/releases' },
  { label: 'License', href: 'https://github.com/jasimvkarim/mydebugtools/blob/main/LICENSE' },
];

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f8fa] text-[#24292f]">
      <SiteHeader maxWidth="max-w-[1600px]" showToolRail mobileLabel="tools" />

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
