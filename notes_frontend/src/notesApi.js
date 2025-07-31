import { getSupabaseClient } from "./supabaseClient";

// PUBLIC_INTERFACE
/**
 * Fetch all notes, optionally filtered by search text or category.
 * @param {string} [searchText] - Optional search string for note title/body.
 * @param {string|null} [category] - Optional category to filter notes.
 */
export async function fetchNotes(searchText = "", category = null) {
  const supabase = getSupabaseClient();
  let query = supabase.from("notes").select("*").order("updated_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }
  if (searchText) {
    query = query.ilike("title", `%${searchText}%`)
      .or(`body.ilike.%${searchText}%`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
/**
 * Fetch a list of distinct categories.
 */
export async function fetchCategories() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("notes").select("category").neq("category", null);
  if (error) throw error;
  // Get unique and filter out null/empty
  return Array.from(
    new Set(data.map((row) => (row.category || "").trim()).filter(Boolean))
  );
}

// PUBLIC_INTERFACE
/**
 * Create a note.
 * @param {Object} note
 * @param {string} note.title
 * @param {string} note.body
 * @param {string} note.category
 */
export async function createNote(note) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("notes").insert([note]).select().single();
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
/**
 * Update a note.
 * @param {string} id
 * @param {Object} updates
 */
export async function updateNote(id, updates) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("notes").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
/**
 * Delete a note.
 * @param {string} id
 */
export async function deleteNote(id) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) throw error;
  return true;
}
