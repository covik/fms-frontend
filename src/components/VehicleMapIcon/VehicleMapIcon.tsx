import type { ReactNode } from 'react';

const size = 32;
const radius = size / 2;
const colors = {
  orange: {
    strokeColor: '#d78200',
    fillColor: '#ff9a00',
  },
  green: {
    strokeColor: '#00a706',
    fillColor: '#00cc07',
  },
};

function VehicleMapIconBackground({
  children,
  rotation = 0,
}: {
  children: ReactNode;
  rotation?: number;
}) {
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

export function VehicleMapIconStationary({ active }: { active: boolean }) {
  const stopIndicatorSize = 12;
  const stopIndicatorCenter = radius - stopIndicatorSize / 2;
  const { orange, green } = colors;
  const { fillColor, strokeColor } = active ? green : orange;

  return (
    <VehicleMapIconBackground>
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
    </VehicleMapIconBackground>
  );
}

export function VehicleMapIconMoving({
  active,
  angle,
}: {
  active: boolean;
  angle: number;
}) {
  const { orange, green } = colors;
  const { fillColor, strokeColor } = active ? green : orange;

  return (
    <VehicleMapIconBackground rotation={angle}>
      <path
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1"
        d="M20 20.725a.94.94 0 0 1-.55-.17l-6.9-4.56a1 1 0 0 0-1.1 0l-6.9 4.56a1 1 0 0 1-1.44-1.28l8-16a1 1 0 0 1 1.78 0l8 16a1 1 0 0 1-.23 1.2A1 1 0 0 1 20 20.725z"
        transform="translate(4, 3)"
        rotate={angle}
      />
    </VehicleMapIconBackground>
  );
}
