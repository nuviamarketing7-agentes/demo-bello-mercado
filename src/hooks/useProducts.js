import { useState, useMemo } from 'react';
import { PRODUCTS } from '../data.js';

export function useProducts() {
  const [activeCategory, setActiveCategory] = useState('todo');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'todo' || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredProducts
  };
}
