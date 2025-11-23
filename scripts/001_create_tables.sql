-- Create users table (extends auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create credentials table
create table if not exists public.credentials (
  id text primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  issuer text not null,
  recipient_address text not null,
  issued_date text not null,
  expiry_date text,
  status text not null default 'Valid',
  field text not null,
  grade text,
  student text,
  ipfs_cid text,
  signature text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.credentials enable row level security;

-- Users table policies
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Credentials table policies
create policy "Users can view their own credentials"
  on public.credentials for select
  using (auth.uid() = user_id);

create policy "Users can insert their own credentials"
  on public.credentials for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own credentials"
  on public.credentials for update
  using (auth.uid() = user_id);

create policy "Users can delete their own credentials"
  on public.credentials for delete
  using (auth.uid() = user_id);

-- Create indexes for performance
create index if not exists credentials_user_id_idx on public.credentials(user_id);
create index if not exists credentials_status_idx on public.credentials(status);
