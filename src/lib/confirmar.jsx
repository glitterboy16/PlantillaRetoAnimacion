import toast from 'react-hot-toast'

// Sustituto de window.confirm con el estilo de la web (react-hot-toast).
// Devuelve una promesa que resuelve true/false según lo que pulse el usuario.
export function confirmarAccion(mensaje, { confirmar = 'Confirmar', cancelar = 'Cancelar' } = {}) {
  return new Promise((resolve) => {
    toast(
      (t) => (
        <div className="confirm-toast">
          <p>{mensaje}</p>
          <div className="confirm-actions">
            <button className="btn btn-ghost" onClick={() => { toast.dismiss(t.id); resolve(false) }}>
              {cancelar}
            </button>
            <button className="btn" onClick={() => { toast.dismiss(t.id); resolve(true) }}>
              {confirmar}
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, id: 'confirmar' }
    )
  })
}
