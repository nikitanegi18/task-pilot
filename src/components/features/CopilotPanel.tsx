"use client";

import { X, Sparkles, Wand2, Loader2, Send, Bot } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';
import { useState, useTransition } from 'react';
import { analyzeTasksForPrioritization } from '@/app/actions/copilot';

export function CopilotPanel() {
  const { isCopilotOpen, setCopilotOpen, autoCategorizeTask, tasks } = useTaskStore();
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleAutoCategorize = () => {
    const todoTasks = tasks.filter(t => t.status === 'todo');
    if (todoTasks.length === 0) return;
    
    startTransition(async () => {
      const activeIds = await analyzeTasksForPrioritization(todoTasks);
      activeIds.forEach((id: string) => {
        autoCategorizeTask(id);
      });
    });
  };

  if (!isCopilotOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-80 flex-col bg-white shadow-2xl transition-transform duration-300 dark:border-l dark:border-zinc-800 dark:bg-black md:w-96">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Copilot</h2>
        </div>
        <button onClick={() => setCopilotOpen(false)} className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4 no-scrollbar">
        <div className="flex gap-3">
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-sm">
            <Bot className="h-4 w-4" />
          </div>
          <div className="rounded-2xl rounded-tl-none bg-zinc-100 p-3 text-sm font-medium leading-relaxed text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
            Hi Alex! I'm your workspace Copilot. I can help you prioritize your tasks, break down complex goals, or categorize your current unstructured items.
          </div>
        </div>

        {tasks.filter(t => t.status === 'todo').length > 0 && (
          <div className="ml-11 max-w-[90%] rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Copilot Suggestion</p>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">You have {tasks.filter(t => t.status === 'todo').length} items in your To Do list. Want me to automatically prioritize them and move feasible ones to In Progress?</p>
            <button 
              onClick={handleAutoCategorize}
              disabled={isPending}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2.5 text-xs font-semibold text-white shadow transition-all hover:bg-indigo-700 disabled:opacity-50"
            >
              {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />}
              {isPending ? 'Analyzing...' : 'Auto-Prioritize Now'}
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <form className="relative flex items-center" onSubmit={(e) => { e.preventDefault(); setQuery(''); }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Copilot..."
            className="w-full rounded-full border border-zinc-300 bg-zinc-50 py-3 pl-5 pr-12 text-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
          <button type="submit" disabled={!query.trim()} className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-50">
            <Send className="ml-0.5 h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
