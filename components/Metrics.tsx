import React from 'react'
import { BarChart3, Zap, MapPin, Users } from 'lucide-react'

interface MetricsProps {
  generation: number
  bestDistance: number
  cityCount: number
  populationSize: number
}

export default function Metrics({
  generation,
  bestDistance,
  cityCount,
  populationSize,
}: MetricsProps) {
  const metrics = [
    {
      label: 'Geração',
      value: generation,
      icon: Zap,
      unit: '',
    },
    {
      label: 'Melhor Distância',
      value: bestDistance === Infinity ? '—' : bestDistance.toFixed(0),
      icon: MapPin,
      unit: bestDistance !== Infinity ? 'u' : '',
    },
    {
      label: 'Cidades',
      value: cityCount,
      icon: BarChart3,
      unit: '',
    },
    {
      label: 'População',
      value: populationSize,
      icon: Users,
      unit: '',
    },
  ]

  return (
    <>
      {metrics.map((metric, idx) => {
        const Icon = metric.icon
        return (
          <div key={idx} className="metric-box">
            <div className="flex items-center justify-center mb-2">
              <Icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="metric-label">{metric.label}</p>
            <div className="metric-value">
              {metric.value}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-1">
                {metric.unit}
              </span>
            </div>
          </div>
        )
      })}
    </>
  )
}
