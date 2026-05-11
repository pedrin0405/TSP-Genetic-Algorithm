'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TSPGeneticAlgorithm, City } from '@/lib/tsp';
import { Canvas } from './Canvas';
import { Controls } from './Controls';
import { Statistics } from './Statistics';
import { Parameters } from './Parameters';
import { ConvergenceChart } from './ConvergenceChart';
import styles from './TSPSolver.module.css';

export const TSPSolver: React.FC = () => {
  const algorithmRef = useRef<TSPGeneticAlgorithm>(new TSPGeneticAlgorithm(30, 0.02, 0.1));
  const animationRef = useRef<number | null>(null);

  // Inicializar com 2 cidades
  const initialCities: City[] = [
    { id: 0, x: 150, y: 150 },
    { id: 1, x: 450, y: 450 },
  ];

  const [cities, setCities] = useState<City[]>(initialCities);
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [bestDistance, setBestDistance] = useState(0);
  const [bestTour, setBestTour] = useState<number[]>([]);
  const [generationHistory, setGenerationHistory] = useState<number[]>([]);
  const [currentPhase, setCurrentPhase] = useState('initialization');
  const [phaseDescription, setPhaseDescription] = useState('2 cidades carregadas. Adicione mais ou clique Play!');
  const [populationSize, setPopulationSize] = useState(30);
  const [mutationRate, setMutationRate] = useState(0.02);
  const [elitismRate, setElitismRate] = useState(0.1);

  const algorithm = algorithmRef.current;

  const updateStats = () => {
    const stats = algorithm.getStats();
    setGeneration(stats.generation);
    setBestDistance(stats.bestDistance);
    setCurrentPhase(stats.currentPhase.phase);
    setPhaseDescription(stats.currentPhase.description);
    setBestTour(algorithm.getBestTour());
    setGenerationHistory(algorithm.getGenerationHistory());
  };

  const handleCityAdded = (city: City) => {
    const newCities = [...cities, city];
    setCities(newCities);
    algorithm.setCities(newCities);
  };

  const handleRandomCities = () => {
    const newCities: City[] = [];
    const count = Math.floor(Math.random() * 10) + 8; // 8-18 cidades (reduzido)

    for (let i = 0; i < count; i++) {
      newCities.push({
        id: i,
        x: Math.random() * 540 + 30,
        y: Math.random() * 540 + 30,
      });
    }

    setCities(newCities);
    algorithm.setCities(newCities);
    setGeneration(0);
    setBestDistance(0);
    setBestTour([]);
    setGenerationHistory([]);
    setCurrentPhase('initialization');
    setPhaseDescription('Clique no botão Play para iniciar');
  };

  const handleClear = () => {
    setCities([]);
    algorithm.reset();
    setGeneration(0);
    setBestDistance(0);
    setBestTour([]);
    setGenerationHistory([]);
    setCurrentPhase('initialization');
    setPhaseDescription('Clique para adicionar cidades');
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handlePlay = () => {
    if (cities.length < 2) return;

    if (generation === 0 && algorithm.getGenerationHistory().length === 0) {
      algorithm.initialize();
      updateStats();
    }

    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleStep = () => {
    if (cities.length < 2) return;

    if (generation === 0 && algorithm.getGenerationHistory().length === 0) {
      algorithm.initialize();
    }

    algorithm.step();
    updateStats();
  };

  const handlePopulationSizeChange = (size: number) => {
    setPopulationSize(size);
    algorithm.setParameters(size, mutationRate, elitismRate);
  };

  const handleMutationRateChange = (rate: number) => {
    setMutationRate(rate);
    algorithm.setParameters(populationSize, rate, elitismRate);
  };

  const handleElitismRateChange = (rate: number) => {
    setElitismRate(rate);
    algorithm.setParameters(populationSize, mutationRate, rate);
  };

  // Inicializar algoritmo com cidades iniciais
  useEffect(() => {
    algorithmRef.current.setCities(initialCities);
  }, []);

  // Main animation loop - rodar múltiplos steps por frame para performance
  useEffect(() => {
    if (!isRunning) return;

    const animationLoop = () => {
      // Executar 10 steps por frame para acelerar
      for (let i = 0; i < 10; i++) {
        algorithm.step();
        // Parar automaticamente se convergiu (50 gens sem melhoria)
        if (algorithm.hasConverged()) {
          setIsRunning(false);
          updateStats();
          setPhaseDescription('✅ Convergência atingida! Melhor solução encontrada.');
          return;
        }
      }
      updateStats();
      animationRef.current = requestAnimationFrame(animationLoop);
    };

    animationRef.current = requestAnimationFrame(animationLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>TSP Genetic Algorithm Solver</h1>
      </div>


      <div className={styles.mainContent}>
        {/* Coluna 1: Mapa e Controles */}
        <div className={styles.column}>
          <Canvas
            cities={cities}
            bestTour={bestTour}
            onCityAdded={handleCityAdded}
            canvasWidth={600}
            canvasHeight={480}
          />
          <div className={styles.controlsWrapper}>
            <Controls
              isRunning={isRunning}
              onPlay={handlePlay}
              onStop={handleStop}
              onStep={handleStep}
              onRandom={handleRandomCities}
              onClear={handleClear}
              citiesCount={cities.length}
            />
          </div>
        </div>

        {/* Coluna 2 e 3 Agrupadas */}
        <div className={styles.rightGroup}>
          <div className={styles.topRow}>
            <div className={styles.column}>
              <Statistics
                generation={generation}
                bestDistance={bestDistance}
                citiesCount={cities.length}
                currentPhase={currentPhase}
                phaseDescription={phaseDescription}
              />
            </div>
            <div className={styles.column}>
              <Parameters
                populationSize={populationSize}
                mutationRate={mutationRate}
                elitismRate={elitismRate}
                onPopulationSizeChange={handlePopulationSizeChange}
                onMutationRateChange={handleMutationRateChange}
                onElitismRateChange={handleElitismRateChange}
                isRunning={isRunning}
                minPopulation={10}
                maxPopulation={100}
              />
            </div>
          </div>
          <div className={styles.bottomRow}>
            <div className={styles.commentBox}>
              <p>{phaseDescription}</p>
            </div>
            <ConvergenceChart data={generationHistory} />
          </div>
        </div>
      </div>
    </div>
  );


};
