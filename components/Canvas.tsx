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
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
          </pattern>
          <linearGradient id="tourGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0071e3" />
            <stop offset="100%" stopColor="#5e5ce6" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
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
                  stroke="url(#tourGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  opacity="0.8"
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
              r={hoveredCity === idx ? 7 : 5}
              fill={bestTour.includes(idx) ? '#fff' : 'rgba(255, 255, 255, 0.3)'}
              stroke={bestTour.includes(idx) ? '#0071e3' : 'transparent'}
              strokeWidth="2"
              className={styles.cityPoint}
              onMouseEnter={() => setHoveredCity(idx)}
              onMouseLeave={() => setHoveredCity(null)}
              style={{ 
                filter: hoveredCity === idx ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none',
                cursor: 'pointer'
              }}
            />
            {hoveredCity === idx && (
              <g pointerEvents="none">
                <rect 
                  x={city.x - 40} 
                  y={city.y - 35} 
                  width="80" 
                  height="24" 
                  rx="12" 
                  fill="rgba(0,0,0,0.6)" 
                  style={{ backdropFilter: 'blur(10px)' }}
                />
                <text
                  x={city.x}
                  y={city.y - 19}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="500"
                >
                  City {idx}
                </text>
              </g>
            )}
          </g>
        ))}


      </svg>
      <p className={styles.hint}>Clique para adicionar cidades</p>
    </div>
  );
};
