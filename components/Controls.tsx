'use client';

import React from 'react';
import styles from './Controls.module.css';

interface ControlsProps {
  isRunning: boolean;
  onPlay: () => void;
  onStop: () => void;
  onStep: () => void;
  onRandom: () => void;
  onClear: () => void;
  citiesCount: number;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onPlay,
  onStop,
  onStep,
  onRandom,
  onClear,
  citiesCount,
}) => {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${styles.playButton} ${isRunning ? styles.active : ''}`}
          onClick={onPlay}
          disabled={citiesCount < 2}
          title="Inicia o algoritmo"
        >
          ▶ Play
        </button>
        <button
          className={`${styles.button} ${styles.stopButton} ${!isRunning ? styles.disabled : ''}`}
          onClick={onStop}
          disabled={!isRunning}
          title="Para o algoritmo"
        >
          ⏹ Stop
        </button>
        <button
          className={`${styles.button} ${styles.stepButton}`}
          onClick={onStep}
          disabled={citiesCount < 2}
          title="Avança uma geração"
        >
          ⏭ Step
        </button>
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${styles.randomButton}`}
          onClick={onRandom}
          title="Gera cidades aleatórias"
        >
          🎲 Aleatório
        </button>
        <button
          className={`${styles.button} ${styles.clearButton}`}
          onClick={onClear}
          disabled={citiesCount === 0}
          title="Limpa o canvas"
        >
          🗑 Limpar
        </button>
      </div>
    </div>
  );
};
