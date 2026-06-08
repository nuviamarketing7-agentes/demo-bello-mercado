import React from 'react';
export function BackToTop({ showBackToTop }) {
  if (!showBackToTop) return null;
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="back-to-top-btn fade-in"
      style={{ position: 'fixed', bottom: '80px', right: '20px', width: '45px', height: '45px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', border: 'none', cursor: 'pointer', zIndex: 999, boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}
      aria-label="Volver arriba"
    >
      ↑
    </button>
  );
}
