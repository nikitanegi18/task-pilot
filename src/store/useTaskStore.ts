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
  user_id?: string;
}

interface TaskStore {
  tasks: Task[];
  userId: string | null;
  setUserId: (id: string | null) => void;
  isCopilotOpen: boolean;
  setCopilotOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'user_id'>) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  autoCategorizeTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  userId: null,
  setUserId: (id) => set({ userId: id }),
  isCopilotOpen: false,
  setCopilotOpen: (isOpen) => set({ isCopilotOpen: isOpen }),
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  
  fetchTasks: async () => {
    const userId = get().userId;
    if (!userId) return;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      set({ tasks: data });
    }
  },
  
  addTask: async (task) => {
    const userId = get().userId;
    if (!userId) return;

    const newTask: Task = { 
      ...task, 
      id: Math.random().toString(36).substring(7),
      user_id: userId
    };
    
    // 1. Optimistic UI update (instant feeling)
    set((state) => ({ tasks: [newTask, ...state.tasks] }));
    
    // 2. Background database sync
    await supabase.from('tasks').insert([newTask]);
  },
  
  updateTaskStatus: async (id, status) => {
    const userId = get().userId;
    if (!userId) return;

    set((state) => ({ tasks: state.tasks.map((t) => t.id === id ? { ...t, status } : t) }));
    await supabase.from('tasks').update({ status }).eq('id', id).eq('user_id', userId);
  },
  
  deleteTask: async (id) => {
    const userId = get().userId;
    if (!userId) return;

    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    await supabase.from('tasks').delete().eq('id', id).eq('user_id', userId);
  },
  
  autoCategorizeTask: async (id) => {
    const userId = get().userId;
    if (!userId) return;

    set((state) => ({
      tasks: state.tasks.map((t) => t.id === id ? { ...t, priority: 'high', status: 'in-progress' } : t)
    }));
    await supabase.from('tasks').update({ priority: 'high', status: 'in-progress' }).eq('id', id).eq('user_id', userId);
  }
}));
