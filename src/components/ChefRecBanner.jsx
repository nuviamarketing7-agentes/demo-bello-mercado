import React from 'react';
import { PRODUCTS } from '../data.js';

export function ChefRecBanner({ activeCategory, searchQuery, addToCart }) {
  if ((activeCategory !== 'todo' && activeCategory !== 'carniceria') || searchQuery) return null;
  return (
    <div className="chef-rec-banner fade-in">
      <div className="chef-rec-emoji">🥩</div>
      <div className="chef-rec-content">
        <span className="chef-rec-tag">Recomendación de la Casa</span>
        <h3 className="chef-rec-title">Asado de Tira Premium</h3>
        <p className="chef-rec-desc">
          Corte clásico con la grasa de cobertura justa y un marmoleado excepcional. Ideal para lucirte en la parrilla el fin de semana.
        </p>
      </div>
      <div className="chef-rec-action">
        <button onClick={() => addToCart(PRODUCTS.find(p => p.id === 1))}>
          + Agregar Asado ($390/kg)
        </button>
      </div>
    </div>
  );
}
