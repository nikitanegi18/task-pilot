"use client";

import { useTaskStore } from '@/store/useTaskStore';
import { Sparkles, TrendingUp, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Insights() {
  const tasks = useTaskStore((state) => state.tasks);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;

  const highPriority = tasks.filter(t => t.priority === 'high').length;

  return (
    <div className="flex min-h-screen flex-col p-6 lg:px-8 pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">AI Insights</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Deep dive into your workspace productivity.</p>
        </div>
        <div className="self-start rounded-full bg-indigo-50/50 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" />
          Copilot Analytics Active
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
           { title: "Total Tasks", value: total, icon: TrendingUp, color: "text-zinc-900 dark:text-zinc-50" },
           { title: "Completed", value: completed, icon: CheckCircle2, color: "text-green-600 dark:text-green-400" },
           { title: "In Progress", value: inProgress, icon: Clock, color: "text-blue-600 dark:text-blue-400" },
           { title: "High Priority", value: highPriority, icon: AlertCircle, color: "text-red-600 dark:text-red-400" },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-black">
             <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.title}</span>
                <stat.icon className={`h-4 w-4 ${stat.color} opacity-70`} />
             </div>
             <div className={`mt-3 text-3xl font-bold tracking-tighter ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-black">
           <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8 flex items-center gap-2">
             <TrendingUp className="h-5 w-5 text-indigo-500" />
             Execution Velocity
           </h3>
           <div className="space-y-6">
              {[
                { label: 'Completed Phase', count: completed, color: 'bg-green-500' },
                { label: 'Active Pipeline', count: inProgress, color: 'bg-blue-500' },
                { label: 'Backlog Queue', count: todo, color: 'bg-zinc-300 dark:bg-zinc-700' },
              ].map((bar, idx) => (
                 <div key={idx} className="flex flex-col gap-2.5">
                    <div className="flex justify-between text-sm">
                       <span className="font-semibold text-zinc-700 dark:text-zinc-300">{bar.label}</span>
                       <span className="text-zinc-500 dark:text-zinc-400 font-medium">{bar.count} tasks</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900 shadow-inner">
                       <div 
                         className={`h-full ${bar.color} transition-all duration-1000 ease-out`} 
                         style={{ width: `${total > 0 ? (bar.count / total) * 100 : 0}%` }} 
                       />
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="rounded-2xl flex flex-col items-center justify-center border border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/10">
           <Sparkles className="h-10 w-10 text-indigo-500/80 mb-5 drop-shadow-sm" />
           <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">Predictive Analytics</h3>
           <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
             Based on your current execution speed, Copilot projects you will clear the backlog queue by <strong>Thursday</strong> without exceeding bandwidth.
           </p>
           <button className="mt-8 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
             Generate Full Report
           </button>
        </div>
      </div>
    </div>
  );
}
