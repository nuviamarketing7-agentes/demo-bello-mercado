import React from 'react';
export function BackToTop({ showBackToTop, isChatOpen }) {
  if (!showBackToTop) return null;
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="back-to-top-btn fade-in"
      style={{ 
        position: 'fixed', 
        bottom: isChatOpen ? 'calc(95px + 550px - 40px)' : '100px', 
        right: isChatOpen ? 'calc(2rem + 50px)' : '2rem', 
        width: '45px', 
        height: '45px', 
        borderRadius: '50%', 
        background: 'var(--primary-color)', 
        color: 'white', 
        border: 'none', 
        cursor: 'pointer', 
        zIndex: 999, 
        boxShadow: 'var(--shadow-md)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontSize: '1.5rem',
        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' 
      }}
      aria-label="Volver arriba"
    >
      ↑
    </button>
  );
}
