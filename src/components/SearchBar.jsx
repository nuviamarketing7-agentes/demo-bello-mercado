import React from 'react';
export function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-bar-container" style={{ margin: '1rem 0', display: 'flex', justifyContent: 'center' }}>
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Buscar productos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '100%', maxWidth: '600px', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '1rem' }}
      />
    </div>
  );
}
