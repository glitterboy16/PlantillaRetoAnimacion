# Casa Tere

Web y **carta digital por QR** de **Casa Tere**, el restaurante de Nacho González en el
paseo de Playa Honda (Lanzarote). Pescado fresco y brasa a pie de playa.

- **Stack:** React + Vite · Supabase (contenido, fotos y acceso) · Vercel (hosting)
- Misma base funcional que El Bocadito, con diseño propio a partir del logo.

## Qué tiene

- **Pescado del día.** Una pizarra en la portada que Nacho rellena cada mañana:
  pescado, precio por kilo y estado (hay / últimas piezas / agotado). Lleva la fecha
  de la última actualización.
- **Abierto ahora / Cerrado.** El estado se calcula en directo con la hora de Canarias
  a partir del horario semanal, que también se edita desde la web.
- **Carta con accesos rápidos.** Barra fija con las categorías, pestaña de Bodega
  cuando hay vinos, exportación a PDF y generador de QR para las mesas.
- **Cinco idiomas.** Español, inglés, alemán, francés e italiano. Lo que Nacho escribe
  en español se traduce solo.
- **Modo edición sin código.** Se entra pulsando «Nacho González» en el pie de página.
  Desde ahí se editan carta, vinos, pizarra, galería, horario y teléfono.
- **Galería.** Nacho sube las fotos desde el móvil; mientras esté vacía no se muestra.
- **Páginas legales y aviso de cookies.**

## Arrancar en local

```bash
npm install
npm run dev        # http://localhost:5173
```

Sin `.env` la web funciona con el contenido de ejemplo y el modo edición queda
desactivado. Para conectarla, crea un `.env` (no se versiona):

```
VITE_SUPABASE_URL=https://<tu-proyecto>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

## Puesta en marcha de Supabase

1. Crear un proyecto nuevo en Supabase (no reutilizar el de El Bocadito).
2. Ejecutar `supabase/schema.sql` en el SQL Editor.
3. En Authentication, crear el usuario de Nacho con el email
   `<usuario>@acceso.casatere.local` y su contraseña. En la web solo escribirá `<usuario>`.

## Pendiente antes de publicar

- [ ] Carta real con precios (ahora hay una carta de ejemplo sin precios).
- [ ] Horario real (ahora pone 12:00–23:00 todos los días).
- [ ] Pescado del día real (los de la pizarra son ejemplos).
- [ ] Fotos para la galería.
- [ ] Datos fiscales del titular en `src/data/legal.js`.
- [ ] Dominio definitivo (en el aviso legal figura `casatere.es` como provisional).

## Estructura

```
src/
├── App.jsx / main.jsx       rutas: /, /carta, /aviso-legal, /privacidad, /cookies
├── pages/                   Home, Carta, Legal
├── components/              Nav, Footer, Mar (olas del hero), Estado, CookieBanner, shared
├── admin/                   AdminContext (Supabase), LoginModal, QrModal, exportarPdf
├── data/                    carta, casa (contacto, horario, pescado), galeria, legal
├── i18n/                    traducciones en 5 idiomas
├── lib/                     supabaseClient, horario, confirmar
└── styles/                  global.css (sistema de diseño) · components.css
```

## Diseño

- **Color:** el azul marino exacto del logo (`#021E50`), blanco espuma, arena clara y
  un único acento cálido, el sol del atardecer.
- **Tipografía:** Bodoni Moda para títulos y platos; Montserrat espaciada para etiquetas,
  como «RESTAURANTE» en el logo.
- **Firma visual:** las pinceladas de ola del logo se usan como separador de sección,
  y el hero tiene un mar animado con el mismo trazo.
