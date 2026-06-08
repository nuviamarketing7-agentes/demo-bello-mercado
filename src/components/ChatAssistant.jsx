export function ChatAssistant({
  isChatOpen, setIsChatOpen, chatMessages, chatInput, setChatInput,
  isChatLoading, handleChatSend, handleChatKeyDown, chatEndRef, chatInputRef
}) {
  const renderMd = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i}>{part.slice(1, -1)}</em>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {isChatOpen && (
        <div className="chat-window glass-panel fade-in">
          <div className="chat-window-header">
            <div className="chat-title">
              <span className="chat-avatar">🤖</span>
              <div>
                <strong>Asistente Bello Mercado</strong>
                <span className="chat-status">● En línea</span>
              </div>
            </div>
            <button className="close-btn" aria-label="Cerrar chat" onClick={() => setIsChatOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.role}`}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} style={{ margin: '0.2rem 0' }}>{renderMd(line)}</p>
                ))}
              </div>
            ))}
            {isChatLoading && (
              <div className="chat-bubble assistant">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-chips" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem', overflowX: 'auto', background: 'var(--surface-color)', borderTop: '1px solid var(--border-color)' }}>
            <button style={{ padding: '0.3rem 0.6rem', borderRadius: '1rem', border: '1px solid var(--primary-color)', background: 'transparent', color: 'var(--primary-color)', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.8rem' }} onClick={() => handleChatSend("Mostrame las ofertas")}>🔥 Ofertas</button>
            <button style={{ padding: '0.3rem 0.6rem', borderRadius: '1rem', border: '1px solid var(--primary-color)', background: 'transparent', color: 'var(--primary-color)', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.8rem' }} onClick={() => handleChatSend("Agregá 1kg de Asado")}>🥩 Asado</button>
            <button style={{ padding: '0.3rem 0.6rem', borderRadius: '1rem', border: '1px solid var(--primary-color)', background: 'transparent', color: 'var(--primary-color)', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.8rem' }} onClick={() => handleChatSend("Quiero finalizar compra")}>🛒 Finalizar compra</button>
          </div>
          <div className="chat-input-row">
            <input
              ref={chatInputRef}
              type="text"
              className="chat-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleChatKeyDown}
              placeholder="Ej: ¿Tienen asado? o Mostrame bebidas..."
              disabled={isChatLoading}
            />
            <button
              className="chat-send-btn"
              onClick={handleChatSend}
              disabled={!chatInput.trim() || isChatLoading}
              aria-label="Enviar mensaje"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        className="chat-fab"
        aria-label={isChatOpen ? 'Cerrar chat' : 'Abrir chat'}
        onClick={() => setIsChatOpen(prev => !prev)}
      >
        {isChatOpen ? '✕' : '💬'}
      </button>
    </>
  );
}
