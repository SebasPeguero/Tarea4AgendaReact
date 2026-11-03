function ContactList({ contacts, isLoading, onRefresh }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredContacts = React.useMemo(() => {
    if (!searchTerm.trim()) {
      return contacts;
    }
    const term = searchTerm.toLowerCase().trim();
    return contacts.filter((c) => {
      const n = (c.nombre || '').toLowerCase();
      const a = (c.apellido || '').toLowerCase();
      const t = (c.telefono || '').toLowerCase();
      return n.includes(term) || a.includes(term) || t.includes(term);
    });
  }, [contacts, searchTerm]);

  return (
    <section className="directory-panel">
      <div className="directory-controls">
        <div className="search-box">
          <span className="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="search"
            className="search-input"
            placeholder="Buscar por nombre, apellido o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="directory-actions">
          <span className="badge-count">
            <span>Total:</span>
            <strong>{filteredContacts.length}</strong>
          </span>
          <button
            type="button"
            className="btn-icon"
            title="Refrescar contactos"
            onClick={() => {
              setSearchTerm('');
              onRefresh();
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Cargando contactos desde la agenda remota...</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <p>No se encontraron contactos en la agenda.</p>
        </div>
      ) : (
        <div className="contacts-grid">
          {filteredContacts.map((c, index) => {
            const nom = (c.nombre || '').trim();
            const ape = (c.apellido || '').trim();
            const tel = (c.telefono || '').trim();
            const inicialNom = nom ? nom.charAt(0).toUpperCase() : '?';
            const inicialApe = ape ? ape.charAt(0).toUpperCase() : '';
            const cleanPhone = tel.replace(/\s+/g, '');

            return (
              <article key={index} className="contact-card">
                <div className="contact-avatar">
                  {inicialNom}{inicialApe}
                </div>
                <div className="contact-info">
                  <h3 className="contact-name">{nom} {ape}</h3>
                  <a href={`tel:${cleanPhone}`} className="contact-phone">
                    <span className="phone-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </span>
                    <span>{tel || 'Sin teléfono'}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
