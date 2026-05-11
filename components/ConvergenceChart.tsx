'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from './ConvergenceChart.module.css';

interface ConvergenceChartProps {
  data: number[];
}

export const ConvergenceChart: React.FC<ConvergenceChartProps> = ({ data }) => {
  const chartData = data.map((distance, generation) => ({
    generation,
    bestDistance: distance,
  }));

  if (chartData.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <p className={styles.emptyMessage}>Nenhum dado disponível. Execute o algoritmo para ver o gráfico.</p>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.title}>Gráfico de Convergência</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
          <XAxis
            dataKey="generation"
            stroke="rgba(255, 255, 255, 0.2)"
            style={{ fontSize: 11, fontWeight: 300 }}
            tick={{ fill: 'rgba(255, 255, 255, 0.4)' }}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.2)"
            style={{ fontSize: 11, fontWeight: 300 }}
            tick={{ fill: 'rgba(255, 255, 255, 0.4)' }}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(20, 20, 30, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              color: '#FFFFFF',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
            itemStyle={{ color: '#0071e3', fontSize: 13, fontWeight: 500 }}
            labelStyle={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 11, marginBottom: 4 }}
            formatter={(value: any) => value.toFixed(2)}
          />
          <Line
            type="monotone"
            dataKey="bestDistance"
            stroke="#00ff41"
            dot={false}
            strokeWidth={3}
            isAnimationActive={false}
            name="Melhor Distância"
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );

};
