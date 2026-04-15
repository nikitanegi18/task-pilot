-- Create the tasks table
CREATE TABLE public.tasks (
  id text PRIMARY KEY,
  title text NOT NULL,
  status text NOT NULL CHECK (status IN ('todo', 'in-progress', 'done')),
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  time text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id text -- Prepped for Clerk User IDs
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policy allowing open access for development purposes
CREATE POLICY "Allow public read-write access to tasks"
ON public.tasks
FOR ALL
USING (true)
WITH CHECK (true);
