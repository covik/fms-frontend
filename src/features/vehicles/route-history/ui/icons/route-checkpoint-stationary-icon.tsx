import {
  RouteCheckpointIconBackground,
  routeCheckpointIconRadius as radius,
} from './route-checkpoint-icon-background';
import type { CSSProperties } from 'react';

export interface RouteCheckpointStationaryIconAttributes {
  color: CSSProperties['color'];
}

export function RouteCheckpointStationaryIcon({
  color,
}: RouteCheckpointStationaryIconAttributes) {
  const stopIndicatorSize = 12;
  const stopIndicatorCenter = radius - stopIndicatorSize / 2;
  const fillColor = color;
  const strokeColor = '#000000';

  return (
    <RouteCheckpointIconBackground>
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
    </RouteCheckpointIconBackground>
  );
}
