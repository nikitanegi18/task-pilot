import { UserProfile } from '@clerk/nextjs';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col p-6 lg:px-8 pb-12">
      <div className="mb-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">Settings</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage your workspace and profile preferences.</p>
        </div>
      </div>
      
      <div className="mx-auto w-full max-w-4xl flex justify-center">
        {/* We use Clerk's pre-built UserProfile component to give them real, working functionality */}
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "w-full flex justify-center",
              card: "shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl",
              navbar: "hidden sm:block", // Keeps it clean
            }
          }}
        />
      </div>
    </div>
  );
}
