import type { ReactNode } from 'react';

const size = 32;
export const radius = size / 2;

interface VehicleMapIconBackgroundAttributes {
  children: ReactNode;
  rotation?: number;
}

export function VehicleMapIconBackground({
  children,
  rotation = 0,
}: VehicleMapIconBackgroundAttributes) {
  const centerX = radius;
  const centerY = radius;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
    >
      <g transform={`rotate(${rotation} ${radius} ${radius})`}>
        <circle cx={centerX} cy={centerY} r={radius} fill="#aaaaaa" />
        <circle cx={centerX} cy={centerY} r={radius - 1} fill="#ebebeb" />
        {children}
      </g>
    </svg>
  );
}
