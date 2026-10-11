// ── CARTA multiidioma ─────────────────────────────────────────────────────
// Cada texto visible es un objeto { es, en, de, fr, it } (si falta un idioma
// se muestra el español). `precio` es un texto libre ("18,50 €", "por kilo").
// PENDIENTE: carta de ejemplo sin precios. Nacho la sustituye por la real
// desde el modo edición (las traducciones se generan solas).

export const carta = [
  {
    id: 'picar',
    titulo: { es: 'Para picar', en: 'To share', de: 'Zum Teilen', fr: 'À partager', it: 'Da condividere' },
    platos: [
      {
        nombre: { es: 'Papas arrugadas con mojo', en: 'Wrinkled potatoes with mojo', de: 'Runzelkartoffeln mit Mojo', fr: 'Pommes de terre ridées au mojo', it: 'Patate rugose con mojo' },
        desc: { es: 'Mojo rojo y mojo verde de la casa.', en: 'House red and green mojo.' },
      },
      {
        nombre: { es: 'Lapas a la plancha', en: 'Grilled limpets', de: 'Gegrillte Napfschnecken', fr: 'Patelles grillées', it: 'Patelle alla piastra' },
        desc: { es: 'Con mojo verde.', en: 'With green mojo.' },
      },
      {
        nombre: { es: 'Pulpo con setas', en: 'Octopus with mushrooms', de: 'Pulpo mit Pilzen', fr: 'Poulpe aux champignons', it: 'Polpo con funghi' },
        desc: { es: 'Salteado en sartén de hierro.', en: 'Sautéed in an iron pan.' },
      },
      {
        nombre: { es: 'Queso asado con mojo', en: 'Grilled cheese with mojo', de: 'Gegrillter Käse mit Mojo', fr: 'Fromage grillé au mojo', it: 'Formaggio arrosto con mojo' },
      },
    ],
  },
  {
    id: 'mar',
    titulo: { es: 'Del mar', en: 'From the sea', de: 'Aus dem Meer', fr: 'De la mer', it: 'Dal mare' },
    nota: { es: 'Pregunta por el pescado del día: lo preparamos a la plancha, a la sal o a la espalda.', en: 'Ask for the catch of the day: grilled, salt-baked or butterflied.' },
    platos: [
      {
        nombre: { es: 'Pescado del día', en: 'Catch of the day', de: 'Fang des Tages', fr: 'Pêche du jour', it: 'Pescato del giorno' },
        desc: { es: 'Según lonja. Precio por kilo.', en: 'Market price, per kilo.' },
      },
      {
        nombre: { es: 'Salmón a la plancha', en: 'Grilled salmon', de: 'Gegrillter Lachs', fr: 'Saumon grillé', it: 'Salmone alla piastra' },
      },
      {
        nombre: { es: 'Merluza en salsa verde', en: 'Hake in green sauce', de: 'Seehecht in grüner Soße', fr: 'Merlu sauce verte', it: 'Nasello in salsa verde' },
      },
      {
        nombre: { es: 'Calamares de la costa', en: 'Local squid', de: 'Tintenfisch von der Küste', fr: 'Calamars de la côte', it: 'Calamari della costa' },
      },
    ],
  },
  {
    id: 'arroces',
    titulo: { es: 'Arroces', en: 'Rice dishes', de: 'Reisgerichte', fr: 'Riz', it: 'Risi' },
    nota: { es: 'Mínimo dos personas.', en: 'Minimum two people.' },
    platos: [
      {
        nombre: { es: 'Arroz caldoso de marisco', en: 'Brothy seafood rice', de: 'Suppiger Meeresfrüchtereis', fr: 'Riz crémeux aux fruits de mer', it: 'Riso brodoso ai frutti di mare' },
      },
      {
        nombre: { es: 'Arroz negro', en: 'Black rice', de: 'Schwarzer Reis', fr: 'Riz noir', it: 'Riso nero' },
      },
    ],
  },
  {
    id: 'brasa',
    titulo: { es: 'De la brasa', en: 'From the grill', de: 'Vom Grill', fr: 'De la braise', it: 'Dalla brace' },
    platos: [
      {
        nombre: { es: 'Chuletón madurado', en: 'Aged rib steak', de: 'Gereiftes Kotelett', fr: 'Côte de bœuf maturée', it: 'Costata frollata' },
        desc: { es: 'Al peso, fileteado en plancha caliente.', en: 'By weight, sliced on a hot plate.' },
      },
      {
        nombre: { es: 'Secreto ibérico', en: 'Iberian pork secreto', de: 'Iberisches Secreto', fr: 'Secreto ibérique', it: 'Secreto iberico' },
      },
    ],
  },
  {
    id: 'postres',
    titulo: { es: 'Postres', en: 'Desserts', de: 'Desserts', fr: 'Desserts', it: 'Dolci' },
    platos: [
      { nombre: { es: 'Quesillo canario', en: 'Canarian flan', de: 'Kanarischer Flan', fr: 'Flan canarien', it: 'Flan canario' } },
      { nombre: { es: 'Bienmesabe con helado', en: 'Bienmesabe with ice cream', de: 'Bienmesabe mit Eis', fr: 'Bienmesabe et glace', it: 'Bienmesabe con gelato' } },
    ],
  },
]

// Bodega: misma estructura. Vacía hasta que Nacho la rellene (la pestaña
// solo aparece al público cuando hay vinos).
export const vinosBase = []
