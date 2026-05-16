'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  getFeaturedTools,
  getToolsByPillar,
  toolPillars,
} from '../lib/tool-registry';

function ToolCard({
  tool,
  compact = false,
}: {
  tool: ReturnType<typeof getFeaturedTools>[number];
  compact?: boolean;
}) {
  const Icon = tool.icon;

  return (
    <Link
      href={tool.path}
      className="group rounded-md border border-[#d0d7de] bg-white p-4 text-[#24292f] hover:border-[#0969da] hover:bg-[#f6f8fa] hover:text-[#24292f]"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-2">
          <Icon className="h-5 w-5 text-[#57606a]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-semibold text-[#0969da]">{tool.name}</h3>
            {!compact && (
              <div className="flex flex-wrap justify-end gap-1.5">
                {[tool.maturity, tool.privacy].map((badge) => (
                  <span key={badge} className="rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-2 py-0.5 text-xs font-semibold text-[#57606a]">
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="mt-2 font-mono text-xs text-[#57606a]">{tool.path.replace(/^\//, '')}</p>
          <p className="mt-3 text-sm leading-6 text-[#57606a]">{tool.description}</p>
          <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0969da]">
            Open tool
            <ArrowRightIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function AllToolsPage() {
  const featuredTools = getFeaturedTools();

  return (
    <div className="mx-auto max-w-[1600px]">
      <section className="rounded-md border border-[#d0d7de] bg-white">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="border-b border-[#d0d7de] px-5 py-5 lg:border-b-0 lg:border-r">
            <p className="font-mono text-xs text-[#57606a]">debugtools / workflows</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24292f]">Choose a debugging workflow</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
              debugtools is organized around the jobs developers repeat every day: inspect requests, transform data, compare code, parse crashes, and verify runtime behavior locally.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/tools/api" className="rounded-md bg-[#1f883d] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1a7f37] hover:text-white">
                Open API Tester
              </Link>
              <a
                href="#all-workflows"
                className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              >
                Browse workflows
              </a>
            </div>
          </div>

          <aside className="bg-[#f6f8fa] p-5">
            <p className="font-mono text-xs text-[#57606a]">featured</p>
            <div className="mt-3 grid gap-2">
              {featuredTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    href={tool.path}
                    className="flex items-start gap-3 rounded-md border border-[#d0d7de] bg-white p-3 hover:border-[#0969da]"
                  >
                    <Icon className="mt-0.5 h-4 w-4 text-[#57606a]" />
                    <span>
                      <span className="block text-sm font-semibold text-[#0969da]">{tool.name}</span>
                      <span className="mt-1 block text-xs leading-5 text-[#57606a]">{tool.pillar}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section id="all-workflows" className="mt-5 grid gap-5">
        {toolPillars.map((pillar) => {
          const tools = getToolsByPillar(pillar.name);

          return (
            <section key={pillar.name} className="rounded-md border border-[#d0d7de] bg-white">
              <div className="border-b border-[#d0d7de] bg-[#f6f8fa] px-5 py-4">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                  <div>
                    <p className="font-mono text-xs text-[#57606a]">{tools.length} live tools</p>
                    <h2 className="mt-1 text-2xl font-semibold text-[#24292f]">{pillar.name}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[#57606a]">{pillar.description}</p>
                  </div>
                  <span className="w-fit rounded-full border border-[#d0d7de] bg-white px-3 py-1 text-xs font-semibold text-[#57606a]">
                    {tools.filter((tool) => tool.privacy === 'Local').length} local-first
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                  <ToolCard key={tool.path} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="mt-5 rounded-md border border-[#d0d7de] bg-white p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs text-[#57606a]">backlog</p>
            <h2 className="mt-2 text-xl font-semibold text-[#24292f]">Proposed modules now live on the roadmap</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#57606a]">
              Future tools are grouped as product bets instead of mixed into the live catalog, so this page stays focused on workflows you can use now.
            </p>
          </div>
          <Link href="/roadmap" className="inline-flex w-fit items-center gap-2 rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-white">
            View roadmap
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
