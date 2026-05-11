export interface City {
  id: number;
  x: number;
  y: number;
}

export interface Individual {
  tour: number[];
  distance: number;
}

export interface Generation {
  generation: number;
  bestDistance: number;
  population: Individual[];
}

export interface AlgorithmPhase {
  phase: 'initialization' | 'evaluation' | 'selection' | 'reproduction';
  description: string;
}

export class TSPGeneticAlgorithm {
  private cities: City[] = [];
  private populationSize: number;
  private mutationRate: number;
  private elitismRate: number;
  private population: Individual[] = [];
  private generation: number = 0;
  private bestSolution: Individual | null = null;
  private generationHistory: number[] = [];
  private currentPhase: AlgorithmPhase = { phase: 'initialization', description: 'Inicializando...' };
  private generationsWithoutImprovement: number = 0;
  private lastBestDistance: number = Infinity;

  constructor(populationSize = 50, mutationRate = 0.02, elitismRate = 0.1) {
    this.populationSize = Math.max(4, populationSize);
    this.mutationRate = Math.max(0, Math.min(1, mutationRate));
    this.elitismRate = Math.max(0, Math.min(1, elitismRate));
  }

  setCities(cities: City[]): void {
    this.cities = cities;
    this.generation = 0;
    this.population = [];
    this.bestSolution = null;
    this.generationHistory = [];
  }

  private calculateDistance(tour: number[]): number {
    let distance = 0;
    const len = tour.length;
    for (let i = 0; i < len; i++) {
      const from = this.cities[tour[i]];
      const to = this.cities[tour[(i + 1) % len]];
      const dx = from.x - to.x;
      const dy = from.y - to.y;
      distance += Math.hypot(dx, dy);
    }
    return distance;
  }

  private createRandomTour(): number[] {
    const tour = Array.from({ length: this.cities.length }, (_, i) => i);
    for (let i = tour.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tour[i], tour[j]] = [tour[j], tour[i]];
    }
    return tour;
  }

  initialize(): void {
    if (this.cities.length < 2) return;

    this.currentPhase = { phase: 'initialization', description: 'Criando população inicial...' };
    this.population = [];

    for (let i = 0; i < this.populationSize; i++) {
      const tour = this.createRandomTour();
      const distance = this.calculateDistance(tour);
      this.population.push({ tour, distance });
    }

    this.sortPopulation();
    this.bestSolution = { ...this.population[0] };
    this.generation = 0;
    this.generationHistory = [this.bestSolution.distance];
  }

  private sortPopulation(): void {
    this.population.sort((a, b) => a.distance - b.distance);
  }

  evaluate(): void {
    this.currentPhase = { phase: 'evaluation', description: 'Avaliando fitness...' };
    for (const individual of this.population) {
      individual.distance = this.calculateDistance(individual.tour);
    }
    this.sortPopulation();

    if (!this.bestSolution || this.population[0].distance < this.bestSolution.distance) {
      this.bestSolution = { ...this.population[0] };
    }
  }

  select(): Individual[] {
    this.currentPhase = { phase: 'selection', description: 'Selecionando indivíduos...' };
    const selected: Individual[] = [];
    const tournamentSize = this.population.length > 20 ? 2 : 3;
    const popLen = this.population.length;

    for (let i = 0; i < popLen; i++) {
      let best = this.population[Math.floor(Math.random() * popLen)];
      for (let j = 1; j < tournamentSize; j++) {
        const candidate = this.population[Math.floor(Math.random() * popLen)];
        if (candidate.distance < best.distance) {
          best = candidate;
        }
      }
      selected.push({ ...best });
    }

    return selected;
  }

  private mutate(tour: number[]): number[] {
    if (Math.random() > this.mutationRate) return tour;

    const mutated = [...tour];
    const i = Math.floor(Math.random() * mutated.length);
    const j = Math.floor(Math.random() * mutated.length);
    [mutated[i], mutated[j]] = [mutated[j], mutated[i]];
    return mutated;
  }

  private crossover(parent1: number[], parent2: number[]): number[] {
    const size = parent1.length;
    const start = Math.floor(Math.random() * size);
    const end = Math.floor(Math.random() * size);

    const [a, b] = start < end ? [start, end] : [end, start];

    const child: number[] = new Array(size).fill(-1);

    for (let i = a; i <= b; i++) {
      child[i] = parent1[i];
    }

    let childIndex = (b + 1) % size;
    for (let i = 0; i < size; i++) {
      const city = parent2[(b + 1 + i) % size];
      if (!child.includes(city)) {
        child[childIndex] = city;
        childIndex = (childIndex + 1) % size;
      }
    }

    return child;
  }

  reproduce(selected: Individual[]): void {
    this.currentPhase = { phase: 'reproduction', description: 'Criando nova geração...' };

    const eliteCount = Math.ceil(this.population.length * this.elitismRate);
    const newPopulation: Individual[] = [];

    for (let i = 0; i < eliteCount; i++) {
      newPopulation.push({ ...this.population[i] });
    }

    while (newPopulation.length < this.population.length) {
      const parent1 = selected[Math.floor(Math.random() * selected.length)].tour;
      const parent2 = selected[Math.floor(Math.random() * selected.length)].tour;
      let child = this.crossover(parent1, parent2);
      child = this.mutate(child);

      const distance = this.calculateDistance(child);
      newPopulation.push({ tour: child, distance });
    }

    this.population = newPopulation.slice(0, this.population.length);
  }

  step(): Generation {
    if (this.population.length === 0) {
      this.initialize();
      this.lastBestDistance = this.bestSolution!.distance;
    }

    this.evaluate();
    const selected = this.select();
    this.reproduce(selected);

    this.generation++;
    
    // Registrar apenas a cada 5 gerações para performance
    if (this.generation % 5 === 0) {
      this.generationHistory.push(this.bestSolution!.distance);
    }

    // Detectar convergência: se melhorou, resetar contador; senão, incrementar
    if (this.bestSolution!.distance < this.lastBestDistance) {
      this.lastBestDistance = this.bestSolution!.distance;
      this.generationsWithoutImprovement = 0;
    } else {
      this.generationsWithoutImprovement++;
    }

    return {
      generation: this.generation,
      bestDistance: this.bestSolution!.distance,
      population: this.population,
    };
  }

  setParameters(populationSize: number, mutationRate: number, elitismRate: number): void {
    const oldSize = this.populationSize;
    this.populationSize = Math.max(4, populationSize);
    this.mutationRate = Math.max(0, Math.min(1, mutationRate));
    this.elitismRate = Math.max(0, Math.min(1, elitismRate));

    if (oldSize !== this.populationSize && this.population.length > 0) {
      if (this.populationSize > this.population.length) {
        for (let i = this.population.length; i < this.populationSize; i++) {
          const tour = this.createRandomTour();
          const distance = this.calculateDistance(tour);
          this.population.push({ tour, distance });
        }
      } else {
        this.population = this.population.slice(0, this.populationSize);
      }
      this.sortPopulation();
    }
  }

  getStats() {
    return {
      generation: this.generation,
      bestDistance: this.bestSolution?.distance ?? 0,
      citiesCount: this.cities.length,
      populationSize: this.populationSize,
      mutationRate: this.mutationRate,
      elitismRate: this.elitismRate,
      currentPhase: this.currentPhase,
    };
  }

  getBestTour(): number[] {
    return this.bestSolution?.tour ?? [];
  }

  getGenerationHistory(): number[] {
    return this.generationHistory;
  }

  getPopulation(): Individual[] {
    return this.population;
  }

  reset(): void {
    this.cities = [];
    this.population = [];
    this.generation = 0;
    this.bestSolution = null;
    this.generationHistory = [];
    this.generationsWithoutImprovement = 0;
    this.lastBestDistance = Infinity;
  }

  hasConverged(maxGenerationsWithoutImprovement: number = 50): boolean {
    return this.generationsWithoutImprovement >= maxGenerationsWithoutImprovement;
  }
}
