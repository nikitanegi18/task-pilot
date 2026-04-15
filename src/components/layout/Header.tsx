"use client";

import { Search, Bell, Sparkles, Menu } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';
import { ThemeToggle } from '@/components/features/ThemeToggle';

export function Header() {
  const { setCopilotOpen, setMobileMenuOpen } = useTaskStore();

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between gap-x-4 border-b border-zinc-200 bg-white/60 px-4 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-black/60 sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 md:hidden">
        <button onClick={() => setMobileMenuOpen(true)} className="-m-2.5 p-2.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-indigo-500" />
            <span className="font-bold tracking-tight text-zinc-900 dark:text-zinc-50">TaskPilot</span>
        </div>
      </div>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative hidden w-full flex-1 items-center md:flex" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">Search</label>
          <Search className="pointer-events-none absolute left-0 h-5 w-5 text-zinc-400" aria-hidden="true" />
          <input
            id="search-field"
            className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-0 dark:text-zinc-100 sm:text-sm"
            placeholder="Search tasks..."
            type="search"
            name="search"
            autoComplete="off"
          />
        </form>
        <div className="flex flex-1 items-center justify-end gap-x-3 lg:gap-x-5 md:justify-end">
          <button 
            type="button" 
            onClick={() => setCopilotOpen(true)}
            className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Copilot</span>
          </button>
          <ThemeToggle />
          <div className="h-6 w-px hidden md:block bg-zinc-200 dark:bg-zinc-800" />
          <button type="button" className="-m-2.5 hidden md:block p-2.5 text-zinc-400 transition-colors hover:text-zinc-500">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="md:hidden h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shrink-0" />
        </div>
      </div>
    </header>
  );
}
