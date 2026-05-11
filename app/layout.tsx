import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TSP Genetic Algorithm Solver',
  description: 'Interactive visualization of Traveling Salesman Problem solutions using Genetic Algorithm',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
