'use client'

import React, { useRef, useEffect, useState } from 'react'
import { City, Route } from '@/lib/types'

interface CanvasProps {
  cities: City[]
  bestRoute: Route | null
  onClick: (x: number, y: number) => void
}

export default function Canvas({ cities, bestRoute, onClick }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const checkDark = () => {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    checkDark()
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkDark)
    return () => mediaQuery.removeEventListener('change', checkDark)
  }, [])

  // Handle canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / canvas.width
    const y = (e.clientY - rect.top) / canvas.height

    // Clamp to valid range
    onClick(Math.max(0.05, Math.min(0.95, x)), Math.max(0.05, Math.min(0.95, y)))
  }

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    // Clear canvas
    ctx.fillStyle = isDark ? '#1e293b' : '#ffffff'
    ctx.fillRect(0, 0, w, h)

    // Draw grid
    const gridColor = isDark ? '#334155' : '#e2e8f0'
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 0.5
    for (let i = 0; i <= 10; i++) {
      const x = (w / 10) * i
      const y = (h / 10) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    // Draw best route
    if (bestRoute && cities.length > 1) {
      ctx.beginPath()
      const start = cities[bestRoute[0]]
      ctx.moveTo(start.x * w, start.y * h)

      for (let i = 1; i < bestRoute.length; i++) {
        const city = cities[bestRoute[i]]
        ctx.lineTo(city.x * w, city.y * h)
      }
      ctx.closePath()

      ctx.strokeStyle = isDark ? '#0ea5e9' : '#0284c7'
      ctx.lineWidth = 2.5
      ctx.stroke()

      // Draw route fill
      ctx.fillStyle = isDark ? 'rgba(14, 165, 233, 0.1)' : 'rgba(2, 132, 199, 0.08)'
      ctx.fill()
    }

    // Draw cities
    cities.forEach((city, i) => {
      const cx = city.x * w
      const cy = city.y * h

      // City circle
      ctx.beginPath()
      ctx.arc(cx, cy, 8, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? '#06b6d4' : '#0891b2'
      ctx.fill()
      ctx.strokeStyle = isDark ? '#1e293b' : '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()

      // City number
      ctx.fillStyle = isDark ? '#ffffff' : '#ffffff'
      ctx.font = 'bold 11px system-ui'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText((i + 1).toString(), cx, cy)

      // City label
      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b'
      ctx.font = '10px system-ui'
      ctx.textAlign = 'left'
      ctx.fillText(`C${i + 1}`, cx + 12, cy - 10)
    })

    // Draw border
    ctx.strokeStyle = isDark ? '#475569' : '#cbd5e1'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, w, h)
  }, [cities, bestRoute, isDark])

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return
      canvas.width = container.clientWidth
      canvas.height = 400
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl cursor-crosshair bg-white dark:bg-slate-800 shadow-sm"
    />
  )
}
