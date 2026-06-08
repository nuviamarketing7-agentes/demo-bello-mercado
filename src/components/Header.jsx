export function Header({ cartItemsCount, badgeAnim, setIsCartOpen }) {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <span role="img" aria-label="carne" className="icon">🥩</span> Bello Mercado
        </div>
        <div className="header-actions">
          <button className="cart-icon" aria-label="Abrir carrito" onClick={() => setIsCartOpen(true)}>
            <span role="img" aria-label="carrito">🛒</span>
            {cartItemsCount > 0 && (
              <span className={`cart-badge ${badgeAnim}`}>{cartItemsCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
