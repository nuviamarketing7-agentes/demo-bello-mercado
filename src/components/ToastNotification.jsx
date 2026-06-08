import React from 'react';
export function ToastNotification({ toastMessage }) {
  if (!toastMessage) return null;
  return (
    <div className="toast-notification fade-in" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'var(--success-color)', color: 'white', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', zIndex: 9999, boxShadow: 'var(--shadow-lg)', fontWeight: 'bold' }}>
      {toastMessage}
    </div>
  );
}
