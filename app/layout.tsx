import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TSP Genetic Algorithm Visualizer',
  description: 'Interactive visualization of Genetic Algorithms solving the Traveling Salesman Problem',
  keywords: ['genetic algorithm', 'TSP', 'traveling salesman', 'optimization', 'visualization'],
  authors: [{ name: 'Senior Developer' }],
  openGraph: {
    title: 'TSP Genetic Algorithm Visualizer',
    description: 'Interactive visualization of Genetic Algorithms solving the Traveling Salesman Problem',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
