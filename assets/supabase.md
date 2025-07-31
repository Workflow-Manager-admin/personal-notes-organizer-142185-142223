# Supabase Integration for Notes Frontend

This React frontend uses Supabase for all notes CRUD and category operations. The connection is initialized with the following environment variables, which must be set in `.env`:

- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_KEY`

## Database schema

You must create a table in Supabase called `notes` with the following columns:

- `id`: uuid, primary key, default value: `uuid_generate_v4()`
- `title`: text, not null
- `body`: text, nullable
- `category`: text, nullable
- `created_at`: timestamp with time zone, default: `now()`
- `updated_at`: timestamp with time zone

**Current Supabase Configuration** (verified and applied):

- Table **notes** structure:
  - id: uuid, primary key, default uuid_generate_v4()
  - title: text, NOT NULL
  - body: text, NULLABLE
  - category: text, NULLABLE
  - created_at: timestamp with time zone, default now()
  - updated_at: timestamp with time zone, NULLABLE
- Row Level Security (RLS): ENABLED
- Policy: "Public CRUD access" created to enable read/write for all users (using `(true)` for universal access)
- Table recreated for correct schema as of latest update.

Example SQL to create:

```sql
create table notes (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    body text,
    category text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone
);
alter table notes enable row level security;
create policy "Public CRUD access" on notes for all
  using (true) with check (true);
```

You must enable Row Level Security (RLS), and create a policy such as "Enable read and write access to everyone" if you want public-to-edit, or limit to authenticated users as needed.

## Usage

The frontend expects to be connected and able to read/write all columns.
No authentication or user logic is hardcoded on the frontend (add it for multi-user env).

All major notes functionality (create, update, delete, filter, search, categories) uses the public `notes` table.

---
**Supabase setup last verified: [AUTO UPDATE]**
- Table and schema confirmed; public CRUD policy active.
- For any code changes, confirm that .env values for `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_KEY` are set in the React environment.

**IMPORTANT**: If you change the Supabase schema or authentication requirements, you must update the relevant code in `src/notesApi.js` and elsewhere.
