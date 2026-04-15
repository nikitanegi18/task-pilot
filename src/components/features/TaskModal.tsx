"use client";

import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useTaskStore, TaskPriority } from '@/store/useTaskStore';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskModal({ isOpen, onClose }: TaskModalProps) {
  const addTask = useTaskStore((state) => state.addTask);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [time, setTime] = useState('1 hr');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, status: 'todo', priority, time });
    setTitle('');
    setPriority('medium');
    setTime('1 hr');
    onClose();
  };

  const handleMagicFill = () => {
    // Mock copilot input fill
    setTitle('Prepare Q3 Marketing Presentation');
    setPriority('high');
    setTime('3 hrs');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-md scale-100 rounded-3xl bg-white p-6 shadow-2xl transition-transform dark:border dark:border-zinc-800 dark:bg-black">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">New Task</h2>
          <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Task Title</label>
              <button type="button" onClick={handleMagicFill} className="flex items-center gap-1 rounded bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-500/20 dark:text-indigo-400">
                <Sparkles className="h-3 w-3" />
                Copilot Fill
              </button>
            </div>
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-zinc-100"
              placeholder="What needs to be done?"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-800 dark:text-zinc-100 dark:[&>option]:bg-zinc-900"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Est. Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-800 dark:text-zinc-100"
                placeholder="e.g. 1 hr"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!title.trim()}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
