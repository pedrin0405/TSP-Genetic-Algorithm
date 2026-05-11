import { City, Route, Individual, Parameters } from './types'

/**
 * Calculates Euclidean distance between two cities
 */
export function distance(a: City, b: City): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Calculates total distance of a route
 */
export function routeDistance(cities: City[], route: Route): number {
  let totalDistance = 0
  for (let i = 0; i < route.length; i++) {
    const from = cities[route[i]]
    const to = cities[route[(i + 1) % route.length]]
    totalDistance += distance(from, to)
  }
  return totalDistance
}

/**
 * Creates a random route (permutation of city indices)
 */
export function createRandomRoute(cityCount: number): Route {
  const route = Array.from({ length: cityCount }, (_, i) => i)
  // Fisher-Yates shuffle
  for (let i = route.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[route[i], route[j]] = [route[j], route[i]]
  }
  return route
}

/**
 * Initializes population with random routes
 */
export function initializePopulation(
  cities: City[],
  parameters: Parameters
): Individual[] {
  return Array.from({ length: parameters.populationSize }, () => ({
    route: createRandomRoute(cities.length),
    distance: 0,
  }))
}

/**
 * Evaluates fitness of all individuals in population
 */
export function evaluatePopulation(
  cities: City[],
  population: Individual[]
): void {
  for (const individual of population) {
    individual.distance = routeDistance(cities, individual.route)
  }
}

/**
 * Sorts population by fitness (distance)
 */
export function sortPopulation(population: Individual[]): void {
  population.sort((a, b) => a.distance - b.distance)
}

/**
 * Tournament selection - selects best individual from random subset
 */
export function tournamentSelection(population: Individual[], tournamentSize = 3): Route {
  let best: Individual | null = null
  for (let i = 0; i < tournamentSize; i++) {
    const idx = Math.floor(Math.random() * population.length)
    const individual = population[idx]
    if (!best || individual.distance < best.distance) {
      best = individual
    }
  }
  return best!.route
}

/**
 * Order Crossover (OX) - crossover operator for TSP
 * Creates a child by inheriting a segment from parent 1 and filling gaps with parent 2
 */
export function orderCrossover(parent1: Route, parent2: Route): Route {
  const n = parent1.length
  const start = Math.floor(Math.random() * n)
  const end = Math.floor(Math.random() * n)
  const [segStart, segEnd] = start < end ? [start, end] : [end, start]

  const child: number[] = new Array(n).fill(-1)

  // Copy segment from parent 1
  for (let i = segStart; i <= segEnd; i++) {
    child[i] = parent1[i]
  }

  // Fill remaining positions with parent 2 in order
  let childPos = 0
  for (let i = 0; i < n; i++) {
    if (!child.includes(parent2[i])) {
      while (child[childPos] !== -1) {
        childPos++
      }
      child[childPos] = parent2[i]
    }
  }

  return child
}

/**
 * Mutation - swaps two random cities in the route
 */
export function mutate(route: Route, mutationRate: number): Route {
  const child = [...route]
  if (Math.random() < mutationRate / 100) {
    const i = Math.floor(Math.random() * child.length)
    const j = Math.floor(Math.random() * child.length)
    ;[child[i], child[j]] = [child[j], child[i]]
  }
  return child
}

/**
 * Performs one generation of the genetic algorithm
 */
export function nextGeneration(
  cities: City[],
  population: Individual[],
  parameters: Parameters,
  bestDistance: number
): {
  population: Individual[]
  bestRoute: Route
  bestDistance: number
} {
  if (cities.length < 3) {
    return { population, bestRoute: population[0].route, bestDistance }
  }

  // Sort by fitness
  sortPopulation(population)

  // Elitism - preserve best individuals
  const eliteCount = Math.max(1, Math.floor(population.length * (parameters.elitismRate / 100)))
  const newPopulation: Individual[] = population
    .slice(0, eliteCount)
    .map((ind) => ({ route: [...ind.route], distance: ind.distance }))

  // Generate offspring
  while (newPopulation.length < population.length) {
    const parent1 = tournamentSelection(population)
    const parent2 = tournamentSelection(population)
    const childRoute = mutate(orderCrossover(parent1, parent2), parameters.mutationRate)
    const childDistance = routeDistance(cities, childRoute)
    newPopulation.push({ route: childRoute, distance: childDistance })
  }

  // Update best solution if improved
  sortPopulation(newPopulation)
  let newBestDistance = bestDistance
  let newBestRoute = population[0].route

  if (newPopulation[0].distance < bestDistance) {
    newBestDistance = newPopulation[0].distance
    newBestRoute = [...newPopulation[0].route]
  }

  return {
    population: newPopulation,
    bestRoute: newBestRoute,
    bestDistance: newBestDistance,
  }
}
