import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
/**
 * Form for editing/creating a note.
 * @param {Object} props
 * @param {Object|null} props.note - Existing note or null for new.
 * @param {function} props.onSave
 * @param {function} props.onCancel
 * @param {string[]} props.categories
 */
function NoteEditor({ note, onSave, onCancel, categories }) {
  const [title, setTitle] = useState(note?.title || "");
  const [category, setCategory] = useState(note?.category || "");
  const [body, setBody] = useState(note?.body || "");

  useEffect(() => {
    setTitle(note?.title || "");
    setCategory(note?.category || "");
    setBody(note?.body || "");
  }, [note]);

  return (
    <form
      className="note-editor"
      onSubmit={(e) => {
        e.preventDefault();
        if (title.trim()) {
          onSave({ title: title.trim(), category: category.trim(), body });
        }
      }}
    >
      <input
        className="editor-title"
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        autoFocus
      />
      <input
        className="editor-category"
        type="text"
        list="categories"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <datalist id="categories">
        {categories.map((c) => (
          <option value={c} key={c} />
        ))}
      </datalist>
      <textarea
        className="editor-body"
        rows={10}
        placeholder="Type your note here…"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="editor-actions">
        <button className="btn-save" type="submit">
          Save
        </button>
        <button className="btn-cancel" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NoteEditor;
