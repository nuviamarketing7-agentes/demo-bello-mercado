import { useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '../data.js';

const MAIN_CATEGORIES = CATEGORIES.slice(0, 5);
const EXTRA_CATEGORIES = CATEGORIES.slice(5);

export function CategoryNav({ activeCategory, setActiveCategory, setSearchQuery }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isDropdownOpen) return;

    function handleDropdownClose(event) {
      if (event.type === 'mousedown') {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      } else if (event.type === 'keydown') {
        if (event.key === 'Escape') {
          setIsDropdownOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleDropdownClose);
    document.addEventListener('keydown', handleDropdownClose);
    return () => {
      document.removeEventListener('mousedown', handleDropdownClose);
      document.removeEventListener('keydown', handleDropdownClose);
    };
  }, [isDropdownOpen]);

  const isExtraActive = EXTRA_CATEGORIES.some(cat => cat.id === activeCategory);

  return (
    <nav className="category-nav" aria-label="Categorías de productos">
      {MAIN_CATEGORIES.map(cat => (
        <button
          key={cat.id}
          className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
          onClick={() => {
            setActiveCategory(cat.id);
            setSearchQuery('');
            setIsDropdownOpen(false);
          }}
        >
          <span role="img" aria-hidden="true">{cat.emoji}</span> {cat.label}
        </button>
      ))}

      <div className="category-dropdown-wrapper" ref={dropdownRef}>
        <button
          className={`cat-tab dropdown-toggle ${isExtraActive ? 'active' : ''}`}
          onClick={() => setIsDropdownOpen(prev => !prev)}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          Más {isExtraActive ? `(${CATEGORIES.find(c => c.id === activeCategory)?.label})` : ''} ▼
        </button>

        {isDropdownOpen && (
          <div className="category-dropdown glass-panel fade-in">
            {EXTRA_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`dropdown-item ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                  setIsDropdownOpen(false);
                }}
              >
                <span role="img" aria-hidden="true">{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
