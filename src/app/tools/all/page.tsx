'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
      className="group flex min-h-[92px] items-start gap-3 rounded-md border border-[#d0d7de] bg-white px-3 py-3 transition hover:-translate-y-0.5 hover:border-[#0969da] hover:bg-[#fbfcfe] hover:shadow-[0_12px_28px_rgba(27,31,36,0.08)]"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#d0d7de] bg-[#f6f8fa] text-[#57606a] group-hover:border-[#0969da] group-hover:text-[#0969da]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-[#24292f]">{tool.name}</span>
        <span className="mt-1 line-clamp-2 block text-xs leading-5 text-[#57606a]">{tool.description}</span>
        <span className="block truncate font-mono text-xs text-[#6e7781]">{tool.path.replace(/^\//, '')}</span>
      </span>
      <span className="hidden rounded-full border border-[#d0d7de] px-2 py-0.5 text-[11px] font-semibold text-[#6e7781] sm:inline">
        {tool.privacy}
      </span>
    </Link>
  );
}

export default function AllToolsPage() {
  const [query, setQuery] = useState('');
  const featuredTools = getFeaturedTools();
  const normalizedQuery = query.trim().toLowerCase();

  const visiblePillars = useMemo(() => {
    return toolPillars
      .map((pillar) => {
        const tools = getToolsByPillar(pillar.name).filter((tool) => {
          if (!normalizedQuery) return true;

          return [
            tool.name,
            tool.path,
            tool.category,
            tool.pillar,
            tool.privacy,
            tool.maturity,
          ].some((value) => value.toLowerCase().includes(normalizedQuery));
        });

        return { ...pillar, tools };
      })
      .filter((pillar) => pillar.tools.length > 0);
  }, [normalizedQuery]);

  const visibleCount = visiblePillars.reduce((total, pillar) => total + pillar.tools.length, 0);

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
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7781]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools"
              className="h-10 w-full rounded-md border border-[#d0d7de] bg-white pl-9 pr-10 text-sm text-[#24292f] outline-none transition-colors placeholder:text-[#6e7781] focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da]/15"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded text-[#6e7781] hover:bg-[#f6f8fa] hover:text-[#24292f]"
                aria-label="Clear search"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          <span className="font-mono text-xs text-[#6e7781]">
            {visibleCount} tools
          </span>
        </div>
      </section>

      {!normalizedQuery && (
        <section className="mt-4 grid gap-3 md:grid-cols-3">
          {featuredTools.slice(0, 6).map((tool) => (
            <ToolRow key={tool.path} tool={tool} />
          ))}
        </section>
      )}

      <section className="mt-5 grid gap-4">
        {visiblePillars.map((pillar) => {
          return (
            <section key={pillar.name} className="rounded-md border border-[#d0d7de] bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-[#d0d7de] bg-[#f6f8fa] px-4 py-3">
                <h2 className="text-base font-semibold text-[#24292f]">{pillar.name}</h2>
                <span className="font-mono text-xs text-[#6e7781]">{pillar.tools.length}</span>
              </div>
              <div className="grid gap-2 p-3 md:grid-cols-2 xl:grid-cols-3">
                {pillar.tools.map((tool) => (
                  <ToolRow key={tool.path} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
        {visibleCount === 0 && (
          <div className="rounded-md border border-[#d0d7de] bg-white p-8 text-center">
            <p className="text-sm font-semibold text-[#24292f]">No tools found</p>
            <p className="mt-1 text-sm text-[#57606a]">Try API, JSON, JWT, hash, diff, URL, or time.</p>
          </div>
        )}
      </section>
    </div>
  );
}
