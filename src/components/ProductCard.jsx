import React, { useState } from 'react';

const categoryImageMap = {
  bebidas: '/images/beverages.png',
  carniceria: '/images/meat.png',
  cerdo: '/images/pork.png',
  congelados: '/images/frozen.png',
  envasados: '/images/packaged.png',
  fiambreria: '/images/deli.png',
  higiene: '/images/hygiene.png',
  lacteos: '/images/dairy.png',
  lenya: '/images/charcoal.png',
  limpieza: '/images/cleaning.png',
  panaderia: '/images/bakery.png',
  pescados: '/images/fish.png',
  pollos: '/images/poultry.png',
  verduras: '/images/vegetables.png',
};

export const ProductCard = React.memo(function ProductCard({ product, addToCart }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="product-card glass-panel">
      {/* Product Badges */}
      {(product.id === 1 || product.id === 3 || product.id === 6 || product.id === 35) && (
        <span className="product-badge premium">Premium</span>
      )}
      {(product.id === 12 || product.id === 21 || product.id === 125) && (
        <span className="product-badge casero">Casero</span>
      )}
      {(product.id === 77 || product.id === 157 || product.id === 57) && (
        <span className="product-badge oferta">Oferta</span>
      )}

      <div className="product-image-placeholder">
        <img src={categoryImageMap[product.category]} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">
          ${product.price}
          <span className="product-unit">/{product.unit}</span>
        </div>
        <div className="product-actions" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1rem' }}>
          <div className="qty-selector" style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-color)', borderRadius: 'var(--radius-sm)' }}>
            <button style={{ padding: '0.2rem 0.5rem', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-color)' }} onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
            <span style={{ padding: '0 0.5rem', minWidth: '1.5rem', textAlign: 'center', color: 'var(--text-color)' }}>{qty}</span>
            <button style={{ padding: '0.2rem 0.5rem', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-color)' }} onClick={() => setQty(q => q + 1)}>+</button>
          </div>
          <button className="add-btn" style={{ flex: 1, margin: 0 }} onClick={() => addToCart(product, qty)}>
            + Agregar
          </button>
        </div>
      </div>
    </div>
  );
});
