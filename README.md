# TSP Genetic Algorithm Visualizer

A professional, interactive web application for visualizing and understanding Genetic Algorithms applied to the Traveling Salesman Problem (TSP).

## Features

- 🎯 **Interactive Canvas**: Click to place cities or generate random configurations
- 🧬 **Real-time Visualization**: Watch the algorithm evolve and find optimal routes
- 📊 **Advanced Charts**: Track fitness progression with Recharts
- ⚙️ **Configurable Parameters**: Adjust population size, mutation rate, and elitism
- 🌙 **Dark Mode**: Automatic theme detection
- 📱 **Fully Responsive**: Works seamlessly on all devices
- ⚡ **Performance Optimized**: Built with Next.js for optimal speed

## Tech Stack

- **Next.js 15** - React framework with server-side rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern utility-first styling
- **Recharts** - React chart library
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Add Cities**: Click on the canvas to manually place cities, or use "Generate Random" to create a random configuration
2. **Adjust Parameters**: Configure population size, mutation rate, and elitism percentage
3. **Start Evolution**: Click "Start" to begin the genetic algorithm
4. **Monitor Progress**: Watch the evolution happen in real-time with visual feedback
5. **Analyze**: Review the fitness chart to understand convergence patterns

## Algorithm Details

### Selection
Uses tournament selection to identify the fittest individuals for reproduction.

### Crossover (OX)
Implements Order Crossover (OX) to combine genetic material from two parent routes while maintaining valid tour structure.

### Mutation
Applies random city swaps to introduce genetic diversity and escape local optima.

### Elitism
Preserves the best solutions across generations to prevent performance degradation.

## Deployment

### Deploy to Vercel

The easiest way to deploy is to use [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

Or connect your Git repository directly on [vercel.com](https://vercel.com/new).

## License

MIT

## Author

Created with ❤️ by a senior developer

---

**Educational Project** - Learn about genetic algorithms while visualizing their power in solving complex optimization problems.
