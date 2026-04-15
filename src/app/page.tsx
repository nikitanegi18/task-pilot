"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskBoard } from '@/components/features/TaskBoard';
import { TaskModal } from '@/components/features/TaskModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">Good morning, Alex.</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Here's a summary of your tasks for today.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-black"
        >
          <Plus className="h-5 w-5" />
          New Task
        </button>
      </div>

      <div className="flex-1 overflow-auto no-scrollbar">
        <TaskBoard />
      </div>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
