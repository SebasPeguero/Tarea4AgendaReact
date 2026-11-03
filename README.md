# Tarea 4: Agenda React

Aplicación web desarrollada para la materia **Programación Web** en el **Instituto Tecnológico de Las Américas (ITLA)**, implementando una agenda de contactos mediante la librería **React**, arquitectura de componentes desacoplados y consumo de servicios REST mediante `fetch`.

---

## 👤 Información del Estudiante

- **Nombre:** Sebastian Peguero
- **Matrícula:** 20251172
- **Asignatura:** Programación Web
- **Profesor:** Raydelto Hernández
- **Asignación:** Tarea 4 - Agenda React (8 puntos)

---

## 🏛️ Jerarquía de Componentes en React

Conforme al mandato de la tarea, la solución se compone de dos componentes hijos contenidos dentro de un componente padre:

```
┌──────────────────────────────────────────────────────────────────┐
│  Componente Padre: <App />                                       │
│  - Orquestador del estado principal (contactos, carga, avisos)   │
│  - Invocación de servicios y recarga reactiva tras inserción     │
└────────────────────────────────┬─────────────────────────────────┘
                                 │
         ┌───────────────────────┴───────────────────────┐
         │                                               │
┌────────▼───────────────────────┐       ┌───────────────▼────────────────┐
│  Hijo 1: <ContactForm />       │       │  Hijo 2: <ContactList />       │
│  - Formulario de nuevo contacto│       │  - Renderizado de tarjetas     │
│  - Formato automático teléfono │       │  - Búsqueda y filtrado en vivo │
│  - Captura y validaciones      │       │  - Estado vacío e indicadores  │
└────────────────────────────────┘       └────────────────────────────────┘
```

### Descripción de Componentes:

1. **Componente Padre (`<App />`):**
   - Contenedor raíz que aloja el estado compartido (`contacts`, `isLoading`, `isSubmitting`, `toast`).
   - Carga la lista inicial mediante `useEffect` consumiendo el servicio de datos.
   - Provee la función `handleAddContact` como prop a `ContactForm` para sincronizar automáticamente el listado tras una inserción exitosa.

2. **Componente para Agregar Contactos (`<ContactForm />`):**
   - Maneja el formulario con inputs controlados para `nombre`, `apellido` y `telefono`.
   - Incorpora formateo automático del teléfono con guiones (`829-302-0445`) y prefijo internacional (`+1-829-302-0445`).
   - Bloquea reenvíos duplicados con indicador de carga (*spinner*) en el botón de envío.

3. **Componente para Mostrar el Listado (`<ContactList />`):**
   - Recibe la lista de contactos vía *props* y renderiza tarjetas dinámicas con avatares de iniciales y enlaces telefónicos directos.
   - Cuenta con una barra de búsqueda en tiempo real que filtra por nombre, apellido o teléfono sin recargar la página.
   - Incluye botón de refresco y estados claros para carga o lista vacía.

4. **Capa de Servicios (`AgendaService`):**
   - Módulo independiente que encapsula las peticiones HTTP (`GET` y `POST`) hacia el backend en formato JSON.

---

## 💎 Principios de Buenas Prácticas Aplicados

- **SOLID:**
  - **S (Single Responsibility):** Cada componente y servicio tiene un único propósito definido.
  - **O (Open/Closed):** El servicio de datos puede extenderse sin modificar la lógica interna de los componentes.
  - **D (Dependency Inversion):** Los componentes hijos interactúan con la capa de datos mediante callbacks y props suministrados por el componente padre.
- **DRY (Don't Repeat Yourself):**
  - La lógica de formateo y sanitización de números telefónicos está encapsulada.
  - Un único origen de la verdad (*single source of truth*) para los datos de contactos en el componente padre.
- **KISS (Keep It Simple, Stupid):**
  - Implementación con React Hooks estándar (`useState`, `useEffect`, `useCallback`, `useMemo`).
  - Sin dependencias redundantes ni librerías pesadas.

---

## 🌐 Endpoint del Servicio Web

- **URL:** `http://www.raydelto.org/agenda.php`
- **Método HTTP GET:** Obtiene todos los contactos guardados en formato JSON.
- **Método HTTP POST:** Envía un JSON con `{ "nombre": "...", "apellido": "...", "telefono": "..." }` para agregar un nuevo contacto.

---

## 📁 Estructura del Repositorio

```text
Tarea4AgendaReact/
├── index.html                   # Documento HTML5 y montaje de la aplicación React
├── README.md                    # Documentación técnica requerida por el profesor
├── .gitignore                   # Exclusiones de control de versiones
├── jojo-logo.jpg                # Logo distintivo de la aplicación
├── css/
│   └── styles.css               # Hoja de estilos CSS3 en su directorio correspondiente
└── js/
    ├── services/
    │   └── AgendaService.js     # Capa de comunicación HTTP (GET y POST)
    └── components/
        ├── ContactForm.jsx      # Componente: Formulario de nuevos contactos
        ├── ContactList.jsx      # Componente: Listado de contactos y búsqueda
        └── App.jsx              # Componente: Padre contenedor
```

---

## 🚀 Despliegue y Ejecución

1. **En línea (GitHub Pages):**
   - [Enlace a GitHub Pages](https://sebaspeguero.github.io/Tarea4AgendaReact/)
2. **Localmente:**
   - Clone el repositorio:
     ```bash
     git clone https://github.com/SebasPeguero/Tarea4AgendaReact.git
     ```
   - Abra el archivo `index.html` en cualquier navegador web moderno.
