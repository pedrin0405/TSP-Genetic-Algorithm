import React from 'react'
import { CheckCircle2 } from 'lucide-react'

interface PhaseConfig {
  num: number
  title: string
  description: string
}

const phases: PhaseConfig[] = [
  {
    num: 1,
    title: 'Inicialização',
    description: 'Gera população inicial com rotas aleatórias',
  },
  {
    num: 2,
    title: 'Avaliação (Fitness)',
    description: 'Calcula distância total de cada rota',
  },
  {
    num: 3,
    title: 'Seleção',
    description: 'Torneio: melhores indivíduos sobrevivem',
  },
  {
    num: 4,
    title: 'Cruzamento (OX)',
    description: 'Combina rotas dos pais geneticamente',
  },
  {
    num: 5,
    title: 'Mutação',
    description: 'Troca aleatória de cidades para diversidade',
  },
]

interface AlgorithmPhasesProps {
  currentPhase: number
}

export default function AlgorithmPhases({ currentPhase }: AlgorithmPhasesProps) {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Fases do Algoritmo
      </h2>

      <div className="space-y-3">
        {phases.map((phase) => {
          const isActive = currentPhase === phase.num - 1
          const isCompleted = currentPhase > phase.num - 1
          
          return (
            <div
              key={phase.num}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                isActive
                  ? 'border-sky-500 bg-sky-50 dark:border-sky-500 dark:bg-sky-950/30'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
              } ${isCompleted ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                    isActive
                      ? 'bg-sky-500 text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    phase.num
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${
                    isActive
                      ? 'text-sky-900 dark:text-sky-200'
                      : 'text-slate-900 dark:text-white'
                  }`}>
                    {phase.title}
                  </p>
                  <p className={`text-xs mt-1 ${
                    isActive
                      ? 'text-sky-700 dark:text-sky-300'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    {phase.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Educational Info */}
      <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
        <p className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
          <span className="font-semibold">Dica:</span> O algoritmo genético simula a evolução natural, selecionando as melhores rotas e combinando-as para encontrar soluções cada vez melhores.
        </p>
      </div>
    </div>
  )
}
