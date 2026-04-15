import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  time: string;
}

interface TaskStore {
  tasks: Task[];
  isCopilotOpen: boolean;
  setCopilotOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  autoCategorizeTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isCopilotOpen: false,
  setCopilotOpen: (isOpen) => set({ isCopilotOpen: isOpen }),
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  
  fetchTasks: async () => {
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      set({ tasks: data });
    }
  },
  
  addTask: async (task) => {
    const newTask = { ...task, id: Math.random().toString(36).substring(7) };
    
    // 1. Optimistic UI update (instant feeling)
    set((state) => ({ tasks: [newTask, ...state.tasks] }));
    
    // 2. Background database sync
    await supabase.from('tasks').insert([newTask]);
  },
  
  updateTaskStatus: async (id, status) => {
    set((state) => ({ tasks: state.tasks.map((t) => t.id === id ? { ...t, status } : t) }));
    await supabase.from('tasks').update({ status }).eq('id', id);
  },
  
  deleteTask: async (id) => {
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    await supabase.from('tasks').delete().eq('id', id);
  },
  
  autoCategorizeTask: async (id) => {
    set((state) => ({
      tasks: state.tasks.map((t) => t.id === id ? { ...t, priority: 'high', status: 'in-progress' } : t)
    }));
    await supabase.from('tasks').update({ priority: 'high', status: 'in-progress' }).eq('id', id);
  }
}));
