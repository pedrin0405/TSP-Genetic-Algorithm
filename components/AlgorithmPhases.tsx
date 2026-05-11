import React from 'react'

interface AlgorithmPhasesProps {
  currentPhase: number
}

const phases = [
  { name: 'Initialization', description: 'Creating population' },
  { name: 'Evaluation', description: 'Computing fitness' },
  { name: 'Selection', description: 'Tournament selection' },
  { name: 'Reproduction', description: 'Crossover & mutation' },
]

export default function AlgorithmPhases({ currentPhase }: AlgorithmPhasesProps) {
  return (
    <div className="space-y-3">
      {phases.map((phase, idx) => {
        const isActive = currentPhase === idx
        const isCompleted = currentPhase > idx

        return (
          <div
            key={idx}
            className={`p-3 rounded-lg transition-all ${
              isActive
                ? 'bg-blue-50 dark:bg-blue-950 border-2 border-blue-500'
                : isCompleted
                ? 'bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 opacity-60'
                : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : isCompleted
                    ? 'bg-slate-400 text-white'
                    : 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-slate-100'
                }`}
              >
                {isCompleted ? '✓' : idx + 1}
              </div>
              <div>
                <p className={`text-sm font-semibold ${isActive ? 'text-blue-900 dark:text-blue-200' : 'text-slate-900 dark:text-white'}`}>
                  {phase.name}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{phase.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
