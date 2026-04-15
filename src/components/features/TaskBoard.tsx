"use client";

import { MoreHorizontal, Clock, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTaskStore, Task as TaskType } from '@/store/useTaskStore';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { useState, useEffect } from 'react';

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'border-zinc-200 dark:border-zinc-800' },
  { id: 'in-progress', title: 'In Progress', color: 'border-blue-200 dark:border-blue-900/50' },
  { id: 'done', title: 'Completed', color: 'border-green-200 dark:border-green-900/50' },
] as const;

function getStatusIcon(status: string) {
  switch (status) {
    case 'done': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
    default: return <Circle className="h-4 w-4 text-zinc-400" />;
  }
}

function TaskCard({ task }: { task: TaskType }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: task,
  });
  const deleteTask = useTaskStore(state => state.deleteTask);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 999,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "group flex cursor-grab active:cursor-grabbing flex-col gap-3 rounded-xl border bg-white p-4 transition-colors dark:border-zinc-800 dark:bg-black",
        isDragging ? "shadow-2xl border-indigo-500 opacity-80" : "border-zinc-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-indigo-500 hover:shadow-md dark:hover:border-indigo-500"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 max-w-[85%]">
          <div className="mt-0.5 shrink-0">{getStatusIcon(task.status)}</div>
          <p className="text-sm font-semibold tracking-tight text-zinc-900 leading-tight dark:text-zinc-100">{task.title}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
          className="text-zinc-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100 dark:text-zinc-600 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className={cn(
          "rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wider",
          task.priority === 'high' ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400" :
          task.priority === 'medium' ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400" :
          "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
        )}>
          {task.priority}
        </span>
        <div className="flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Clock className="mr-1 h-3 w-3" />
          {task.time}
        </div>
      </div>
    </div>
  );
}

function BoardColumn({ col, tasks }: { col: typeof COLUMNS[number], tasks: TaskType[] }) {
  const { isOver, setNodeRef } = useDroppable({
    id: col.id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-2xl border p-5 shadow-sm transition-colors",
        col.color,
        isOver ? "bg-indigo-50/50 dark:bg-indigo-800/20 border-indigo-300 dark:border-indigo-700" : "bg-white/40 dark:bg-zinc-900/30"
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{col.title}</h3>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-3 min-h-[150px]">
        {tasks.map(task => (
           <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="flex h-[100px] items-center justify-center rounded-xl border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-800">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500">Drag tasks here</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function TaskBoard() {
  const { tasks, updateTaskStatus } = useTaskStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useTaskStore.getState().fetchTasks();
  }, []);

  if (!mounted) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && over.id !== active.data.current?.status) {
      updateTaskStatus(active.id as string, over.id as any);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 h-full pb-8">
        {COLUMNS.map((col) => (
          <BoardColumn 
            key={col.id} 
            col={col} 
            tasks={tasks.filter(t => t.status === col.id)} 
          />
        ))}
      </div>
    </DndContext>
  );
}
