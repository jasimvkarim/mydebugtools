'use client';

import type { ComponentType } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  BeakerIcon,
  CommandLineIcon,
  InformationCircleIcon,
  MapIcon,
  SparklesIcon,
  WrenchIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Coffee, Github, Terminal } from 'lucide-react';

type IconComponent = ComponentType<{ className?: string }>;

const primaryNav: Array<{
  name: string;
  href: string;
  icon: IconComponent;
  activeRoot?: string;
}> = [
  { name: 'Tools', href: '/tools/all', icon: WrenchIcon, activeRoot: '/tools' },
  { name: 'API Tester', href: '/tools/api', icon: BeakerIcon },
  { name: 'AI Debug', href: '/tools/ai', icon: SparklesIcon },
  { name: 'Docs', href: '/answers', icon: InformationCircleIcon },
  { name: 'Roadmap', href: '/roadmap', icon: MapIcon },
];

const toolNav: Array<{ name: string; href: string; icon: IconComponent }> = [
  { name: 'Tools', href: '/tools/all', icon: CommandLineIcon },
  { name: 'API Tester', href: '/tools/api', icon: BeakerIcon },
  { name: 'AI Debug', href: '/tools/ai', icon: SparklesIcon },
  { name: 'Docs', href: '/answers', icon: InformationCircleIcon },
  { name: 'Roadmap', href: '/roadmap', icon: MapIcon },
];

interface SiteHeaderProps {
  maxWidth?: string;
  showToolRail?: boolean;
  mobileLabel?: 'main' | 'tools';
}

export default function SiteHeader({
  maxWidth = 'max-w-7xl',
  showToolRail = false,
  mobileLabel = 'main',
}: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || '';
  const mobileMenuId = showToolRail ? 'tools-navigation-menu' : 'primary-navigation-menu';
  const menuName = mobileLabel === 'tools' ? 'tools navigation' : 'main menu';

  const isActivePath = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isPrimaryActive = (item: (typeof primaryNav)[number]) => {
    if (isActivePath(item.href)) return true;
    if (item.activeRoot && isActivePath(item.activeRoot)) {
      return !primaryNav.some((navItem) => navItem !== item && isActivePath(navItem.href));
    }
    return false;
  };

  const mobileItems = showToolRail ? toolNav : primaryNav;

  return (
    <nav className="sticky top-0 z-40 border-b border-[#d0d7de] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className={`mx-auto ${maxWidth} px-4 sm:px-6`}>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-5">
            <Link href="/" className="group flex min-w-0 items-center gap-3 text-[#24292f] hover:text-[#24292f]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#d0d7de] bg-[#f6f8fa] text-[#24292f] shadow-sm transition-colors group-hover:border-[#8c959f]">
                <Terminal className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-semibold leading-5 tracking-tight">debugtools</span>
                <span className="hidden font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#6e7781] sm:block">
                  local-first oss
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 rounded-lg border border-[#d0d7de] bg-[#f6f8fa] p-1 lg:flex">
              {primaryNav.map((item) => {
                const Icon = item.icon;
                const active = isPrimaryActive(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold ${
                      active
                        ? 'bg-white text-[#24292f] shadow-sm'
                        : 'text-[#57606a] hover:bg-white/70 hover:text-[#24292f]'
                    }`}
                    aria-current={isActivePath(item.href) ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/jasimvkarim/mydebugtools/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-xs font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f] lg:inline-flex"
            >
              New issue
            </a>
            <a
              href="https://buymeacoffee.com/jasimvk"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-xs font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f] xl:inline-flex"
            >
              <Coffee className="h-3.5 w-3.5" />
              Sponsor
            </a>
            <a
              href="https://github.com/jasimvkarim/mydebugtools"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-md bg-[#24292f] px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#32383f] hover:text-white lg:inline-flex"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <button
              type="button"
              className="rounded-md border border-[#d0d7de] p-2 text-[#57606a] hover:bg-[#f6f8fa] lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? `Close ${menuName}` : `Open ${menuName}`}
              aria-expanded={isMenuOpen}
              aria-controls={mobileMenuId}
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {showToolRail && (
        <div className="hidden border-t border-[#d0d7de] bg-white/75 lg:block">
          <div className={`mx-auto flex ${maxWidth} items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6`}>
            {toolNav.map((tool) => {
              const Icon = tool.icon;
              const active = isActivePath(tool.href);
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium ${
                    active
                      ? 'bg-[#eaeef2] text-[#24292f]'
                      : 'text-[#6e7781] hover:bg-[#f6f8fa] hover:text-[#24292f]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tool.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div id={mobileMenuId} className="border-t border-[#d0d7de] bg-white lg:hidden">
          <div className="grid gap-1 px-4 py-3">
            {mobileItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    active
                      ? 'bg-[#eaeef2] text-[#24292f]'
                      : 'text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            <a
              href="https://github.com/jasimvkarim/mydebugtools/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              onClick={() => setIsMenuOpen(false)}
            >
              New issue
            </a>
            <a
              href="https://github.com/jasimvkarim/mydebugtools"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              onClick={() => setIsMenuOpen(false)}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://buymeacoffee.com/jasimvk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]"
              onClick={() => setIsMenuOpen(false)}
            >
              <Coffee className="h-4 w-4" />
              Sponsor
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
