import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';

import {
  fetchNotes,
  fetchCategories,
  createNote,
  updateNote,
  deleteNote,
} from './notesApi';

// PUBLIC_INTERFACE
/**
 * Root App for Notes application.
 * - Sidebar for categories
 * - TopBar for actions/search
 * - Main for notes list and editor
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [editingNote, setEditingNote] = useState(null); // note object or null for modal
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // Fetch notes & categories
  const loadNotesAndCategories = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [notesData, catsData] = await Promise.all([
        fetchNotes(search, selectedCategory),
        fetchCategories(),
      ]);
      setNotes(notesData);
      setCategories([...catsData].sort());
    } catch (e) {
      setError('Failed to load notes or categories.');
    }
    setLoading(false);
  }, [search, selectedCategory]);

  useEffect(() => {
    loadNotesAndCategories();
  }, [loadNotesAndCategories]);

  // Add new note mode
  const handleAddNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };
  // Edit mode
  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowEditor(true);
  };
  // Save (create/new)
  const handleSaveNote = async (noteFields) => {
    setLoading(true);
    setError('');
    try {
      if (editingNote) {
        await updateNote(editingNote.id, {
          ...noteFields,
          updated_at: new Date().toISOString()
        });
      } else {
        await createNote({
          ...noteFields,
          updated_at: new Date().toISOString()
        });
      }
      setShowEditor(false);
      setEditingNote(null);
      loadNotesAndCategories();
    } catch (e) {
      setError('Failed to save note.');
    }
    setLoading(false);
  };
  // Delete
  const handleDeleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    setLoading(true);
    setError('');
    try {
      await deleteNote(id);
      if (editingNote?.id === id) {
        setShowEditor(false);
        setEditingNote(null);
      }
      loadNotesAndCategories();
    } catch (e) {
      setError('Failed to delete note.');
    }
    setLoading(false);
  };
  // Category select
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSearch('');
  };
  // Search
  const handleSearchChange = (txt) => setSearch(txt);
  const handleSearchClear = () => setSearch('');
  
  // Cancel out of editor modal
  const handleCancelEditor = () => {
    setShowEditor(false);
    setEditingNote(null);
  };

  return (
    <div className="notes-app-container">
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <TopBar
        onAddNote={handleAddNote}
        searchValue={search}
        onSearchChange={handleSearchChange}
        isSearching={!!search}
        onSearchClear={handleSearchClear}
      />
      <div className="notes-layout">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />
        <main className="notes-main">
          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading-message">Loading…</div>}

          {!showEditor && (
            <NotesList
              notes={notes}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          )}
          {showEditor && (
            <NoteEditor
              key={editingNote?.id || 'new-note'}
              note={editingNote}
              onSave={handleSaveNote}
              onCancel={handleCancelEditor}
              categories={categories}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
