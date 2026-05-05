-- Protocolo Chama Verde — cole no Supabase SQL Editor e execute

create table if not exists public.profiles (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  nome          text not null,
  peso_inicial  numeric(5,1) not null,
  objetivo      text not null check (objetivo in ('desinchar','reduzir_fome','perder_peso','mais_energia')),
  horario_bebida text not null default '07:00',
  created_at    timestamptz not null default now(),
  unique (user_id)
);
alter table public.profiles enable row level security;
create policy "profiles_own" on public.profiles using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.daily_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  date          date not null,
  bebida_feita  boolean not null default false,
  agua_feita    boolean not null default false,
  registro_feito boolean not null default false,
  created_at    timestamptz not null default now(),
  unique (user_id, date)
);
alter table public.daily_logs enable row level security;
create policy "daily_logs_own" on public.daily_logs using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.progress_entries (
  id       uuid primary key default gen_random_uuid(),
  user_id  uuid not null references auth.users(id) on delete cascade,
  date     date not null,
  humor    smallint not null check (humor between 1 and 5),
  inchaco  smallint not null check (inchaco between 1 and 5),
  fome     boolean not null default false,
  energia  smallint not null check (energia between 1 and 5),
  created_at timestamptz not null default now(),
  unique (user_id, date)
);
alter table public.progress_entries enable row level security;
create policy "progress_own" on public.progress_entries using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.plan_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  day_number   smallint not null check (day_number between 1 and 7),
  completed    boolean not null default false,
  completed_at timestamptz,
  unique (user_id, day_number)
);
alter table public.plan_progress enable row level security;
create policy "plan_own" on public.plan_progress using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists idx_daily_logs_user_date     on public.daily_logs(user_id, date desc);
create index if not exists idx_progress_entries_user_date on public.progress_entries(user_id, date desc);
create index if not exists idx_plan_progress_user        on public.plan_progress(user_id);
