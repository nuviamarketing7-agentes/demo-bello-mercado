const assert = require('assert');

let cart = [];
let formData = { name: '', address: '', phone: '' };

const actions = [
  { action: 'add_to_cart', product_id: 1, qty: 2 },
  { action: 'fill_checkout_form', name: 'Pepe' },
  { action: 'submit_order' }
];

const PRODUCTS = [{ id: 1, name: 'Asado', price: 100 }];

let currentCart = [...cart];
let currentForm = { ...formData };
let shouldSubmit = false;

actions.forEach(act => {
  switch (act.action) {
    case 'add_to_cart': {
      const product = PRODUCTS.find(p => p.id === Number(act.product_id));
      if (product) {
        const qty = Number(act.qty) || 1;
        // mock addToCart
        const existing = cart.find(item => item.id === product.id);
        if (existing) cart = cart.map(item => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
        else cart = [...cart, { ...product, qty }];
        
        const existingIndex = currentCart.findIndex(item => item.id === product.id);
        if (existingIndex > -1) {
          currentCart[existingIndex] = {
            ...currentCart[existingIndex],
            qty: currentCart[existingIndex].qty + qty
          };
        } else {
          currentCart.push({ ...product, qty });
        }
      }
      break;
    }
    case 'fill_checkout_form':
      currentForm = { ...currentForm, name: act.name };
      break;
    case 'submit_order':
      shouldSubmit = true;
      break;
  }
});

console.log('cart state (mocked react update):', cart);
console.log('currentCart (for submit):', currentCart);
console.log('currentForm:', currentForm);
console.log('shouldSubmit:', shouldSubmit);
