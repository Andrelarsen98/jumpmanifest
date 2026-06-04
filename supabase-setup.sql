-- Waitlist table + public-insert RLS policy for jumpmanifest.com
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  created_at  timestamptz not null default now()
);

-- Lock the table down, then open ONLY public inserts (no select/update/delete).
alter table public.waitlist enable row level security;

drop policy if exists "Public can join waitlist" on public.waitlist;
create policy "Public can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
