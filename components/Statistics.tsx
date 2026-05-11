'use client';

import React from 'react';
import styles from './Statistics.module.css';

interface StatisticsProps {
  generation: number;
  bestDistance: number;
  citiesCount: number;
  currentPhase: string;
  phaseDescription: string;
}

export const Statistics: React.FC<StatisticsProps> = ({
  generation,
  bestDistance,
  citiesCount,
  currentPhase,
  phaseDescription,
}) => {
  const getPhaseColor = (phase: string): string => {
    switch (phase) {
      case 'initialization':
        return '#00ff41';
      case 'evaluation':
        return '#00cc33';
      case 'selection':
        return '#00a329';
      case 'reproduction':
        return '#008020';
      default:
        return '#00ff41';
    }
  };


  const getPhaseLabel = (phase: string): string => {
    const labels: Record<string, string> = {
      initialization: 'Inicialização',
      evaluation: 'Avaliação',
      selection: 'Seleção',
      reproduction: 'Reprodução',
    };
    return labels[phase] || phase;
  };

  return (
    <div className={styles.statisticsContainer}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Gerações</span>
          <span className={styles.statValue}>{generation}</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Melhor Distância</span>
          <span className={styles.statValue}>{bestDistance.toFixed(2)}</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Cidades</span>
          <span className={styles.statValue}>{citiesCount}</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Fase Atual</span>
          <span
            className={styles.statValue}
            style={{ color: getPhaseColor(currentPhase) }}
          >
            {getPhaseLabel(currentPhase)}
          </span>
        </div>
      </div>
    </div>
  );

};
