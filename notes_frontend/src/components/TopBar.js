import React from "react";

// PUBLIC_INTERFACE
/**
 * TopBar component: displays app title, add note button, and search field.
 */
function TopBar({
  onAddNote,
  searchValue,
  onSearchChange,
  isSearching,
  onSearchClear,
}) {
  return (
    <header className="topbar">
      <div className="topbar-title">Notes</div>
      <div className="topbar-actions">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search notes…"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search notes"
          />
          {isSearching && (
            <button className="clear-search-btn" onClick={onSearchClear} title="Clear search">
              ×
            </button>
          )}
        </div>
        <button className="add-btn" onClick={onAddNote} title="Add Note">
          +
        </button>
      </div>
    </header>
  );
}

export default TopBar;
