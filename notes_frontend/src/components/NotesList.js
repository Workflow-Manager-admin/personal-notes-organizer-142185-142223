import React from "react";

// PUBLIC_INTERFACE
/**
 * Displays a list of notes with edit/delete actions.
 * @param {Object} props
 * @param {Array<Object>} props.notes
 * @param {function} props.onEdit
 * @param {function} props.onDelete
 * @param {string} [props.activeId]
 */
function NotesList({ notes, onEdit, onDelete, activeId }) {
  if (!notes.length) {
    return <div className="notes-empty">No notes found.</div>;
  }
  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li
          key={note.id}
          className={`note-item${activeId === note.id ? " active" : ""}`}
        >
          <div className="note-main" onClick={() => onEdit(note)}>
            <div className="note-title">{note.title}</div>
            <div className="note-body-preview">
              {note.body?.slice(0, 64) || ""}
            </div>
            <div className="note-category">{note.category || ""}</div>
          </div>
          <button
            className="delete-btn"
            title="Delete note"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NotesList;
