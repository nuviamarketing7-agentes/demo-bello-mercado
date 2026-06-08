export function Cart({
  isCartOpen, setIsCartOpen, isCheckout, setIsCheckout,
  cart, updateQty, addToCart, cartTotal, hasCrossSell,
  crossSellProduct, formData, handleInputChange, handleCheckout
}) {
  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={(e) => {
      if (e.target.className === 'cart-overlay') setIsCartOpen(false);
    }}>
      <aside className="cart-sidebar">
        <div className="cart-header">
          <h2>{isCheckout ? 'Finalizar Pedido' : 'Tu Pedido'}</h2>
          <button className="close-btn" aria-label="Cerrar carrito" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        {!isCheckout ? (
          <>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">Tu carrito está vacío.</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.emoji} {item.name}</div>
                      <div className="cart-item-price">${item.price} c/u · Total: ${item.price * item.qty}</div>
                    </div>
                    <div className="cart-item-actions">
                      <button className="qty-btn" aria-label="Restar" onClick={() => updateQty(item.id, -1)}>-</button>
                      <span className="item-qty">{item.qty}</span>
                      <button className="qty-btn" aria-label="Sumar" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                {!hasCrossSell && crossSellProduct && (
                  <div className="cross-sell-banner">
                    <p>🔥 ¿Te falta algo para el asado?</p>
                    <button className="cross-sell-btn" onClick={() => addToCart(crossSellProduct)}>
                      + {crossSellProduct.name} (${crossSellProduct.price})
                    </button>
                  </div>
                )}
                <div className="cart-total">
                  <span>Total:</span>
                  <span>${cartTotal}</span>
                </div>
                <button className="checkout-btn" onClick={() => setIsCheckout(true)}>
                  Continuar al Envío →
                </button>
              </div>
            )}
          </>
        ) : (
          <form className="checkout-form" onSubmit={handleCheckout}>
            <button type="button" className="back-btn" onClick={() => setIsCheckout(false)}>
              ← Volver al carrito
            </button>

            <div className="form-group">
              <label htmlFor="name">Nombre Completo</label>
              <input id="name" required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ej. Juan Pérez" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección de Envío</label>
              <input id="address" required type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Calle, Número (Solymar)" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input id="phone" required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="09X XXX XXX" />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Pago al recibir</label>
              <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                <option value="efectivo">Efectivo</option>
                <option value="debito">Tarjeta de Débito</option>
                <option value="credito">Tarjeta de Crédito</option>
              </select>
            </div>
            {formData.paymentMethod === 'efectivo' && (
              <div className="form-group fade-in">
                <label htmlFor="cashAmount">¿Con cuánto abonas? (Para el cambio)</label>
                <input id="cashAmount" type="number" name="cashAmount" value={formData.cashAmount} onChange={handleInputChange} placeholder="Ej. 1000" />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="notes">Notas (Opcional)</label>
              <textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Instrucciones de preparación, timbre, etc." rows="2"></textarea>
            </div>
            <div className="cart-total" style={{ marginTop: '1rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
              <span>A Pagar:</span>
              <span>${cartTotal}</span>
            </div>
            <button type="submit" className="submit-btn">
              Confirmar por WhatsApp 💬
            </button>
          </form>
        )}
      </aside>
    </div>
  );
}
