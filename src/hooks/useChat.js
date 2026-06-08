import { useState, useRef, useEffect } from 'react';
import { PRODUCTS } from '../data.js';

const SYSTEM_PROMPT = `Eres el asistente virtual de "Bello Mercado", un mercado ubicado en Solymar, Ciudad de la Costa, Uruguay (Tel: +598 2681 3030). 
Ayudás a los clientes con información sobre productos, precios y pedidos, y también podés gestionar su carrito y navegación. El negocio hace envíos a domicilio y el pago es contra entrega (Efectivo, Débito o Crédito).

CATÁLOGO COMPLETO (Usa estrictamente estos IDs para agregar productos):
${PRODUCTS.map(p => `- ID: ${p.id} | ${p.name} ($${p.price}/${p.unit}) [Categoría: ${p.category}]`).join('\n')}

INSTRUCCIONES DE ACCIÓN:
Puedes realizar acciones directas en la interfaz del usuario devolviendo al final de tu respuesta un bloque JSON exacto precedido por "ACTIONS_JSON:".
El bloque JSON debe ser una lista/array de una o más acciones que se ejecutarán en orden.
Ejemplo: ACTIONS_JSON:[{"action":"add_to_cart","product_id":1,"qty":2}]

Acciones disponibles y sus parámetros:
1. Filtrar catálogo:
   {"action":"filter","query":"término"} -> Úsalo para buscar productos o categorías. Si quieren ver todo o limpiar filtros, usa query vacía "".
2. Añadir al carrito:
   {"action":"add_to_cart","product_id":ID,"qty":N} -> Añade N unidades del producto con el ID especificado al carrito.
3. Abrir o cerrar el carrito:
   {"action":"open_cart"} o {"action":"close_cart"}
4. Ir a la pantalla de envío/checkout:
   {"action":"start_checkout"}
5. Rellenar formulario de checkout:
   {"action":"fill_checkout_form","name":"Nombre","address":"Dirección","phone":"Teléfono","paymentMethod":"efectivo|debito|credito","cashAmount":"monto_efectivo_opcional"}
   -> Completa sólo los campos que el usuario te indique. Si no conoces algún valor, no lo envíes.
6. Confirmar pedido / Finalizar compra:
   {"action":"submit_order"} -> Envía el pedido y abre WhatsApp. Úsalo cuando el usuario te pida finalizar la compra, confirmar el pedido, o comprar.

REGLA DE TIEMPO REAL (CRÍTICA):
Todas las acciones que agregues en ACTIONS_JSON se ejecutan de manera INSTANTÁNEA en la pantalla del usuario en cuanto le llega tu mensaje. Por lo tanto:
- NUNCA uses frases de espera como "un momento", "esperá que agrego...", "dame un segundo", "procesando...", "aguardá..." o similares.
- Responde SIEMPRE en presente o pasado indicando que la acción YA fue realizada (ej. "¡Listo! Ya te agregué el Asado al carrito." o "Ahí te abrí el carrito para que lo revises.").

REGLAS CRÍTICAS:
1. Si el usuario te pide agregar un producto (ej. "agregame 2kg de asado de tira"), debes:
   - Identificar el producto en el catálogo (Asado de Tira = ID 1).
   - Indicar amigablemente que lo agregaste (ej. "¡Listo! Ya agregué 2kg de Asado de Tira al carrito.").
   - Devolver ACTIONS_JSON:[{"action":"add_to_cart","product_id":1,"qty":2}] al final del mensaje.
2. Si el usuario te da sus datos de entrega/pago, debes rellenar el formulario. Ejemplo: "Me llamo Juan, vivo en Calle 3 y pago con débito" -> responde confirmando (ej. "Perfecto Juan, ya tomé tu dirección y método de pago.") y añade ACTIONS_JSON:[{"action":"fill_checkout_form","name":"Juan","address":"Calle 3","paymentMethod":"debito"}]
3. Si el usuario quiere comprar o finalizar, primero revisa si ya tienes los datos (Nombre, Dirección, Teléfono). Si no los tienes, solicítalos amigablemente. Si ya los tienes o el usuario los ingresó, abre checkout y ejecuta: ACTIONS_JSON:[{"action":"submit_order"}].
4. Siempre mantén una actitud amable, profesional y usa español de Uruguay (rioplatense, voseo si es natural).
5. Sé conciso. No inventes productos ni precios que no estén en el catálogo.
6. Si el usuario te consulta sobre la disponibilidad, stock o existencia de algún tipo de producto (ej. "¿tienen queso?", "¿hay cerveza?", "¿qué cortes de carne tenés?"), DEBES filtrar el catálogo para mostrar la selección correspondiente en la pantalla del usuario. Responde indicando lo que hay disponible y devuelve al final ACTIONS_JSON:[{"action":"filter","query":"término"}] (por ejemplo, query: "queso" o "cerveza" o "carniceria").`;

export function useChat({ 
  addToCart, 
  cart, 
  executeCheckout, 
  isCartOpen, 
  setIsCartOpen, 
  isCheckout, 
  setIsCheckout, 
  formData, 
  setFormData, 
  setSearchQuery, 
  setActiveCategory, 
  productsRef 
}) {
  const [isChatOpen, setIsChatOpen] = useState(window.innerWidth > 500);
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('chatMessages');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { role: 'assistant', content: '¡Hola! Soy el asistente virtual de **Bello Mercado** 🥩\n\nEstoy aquí para ayudarte en todo lo que necesites. Puedo **buscar productos**, **agregarlos directamente al carrito** por vos, o **guiarte en la navegación** de la página (como abrir el carrito, ir al checkout y confirmar el pedido).\n\n¿En qué puedo ayudarte hoy? ¡Probá decirme *"Agregá 2kg de asado al carrito"* o *"Mostrame las bebidas"*!', rawContent: '¡Hola! Soy el asistente virtual de **Bello Mercado** 🥩\n\nEstoy aquí para ayudarte en todo lo que necesites. Puedo **buscar productos**, **agregarlos directamente al carrito** por vos, o **guiarte en la navegación** de la página (como abrir el carrito, ir al checkout y confirmar el pedido).\n\n¿En qué puedo ayudarte hoy? ¡Probá decirme *"Agregá 2kg de asado al carrito"* o *"Mostrame las bebidas"*!' }
    ];
  });
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    if (!isChatLoading && isChatOpen && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [isChatLoading, isChatOpen]);

  const handleChatSend = async (textOverride) => {
    const userMsg = (typeof textOverride === 'string' ? textOverride : chatInput).trim();
    if (!userMsg || isChatLoading) return;
    if (typeof textOverride !== 'string') setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg, rawContent: userMsg }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...chatMessages.map(m => ({ role: m.role, content: m.rawContent || m.content })),
            { role: 'user', content: userMsg }
          ]
        })
      });

      const data = await response.json();
      const fullContent = data.choices?.[0]?.message?.content || 'Lo siento, no pude procesar tu consulta.';

      let cleanContent = fullContent;
      let actions = [];

      try {
        const arrayRegex = /(?:ACTIONS_JSON:\s*)?(?:```(?:json)?\s*)?(\[[\s\S]*?\])(?:\s*```)?/;
        const arrayMatch = fullContent.match(arrayRegex);
        
        let parsedArray = false;
        if (arrayMatch) {
          try {
            const parsed = JSON.parse(arrayMatch[1]);
            if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].action) {
              actions = parsed;
              cleanContent = fullContent.replace(arrayMatch[0], '').trim();
              parsedArray = true;
            }
          } catch { }
        }

        if (!parsedArray) {
          const objectRegex = /\{[^{]*?"action"\s*:\s*"[^"]+"[^}]*?\}/g;
          const matches = fullContent.match(objectRegex);
          if (matches) {
            matches.forEach(match => {
              try {
                const parsed = JSON.parse(match);
                if (parsed && parsed.action) {
                  actions.push(parsed);
                  cleanContent = cleanContent.replace(match, '');
                }
              } catch { }
            });
            cleanContent = cleanContent.replace(/ACTIONS_JSON:/g, '')
                                       .replace(/```json/g, '')
                                       .replace(/```/g, '')
                                       .replace(/[[\]]/g, '')
                                       .replace(/,\s*,/g, ',')
                                       .replace(/^[\s,]+|[\s,]+$/g, '')
                                       .trim();
          }
        }
      } catch (err) {
        console.error("Error parsing actions:", err);
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: cleanContent, rawContent: fullContent }]);

      if (actions && actions.length > 0) {
        let currentForm = { ...formData };
        let currentCart = [...cart]; 
        let shouldSubmit = false;
        let shouldOpenCart = isCartOpen;
        let shouldCheckout = isCheckout;

        actions.forEach(act => {
          switch (act.action) {
            case 'filter':
              setSearchQuery(act.query || '');
              setActiveCategory('todo');
              setTimeout(() => {
                productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
              break;
              
            case 'add_to_cart': {
              const product = PRODUCTS.find(p => p.id === Number(act.product_id));
              if (product) {
                const qty = Number(act.qty) || 1;
                addToCart(product, qty);
                
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
              
            case 'open_cart':
              shouldOpenCart = true;
              shouldCheckout = false;
              break;
              
            case 'close_cart':
              shouldOpenCart = false;
              break;
              
            case 'start_checkout':
              shouldOpenCart = true;
              shouldCheckout = true;
              break;
              
            case 'fill_checkout_form':
              currentForm = {
                ...currentForm,
                name: act.name !== undefined && act.name !== null ? act.name : currentForm.name,
                address: act.address !== undefined && act.address !== null ? act.address : currentForm.address,
                phone: act.phone !== undefined && act.phone !== null ? act.phone : currentForm.phone,
                paymentMethod: act.paymentMethod !== undefined && act.paymentMethod !== null ? act.paymentMethod : currentForm.paymentMethod,
                cashAmount: act.cashAmount !== undefined && act.cashAmount !== null ? act.cashAmount : currentForm.cashAmount,
              };
              setFormData(currentForm);
              break;
              
            case 'submit_order':
              shouldSubmit = true;
              break;

            default:
              console.warn("Acción desconocida:", act.action);
          }
        });

        if (shouldOpenCart !== isCartOpen) setIsCartOpen(shouldOpenCart);
        if (shouldCheckout !== isCheckout) setIsCheckout(shouldCheckout);

        if (shouldSubmit) {
          if (currentCart.length === 0) {
            setChatMessages(prev => [...prev, {
              role: 'assistant',
              content: '🛒 Tu carrito está vacío. ¡Agregá algunos productos antes de confirmar el pedido!'
            }]);
          } else if (!currentForm.name || !currentForm.address || !currentForm.phone) {
            setChatMessages(prev => [...prev, {
              role: 'assistant',
              content: '⚠️ Para finalizar el pedido, necesito que completes tus datos (Nombre, Dirección y Teléfono). Podés decírmelos por acá o completarlos manualmente en el formulario.'
            }]);
          } else {
            executeCheckout(currentForm, currentCart);
          }
        }
      }

    } catch {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Hubo un error al conectar con el asistente. Por favor, intentá de nuevo.'
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleChatKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSend();
    }
  };

  return {
    isChatOpen, setIsChatOpen,
    chatMessages,
    chatInput, setChatInput,
    isChatLoading,
    chatEndRef, chatInputRef,
    handleChatSend, handleChatKeyDown
  };
}
