// Utilidades del horario semanal (índice 0 = lunes … 6 = domingo).
// Siempre se calcula en la hora de Canarias, esté donde esté el visitante.

const ZONA = 'Atlantic/Canary'

const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + (m || 0)
}

// Día (0 = lunes) y minuto actual en Lanzarote
function ahoraEnCanarias(fecha = new Date()) {
  const partes = new Intl.DateTimeFormat('en-GB', {
    timeZone: ZONA, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(fecha)
  const v = Object.fromEntries(partes.map((p) => [p.type, p.value]))
  const dias = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return { dia: dias.indexOf(v.weekday), min: Number(v.hour) * 60 + Number(v.minute) }
}

export const hoyIndice = () => ahoraEnCanarias().dia

// Estado actual: { abierto, hasta } o { abierto: false, dia, hora, offset }
// Los tramos que pasan de medianoche ('19:00'–'01:00') se tratan bien.
export function estadoActual(horario, fecha = new Date()) {
  const { dia, min } = ahoraEnCanarias(fecha)

  // ¿Abierto en un tramo de hoy, o en uno de ayer que cruza medianoche?
  for (const [ini, fin] of horario[dia] || []) {
    const a = aMinutos(ini)
    let b = aMinutos(fin)
    if (b <= a) b += 24 * 60
    if (min >= a && min < b) return { abierto: true, hasta: fin }
  }
  const ayer = (dia + 6) % 7
  for (const [ini, fin] of horario[ayer] || []) {
    const a = aMinutos(ini)
    const b = aMinutos(fin)
    if (b <= a && min < b) return { abierto: true, hasta: fin }
  }

  // Cerrado: busca la próxima apertura en los 7 días siguientes
  for (let offset = 0; offset < 7; offset++) {
    const d = (dia + offset) % 7
    const tramos = [...(horario[d] || [])].sort((x, y) => aMinutos(x[0]) - aMinutos(y[0]))
    for (const [ini] of tramos) {
      if (offset > 0 || aMinutos(ini) > min) return { abierto: false, dia: d, hora: ini, offset }
    }
  }
  return { abierto: false }
}

// "12:00–16:00, 19:30–23:00" ⇄ [['12:00','16:00'],['19:30','23:00']]
export const tramosATexto = (tramos) => tramos.map(([a, b]) => `${a}–${b}`).join(', ')

export function textoATramos(texto) {
  const t = texto.trim()
  if (!t || /cerrad/i.test(t)) return []
  const tramos = []
  for (const parte of t.split(/[,;y]+/)) {
    const m = parte.match(/(\d{1,2})[:.h]?(\d{2})?\s*[-–a]+\s*(\d{1,2})[:.h]?(\d{2})?/)
    if (!m) return null
    const f = (h, mm) => `${String(Math.min(+h, 24) % 24).padStart(2, '0')}:${(mm || '00').padStart(2, '0')}`
    tramos.push([f(m[1], m[2]), f(m[3], m[4])])
  }
  return tramos
}
