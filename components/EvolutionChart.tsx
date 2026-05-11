'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface DataPoint {
  generation: number
  distance: number
}

interface EvolutionChartProps {
  data: DataPoint[]
}

export default function EvolutionChart({ data }: EvolutionChartProps) {
  const isDark = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-color-scheme: dark)').matches

  const textColor = isDark ? '#cbd5e1' : '#475569'
  const gridColor = isDark ? '#334155' : '#e2e8f0'

  return (
    <div className="w-full h-64">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="generation"
              stroke={textColor}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke={textColor}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: textColor }}
              formatter={(value) => [value.toFixed(2), 'Distância']}
            />
            <Legend wrapperStyle={{ color: textColor }} />
            <Line
              type="monotone"
              dataKey="distance"
              stroke={isDark ? '#06b6d4' : '#0891b2'}
              dot={false}
              isAnimationActive={true}
              strokeWidth={2}
              name="Melhor Distância"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Execute o algoritmo para visualizar a convergência
          </p>
        </div>
      )}
    </div>
  )
}
