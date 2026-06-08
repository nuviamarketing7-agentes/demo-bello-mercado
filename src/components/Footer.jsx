export function Footer() {
  return (
    <footer className="footer" style={{ padding: '2rem 1rem', background: 'var(--surface-color)', marginTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
      <div className="container footer-content" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', textAlign: 'left', marginBottom: '1rem' }}>
        <div>
          <h4>📍 Bello Mercado</h4>
          <p>Rambla Costanera<br/>Solymar, Ciudad de la Costa</p>
        </div>
        <div>
          <h4>📞 Contacto</h4>
          <p>Tel: 2681 3030<br/>WhatsApp: 093 635 208</p>
        </div>
        <div>
          <h4>⏰ Horarios</h4>
          <p>Lunes a Sábados: 08:00 - 22:00<br/>Domingos: 08:00 - 15:00</p>
        </div>
      </div>
      <div className="container footer-text" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', color: 'var(--text-color)' }}>
        <p>© 2026 Bello Mercado. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
