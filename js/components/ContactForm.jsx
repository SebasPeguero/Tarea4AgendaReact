function ContactForm({ onAddContact, isSubmitting }) {
  const [nombre, setNombre] = React.useState('');
  const [apellido, setApellido] = React.useState('');
  const [telefono, setTelefono] = React.useState('');

  const formatPhoneNumber = (value) => {
    if (!value) return '';
    const startsWithPlus = value.trim().startsWith('+');
    let digits = value.replace(/\D/g, '');
    if (!digits) return startsWithPlus ? '+' : '';
    if (digits.length > 11) digits = digits.substring(0, 11);

    if (digits.length === 11 || (startsWithPlus && digits.length > 3)) {
      const country = digits.charAt(0);
      const p1 = digits.substring(1, 4);
      const p2 = digits.substring(4, 7);
      const p3 = digits.substring(7);
      let formatted = `+${country}`;
      if (p1) formatted += `-${p1}`;
      if (p2) formatted += `-${p2}`;
      if (p3) formatted += `-${p3}`;
      return formatted;
    }

    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.substring(0, 3)}-${digits.substring(3)}`;
    } else {
      return `${digits.substring(0, 3)}-${digits.substring(3, 6)}-${digits.substring(6)}`;
    }
  };

  const handlePhoneChange = (e) => {
    setTelefono(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onAddContact({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      telefono: telefono.trim()
    });

    if (success) {
      setNombre('');
      setApellido('');
      setTelefono('');
    }
  };

  return (
    <aside className="form-panel">
      <div className="panel-header">
        <h2 className="panel-title">Nuevo Contacto</h2>
        <p className="panel-description">Ingrese los datos para almacenar en la agenda remota.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="inputNombre" className="form-label">Nombre</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <input
              type="text"
              id="inputNombre"
              className="form-input"
              placeholder="Ej. Sebastian"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputApellido" className="form-label">Apellido</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </span>
            <input
              type="text"
              id="inputApellido"
              className="form-input"
              placeholder="Ej. Peguero"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputTelefono" className="form-label">Teléfono</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </span>
            <input
              type="tel"
              id="inputTelefono"
              className="form-input"
              placeholder="Ej. 829-302-0445"
              value={telefono}
              onChange={handlePhoneChange}
              required
              autoComplete="off"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <React.Fragment>
              <span className="btn-spinner"></span>
              <span>Guardando...</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Agregar Contacto</span>
            </React.Fragment>
          )}
        </button>
      </form>
    </aside>
  );
}
