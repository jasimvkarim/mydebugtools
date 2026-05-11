'use client';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import { Github, Terminal } from 'lucide-react';

const values = [
  'Keep debugging tools fast and predictable.',
  'Prefer local processing for sensitive developer data.',
  'Make every feature easy to inspect, report, and improve.',
  'Use plain interfaces that feel familiar to engineers.',
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#24292f]">
      <Navigation />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-md border border-[#d0d7de] bg-white">
          <div className="border-b border-[#d0d7de] px-5 py-4">
            <p className="font-mono text-xs text-[#57606a]">README.md</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24292f]">About MyDebugTools</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
              MyDebugTools is an open-source collection of browser-based utilities for API testing, data formatting, token inspection, code comparison, and day-to-day debugging.
            </p>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
            <div className="p-5">
              <h2 className="text-lg font-semibold text-[#24292f]">Project goals</h2>
              <ul className="mt-4 space-y-3">
                {values.map((value) => (
                  <li key={value} className="flex gap-3 text-sm leading-6 text-[#57606a]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#1f883d]" />
                    {value}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#24292f]">
                  <Terminal className="h-4 w-4" />
                  Built for contributors
                </div>
                <p className="mt-2 text-sm leading-6 text-[#57606a]">
                  The public site now presents the project like a maintained OSS repo: clear module entry points, issue links, roadmap visibility, and repository actions close to the workflows.
                </p>
              </div>
            </div>

            <aside className="border-t border-[#d0d7de] bg-[#f6f8fa] p-5 lg:border-l lg:border-t-0">
              <h2 className="text-sm font-semibold text-[#24292f]">Repository</h2>
              <div className="mt-4 grid gap-2">
                <a
                  href="https://github.com/jasimvk/mydebugtools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[#24292f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#32383f] hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
                <a href="https://github.com/jasimvk/mydebugtools/issues" target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]">
                  Issues
                </a>
                <a href="https://buymeacoffee.com/jasimvk" target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]">
                  Sponsor
                </a>
                <a href="https://github.com/jasimvk/mydebugtools/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]">
                  MIT License
                </a>
                <Link href="/roadmap" className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]">
                  Roadmap
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
