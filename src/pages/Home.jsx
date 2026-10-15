import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useAdmin, resolver } from '../admin/AdminContext'
import { confirmarAccion } from '../lib/confirmar'
import { hoyIndice, tramosATexto, textoATramos } from '../lib/horario'
import {
  useReveal, SectionHead, Olas,
  IconoTel, IconoFlecha, IconoPin, IconoReloj, IconoInstagram, IconoX, IconoMas, IconoPez, IconoLlama,
} from '../components/shared'
import Mar from '../components/Mar'
import Estado from '../components/Estado'
import logoBlanco from '../assets/logo-blanco.png'
import firmaMarino from '../assets/firma-marino.png'

/* ─────────────────────────── HERO ─────────────────────────── */
function Hero() {
  const { t } = useTranslation()
  const { contacto } = useAdmin()
  return (
    <header className="hero oscuro">
      <div className="hero-sol" aria-hidden="true" />
      <Mar />
      <div className="hero-inner">
        <h1 className="sr-only">Casa Tere, restaurante en Playa Honda, Lanzarote</h1>
        <img className="hero-logo" src={logoBlanco} alt="Casa Tere · Restaurante · Playa Honda · Nacho González" width="1023" height="547" fetchpriority="high" />
        <p className="hero-lema">{t('hero.lema')}</p>
        <div className="hero-ctas">
          <a className="btn" href={contacto.telHref}><IconoTel />{t('hero.reservar')}</a>
          <Link className="btn btn-ghost" to="/carta">{t('hero.verCarta')}</Link>
        </div>
      </div>
      <div className="hero-pie wrap">
        <Estado />
        <a className="hero-lugar" href={contacto.mapsUrl} target="_blank" rel="noopener noreferrer">
          <IconoPin />{t('hero.lugar')}
        </a>
      </div>
    </header>
  )
}

/* ──────────────────── PESCADO DEL DÍA (la pizarra) ──────────────────── */
function Pescado() {
  const { t, i18n } = useTranslation()
  const {
    admin, pescado, guardarPescado, campoTraducido, contacto,
    editandoPescado, setEditandoPescado, guardar,
  } = useAdmin()
  const editando = admin && editandoPescado
  const lang = i18n.language.slice(0, 2)
  const L = resolver(lang)
  const copyRef = useReveal()
  const pizarraRef = useReveal()

  const fecha = pescado.fecha
    ? new Intl.DateTimeFormat(lang, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Atlantic/Canary' }).format(new Date(pescado.fecha))
    : null

  const setItem = (id, fn) =>
    guardarPescado((prev) => ({ ...prev, items: prev.items.map((it) => (it.id === id ? fn(it) : it)) }))

  const añadir = () => {
    guardarPescado((prev) => ({
      ...prev,
      items: [...prev.items, { id: `pez-${Date.now()}`, nombre: { es: 'Nuevo pescado' }, precio: '', estado: 'hay' }],
    }))
  }

  const eliminar = async (id) => {
    if (!(await confirmarAccion('¿Quitar este pescado de la pizarra?', { confirmar: 'Quitar' }))) return
    guardarPescado((prev) => ({ ...prev, items: prev.items.filter((it) => it.id !== id) }))
  }

  return (
    <section className="pescado" id="pescado">
      <div className="wrap pescado-grid">
        <div className="pescado-copy reveal" ref={copyRef}>
          <span className="eyebrow izq">{t('pescado.eyebrow')}</span>
          <h2>{t('pescado.titulo')}</h2>
          <Olas />
          <p>{t('pescado.intro')}</p>
          <p className="pescado-prep">
            {/* Cada preparación se queda entera en su línea: el "·" nunca abre renglón */}
            {t('pescado.preparaciones').split(' · ').map((prep, i, todas) => (
              <span key={prep}>{i > 0 && ' '}<span className="nowrap">{prep}{i < todas.length - 1 && ' ·'}</span></span>
            ))}
          </p>
          <a className="enlace" href={contacto.telHref}>{t('pescado.apartar')}<IconoFlecha /></a>
        </div>

        <div className="pizarra reveal" ref={pizarraRef}>
          <div className="pizarra-cab">
            <span>{fecha ? t('pescado.actualizado', { fecha }) : t('pescado.sinFecha')}</span>
            <span>{t('pescado.porKilo')}</span>
          </div>

          {pescado.items.length === 0 && !editando && <p className="pizarra-vacia">{t('pescado.vacio')}</p>}

          <ul className="pizarra-lista">
            {pescado.items.map((it) =>
              editando ? (
                <li key={it.id} className="pez pez-admin">
                  <input
                    className="admin-input admin-osc"
                    defaultValue={it.nombre?.es ?? ''}
                    aria-label="Nombre del pescado"
                    onBlur={(e) => {
                      const v = e.target.value.trim()
                      if (v && v !== it.nombre?.es) campoTraducido(v, (obj) => setItem(it.id, (p) => ({ ...p, nombre: obj })))
                    }}
                  />
                  <input
                    className="admin-input admin-osc pez-precio-input"
                    defaultValue={it.precio}
                    placeholder="€/kg"
                    aria-label="Precio por kilo"
                    onBlur={(e) => {
                      const v = e.target.value.trim()
                      if (v !== it.precio) setItem(it.id, (p) => ({ ...p, precio: v }))
                    }}
                  />
                  <select
                    className="admin-input admin-osc"
                    value={it.estado}
                    aria-label="Disponibilidad"
                    onChange={(e) => setItem(it.id, (p) => ({ ...p, estado: e.target.value }))}
                  >
                    <option value="hay">Hay</option>
                    <option value="pocas">Últimas piezas</option>
                    <option value="agotado">Agotado</option>
                  </select>
                  <button className="mini-btn" title="Quitar" aria-label="Quitar" onClick={() => eliminar(it.id)}><IconoX /></button>
                </li>
              ) : (
                <li key={it.id} className={`pez${it.estado === 'agotado' ? ' agotado' : ''}`}>
                  <span className="pez-nombre">{L(it.nombre)}</span>
                  {it.estado !== 'hay' && (
                    <span className={`pez-tag ${it.estado}`}>{it.estado === 'pocas' ? t('pescado.pocas') : t('pescado.agotado')}</span>
                  )}
                  <span className="pez-guia" aria-hidden="true" />
                  <span className="pez-precio">{it.precio || '—'}</span>
                </li>
              )
            )}
          </ul>

          {admin && (
            <div className="edit-bar edit-osc">
              {editando ? (
                <>
                  <button className="btn btn-ghost" onClick={añadir}><IconoMas />Añadir pescado</button>
                  <button className="btn" onClick={guardar}>Guardar</button>
                </>
              ) : (
                <button className="btn btn-ghost" onClick={() => setEditandoPescado(true)}>Editar pizarra</button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── LA CASA ─────────────────────────── */
// Ilustración de línea: el horizonte de Playa Honda con el sol, las montañas
// de la isla, el mar y dos gaviotas, en el mismo trazo que el logo.
function Horizonte() {
  return (
    <svg className="horizonte" viewBox="0 0 400 500" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
      <circle className="h-sol" cx="138" cy="250" r="52" strokeWidth="1.3" />
      <rect x="70" y="250" width="140" height="60" fill="var(--panel)" stroke="none" />
      <path d="M150 247 C190 240, 210 214, 236 206 C252 201, 262 210, 276 204 C296 196, 312 214, 336 228 C352 238, 372 244, 398 247" strokeWidth="1.1" />
      <path d="M2 250 C120 247, 280 246, 398 249" strokeWidth="1.4" />
      {Array.from({ length: 9 }, (_, i) => {
        const y = 272 + i * 22 + i * i * 1.2
        const amp = 3 + i * 1.4
        return (
          <path
            key={i}
            className="h-ola"
            style={{ animationDelay: `${i * -0.7}s` }}
            d={`M${-20 + (i % 2) * 30} ${y} C${90} ${y - amp}, ${190} ${y + amp}, ${300} ${y - amp * 0.4} S ${420} ${y + amp * 0.6}, ${440} ${y}`}
            strokeWidth={0.8 + i * 0.12}
          />
        )
      })}
      <path className="h-gaviota" d="M250 120 C262 108, 274 110, 282 124 C290 112, 304 106, 320 112" strokeWidth="1.5" />
      <path className="h-gaviota dos" d="M300 160 C308 152, 316 153, 321 162 C327 154, 336 150, 346 154" strokeWidth="1.2" />
    </svg>
  )
}

function Casa() {
  const { t } = useTranslation()
  const ilusRef = useReveal()
  const copyRef = useReveal()
  return (
    <section className="casa" id="casa">
      <div className="wrap casa-grid">
        <div className="casa-ilus reveal" ref={ilusRef}>
          <Horizonte />
          <span className="casa-coord">28°57′ N · 13°33′ O</span>
        </div>
        <div className="casa-copy reveal" ref={copyRef}>
          <span className="eyebrow izq">{t('casa.eyebrow')}</span>
          <h2>{t('casa.titulo')}</h2>
          <Olas />
          <p className="casa-lead">{t('casa.p1')}</p>
          <p>{t('casa.p2')}</p>
          <p>{t('casa.p3')}</p>
          <div className="firma">
            <img src={firmaMarino} alt="Nacho González" width="220" height="35" loading="lazy" />
            <span>{t('casa.firma')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── EL MAR Y LA BRASA ─────────────────────── */
function Fuegos() {
  const { t } = useTranslation()
  const ref = useReveal()
  const panel = (clave, Icono, ancla) => (
    <Link to={`/carta#${ancla}`} className="fuego">
      <Icono className="fuego-icono" />
      <h3>{t(`fuegos.${clave}`)}</h3>
      <p>{t(`fuegos.${clave}Txt`)}</p>
      <span className="enlace">{t('fuegos.ver')}<IconoFlecha /></span>
    </Link>
  )
  return (
    <section className="fuegos oscuro" id="cocina">
      <div className="wrap">
        <SectionHead eyebrow={t('fuegos.eyebrow')} title={t('fuegos.titulo')} />
        <div className="fuegos-grid reveal" ref={ref}>
          {panel('mar', IconoPez, 'mar')}
          {panel('brasa', IconoLlama, 'brasa')}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── GALERÍA ─────────────────────────── */
const SIGUIENTE_CLASE = { '': 'wide', wide: 'tall', tall: '' }
const NOMBRE_CLASE = { '': 'normal', wide: 'ancha', tall: 'alta' }

function Galeria() {
  const { t, i18n } = useTranslation()
  const {
    admin, galeria, guardarGaleria, campoTraducido, editandoGaleria, setEditandoGaleria, guardar,
    subirFoto, borrarFoto, contacto,
  } = useAdmin()
  const editando = admin && editandoGaleria
  const ref = useReveal()
  const inputAdd = useRef(null)
  const inputReplace = useRef(null)
  const idReemplazo = useRef(null)
  const L = resolver(i18n.language.slice(0, 2))

  // Sin fotos, la sección no se enseña al público (solo a Nacho, para llenarla)
  if (!admin && galeria.length === 0) return null

  const subir = async (file, aplicar) => {
    if (!file) return
    const id = toast.loading('Subiendo foto…')
    try {
      const res = await subirFoto(file)
      aplicar(res)
      toast.success('Foto guardada', { id })
    } catch {
      toast.error('No se pudo subir la foto', { id })
    }
  }

  const eliminar = async (item) => {
    if (!(await confirmarAccion('¿Eliminar esta foto de la galería?', { confirmar: 'Eliminar' }))) return
    guardarGaleria((prev) => prev.filter((g) => g.id !== item.id))
    borrarFoto(item.path)
  }

  return (
    <section className="galeria" id="galeria">
      <div className="wrap">
        <SectionHead eyebrow={t('galeria.eyebrow')} title={t('galeria.titulo')} />
        {admin && (
          <div className="edit-bar">
            {editando
              ? <button className="btn" onClick={guardar}>Guardar</button>
              : <button className="btn btn-ghost" onClick={() => setEditandoGaleria(true)}>Editar galería</button>}
          </div>
        )}
        <div className="gal-grid reveal" ref={ref}>
          {galeria.map((item) => (
            <figure key={item.id} className={`gal-item ${item.clase || ''}`.trim()}>
              <img src={item.src} alt={L(item.tag) || 'Casa Tere'} loading="lazy" decoding="async" />
              {editando ? (
                <figcaption>
                  <input
                    className="tag-input"
                    placeholder="Título (opcional)"
                    defaultValue={L(item.tag) || ''}
                    onBlur={(e) => {
                      const v = e.target.value.trim()
                      if (v === (L(item.tag) || '')) return
                      if (!v) return guardarGaleria((prev) => prev.map((g) => (g.id === item.id ? { ...g, tag: {} } : g)))
                      campoTraducido(v, (obj) => guardarGaleria((prev) => prev.map((g) => (g.id === item.id ? { ...g, tag: obj } : g))))
                    }}
                  />
                </figcaption>
              ) : (
                L(item.tag) && <figcaption>{L(item.tag)}</figcaption>
              )}
              {editando && (
                <div className="gal-admin">
                  <button
                    className="mini-btn"
                    title={`Tamaño: ${NOMBRE_CLASE[item.clase || '']}`}
                    onClick={() => guardarGaleria((prev) => prev.map((g) => (g.id === item.id ? { ...g, clase: SIGUIENTE_CLASE[g.clase || ''] } : g)))}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      {(item.clase || '') === '' && <rect x="7" y="7" width="10" height="10" />}
                      {item.clase === 'wide' && <rect x="4" y="8" width="16" height="8" />}
                      {item.clase === 'tall' && <rect x="8" y="4" width="8" height="16" />}
                    </svg>
                  </button>
                  <button className="mini-btn" title="Reemplazar foto" onClick={() => { idReemplazo.current = item.id; inputReplace.current.click() }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 17v3h16v-3M12 4v12M7 9l5-5 5 5" /></svg>
                  </button>
                  <button className="mini-btn" title="Eliminar foto" onClick={() => eliminar(item)}><IconoX /></button>
                </div>
              )}
            </figure>
          ))}
          {editando && (
            <button className="gal-item gal-add" onClick={() => inputAdd.current.click()}>
              <IconoMas />
              Añadir foto
            </button>
          )}
        </div>
        {!editando && galeria.length === 0 && (
          <p className="admin-aviso">La galería está vacía y no se muestra al público. Pulsa «Editar galería» para subir las primeras fotos.</p>
        )}
        <div className="gal-insta">
          <a className="enlace" href={contacto.instagram} target="_blank" rel="noopener noreferrer">
            <IconoInstagram />{t('galeria.instagram')} · {contacto.instagramUser}
          </a>
        </div>
        {editando && (
          <>
            <input
              ref={inputAdd} type="file" accept="image/*" hidden
              onChange={(e) => {
                subir(e.target.files[0], ({ src, path }) =>
                  guardarGaleria((prev) => [...prev, { id: `foto-${Date.now()}`, src, path, tag: {}, clase: '' }]))
                e.target.value = ''
              }}
            />
            <input
              ref={inputReplace} type="file" accept="image/*" hidden
              onChange={(e) => {
                const id = idReemplazo.current
                const anterior = galeria.find((g) => g.id === id)
                subir(e.target.files[0], ({ src, path }) => {
                  guardarGaleria((prev) => prev.map((g) => (g.id === id ? { ...g, src, path } : g)))
                  borrarFoto(anterior?.path)
                })
                e.target.value = ''
              }}
            />
          </>
        )}
      </div>
    </section>
  )
}

/* ─────────────────────────── VISITA ─────────────────────────── */
function Visita() {
  const { t } = useTranslation()
  const {
    admin, contacto, guardarContacto, horario, guardarHorario,
    editandoVisita, setEditandoVisita, guardar,
  } = useAdmin()
  const editando = admin && editandoVisita
  const dias = t('dias', { returnObjects: true })
  const hoy = hoyIndice()
  const ref = useReveal()

  const editarDia = (i, texto) => {
    const tramos = textoATramos(texto)
    if (tramos === null) {
      toast.error('Escribe el horario así: 12:00–16:00, 19:00–23:00 (o «Cerrado»)')
      return
    }
    guardarHorario((prev) => prev.map((d, j) => (j === i ? tramos : d)))
  }

  return (
    <section className="visita" id="visita">
      <div className="wrap">
        <SectionHead eyebrow={t('visita.eyebrow')} title={t('visita.titulo')} />
        {admin && (
          <div className="edit-bar">
            {editando
              ? <button className="btn" onClick={guardar}>Guardar</button>
              : <button className="btn btn-ghost" onClick={() => setEditandoVisita(true)}>Editar horario y teléfono</button>}
          </div>
        )}
        <div className="visita-grid reveal" ref={ref}>
          <div className="visita-bloque">
            <h3><IconoReloj />{t('visita.horario')}</h3>
            <Estado />
            <table className="horario">
              <tbody>
                {dias.map((nombre, i) => (
                  <tr key={nombre} className={i === hoy ? 'hoy' : ''}>
                    <th scope="row">
                      {nombre}
                      {i === hoy && <span className="sr-only"> ({t('visita.hoy')})</span>}
                    </th>
                    <td>
                      {editando ? (
                        <input
                          className="admin-input"
                          defaultValue={horario[i]?.length ? tramosATexto(horario[i]) : 'Cerrado'}
                          aria-label={`Horario del ${nombre}`}
                          onBlur={(e) => editarDia(i, e.target.value)}
                        />
                      ) : horario[i]?.length ? (
                        tramosATexto(horario[i])
                      ) : (
                        <span className="cerrado">{t('visita.cerrado')}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="visita-bloque visita-reservas oscuro">
            <h3><IconoTel />{t('visita.reservas')}</h3>
            {editando ? (
              <input
                className="admin-input admin-osc"
                type="tel"
                inputMode="tel"
                defaultValue={contacto.telefono}
                aria-label="Teléfono de reservas"
                onBlur={(e) => {
                  const v = e.target.value.trim()
                  if (v && v !== contacto.telefono) guardarContacto(v)
                }}
              />
            ) : (
              <a className="visita-tel" href={contacto.telHref}>{contacto.telefono}</a>
            )}
            <p>{t('visita.reservasTxt')}</p>
            <a className="btn" href={contacto.telHref}><IconoTel />{t('hero.reservar')}</a>
          </div>

          <div className="visita-bloque">
            <h3><IconoPin />{t('visita.donde')}</h3>
            <address>
              <strong>Casa Tere</strong>
              {contacto.direccion}<br />
              {contacto.direccion2}
            </address>
            <div className="visita-enlaces">
              <a className="enlace" href={contacto.mapsUrl} target="_blank" rel="noopener noreferrer">
                {t('visita.comoLlegar')}<IconoFlecha />
              </a>
              <a className="enlace" href={contacto.instagram} target="_blank" rel="noopener noreferrer">
                <IconoInstagram />{contacto.instagramUser}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── PÁGINA ─────────────────────────── */
export default function Home() {
  const { hash } = useLocation()

  // Si llegamos con /#seccion desde otra página, baja hasta ella
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }, [hash])

  return (
    <>
      <Hero />
      <Pescado />
      <Casa />
      <Fuegos />
      <Galeria />
      <Visita />
    </>
  )
}
