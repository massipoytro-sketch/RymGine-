-- DeSiaVe Supabase Schema Definition
-- Enables real-time game state, quest tracking, and balances

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  name text,
  avatar_url text,
  level integer default 1,
  xp integer default 0,
  xp_to_next_level integer default 1000,
  coins integer default 500,
  cash_usd numeric(10,2) default 0.50,
  diamonds integer default 10,
  energy integer default 100,
  max_energy integer default 100,
  streak_days integer default 1,
  rank text default 'Novice Adventurer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.quests (
  id text primary key,
  title text not null,
  category text not null,
  description text,
  reward_coins integer default 100,
  reward_xp integer default 50,
  reward_usd numeric(10,2) default 0.10,
  icon text,
  difficulty text default 'Easy',
  max_progress integer default 1,
  multiplier integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.user_quests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  quest_id text references public.quests(id) on delete cascade not null,
  progress integer default 0,
  completed boolean default false,
  claimed_at timestamp with time zone,
  unique(user_id, quest_id)
);

create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  type text not null,
  amount numeric(10,2) not null,
  currency text default 'coins',
  status text default 'completed',
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
