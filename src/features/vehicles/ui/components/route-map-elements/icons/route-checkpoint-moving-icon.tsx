import {
  RouteCheckpointIconBackground,
  routeCheckpointIconRadius as radius,
} from './route-checkpoint-icon-background';
import type { CSSProperties } from 'react';

export interface RouteCheckpointMovingIconAttributes {
  color: CSSProperties['color'];
  rotation: number;
}

export function RouteCheckpointMovingIcon({
  color,
  rotation,
}: RouteCheckpointMovingIconAttributes) {
  return (
    <RouteCheckpointIconBackground>
      <g transform={`rotate(${rotation} ${radius} ${radius})`}>
        <path
          fill={color}
          stroke={'#000000'}
          strokeWidth="1"
          d="M20 20.725a.94.94 0 0 1-.55-.17l-6.9-4.56a1 1 0 0 0-1.1 0l-6.9 4.56a1 1 0 0 1-1.44-1.28l8-16a1 1 0 0 1 1.78 0l8 16a1 1 0 0 1-.23 1.2A1 1 0 0 1 20 20.725z"
          transform="translate(4, 3)"
        />
      </g>
    </RouteCheckpointIconBackground>
  );
}
