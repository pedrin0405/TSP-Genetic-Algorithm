'use client';

import React, { useRef, useEffect, useState } from 'react';
import type { City } from '@/lib/tsp';
import styles from './Canvas.module.css';

interface CanvasProps {
  cities: City[];
  bestTour: number[];
  onCityAdded: (city: City) => void;
  canvasWidth?: number;
  canvasHeight?: number;
}

export const Canvas: React.FC<CanvasProps> = ({
  cities,
  bestTour,
  onCityAdded,
  canvasWidth = 600,
  canvasHeight = 600,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newCity: City = {
      id: cities.length,
      x,
      y,
    };

    onCityAdded(newCity);
  };

  return (
    <div className={styles.canvasContainer}>
      <svg
        ref={svgRef}
        className={styles.canvas}
        width={canvasWidth}
        height={canvasHeight}
        onClick={handleCanvasClick}
      >
        {/* Grid background */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(100, 150, 255, 0.1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={canvasWidth} height={canvasHeight} fill="url(#grid)" />

        {/* Draw best tour path */}
        {bestTour.length > 1 && (
          <g className={styles.tourPath}>
            {bestTour.map((cityIndex, idx) => {
              const from = cities[bestTour[idx]];
              const to = cities[bestTour[(idx + 1) % bestTour.length]];
              if (!from || !to) return null;

              return (
                <line
                  key={`line-${idx}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#6495ED"
                  strokeWidth="2"
                  opacity="0.6"
                />
              );
            })}
          </g>
        )}

        {/* Draw cities */}
        {cities.map((city, idx) => (
          <g key={`city-${city.id}`}>
            <circle
              cx={city.x}
              cy={city.y}
              r={hoveredCity === idx ? 8 : 6}
              fill={bestTour.includes(idx) ? '#6495ED' : '#A9A9A9'}
              stroke="#FFFFFF"
              strokeWidth="2"
              className={styles.cityPoint}
              onMouseEnter={() => setHoveredCity(idx)}
              onMouseLeave={() => setHoveredCity(null)}
            />
            <text
              x={city.x}
              y={city.y - 12}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="bold"
              pointerEvents="none"
            >
              {idx}
            </text>
          </g>
        ))}
      </svg>
      <p className={styles.hint}>Clique para adicionar cidades</p>
    </div>
  );
};
