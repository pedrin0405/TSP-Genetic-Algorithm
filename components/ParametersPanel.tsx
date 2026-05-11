'use client'

import React from 'react'
import { Play, Pause, RotateCcw, Trash2, Shuffle } from 'lucide-react'
import { Parameters } from '@/lib/types'

interface ParametersPanelProps {
  cityCount: number
  parameters: Parameters
  onParameterChange: (key: keyof Parameters, value: number) => void
  onRandomCities: () => void
  onClearCities: () => void
  running: boolean
  onToggleRun: () => void
  onStepOnce: () => void
}

export default function ParametersPanel({
  cityCount,
  parameters,
  onParameterChange,
  onRandomCities,
  onClearCities,
  running,
  onToggleRun,
  onStepOnce,
}: ParametersPanelProps) {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
        Configuração
      </h2>

      {/* Parameters */}
      <div className="space-y-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
        {/* Population Size */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="label-text">Tamanho da População</label>
            <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">
              {parameters.populationSize}
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="200"
            step="10"
            value={parameters.populationSize}
            onChange={(e) => onParameterChange('populationSize', parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Mais indivíduos = mais exploração, mais lento
          </p>
        </div>

        {/* Mutation Rate */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="label-text">Taxa de Mutação</label>
            <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">
              {parameters.mutationRate}%
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={parameters.mutationRate}
            onChange={(e) => onParameterChange('mutationRate', parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Mais mutação = mais diversidade, menos convergência
          </p>
        </div>

        {/* Elitism Rate */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="label-text">Elitismo</label>
            <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">
              {parameters.elitismRate}%
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={parameters.elitismRate}
            onChange={(e) => onParameterChange('elitismRate', parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Preserva os melhores indivíduos
          </p>
        </div>

        {/* City Count */}
        <div>
          <label className="label-text">Cidades Aleatórias</label>
          <select
            value={cityCount > 20 ? 20 : cityCount}
            onChange={(e) => {
              onClearCities()
              // The random generation happens after clear
              setTimeout(() => onRandomCities(), 0)
            }}
            className="input-field text-sm"
          >
            <option value="5">5 cidades</option>
            <option value="8">8 cidades</option>
            <option value="12">12 cidades</option>
            <option value="16">16 cidades</option>
            <option value="20">20 cidades</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onRandomCities}
            disabled={running}
            className="btn-secondary text-xs justify-center"
          >
            <Shuffle className="w-4 h-4" />
            Aleatório
          </button>
          <button
            onClick={onClearCities}
            disabled={running}
            className="btn-secondary text-xs justify-center"
          >
            <Trash2 className="w-4 h-4" />
            Limpar
          </button>
        </div>

        {/* Run/Pause Button */}
        <button
          onClick={onToggleRun}
          disabled={cityCount < 3}
          className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {running ? (
            <>
              <Pause className="w-4 h-4" />
              Pausar
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Iniciar
            </>
          )}
        </button>

        {/* Step Button */}
        <button
          onClick={onStepOnce}
          disabled={cityCount < 3 || running}
          className="btn-secondary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4" />
          Próximo Passo
        </button>
      </div>

      {/* Info Message */}
      {cityCount < 3 && (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-xs text-amber-800 dark:text-amber-200">
            ⚠️ Adicione pelo menos 3 cidades para começar
          </p>
        </div>
      )}
    </div>
  )
}
