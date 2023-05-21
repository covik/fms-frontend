import type { CSSProperties, ReactNode } from 'react';

const size = 32;
const radius = size / 2;

interface CheckpointIconBackgroundAttributes {
  children: ReactNode;
}

function CheckpointIconBackground({
  children,
}: CheckpointIconBackgroundAttributes) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
    >
      {children}
    </svg>
  );
}

export interface CheckpointMovingIconAttributes {
  color: CSSProperties['color'];
  rotation: number;
}

export function CheckpointMovingIcon({
  color,
  rotation,
}: CheckpointMovingIconAttributes) {
  return (
    <CheckpointIconBackground>
      <g transform={`rotate(${rotation} ${radius} ${radius})`}>
        <path
          fill={color}
          stroke={'#000000'}
          strokeWidth="1"
          d="M20 20.725a.94.94 0 0 1-.55-.17l-6.9-4.56a1 1 0 0 0-1.1 0l-6.9 4.56a1 1 0 0 1-1.44-1.28l8-16a1 1 0 0 1 1.78 0l8 16a1 1 0 0 1-.23 1.2A1 1 0 0 1 20 20.725z"
          transform="translate(4, 3)"
        />
      </g>
    </CheckpointIconBackground>
  );
}

export interface CheckpointStationaryIconAttributes {
  color: CSSProperties['color'];
}

export function CheckpointStationaryIcon({
  color,
}: CheckpointStationaryIconAttributes) {
  const stopIndicatorSize = 12;
  const stopIndicatorCenter = radius - stopIndicatorSize / 2;
  const fillColor = color;
  const strokeColor = '#000000';

  return (
    <CheckpointIconBackground>
      <rect
        data-cy="stop-indicator"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1"
        width={stopIndicatorSize}
        height={stopIndicatorSize}
        x={stopIndicatorCenter}
        y={stopIndicatorCenter}
      />
    </CheckpointIconBackground>
  );
}
