import { Dna } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600">
              <Dna className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 dark:text-white">Genetic TSP</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Solve the Traveling Salesman Problem
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
