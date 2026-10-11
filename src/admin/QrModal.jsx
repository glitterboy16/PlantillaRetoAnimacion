import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import logoBlanco from '../assets/logo-blanco.png'

// QR de la carta para las mesas, con la estética de Casa Tere: módulos azul
// marino sobre blanco y, al centro, un disco marino con el logo en blanco.
// 2000×2000 px (~17 cm a 300 ppp), listo para imprenta. Solo lo ve Nacho.
const SIZE = 2000
const MARINO = '#021E50'
const ESPUMA = '#FFFFFF'

const cargarImagen = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

async function dibujarEmblema(ctx) {
  const cx = SIZE / 2
  const cy = SIZE / 2
  const disco = (r, color) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()
  }
  disco(SIZE * 0.165, ESPUMA)   // margen de respiro frente a los módulos
  disco(SIZE * 0.152, MARINO)

  const logo = await cargarImagen(logoBlanco)
  const w = SIZE * 0.25
  const h = w * (logo.height / logo.width)
  ctx.drawImage(logo, cx - w / 2, cy - h / 2, w, h)
}

export default function QrModal({ url, onClose }) {
  const canvasRef = useRef(null)
  const [listo, setListo] = useState(false)

  useEffect(() => {
    let cancelado = false
    ;(async () => {
      try {
        const QRCode = (await import('qrcode')).default
        const canvas = canvasRef.current
        if (!canvas || cancelado) return
        // Corrección de errores alta (H): el emblema central no rompe la lectura
        await QRCode.toCanvas(canvas, url, {
          width: SIZE,
          margin: 3,
          errorCorrectionLevel: 'H',
          color: { dark: MARINO, light: ESPUMA },
        })
        // toCanvas fija tamaño en línea; se limpia para que mande el CSS
        canvas.style.width = ''
        canvas.style.height = ''
        await dibujarEmblema(canvas.getContext('2d'))
        if (!cancelado) setListo(true)
      } catch {
        toast.error('No se pudo generar el QR')
      }
    })()
    return () => { cancelado = true }
  }, [url])

  const descargar = () => {
    canvasRef.current.toBlob((blob) => {
      if (!blob) return
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'qr-carta-casa-tere.png'
      a.click()
      URL.revokeObjectURL(a.href)
    }, 'image/png')
  }

  return (
    <div className="velo" onPointerDown={(e) => { if (e.target.classList.contains('velo')) onClose() }}>
      <div className="panel panel-qr" role="dialog" aria-modal="true" aria-label="Código QR de la carta">
        <span className="eyebrow">Carta por QR</span>
        <canvas ref={canvasRef} className="qr-canvas" width={SIZE} height={SIZE} />
        <p className="qr-url">{url}</p>
        <div className="panel-acciones">
          <button className="btn" onClick={descargar} disabled={!listo}>
            {listo ? 'Descargar PNG' : 'Generando…'}
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
