export interface City {
  x: number
  y: number
}

export type Route = number[]

export interface Individual {
  route: Route
  distance: number
}

export interface Parameters {
  populationSize: number
  mutationRate: number
  elitismRate: number
}

export interface AlgorithmState {
  cities: City[]
  population: Individual[]
  bestRoute: Route | null
  bestDistance: number
  generation: number
  running: boolean
  currentPhase: number
  historyGen: number[]
  historyDist: number[]
}
