'use client';

import type { ComponentType } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  BeakerIcon,
  ChevronDownIcon,
  CommandLineIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  WrenchIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Braces, Coffee, Github, Hash, KeyRound, Terminal } from 'lucide-react';

type IconComponent = ComponentType<{ className?: string }>;

const primaryNav: Array<{
  name: string;
  href: string;
  icon: IconComponent;
  activeRoot?: string;
}> = [
  { name: 'API Tester', href: '/tools/api', icon: BeakerIcon },
  { name: 'All Tools', href: '/tools/all', icon: WrenchIcon, activeRoot: '/tools' },
  { name: 'Docs', href: '/answers', icon: InformationCircleIcon },
];

const toolNav: Array<{ name: string; href: string; icon: IconComponent }> = [
  { name: 'API', href: '/tools/api', icon: BeakerIcon },
  { name: 'JSON', href: '/tools/json', icon: Braces },
  { name: 'JWT', href: '/tools/jwt', icon: KeyRound },
  { name: 'Hash', href: '/tools/hash', icon: Hash },
  { name: 'Diff', href: '/tools/code-diff', icon: CommandLineIcon },
  { name: 'Base64', href: '/tools/base64', icon: DocumentTextIcon },
  { name: 'All tools', href: '/tools/all', icon: WrenchIcon },
];

const projectLinks = [
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Releases', href: '/releases' },
  { name: 'Changelog', href: '/changelog' },
  { name: 'Contribute', href: '/contributing' },
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
  const [isProjectOpen, setIsProjectOpen] = useState(false);
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

            <div className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => {
                const Icon = item.icon;
                const active = isPrimaryActive(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold ${
                      active
                        ? 'bg-[#eaeef2] text-[#24292f]'
                        : 'text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]'
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
            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setIsProjectOpen(!isProjectOpen)}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]"
                aria-expanded={isProjectOpen}
              >
                Project
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {isProjectOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-md border border-[#d0d7de] bg-white py-1 shadow-lg">
                  {projectLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsProjectOpen(false)}
                      className="block px-3 py-2 text-sm font-medium text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <a
              href="https://github.com/jasimvkarim/mydebugtools/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f] xl:inline-flex"
            >
              Issue
            </a>
            <a
              href="https://buymeacoffee.com/jasimvk"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f] 2xl:inline-flex"
            >
              <Coffee className="h-3.5 w-3.5" />
              Sponsor
            </a>
            <a
              href="https://github.com/jasimvkarim/mydebugtools"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-md bg-[#24292f] px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#32383f] hover:text-white lg:inline-flex"
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
          <div className={`mx-auto flex ${maxWidth} items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6`}>
            <span className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6e7781]">
              Tools
            </span>
            {toolNav.map((tool) => {
              const Icon = tool.icon;
              const active = isActivePath(tool.href);
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold ${
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
            {projectLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
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
