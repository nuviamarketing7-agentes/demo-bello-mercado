import { useRef, useState, useEffect } from 'react';
import './App.css';
import { PRODUCTS, CATEGORIES } from './data.js';

import { useProducts } from './hooks/useProducts.js';
import { useCart } from './hooks/useCart.js';
import { useChat } from './hooks/useChat.js';

import { Header } from './components/Header.jsx';
import { HeroBanner } from './components/HeroBanner.jsx';
import { CategoryNav } from './components/CategoryNav.jsx';
import { ProductCard } from './components/ProductCard.jsx';
import { Cart } from './components/Cart.jsx';
import { ChatAssistant } from './components/ChatAssistant.jsx';
import { Footer } from './components/Footer.jsx';
import { SearchBar } from './components/SearchBar.jsx';
import { FeaturedSection } from './components/FeaturedSection.jsx';
import { ToastNotification } from './components/ToastNotification.jsx';
import { BackToTop } from './components/BackToTop.jsx';
import { ChefRecBanner } from './components/ChefRecBanner.jsx';

export default function App() {
  const productsRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {
    activeCategory, setActiveCategory,
    searchQuery, setSearchQuery,
    filteredProducts
  } = useProducts();

  const {
    cart, setCart,
    isCartOpen, setIsCartOpen,
    isCheckout, setIsCheckout,
    badgeAnim,
    formData, setFormData,
    addToCart, updateQty,
    cartTotal, cartItemsCount,
    crossSellProduct, hasCrossSell,
    handleInputChange, handleCheckout, executeCheckout,
    toastMessage
  } = useCart();

  const {
    isChatOpen, setIsChatOpen,
    chatMessages,
    chatInput, setChatInput,
    isChatLoading,
    chatEndRef, chatInputRef,
    handleChatSend, handleChatKeyDown
  } = useChat({
    addToCart, cart, executeCheckout,
    isCartOpen, setIsCartOpen,
    isCheckout, setIsCheckout,
    formData, setFormData,
    setSearchQuery, setActiveCategory,
    productsRef
  });

  return (
    <div className="app-container">
      <Header cartItemsCount={cartItemsCount} badgeAnim={badgeAnim} setIsCartOpen={setIsCartOpen} />

      <main className="main-content container fade-in">
        <HeroBanner />

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <CategoryNav 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          setSearchQuery={setSearchQuery} 
        />

        {searchQuery && (
          <div className="search-indicator fade-in">
            <span>🔍 Resultados para: <strong>&quot;{searchQuery}&quot;</strong></span>
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              ✕ Limpiar búsqueda
            </button>
          </div>
        )}

        <ChefRecBanner activeCategory={activeCategory} searchQuery={searchQuery} addToCart={addToCart} />

        <FeaturedSection searchQuery={searchQuery} activeCategory={activeCategory} addToCart={addToCart} />

        <section className="products-section" ref={productsRef}>
          <div className="section-header">
            <h2 className="section-title">
              {CATEGORIES.find(c => c.id === activeCategory)?.emoji} {CATEGORIES.find(c => c.id === activeCategory)?.label}
            </h2>
            <span className="products-count">{filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results fade-in">
              <p>😕 No encontramos productos que coincidan con tu búsqueda.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('todo'); }}>Ver todos</button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Cart 
        isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}
        isCheckout={isCheckout} setIsCheckout={setIsCheckout}
        cart={cart} updateQty={updateQty} addToCart={addToCart}
        cartTotal={cartTotal} hasCrossSell={hasCrossSell}
        crossSellProduct={crossSellProduct} formData={formData}
        handleInputChange={handleInputChange} handleCheckout={handleCheckout}
      />

      <ChatAssistant 
        isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}
        chatMessages={chatMessages}
        chatInput={chatInput} setChatInput={setChatInput}
        isChatLoading={isChatLoading}
        handleChatSend={handleChatSend} handleChatKeyDown={handleChatKeyDown}
        chatEndRef={chatEndRef} chatInputRef={chatInputRef}
      />

      <ToastNotification toastMessage={toastMessage} />
      <BackToTop showBackToTop={showBackToTop} />

      <Footer />
    </div>
  );
}
