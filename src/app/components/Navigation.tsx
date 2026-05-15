'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  BeakerIcon,
  InformationCircleIcon,
  MapIcon,
  RocketLaunchIcon,
  CommandLineIcon,
  WrenchIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Github, Terminal } from 'lucide-react';

const navItems = [
  { name: 'Tools', href: '/tools/all', icon: WrenchIcon, activeRoot: '/tools' },
  { name: 'API Tester', href: '/tools/api', icon: BeakerIcon },
  { name: 'CLI', href: '/cli', icon: CommandLineIcon },
  { name: 'Docs', href: '/answers', icon: InformationCircleIcon },
  { name: 'Roadmap', href: '/roadmap', icon: MapIcon },
  { name: 'Releases', href: '/releases', icon: RocketLaunchIcon },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || '';
  const mobileMenuId = 'primary-navigation-menu';

  const isActivePath = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.activeRoot && isActivePath(item.activeRoot)) return true;
    return isActivePath(item.href);
  };

  const isCurrent = (item: (typeof navItems)[number]) => isActivePath(item.href);

  return (
    <nav className="border-b border-[#d0d7de] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-[#24292f] hover:text-[#24292f]">
              <Terminal className="h-5 w-5" />
              <span className="font-semibold">DebugTools</span>
              <span className="hidden rounded-full border border-[#d0d7de] px-2 py-0.5 text-xs font-medium text-[#57606a] lg:inline">
                OSS lab
              </span>
            </Link>
            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium ${
                      isActive(item)
                        ? 'bg-[#eaeef2] text-[#24292f]'
                        : 'text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]'
                    }`}
                    aria-current={isCurrent(item) ? 'page' : undefined}
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
              href="https://github.com/jasimvk/mydebugtools/issues/new"
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
              className="hidden rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-xs font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f] xl:inline-flex"
            >
              Sponsor
            </a>
            <a
              href="https://github.com/jasimvk/mydebugtools"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-md bg-[#24292f] px-3 py-2 text-xs font-semibold text-white hover:bg-[#32383f] hover:text-white lg:inline-flex"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <button
              type="button"
              className="rounded-md border border-[#d0d7de] p-2 text-[#57606a] hover:bg-[#f6f8fa] lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
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

      {isMenuOpen && (
        <div id={mobileMenuId} className="border-t border-[#d0d7de] bg-white lg:hidden">
          <div className="grid gap-1 px-4 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    isActive(item)
                      ? 'bg-[#eaeef2] text-[#24292f]'
                      : 'text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]'
                  }`}
                  aria-current={isCurrent(item) ? 'page' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            <a
              href="https://github.com/jasimvk/mydebugtools"
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
              Sponsor
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
