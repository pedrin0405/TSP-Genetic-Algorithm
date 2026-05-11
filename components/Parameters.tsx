'use client';

import React from 'react';
import styles from './Parameters.module.css';

interface ParametersProps {
  populationSize: number;
  mutationRate: number;
  elitismRate: number;
  onPopulationSizeChange: (size: number) => void;
  onMutationRateChange: (rate: number) => void;
  onElitismRateChange: (rate: number) => void;
  isRunning: boolean;
  minPopulation?: number;
  maxPopulation?: number;
}

export const Parameters: React.FC<ParametersProps> = ({
  populationSize,
  mutationRate,
  elitismRate,
  onPopulationSizeChange,
  onMutationRateChange,
  onElitismRateChange,
  isRunning,
  minPopulation = 4,
  maxPopulation = 200,
}) => {
  return (
    <div className={styles.parametersContainer}>
      <h3 className={styles.title}>Parâmetros do Algoritmo</h3>

      <div className={styles.parameterGroup}>
        <div className={styles.labelWrapper}>
          <label className={styles.label}>Tamanho da População</label>
          <div className={styles.helpIcon} title="Quantidade de rotas testadas ao mesmo tempo. Mais indivíduos = mais caminhos explorados.">?</div>
          <span className={styles.value}>{populationSize}</span>
        </div>
        <input
          type="range"
          min={minPopulation}
          max={maxPopulation}
          value={populationSize}
          onChange={(e) => onPopulationSizeChange(Number(e.target.value))}
          disabled={isRunning}
          className={styles.slider}
        />
        <div className={styles.rangeLabels}>
          <span>{minPopulation}</span>
          <span>{maxPopulation}</span>
        </div>
      </div>

      <div className={styles.parameterGroup}>
        <div className={styles.labelWrapper}>
          <label className={styles.label}>Taxa de Mutação</label>
          <div className={styles.helpIcon} title="Chance de uma rota mudar ao acaso. Isso ajuda a descobrir novos caminhos e evitar que o algoritmo 'trave'.">?</div>
          <span className={styles.value}>{(mutationRate * 100).toFixed(1)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={mutationRate}
          onChange={(e) => onMutationRateChange(Number(e.target.value))}
          disabled={isRunning}
          className={styles.slider}
        />
        <div className={styles.rangeLabels}>
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      <div className={styles.parameterGroup}>
        <div className={styles.labelWrapper}>
          <label className={styles.label}>Taxa de Elitismo</label>
          <div className={styles.helpIcon} title="Porcentagem dos melhores resultados que passam direto para a próxima rodada sem mudanças.">?</div>
          <span className={styles.value}>{(elitismRate * 100).toFixed(1)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={elitismRate}
          onChange={(e) => onElitismRateChange(Number(e.target.value))}
          disabled={isRunning}
          className={styles.slider}
        />
        <div className={styles.rangeLabels}>
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {isRunning && <p className={styles.hint}>Parâmetros bloqueados durante execução</p>}
    </div>
  );
};
