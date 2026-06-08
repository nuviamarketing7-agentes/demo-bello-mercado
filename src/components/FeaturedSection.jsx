import React from 'react';
import { PRODUCTS } from '../data.js';
import { ProductCard } from './ProductCard.jsx';

export function FeaturedSection({ searchQuery, activeCategory, addToCart }) {
  if (searchQuery || activeCategory !== 'todo') return null;
  return (
    <section className="featured-section" style={{ marginBottom: '2rem' }}>
      <div className="section-header">
        <h2 className="section-title">⭐ Productos Destacados</h2>
      </div>
      <div className="products-grid">
        {PRODUCTS.filter(p => [1, 3, 6, 35].includes(p.id)).map(product => (
          <ProductCard key={`featured-${product.id}`} product={product} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}
