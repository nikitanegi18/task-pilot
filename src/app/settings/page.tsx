import { User, Bell, Shield, PaintBucket } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col p-6 lg:px-8 pb-12">
      <div className="mb-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">Settings</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage your workspace and profile preferences.</p>
        </div>
      </div>
      
      <div className="mx-auto w-full max-w-3xl space-y-6">
         {/* Profile Card */}
         <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-black transition-all">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2 mb-8">
              <User className="h-5 w-5 text-indigo-500" />
              Public Profile
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
               <div className="shrink-0 flex flex-col items-center gap-4">
                 <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md ring-4 ring-white dark:ring-black" />
                 <button className="text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 rounded-md hover:bg-indigo-50 py-1 px-3 dark:hover:bg-indigo-500/10">
                   Upload Photo
                 </button>
               </div>
               <div className="flex-1 space-y-5 w-full">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <div className="space-y-1.5 focus-within:text-indigo-600 dark:focus-within:text-indigo-400">
                     <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 transition-colors">First Name</label>
                     <input type="text" defaultValue="Alex" className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-zinc-100" />
                   </div>
                   <div className="space-y-1.5 focus-within:text-indigo-600 dark:focus-within:text-indigo-400">
                     <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 transition-colors">Last Name</label>
                     <input type="text" defaultValue="Walker" className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-zinc-100" />
                   </div>
                 </div>
                 <div className="space-y-1.5 focus-within:text-indigo-600 dark:focus-within:text-indigo-400">
                   <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 transition-colors">Workspace Role</label>
                   <input type="text" defaultValue="Lead Engineer" className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-zinc-100" />
                 </div>
                 <div className="pt-2">
                    <button className="rounded-xl shadow bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                      Save Changes
                    </button>
                 </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
