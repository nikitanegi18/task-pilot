"use client";

import { Clock, Search } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function MyTasks() {
  const tasks = useTaskStore((state) => state.tasks);
  const [filter, setFilter] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch on initial render

  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">My Tasks</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">View and manage your entire task history.</p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4 shrink-0">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-10 pr-4 text-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-black dark:text-zinc-100"
            />
         </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black shadow-sm">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">Task Title</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">Est. Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-black">
            {filteredTasks.length === 0 ? (
               <tr>
                 <td colSpan={4} className="px-6 py-12 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">No tasks found matching your search.</td>
               </tr>
            ) : filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-zinc-50 transition-colors dark:hover:bg-zinc-900/30">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-900 dark:text-zinc-100">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className={cn(
                    "inline-flex rounded-md px-2.5 py-1 text-xs font-bold uppercase",
                    task.priority === 'high' ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400" :
                    task.priority === 'medium' ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400" :
                    "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  )}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 flex items-center font-medium dark:text-zinc-400">
                  <Clock className="mr-2 h-4 w-4" />
                  {task.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
