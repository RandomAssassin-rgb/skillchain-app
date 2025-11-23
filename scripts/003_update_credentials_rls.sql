-- Update RLS policies to allow credentials with null user_id
-- This supports MetaMask-only users who aren't authenticated with Supabase

-- Drop existing policies
drop policy if exists "Users can view their own credentials" on public.credentials;
drop policy if exists "Users can insert their own credentials" on public.credentials;
drop policy if exists "Users can update their own credentials" on public.credentials;
drop policy if exists "Users can delete their own credentials" on public.credentials;

-- Create new policies that support null user_id
create policy "Users can view their own credentials"
  on public.credentials for select
  using (auth.uid() = user_id OR user_id IS NULL);

create policy "Users can insert their own credentials"
  on public.credentials for insert
  with check (auth.uid() = user_id OR user_id IS NULL);

create policy "Users can update their own credentials"
  on public.credentials for update
  using (auth.uid() = user_id OR user_id IS NULL);

create policy "Users can delete their own credentials"
  on public.credentials for delete
  using (auth.uid() = user_id OR user_id IS NULL);

-- Also update the credentials table to allow null user_id
alter table public.credentials 
  alter column user_id drop not null;
