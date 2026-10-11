import { useEffect, useRef } from 'react'

// El mar del hero: líneas finas que ondulan despacio, como las pinceladas
// del logo. Canvas ligero; se pausa fuera de pantalla y con movimiento
// reducido se dibuja un único fotograma quieto.
const LINEAS = 14

export default function Mar() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let visible = true

    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Cada línea: más abajo = más cerca = más ancha, más visible, más lenta
    const lineas = Array.from({ length: LINEAS }, (_, i) => {
      const p = i / (LINEAS - 1)
      return {
        y: 0.18 + Math.pow(p, 1.35) * 0.8,
        amp: 3 + p * 12,
        largo: 260 + p * 520,
        vel: 0.00022 + (1 - p) * 0.00018,
        fase: i * 1.7,
        alfa: 0.05 + p * 0.17,
        grosor: 0.6 + p * 0.9,
      }
    })

    const dibujar = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const l of lineas) {
        ctx.beginPath()
        const base = l.y * h
        for (let x = -10; x <= w + 10; x += 8) {
          const k = (x / l.largo) * Math.PI * 2
          const y =
            base +
            Math.sin(k + t * l.vel * 6 + l.fase) * l.amp +
            Math.sin(k * 0.43 - t * l.vel * 3.1 + l.fase * 2) * l.amp * 0.6
          if (x === -10) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(255,255,255,${l.alfa})`
        ctx.lineWidth = l.grosor
        ctx.stroke()
      }
    }

    const bucle = (t) => {
      dibujar(t)
      if (visible) raf = requestAnimationFrame(bucle)
    }

    ajustar()
    if (quieto) dibujar(0)
    else raf = requestAnimationFrame(bucle)

    const ro = new ResizeObserver(() => { ajustar(); if (quieto) dibujar(0) })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !quieto && !raf) raf = requestAnimationFrame(bucle)
      if (!visible) { cancelAnimationFrame(raf); raf = 0 }
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas className="mar" ref={ref} aria-hidden="true" />
}
