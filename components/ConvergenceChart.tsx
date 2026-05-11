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
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 150, 255, 0.2)" />
          <XAxis
            dataKey="generation"
            stroke="rgba(255, 255, 255, 0.5)"
            style={{ fontSize: 12 }}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.5)"
            style={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(26, 26, 46, 0.95)',
              border: '1px solid rgba(100, 150, 255, 0.3)',
              borderRadius: '4px',
              color: '#FFFFFF',
            }}
            labelStyle={{ color: '#FFFFFF' }}
            formatter={(value: any) => value.toFixed(2)}
          />
          <Legend
            wrapperStyle={{ paddingTop: '16px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="bestDistance"
            stroke="#6495ED"
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
            name="Melhor Distância"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
