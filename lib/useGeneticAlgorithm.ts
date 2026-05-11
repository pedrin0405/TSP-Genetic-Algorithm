'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  City,
  Route,
  Individual,
  Parameters,
} from './types'
import {
  createRandomRoute,
  initializePopulation,
  evaluatePopulation,
  sortPopulation,
  routeDistance,
  nextGeneration,
} from './geneticAlgorithm'

export function useGeneticAlgorithm() {
  const [cities, setCities] = useState<City[]>([])
  const [bestRoute, setBestRoute] = useState<Route | null>(null)
  const [bestDistance, setBestDistance] = useState<number>(Infinity)
  const [generation, setGeneration] = useState(0)
  const [running, setRunning] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(-1)
  const [historyGen, setHistoryGen] = useState<number[]>([])
  const [historyDist, setHistoryDist] = useState<number[]>([])
  const [parameters, setParameters] = useState<Parameters>({
    populationSize: 80,
    mutationRate: 2,
    elitismRate: 10,
  })

  const populationRef = useRef<Individual[]>([])
  const animationFrameRef = useRef<NodeJS.Timeout | null>(null)
  const runningRef = useRef(false)
  const citiesRef = useRef<City[]>([])
  const parametersRef = useRef<Parameters>({
    populationSize: 80,
    mutationRate: 2,
    elitismRate: 10,
  })
  const bestDistanceRef = useRef<number>(Infinity)

  // Keep refs in sync with state
  useEffect(() => {
    runningRef.current = running
  }, [running])

  useEffect(() => {
    citiesRef.current = cities
  }, [cities])

  useEffect(() => {
    parametersRef.current = parameters
  }, [parameters])

  useEffect(() => {
    bestDistanceRef.current = bestDistance
  }, [bestDistance])

  // Handle canvas click
  const handleCanvasClick = useCallback((x: number, y: number) => {
    setCities((prev) => [...prev, { x, y }])
    // Reset algorithm when cities change
    populationRef.current = []
    setBestRoute(null)
    setBestDistance(Infinity)
    setGeneration(0)
    setHistoryGen([])
    setHistoryDist([])
  }, [])

  // Generate random cities
  const handleRandomCities = useCallback(() => {
    setRunning(false)
    const count = Math.floor(Math.random() * 8) + 8 // 8-15 cities
    const newCities: City[] = []
    for (let i = 0; i < count; i++) {
      newCities.push({
        x: 0.1 + Math.random() * 0.8,
        y: 0.1 + Math.random() * 0.8,
      })
    }
    setCities(newCities)
    populationRef.current = []
    setBestRoute(null)
    setBestDistance(Infinity)
    setGeneration(0)
    setCurrentPhase(-1)
    setHistoryGen([])
    setHistoryDist([])
  }, [])

  // Clear cities
  const handleClearCities = useCallback(() => {
    setRunning(false)
    setCities([])
    populationRef.current = []
    setBestRoute(null)
    setBestDistance(Infinity)
    setGeneration(0)
    setCurrentPhase(-1)
    setHistoryGen([])
    setHistoryDist([])
  }, [])

  // Initialize population
  const initializeAlgorithm = useCallback(() => {
    if (cities.length < 3) return

    const pop = initializePopulation(cities, parameters)
    evaluatePopulation(cities, pop)
    sortPopulation(pop)

    populationRef.current = pop
    setBestRoute([...pop[0].route])
    setBestDistance(pop[0].distance)
    setGeneration(0)
    setHistoryGen([0])
    setHistoryDist([Math.round(pop[0].distance)])
  }, [cities, parameters])

  // Update parameter
  const handleParameterChange = useCallback(
    (key: keyof Parameters, value: number) => {
      setParameters((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  // Perform one evolution step (defined first, used by other callbacks)
  const performEvolutionStep = useCallback(() => {
    if (populationRef.current.length === 0 || citiesRef.current.length < 3) return

    const result = nextGeneration(
      citiesRef.current,
      populationRef.current,
      parametersRef.current,
      bestDistanceRef.current
    )

    populationRef.current = result.population
    setBestRoute([...result.bestRoute])
    setBestDistance(result.bestDistance)
    bestDistanceRef.current = result.bestDistance

    setGeneration((prev) => {
      const newGen = prev + 1
      
      // Update history every 5 generations or for first 10
      if (newGen % 5 === 0 || newGen <= 10) {
        setHistoryGen((prev) => {
          const updated = [...prev, newGen]
          return updated.length > 60 ? updated.slice(-60) : updated
        })
        setHistoryDist((prev) => {
          const updated = [...prev, Math.round(result.bestDistance)]
          return updated.length > 60 ? updated.slice(-60) : updated
        })
      }

      return newGen
    })
  }, [])

  // Step once
  const handleStepOnce = useCallback(() => {
    if (citiesRef.current.length < 3) return

    if (populationRef.current.length === 0) {
      const pop = initializePopulation(citiesRef.current, parametersRef.current)
      evaluatePopulation(citiesRef.current, pop)
      sortPopulation(pop)

      populationRef.current = pop
      setBestRoute([...pop[0].route])
      setBestDistance(pop[0].distance)
      bestDistanceRef.current = pop[0].distance
      setGeneration(0)
      setHistoryGen([0])
      setHistoryDist([Math.round(pop[0].distance)])
    }

    // Simulate phases
    setCurrentPhase(1)
    setTimeout(() => setCurrentPhase(2), 80)
    setTimeout(() => setCurrentPhase(3), 160)
    setTimeout(() => {
      setCurrentPhase(4)
      performEvolutionStep()
    }, 240)
  }, [performEvolutionStep])

  // Main algorithm loop
  const runAlgorithmLoop = useCallback(() => {
    const phaseSequence = [1, 2, 3, 4]
    let phaseIndex = 0

    const tick = () => {
      // Check runningRef directly instead of relying on closure state
      if (!runningRef.current) {
        return
      }

      const currentPhaseNum = phaseSequence[phaseIndex]
      setCurrentPhase(currentPhaseNum - 1)

      if (currentPhaseNum === 4) {
        performEvolutionStep()
      }

      phaseIndex = (phaseIndex + 1) % phaseSequence.length
      const delay = phaseIndex === 0 ? 60 : 15
      animationFrameRef.current = setTimeout(tick, delay)
    }

    tick()
  }, [performEvolutionStep])

  // Toggle running state
  const handleToggleRun = useCallback(() => {
    if (citiesRef.current.length < 3) return

    setRunning((prev) => {
      const newRunning = !prev

      if (newRunning) {
        if (populationRef.current.length === 0) {
          const pop = initializePopulation(citiesRef.current, parametersRef.current)
          evaluatePopulation(citiesRef.current, pop)
          sortPopulation(pop)

          populationRef.current = pop
          setBestRoute([...pop[0].route])
          setBestDistance(pop[0].distance)
          bestDistanceRef.current = pop[0].distance
          setGeneration(0)
          setHistoryGen([0])
          setHistoryDist([Math.round(pop[0].distance)])
        }
        setCurrentPhase(0)
      } else {
        if (animationFrameRef.current) {
          clearTimeout(animationFrameRef.current)
        }
      }

      return newRunning
    })
  }, [])

  // Run algorithm loop when running state changes
  useEffect(() => {
    if (running && populationRef.current.length > 0) {
      runAlgorithmLoop()
    } else if (!running) {
      if (animationFrameRef.current) {
        clearTimeout(animationFrameRef.current)
      }
    }

    return () => {
      if (animationFrameRef.current) {
        clearTimeout(animationFrameRef.current)
      }
    }
  }, [running])

  // Initialize on mount
  useEffect(() => {
    handleRandomCities()
  }, [handleRandomCities])

  return {
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
  }
}
