export function HeroBanner() {
  return (
    <header className="hero-banner">
      <div className="hero-subtitle">Boutique de Carnes & Almacén Gourmet</div>
      <h1 className="hero-title">Bello Mercado</h1>
      <p style={{ color: 'var(--text-gray)', maxWidth: '650px', margin: '0 auto 1.5rem', fontSize: '1.05rem', fontFamily: 'var(--font-body)' }}>
        Los mejores cortes seleccionados, embutidos artesanales y delicatessen directo a tu puerta en Solymar.
      </p>
      <div className="hero-details">
        <div className="hero-detail-item">
          <span role="img" aria-label="ubicacion">📍</span> Rambla Costanera, Solymar
        </div>
        <div className="hero-detail-item">
          <span role="img" aria-label="reloj">⏰</span> Lun a Sáb: 9:00 a 20:00 | Dom: 9:00 a 14:00
        </div>
        <div className="hero-detail-item">
          <span role="img" aria-label="delivery">🛵</span> Envío a Domicilio Rápido
        </div>
      </div>
    </header>
  );
}
