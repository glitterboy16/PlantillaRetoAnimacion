import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useAdmin, resolver } from '../admin/AdminContext'
import { confirmarAccion } from '../lib/confirmar'
import { Olas, IconoX, IconoMas, IconoFlecha, IconoPez } from '../components/shared'
import QrModal from '../admin/QrModal'

const precioEs = (p) => (p && typeof p === 'object' ? p.es ?? '' : p ?? '')

function Categoria({ cat, L, editando, acciones }) {
  return (
    <section className="menu-cat" id={cat.id} aria-labelledby={`t-${cat.id}`}>
      {editando ? (
        <div className="menu-cat-cab is-admin">
          <input
            className="admin-input cat-input"
            defaultValue={cat.titulo.es}
            aria-label="Nombre de la categoría"
            onBlur={(e) => {
              const v = e.target.value.trim()
              if (v && v !== cat.titulo.es) acciones.editarTitulo(cat.id, v)
            }}
          />
          <button className="mini-btn" title="Eliminar categoría" aria-label="Eliminar categoría" onClick={() => acciones.eliminarCategoria(cat.id)}>
            <IconoX />
          </button>
        </div>
      ) : (
        <div className="menu-cat-cab">
          <h2 id={`t-${cat.id}`}>{L(cat.titulo)}</h2>
          <Olas />
        </div>
      )}
      {editando ? (
        <input
          className="admin-input nota-input"
          defaultValue={cat.nota?.es ?? ''}
          placeholder="Nota de la categoría (opcional)"
          aria-label="Nota de la categoría"
          onBlur={(e) => {
            const v = e.target.value.trim()
            if (v !== (cat.nota?.es ?? '')) acciones.editarNota(cat.id, v)
          }}
        />
      ) : (
        cat.nota && <p className="menu-cat-nota">{L(cat.nota)}</p>
      )}

      <ul className="platos">
        {cat.platos.map((p, i) => {
          const id = p.id ?? i
          if (!editando) {
            return (
              <li key={id} className="plato">
                <div className="plato-linea">
                  <span className="plato-nombre">{L(p.nombre)}</span>
                  {p.precio && <span className="plato-guia" aria-hidden="true" />}
                  {p.precio && <span className="plato-precio">{L(p.precio)}</span>}
                </div>
                {p.desc && <p className="plato-desc">{L(p.desc)}</p>}
              </li>
            )
          }
          return (
            <li key={id} className="plato plato-admin">
              <div className="plato-linea">
                <input
                  className="admin-input"
                  defaultValue={typeof p.nombre === 'object' ? p.nombre?.es ?? '' : p.nombre ?? ''}
                  placeholder="Nombre"
                  aria-label="Nombre"
                  onBlur={(e) => {
                    const v = e.target.value.trim()
                    const actual = typeof p.nombre === 'object' ? p.nombre?.es : p.nombre
                    if (v && v !== actual) acciones.editarNombre(cat.id, id, v)
                  }}
                />
                <input
                  className="admin-input precio-input"
                  defaultValue={precioEs(p.precio)}
                  placeholder="0,00 €"
                  aria-label="Precio"
                  onBlur={(e) => {
                    const v = e.target.value.trim()
                    if (v !== precioEs(p.precio)) acciones.editarPrecio(cat.id, id, v)
                  }}
                />
                <button className="mini-btn" title="Eliminar" aria-label="Eliminar" onClick={() => acciones.eliminarPlato(cat.id, id)}>
                  <IconoX />
                </button>
              </div>
              <textarea
                className="admin-input"
                rows={2}
                defaultValue={p.desc?.es ?? ''}
                placeholder="Descripción (opcional)"
                aria-label="Descripción"
                onBlur={(e) => {
                  const v = e.target.value.trim()
                  if (v !== (p.desc?.es ?? '')) acciones.editarDesc(cat.id, id, v)
                }}
              />
            </li>
          )
        })}
      </ul>
      {editando && (
        <button className="btn btn-ghost" onClick={() => acciones.añadirPlato(cat.id)}><IconoMas />Añadir</button>
      )}
    </section>
  )
}

export default function Carta() {
  const { t, i18n } = useTranslation()
  const {
    admin, cartaData, guardarCarta, vinos, guardarVinos, campoTraducido,
    editandoCarta, setEditandoCarta, guardar, contacto,
  } = useAdmin()
  const { hash } = useLocation()
  const editando = admin && editandoCarta
  const [exportando, setExportando] = useState(false)
  const [qrAbierto, setQrAbierto] = useState(false)
  const [tipo, setTipo] = useState('comida')
  const [activa, setActiva] = useState(null)
  const esVinos = tipo === 'vinos'
  const datos = esVinos ? vinos : cartaData
  const guardarDatos = esVinos ? guardarVinos : guardarCarta
  const mostrarTabs = admin || vinos.length > 0
  const lang = i18n.language.slice(0, 2)
  const L = resolver(lang)

  // Entrada directa a una categoría (/carta#mar) o arriba del todo
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    const el = document.querySelector(hash)
    if (el) setTimeout(() => el.scrollIntoView(), 60)
  }, [hash])

  // Scroll-spy de las categorías para la barra de accesos rápidos
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3
      let actual = datos[0]?.id ?? null
      for (const c of datos) {
        const el = document.getElementById(c.id)
        if (el && el.offsetTop <= y) actual = c.id
      }
      setActiva(actual)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [datos])

  // Mantiene visible el chip activo dentro de su barra horizontal
  useEffect(() => {
    document.querySelector('.chips .on')?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [activa])

  // En modo edición cada plato necesita un id estable
  useEffect(() => {
    if (!editando) return
    if (!datos.some((c) => c.platos.some((p) => !p.id))) return
    guardarDatos((prev) =>
      prev.map((c) => ({ ...c, platos: c.platos.map((p, i) => (p.id ? p : { ...p, id: `${c.id}-${i}-${Date.now()}` })) }))
    )
  }, [editando, tipo]) // eslint-disable-line react-hooks/exhaustive-deps

  const exportarPdf = async () => {
    setExportando(true)
    try {
      const { exportarCartaPdf } = await import('../admin/exportarPdf')
      await toast.promise(exportarCartaPdf(datos, lang), {
        loading: 'Generando PDF…',
        success: 'Carta exportada en PDF',
        error: 'No se pudo generar el PDF',
      })
    } finally {
      setExportando(false)
    }
  }

  const setPlato = (catId, platoId, fn) =>
    guardarDatos((prev) =>
      prev.map((c) => (c.id !== catId ? c : { ...c, platos: c.platos.map((p, i) => ((p.id ?? i) !== platoId ? p : fn(p))) }))
    )

  const acciones = {
    editarTitulo: (catId, texto) =>
      campoTraducido(texto, (obj) => guardarDatos((prev) => prev.map((c) => (c.id === catId ? { ...c, titulo: obj } : c)))),
    editarNota: (catId, texto) => {
      if (!texto) return guardarDatos((prev) => prev.map((c) => (c.id === catId ? { ...c, nota: undefined } : c)))
      campoTraducido(texto, (obj) => guardarDatos((prev) => prev.map((c) => (c.id === catId ? { ...c, nota: obj } : c))))
    },
    editarNombre: (catId, platoId, texto) =>
      esVinos
        ? setPlato(catId, platoId, (p) => ({ ...p, nombre: texto })) // los vinos no se traducen
        : campoTraducido(texto, (obj) => setPlato(catId, platoId, (p) => ({ ...p, nombre: obj }))),
    editarDesc: (catId, platoId, texto) => {
      if (!texto) return setPlato(catId, platoId, (p) => ({ ...p, desc: undefined }))
      campoTraducido(texto, (obj) => setPlato(catId, platoId, (p) => ({ ...p, desc: obj })))
    },
    editarPrecio: (catId, platoId, texto) => setPlato(catId, platoId, (p) => ({ ...p, precio: texto || undefined })),
    añadirPlato: (catId) => {
      guardarDatos((prev) =>
        prev.map((c) =>
          c.id !== catId
            ? c
            : { ...c, platos: [...c.platos, { id: `p-${Date.now()}`, nombre: esVinos ? 'Nuevo vino' : { es: 'Nuevo plato' } }] }
        )
      )
      toast.success(esVinos ? 'Vino añadido' : 'Plato añadido')
    },
    eliminarPlato: async (catId, platoId) => {
      if (!(await confirmarAccion(esVinos ? '¿Eliminar este vino?' : '¿Eliminar este plato?', { confirmar: 'Eliminar' }))) return
      guardarDatos((prev) => prev.map((c) => (c.id !== catId ? c : { ...c, platos: c.platos.filter((p, i) => (p.id ?? i) !== platoId) })))
    },
    eliminarCategoria: async (catId) => {
      if (!(await confirmarAccion('¿Eliminar la categoría completa?', { confirmar: 'Eliminar' }))) return
      guardarDatos((prev) => prev.filter((c) => c.id !== catId))
    },
  }

  const añadirCategoria = () => {
    guardarDatos((prev) => [
      ...prev,
      { id: `cat-${Date.now()}`, titulo: { es: esVinos ? 'Nueva categoría de vinos' : 'Nueva categoría' }, platos: [] },
    ])
  }

  const irA = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <>
      <header className="page-head oscuro">
        <div className="wrap">
          <span className="eyebrow">{t('carta.eyebrow')}</span>
          <h1>{t('carta.titulo')}</h1>
          <Olas />
        </div>
      </header>

      <div className="carta-barra">
        <div className="wrap carta-barra-in">
          {mostrarTabs && (
            <div className="tabs" role="tablist" aria-label="Tipo de carta">
              <button role="tab" aria-selected={!esVinos} className={!esVinos ? 'on' : ''} onClick={() => setTipo('comida')}>
                {t('carta.comida')}
              </button>
              <button role="tab" aria-selected={esVinos} className={esVinos ? 'on' : ''} onClick={() => setTipo('vinos')}>
                {t('carta.vinos')}
              </button>
            </div>
          )}
          <nav className="chips" aria-label={t('carta.titulo')}>
            {datos.map((c) => (
              <button key={c.id} className={activa === c.id ? 'on' : ''} onClick={() => irA(c.id)}>
                {L(c.titulo)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="carta">
        <div className="carta-in">
          {!esVinos && (
            <Link to="/#pescado" className="carta-pescado">
              <IconoPez />
              <span>{t('carta.pescadoCta')}</span>
              <IconoFlecha />
            </Link>
          )}

          {admin && (
            <div className="edit-bar">
              {editando
                ? <button className="btn" onClick={guardar}>Guardar</button>
                : <button className="btn btn-ghost" onClick={() => setEditandoCarta(true)}>Editar carta</button>}
              <button className="btn btn-ghost" onClick={exportarPdf} disabled={exportando}>
                {exportando ? 'Generando…' : `PDF (${lang.toUpperCase()})`}
              </button>
              <button className="btn btn-ghost" onClick={() => setQrAbierto(true)}>QR de mesa</button>
            </div>
          )}
          {editando && (
            <p className="admin-aviso">Escribe en español: las traducciones se generan solas al salir de cada campo.</p>
          )}

          <div key={tipo}>
            {datos.map((cat) => (
              <Categoria key={cat.id} cat={cat} L={L} editando={editando} acciones={acciones} />
            ))}
          </div>
          {esVinos && datos.length === 0 && !editando && (
            <p className="admin-aviso">Aún no hay vinos. Pulsa «Editar carta» para añadirlos.</p>
          )}
          {editando && (
            <button className="btn btn-ghost add-cat" onClick={añadirCategoria}><IconoMas />Añadir categoría</button>
          )}

          <p className="carta-nota">
            {t('carta.nota1')}
            <a href={contacto.telHref}>{t('carta.notaLink')}</a>
            {t('carta.nota2')}
          </p>
        </div>
      </div>
      {qrAbierto && <QrModal url={`${window.location.origin}/carta`} onClose={() => setQrAbierto(false)} />}
    </>
  )
}
