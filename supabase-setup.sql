-- Run this in your Supabase SQL Editor
-- Creates a simple key-value table for storing app data

create table if not exists kv (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

-- Allow anonymous reads and writes (public app, no login needed)
alter table kv enable row level security;

create policy "Allow public read" on kv
  for select using (true);

create policy "Allow public insert/update" on kv
  for insert with check (true);

create policy "Allow public update" on kv
  for update using (true);
