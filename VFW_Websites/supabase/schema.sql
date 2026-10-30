-- VFW Grenada website database setup.
-- Run this in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
-- It is safe to run more than once.
--
-- Security model:
--   * Visitors (the "anon" role) can READ page content, events, and photos.
--   * Visitors can SUBMIT membership applications but can never read them back.
--   * Only users listed in public.admins can change anything or read applications.
--   * These rules are enforced by the database itself (row level security), so
--     they hold even if someone tampers with the website's JavaScript.


-- ---------------------------------------------------------------------------
-- Admins
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
    user_id uuid primary key references auth.users (id) on delete cascade,
    created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
-- No policies on admins: nobody can read or change this table through the API.
-- Admins are added only from the SQL Editor (see the bottom of this file).

-- Returns true when the signed-in user is on the admin list.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (select 1 from public.admins where user_id = auth.uid());
$$;


-- ---------------------------------------------------------------------------
-- Page content (the text, lists, and images edited from the Pages tab)
-- ---------------------------------------------------------------------------
create table if not exists public.site_content (
    key text primary key check (key in ('site', 'home', 'gallery', 'contact', 'donations', 'applications')),
    value jsonb not null default '{}'::jsonb check (jsonb_typeof(value) = 'object' and pg_column_size(value) < 200000),
    updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

drop policy if exists "Anyone can read site content" on public.site_content;
create policy "Anyone can read site content" on public.site_content
    for select to anon, authenticated using (true);

drop policy if exists "Admins can change site content" on public.site_content;
create policy "Admins can change site content" on public.site_content
    for all to authenticated using (public.is_admin()) with check (public.is_admin());


-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------
create table if not exists public.events (
    id uuid primary key default gen_random_uuid(),
    title text not null check (char_length(title) between 1 and 200),
    description text not null default '' check (char_length(description) <= 2000),
    event_date date not null,
    event_time text not null default '' check (char_length(event_time) <= 100),
    created_at timestamptz not null default now()
);
alter table public.events enable row level security;

drop policy if exists "Anyone can read events" on public.events;
create policy "Anyone can read events" on public.events
    for select to anon, authenticated using (true);

drop policy if exists "Admins can change events" on public.events;
create policy "Admins can change events" on public.events
    for all to authenticated using (public.is_admin()) with check (public.is_admin());


-- ---------------------------------------------------------------------------
-- Photos (gallery and home page slideshow)
-- ---------------------------------------------------------------------------
create table if not exists public.photos (
    id uuid primary key default gen_random_uuid(),
    url text not null check (char_length(url) <= 1000),
    storage_path text not null check (char_length(storage_path) <= 500),
    caption text not null default '' check (char_length(caption) <= 300),
    in_slideshow boolean not null default false,
    created_at timestamptz not null default now()
);
alter table public.photos enable row level security;

drop policy if exists "Anyone can read photos" on public.photos;
create policy "Anyone can read photos" on public.photos
    for select to anon, authenticated using (true);

drop policy if exists "Admins can change photos" on public.photos;
create policy "Admins can change photos" on public.photos
    for all to authenticated using (public.is_admin()) with check (public.is_admin());


-- ---------------------------------------------------------------------------
-- Membership applications
-- ---------------------------------------------------------------------------
create table if not exists public.applications (
    id uuid primary key default gen_random_uuid(),
    first_name text not null check (char_length(first_name) between 1 and 100),
    last_name text not null check (char_length(last_name) between 1 and 100),
    email text not null check (char_length(email) between 3 and 254 and email like '%_@_%'),
    phone text not null check (char_length(phone) between 7 and 30),
    address text not null check (char_length(address) between 1 and 200),
    city text not null check (char_length(city) between 1 and 100),
    state text not null check (char_length(state) between 1 and 50),
    zip text not null check (zip ~ '^[0-9]{5}(-[0-9]{4})?$'),
    military_rank text not null default '' check (char_length(military_rank) <= 100),
    unit text not null default '' check (char_length(unit) <= 200),
    status text not null default 'new' check (status in ('new', 'contacted', 'approved', 'declined')),
    created_at timestamptz not null default now()
);
alter table public.applications enable row level security;

-- Visitors may only fill in the form fields; id, status, and created_at are set
-- by the database.
revoke insert on public.applications from anon, authenticated;
grant insert (first_name, last_name, email, phone, address, city, state, zip, military_rank, unit)
    on public.applications to anon, authenticated;

drop policy if exists "Anyone can submit an application" on public.applications;
create policy "Anyone can submit an application" on public.applications
    for insert to anon, authenticated with check (status = 'new');

drop policy if exists "Admins can read applications" on public.applications;
create policy "Admins can read applications" on public.applications
    for select to authenticated using (public.is_admin());

drop policy if exists "Admins can update applications" on public.applications;
create policy "Admins can update applications" on public.applications
    for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can delete applications" on public.applications;
create policy "Admins can delete applications" on public.applications
    for delete to authenticated using (public.is_admin());


-- ---------------------------------------------------------------------------
-- Image storage
-- ---------------------------------------------------------------------------
-- Public bucket so visitors can view images. SVG is deliberately not allowed
-- because SVG files can contain scripts.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update set
    public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can upload site images" on storage.objects;
create policy "Admins can upload site images" on storage.objects
    for insert to authenticated with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Admins can update site images" on storage.objects;
create policy "Admins can update site images" on storage.objects
    for update to authenticated using (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Admins can delete site images" on storage.objects;
create policy "Admins can delete site images" on storage.objects
    for delete to authenticated using (bucket_id = 'site-images' and public.is_admin());


-- ---------------------------------------------------------------------------
-- Adding an admin
-- ---------------------------------------------------------------------------
-- 1. Dashboard -> Authentication -> Users -> Add user -> Create new user
--    (enter their email and a strong password, check "Auto Confirm User").
-- 2. Run this, with their email:
--
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'person@example.com';
--
-- To remove an admin:
-- delete from public.admins
-- where user_id = (select id from auth.users where email = 'person@example.com');
