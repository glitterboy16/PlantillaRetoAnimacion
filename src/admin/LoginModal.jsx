import { useEffect, useRef, useState } from 'react'
import { useAdmin } from './AdminContext'
import logoMarino from '../assets/logo-marino.png'

// Acceso discreto: se abre al pulsar "Nacho González" en el pie.
export default function LoginModal({ onClose }) {
  const { login } = useAdmin()
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const panelRef = useRef(null)
  const primerInput = useRef(null)

  useEffect(() => {
    primerInput.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const enviar = async (e) => {
    e.preventDefault()
    setEnviando(true)
    const ok = await login(usuario.trim(), clave)
    setEnviando(false)
    if (ok) onClose()
    else {
      setError(true)
      setClave('')
    }
  }

  return (
    <div
      className="velo"
      onPointerDown={(e) => { if (panelRef.current && !panelRef.current.contains(e.target)) onClose() }}
    >
      <div className="panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="login-titulo">
        <img className="panel-logo" src={logoMarino} alt="" aria-hidden="true" />
        <h3 id="login-titulo" className="sr-only">Acceso de edición</h3>
        <form onSubmit={enviar}>
          <label className="campo">
            <span>Usuario</span>
            <input
              id="login-usuario"
              ref={primerInput}
              className="admin-input"
              type="text"
              autoComplete="username"
              value={usuario}
              onChange={(e) => { setUsuario(e.target.value); setError(false) }}
            />
          </label>
          <label className="campo">
            <span>Contraseña</span>
            <input
              id="login-clave"
              className="admin-input"
              type="password"
              autoComplete="current-password"
              value={clave}
              onChange={(e) => { setClave(e.target.value); setError(false) }}
            />
          </label>
          {error && <p className="login-error">Usuario o contraseña incorrectos.</p>}
          <button className="btn" type="submit" disabled={enviando}>{enviando ? 'Entrando…' : 'Entrar'}</button>
        </form>
      </div>
    </div>
  )
}
