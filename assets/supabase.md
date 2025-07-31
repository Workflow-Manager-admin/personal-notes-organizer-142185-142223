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
```

You must enable Row Level Security (RLS), and create a policy such as "Enable read and write access to everyone" if you want public-to-edit, or limit to authenticated users as needed.

## Usage

The frontend expects to be connected and able to read/write all columns.
No authentication or user logic is hardcoded on the frontend (add it for multi-user env).

All major notes functionality (create, update, delete, filter, search, categories) uses the public `notes` table.

---
**IMPORTANT**: If you change the Supabase schema or authentication requirements, you must update the relevant code in `src/notesApi.js` and elsewhere.
