'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  getFeaturedTools,
  getToolsByPillar,
  toolPillars,
} from '../lib/tool-registry';

function ToolRow({
  tool,
}: {
  tool: ReturnType<typeof getFeaturedTools>[number];
}) {
  const Icon = tool.icon;

  return (
    <Link
      href={tool.path}
      className="group flex items-center gap-3 rounded-md border border-[#d0d7de] bg-white px-3 py-3 transition-colors hover:border-[#0969da] hover:bg-[#f6f8fa]"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[#d0d7de] bg-[#f6f8fa] text-[#57606a]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-[#24292f]">{tool.name}</span>
        <span className="block truncate font-mono text-xs text-[#6e7781]">{tool.path.replace(/^\//, '')}</span>
      </span>
      <span className="hidden rounded-full border border-[#d0d7de] px-2 py-0.5 text-[11px] font-semibold text-[#6e7781] sm:inline">
        {tool.privacy}
      </span>
    </Link>
  );
}

export default function AllToolsPage() {
  const featuredTools = getFeaturedTools();

  return (
    <div className="mx-auto max-w-[1600px]">
      <section className="rounded-md border border-[#d0d7de] bg-white px-5 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#6e7781]">
              tools
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24292f]">All tools</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/tools/api" className="inline-flex items-center gap-2 rounded-md bg-[#24292f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#32383f] hover:text-white">
              API Tester
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link href="/tools/ai" className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa]">
              AI Debug
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-3">
        {featuredTools.slice(0, 6).map((tool) => (
          <ToolRow key={tool.path} tool={tool} />
        ))}
      </section>

      <section className="mt-5 grid gap-4">
        {toolPillars.map((pillar) => {
          const tools = getToolsByPillar(pillar.name);

          return (
            <section key={pillar.name} className="rounded-md border border-[#d0d7de] bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-[#d0d7de] bg-[#f6f8fa] px-4 py-3">
                <h2 className="text-base font-semibold text-[#24292f]">{pillar.name}</h2>
                <span className="font-mono text-xs text-[#6e7781]">{tools.length}</span>
              </div>
              <div className="grid gap-2 p-3 md:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                  <ToolRow key={tool.path} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
}
