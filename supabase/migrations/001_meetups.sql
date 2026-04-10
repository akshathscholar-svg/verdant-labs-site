-- Meetups table
create table if not exists public.meetups (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  location text not null,
  date date not null,
  time time not null,
  max_attendees integer not null default 20,
  created_by uuid not null references auth.users(id) on delete cascade,
  creator_name text not null default '',
  created_at timestamptz not null default now()
);

-- RSVP table
create table if not exists public.meetup_rsvps (
  id uuid primary key default gen_random_uuid(),
  meetup_id uuid not null references public.meetups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  user_name text not null default '',
  created_at timestamptz not null default now(),
  unique (meetup_id, user_id)
);

-- Enable RLS
alter table public.meetups enable row level security;
alter table public.meetup_rsvps enable row level security;

-- Meetups policies: anyone can read, authenticated can insert, creator can delete
create policy "Anyone can view meetups" on public.meetups for select using (true);
create policy "Authenticated users can create meetups" on public.meetups for insert with check (auth.uid() = created_by);
create policy "Creators can delete their meetups" on public.meetups for delete using (auth.uid() = created_by);

-- RSVPs policies: anyone can read, authenticated users can manage their own
create policy "Anyone can view RSVPs" on public.meetup_rsvps for select using (true);
create policy "Authenticated users can RSVP" on public.meetup_rsvps for insert with check (auth.uid() = user_id);
create policy "Users can remove their RSVP" on public.meetup_rsvps for delete using (auth.uid() = user_id);

-- Indexes
create index if not exists idx_meetups_date on public.meetups(date);
create index if not exists idx_meetup_rsvps_meetup_id on public.meetup_rsvps(meetup_id);
create index if not exists idx_meetup_rsvps_user_id on public.meetup_rsvps(user_id);
