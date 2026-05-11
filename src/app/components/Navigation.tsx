'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  HomeIcon,
  InformationCircleIcon,
  MapIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  WrenchIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Github, Terminal } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Tools', href: '/tools', icon: WrenchIcon },
  { name: 'CLI', href: '/cli', icon: CommandLineIcon },
  { name: 'About', href: '/about', icon: InformationCircleIcon },
  { name: 'Roadmap', href: '/roadmap', icon: MapIcon },
  { name: 'Releases', href: '/releases', icon: RocketLaunchIcon },
  { name: 'Privacy', href: '/privacy-policy', icon: ShieldCheckIcon },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || '';

  const isActive = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <nav className="border-b border-[#d0d7de] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-[#24292f] hover:text-[#24292f]">
              <Terminal className="h-5 w-5" />
              <span className="font-semibold">MyDebugTools</span>
            </Link>
            <div className="hidden items-center gap-1 sm:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium ${
                      isActive(item.href)
                        ? 'bg-[#eaeef2] text-[#24292f]'
                        : 'text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]'
                    }`}
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
              className="hidden rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-xs font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f] sm:inline-flex"
            >
              New issue
            </a>
            <a
              href="https://buymeacoffee.com/jasimvk"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-xs font-semibold text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#24292f] md:inline-flex"
            >
              Sponsor
            </a>
            <a
              href="https://github.com/jasimvk/mydebugtools"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-md bg-[#24292f] px-3 py-2 text-xs font-semibold text-white hover:bg-[#32383f] hover:text-white sm:inline-flex"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <button
              type="button"
              className="rounded-md border border-[#d0d7de] p-2 text-[#57606a] hover:bg-[#f6f8fa] sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
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
        <div className="border-t border-[#d0d7de] bg-white sm:hidden">
          <div className="grid gap-1 px-4 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    isActive(item.href)
                      ? 'bg-[#eaeef2] text-[#24292f]'
                      : 'text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]'
                  }`}
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
