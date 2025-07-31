import React from "react";

// PUBLIC_INTERFACE
/**
 * Sidebar for categories navigation.
 * @param {Object} props
 * @param {string[]} props.categories
 * @param {string|null} props.selectedCategory
 * @param {function} props.onSelect
 */
function Sidebar({ categories, selectedCategory, onSelect }) {
  return (
    <nav className="sidebar">
      <div
        className={`sidebar-category${selectedCategory === null ? " active" : ""}`}
        onClick={() => onSelect(null)}
        tabIndex={0}
      >
        All Notes
      </div>
      {categories.map((cat) => (
        <div
          className={`sidebar-category${selectedCategory === cat ? " active" : ""}`}
          key={cat}
          onClick={() => onSelect(cat)}
          tabIndex={0}
        >
          {cat}
        </div>
      ))}
    </nav>
  );
}

export default Sidebar;
