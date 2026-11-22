'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  FileText,
  Globe,
  Package,
  Search,
  Wrench,
  X,
} from 'lucide-react';
import { SearchResultGroup, searchSite } from '@/lib/search';

interface NavbarSearchProps {
  variant: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

const GROUP_ICONS: Record<SearchResultGroup, React.ReactNode> = {
  Products: <Package className="w-3.5 h-3.5 text-[#3B6B91] shrink-0" />,
  'Services & OEM': <Wrench className="w-3.5 h-3.5 text-[#3F7D6B] shrink-0" />,
  'Blog & Guides': <FileText className="w-3.5 h-3.5 text-[#223752] shrink-0" />,
  'Categories & Pages': <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />,
};

const QUICK_SUGGESTIONS = [
  { label: 'CVP Kit', query: 'CVP Kit' },
  { label: 'OEM Cleanroom', query: 'OEM' },
  { label: 'ICU Consumables', query: 'ICU' },
  { label: 'CE MDR Support', query: 'MDR' },
];

export const NavbarSearch: React.FC<NavbarSearchProps> = ({ variant, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listboxId = useId();

  const results = useMemo(
    () => searchSite(query, { limitPerGroup: 3, maxTotal: 10 }),
    [query]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Cmd+K / Ctrl+K shortcut for desktop search bar
  useEffect(() => {
    if (variant !== 'desktop') return;
    const handleKeyShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyShortcut);
    return () => window.removeEventListener('keydown', handleKeyShortcut);
  }, [variant]);

  const closeAndReset = () => {
    setIsOpen(false);
    setActiveIndex(-1);
    onNavigate?.();
  };

  const handleSelectHref = (href: string) => {
    closeAndReset();
    router.push(href);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    const total = results.items.length;
    if (total === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % total);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? total - 1 : prev - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const target = results.items[activeIndex >= 0 ? activeIndex : 0];
      if (target) {
        handleSelectHref(target.href);
      }
    }
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <Search
          className="w-4 h-4 text-slate-400 pointer-events-none absolute left-3"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            variant === 'desktop'
              ? 'Search products, services, blog...'
              : 'Search products, SKUs, services or blog...'
          }
          aria-label="Search Secure MediTech Global products, services, and blog guides"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          role="combobox"
          className={`w-full pl-9 bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200/90 focus:border-[#7BA3C4] rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all ${
            variant === 'desktop'
              ? `h-10 ${hasQuery ? 'pr-8' : 'pr-12'}`
              : 'h-10 pr-9'
          }`}
        />

        {hasQuery ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveIndex(-1);
              inputRef.current?.focus();
            }}
            aria-label="Clear search query"
            className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          variant === 'desktop' && (
            <kbd
              aria-hidden="true"
              className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-md absolute right-2.5 pointer-events-none"
            >
              ⌘K
            </kbd>
          )
        )}
      </div>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Site search results"
          className={`absolute z-50 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden ${
            variant === 'desktop'
              ? 'right-0 w-[340px] sm:w-[440px]'
              : 'left-0 right-0 w-full'
          }`}
        >
          {!hasQuery ? (
            <div className="p-3.5">
              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-2">
                Popular Searches
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {QUICK_SUGGESTIONS.map((item) => (
                  <button
                    key={item.query}
                    type="button"
                    onClick={() => {
                      setQuery(item.query);
                      setActiveIndex(0);
                      inputRef.current?.focus();
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-[#F1F5F8] text-left text-xs font-semibold text-[#223752] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#3B6B91]" />
                  </button>
                ))}
              </div>
            </div>
          ) : results.items.length > 0 ? (
            <div className="max-h-[70vh] overflow-y-auto divide-y divide-slate-100">
              {results.groups.map((groupBlock) => (
                <div key={groupBlock.group} className="p-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                    {GROUP_ICONS[groupBlock.group]}
                    <span>{groupBlock.group}</span>
                  </div>
                  <div className="space-y-0.5 mt-0.5">
                    {groupBlock.items.map((item) => {
                      const flatIdx = results.items.findIndex((x) => x.id === item.id);
                      const isActive = flatIdx === activeIndex;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          role="option"
                          aria-selected={isActive}
                          onClick={closeAndReset}
                          onMouseEnter={() => setActiveIndex(flatIdx)}
                          className={`flex items-center justify-between gap-3 px-2.5 py-2 rounded-xl transition-colors ${
                            isActive
                              ? 'bg-[#F1F5F8] text-[#223752]'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-[#223752] truncate">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-500 truncate mt-0.5">
                              {item.subtitle}
                            </div>
                          </div>
                          {item.badge && (
                            <span className="shrink-0 text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
              {results.totalCount > results.items.length && (
                <div className="px-3.5 py-2 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>
                    Showing top {results.items.length} of {results.totalCount} matches
                  </span>
                  <Link
                    href="/products"
                    onClick={closeAndReset}
                    className="font-semibold text-[#223752] hover:text-[#3B6B91] inline-flex items-center gap-1"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm font-semibold text-slate-700">
                No matches found for &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching by SKU, catheter type, cleanroom service, or hospital guide.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
                <Link
                  href="/products"
                  onClick={closeAndReset}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#F1F5F8] font-semibold text-[#223752]"
                >
                  All Products
                </Link>
                <Link
                  href="/services"
                  onClick={closeAndReset}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#F1F5F8] font-semibold text-[#223752]"
                >
                  Services
                </Link>
                <Link
                  href="/blog"
                  onClick={closeAndReset}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#F1F5F8] font-semibold text-[#223752]"
                >
                  Blog Guides
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
