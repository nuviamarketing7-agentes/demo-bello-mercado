import { useState, useCallback } from 'react';
import { PRODUCTS } from '../data.js';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [badgeAnim, setBadgeAnim] = useState('');
  
  const [formData, setFormData] = useState({
    name: '', address: '', phone: '',
    paymentMethod: 'efectivo', notes: '', cashAmount: ''
  });
  const [toastMessage, setToastMessage] = useState('');

  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      return [...prev, { ...product, qty }];
    });
    setBadgeAnim('pop-anim');
    setToastMessage(`Agregaste ${qty} ${product.name} al carrito`);
    setTimeout(() => setBadgeAnim(''), 300);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newQty = item.qty + delta;
      return newQty > 0 ? { ...item, qty: newQty } : item;
    }).filter(item => item.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const crossSellProduct = PRODUCTS.find(p => p.name.includes('Leña') && p.name.includes('chica'));
  const hasCrossSell = cart.some(item => item.id === crossSellProduct?.id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeCheckout = (data, cartToSubmit = cart) => {
    const totalToSubmit = cartToSubmit.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Webhook for abandoned cart tracking
    fetch('https://n8n-n8n.bdfx4m.easypanel.host/webhook/bello-mercado-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'checkout_initiated', customer: data, cart: cartToSubmit, total: totalToSubmit })
    }).catch(() => {});

    // WhatsApp message
    let message = `¡Hola, equipo de Bello Mercado! 👋\nQuiero hacer el siguiente pedido:\n\n`;
    message += `🛒 *Mi Carrito:*\n`;
    cartToSubmit.forEach(item => {
      message += `- ${item.qty} ${item.unit} x ${item.name} ($${item.price * item.qty})\n`;
    });
    message += `💰 *Total a pagar:* $${totalToSubmit}\n\n`;
    message += `📍 *Mis Datos:*\n`;
    message += `Nombre: ${data.name}\n`;
    message += `Dirección: ${data.address}\n`;
    message += `Teléfono: ${data.phone}\n`;
    let paymentStr = data.paymentMethod.toUpperCase();
    if (data.paymentMethod === 'efectivo' && data.cashAmount) {
      paymentStr += ` (Abona con $${data.cashAmount})`;
    }
    message += `Pago: ${paymentStr}\n`;
    if (data.notes) message += `📝 Notas: ${data.notes}\n`;
    message += `\n¿Me confirman para cuándo quedaría la entrega, por favor? ¡Gracias! 🥩`;

    window.open(`https://wa.me/59893635208?text=${encodeURIComponent(message)}`, '_blank');
    setCart([]);
    setIsCartOpen(false);
    setIsCheckout(false);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    executeCheckout(formData);
  };

  return {
    cart, setCart,
    isCartOpen, setIsCartOpen,
    isCheckout, setIsCheckout,
    badgeAnim, setBadgeAnim,
    formData, setFormData,
    addToCart,
    updateQty,
    cartTotal,
    cartItemsCount,
    crossSellProduct,
    hasCrossSell,
    handleInputChange,
    executeCheckout,
    handleCheckout,
    toastMessage
  };
}
