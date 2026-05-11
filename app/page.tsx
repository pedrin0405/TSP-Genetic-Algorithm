'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Canvas from '@/components/Canvas'
import ParametersPanel from '@/components/ParametersPanel'
import AlgorithmPhases from '@/components/AlgorithmPhases'
import Metrics from '@/components/Metrics'
import EvolutionChart from '@/components/EvolutionChart'
import { useGeneticAlgorithm } from '@/lib/useGeneticAlgorithm'

export default function Home() {
  const {
    cities,
    bestRoute,
    bestDistance,
    generation,
    running,
    currentPhase,
    historyGen,
    historyDist,
    handleCanvasClick,
    handleRandomCities,
    handleClearCities,
    handleToggleRun,
    handleStepOnce,
    parameters,
    handleParameterChange,
  } = useGeneticAlgorithm()

  return (
    <main className="bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Canvas */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  Mapa de Cidades
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Clique no mapa para adicionar cidades ou gere aleatoriamente
                </p>
              </div>
              <Canvas 
                cities={cities} 
                bestRoute={bestRoute} 
                onClick={handleCanvasClick}
              />
            </div>
          </div>

          {/* Right Column - Parameters */}
          <div className="lg:col-span-1">
            <ParametersPanel
              cityCount={cities.length}
              parameters={parameters}
              onParameterChange={handleParameterChange}
              onRandomCities={handleRandomCities}
              onClearCities={handleClearCities}
              running={running}
              onToggleRun={handleToggleRun}
              onStepOnce={handleStepOnce}
            />
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Metrics 
            generation={generation}
            bestDistance={bestDistance}
            cityCount={cities.length}
            populationSize={parameters.populationSize}
          />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Evolution Chart - Span 2 cols */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Evolução da Solução
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Convergência da melhor distância ao longo das gerações
                  </p>
                </div>
                <div className={`badge ${running ? 'badge-success' : 'badge-warning'}`}>
                  {running ? 'Rodando' : 'Pausado'}
                </div>
              </div>
              <EvolutionChart 
                data={historyGen.map((gen, idx) => ({
                  generation: gen,
                  distance: historyDist[idx] || 0,
                }))}
              />
            </div>
          </div>

          {/* Algorithm Phases */}
          <div className="lg:col-span-1">
            <AlgorithmPhases currentPhase={currentPhase} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Desenvolvido com ❤️ • TSP Genetic Algorithm Visualizer
          </p>
        </div>
      </div>
    </main>
  )
}
