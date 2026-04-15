"use client";

import { Home, CheckSquare, Sparkles, Settings, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTaskStore } from '@/store/useTaskStore';
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";

export function Sidebar() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useTaskStore();
  const { isSignedIn } = useAuth();

  return (
    <>
      <div className={cn(
        "fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm transition-opacity md:hidden",
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setMobileMenuOpen(false)} />
      
      <aside className={cn(
        "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-zinc-200 bg-white/80 backdrop-blur-xl transition-transform dark:border-zinc-800 dark:bg-black/80 md:bg-white/50 md:dark:bg-black/50 md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 shrink-0 items-center justify-between px-6">
          <div className="flex items-center">
            <Sparkles className="mr-2 h-6 w-6 text-indigo-500" />
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">TaskPilot</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {[
            { name: 'Dashboard', icon: Home, href: '/' },
            { name: 'My Tasks', icon: CheckSquare, href: '/tasks' },
            { name: 'AI Insights', icon: Sparkles, href: '/insights' },
            { name: 'Settings', icon: Settings, href: '/settings' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                item.name === 'Dashboard' 
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-50"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5 shrink-0 transition-colors duration-200", 
                item.name === 'Dashboard' ? "text-indigo-500" : "text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400"
              )} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 hidden md:block">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
             {isSignedIn ? (
                <div className="flex w-full items-center justify-between overflow-hidden">
                   <div className="flex items-center gap-3">
                     <UserButton appearance={{ elements: { userButtonAvatarBox: "h-9 w-9 shrink-0" } }} />
                     <div className="flex flex-col gap-0.5 truncate">
                       <span className="text-sm font-semibold leading-none text-zinc-900 dark:text-zinc-100 truncate">Pro User</span>
                       <span className="text-xs text-zinc-500 dark:text-zinc-400">Authenticated</span>
                     </div>
                   </div>
                </div>
             ) : (
                <div className="flex w-full items-center justify-between overflow-hidden">
                   <div className="flex items-center gap-3">
                     <div className="h-9 w-9 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                        <User className="h-5 w-5 text-zinc-400" />
                     </div>
                     <div className="flex flex-col gap-0.5">
                       <span className="text-sm font-semibold leading-none text-zinc-900 dark:text-zinc-100">Guest User</span>
                       <SignInButton mode="modal">
                         <span className="text-xs text-indigo-500 hover:text-indigo-600 cursor-pointer font-bold transition-colors dark:text-indigo-400">Sign In Now</span>
                       </SignInButton>
                     </div>
                   </div>
                </div>
             )}
          </div>
        </div>
      </aside>
    </>
  );
}
