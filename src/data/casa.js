// Datos de contacto, horario y pescado del día "de fábrica".
// Todo esto es editable por Nacho desde la web (modo edición) y se guarda en
// Supabase; lo de aquí solo se usa si Supabase no responde o está vacío.

export const CONTACTO = {
  telefono: '928 82 17 06',
  telHref: 'tel:+34928821706',
  instagram: 'https://www.instagram.com/casaterelz/',
  instagramUser: '@casaterelz',
  direccion: 'Paseo de Playa Honda',
  direccion2: '35509 Playa Honda · Lanzarote',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurante+Casa+Tere+Playa+Honda+Lanzarote',
}

// Horario semanal: índice 0 = lunes … 6 = domingo.
// Cada día es una lista de tramos ['HH:MM', 'HH:MM']; lista vacía = cerrado.
// PENDIENTE: confirmar el horario real con Nacho.
export const HORARIO_BASE = [
  [['12:00', '23:00']],
  [['12:00', '23:00']],
  [['12:00', '23:00']],
  [['12:00', '23:00']],
  [['12:00', '23:00']],
  [['12:00', '23:00']],
  [['12:00', '23:00']],
]

// Pizarra del pescado del día. `estado`: 'hay' | 'pocas' | 'agotado'.
// PENDIENTE: son ejemplos; Nacho la rellena cada día desde la web.
export const PESCADO_BASE = {
  fecha: null,
  items: [
    {
      id: 'cherne',
      nombre: { es: 'Cherne', en: 'Wreckfish', de: 'Wrackbarsch', fr: 'Cernier', it: 'Cernia di fondale' },
      precio: '',
      estado: 'hay',
    },
    {
      id: 'sama',
      nombre: { es: 'Sama roquera', en: 'Pink dentex', de: 'Zahnbrasse', fr: 'Denté rose', it: 'Dentice rosa' },
      precio: '',
      estado: 'hay',
    },
    {
      id: 'vieja',
      nombre: { es: 'Vieja', en: 'Parrotfish', de: 'Papageifisch', fr: 'Poisson-perroquet', it: 'Pesce pappagallo' },
      precio: '',
      estado: 'pocas',
    },
    {
      id: 'bocinegro',
      nombre: { es: 'Bocinegro', en: 'Red porgy', de: 'Sackbrasse', fr: 'Pagre', it: 'Pagro' },
      precio: '',
      estado: 'hay',
    },
    {
      id: 'abadejo',
      nombre: { es: 'Abadejo', en: 'Island grouper', de: 'Inselzackenbarsch', fr: 'Mérou des îles', it: 'Cernia delle isole' },
      precio: '',
      estado: 'agotado',
    },
  ],
}
