import { RoutePosition } from '../../models/Position';
import { RouteLine } from './RouteLine';
import { StartMarker } from './StartMarker';
import { FinishMarker } from './FinishMarker';
import { CheckpointMarker } from './CheckpointMarker';
import {
  CheckpointMovingIcon,
  CheckpointStationaryIcon,
} from './CheckpointIcons';
import type { CSSProperties } from 'react';

export interface VehicleRouteAttributes {
  positions: RoutePosition[];
  color: CSSProperties['color'];
  showCheckpoints: boolean;
}

export function VehicleRoute({
  positions,
  color,
  showCheckpoints,
}: VehicleRouteAttributes) {
  if (positions.length < 2) return null;

  const firstPosition = positions[0];
  const lastPosition = positions[positions.length - 1];

  return (
    <>
      <RouteLine checkpoints={positions} color={color} />
      {firstPosition ? (
        <StartMarker coordinates={firstPosition.coordinates()} />
      ) : null}
      {lastPosition ? (
        <FinishMarker coordinates={lastPosition.coordinates()} />
      ) : null}
      {showCheckpoints
        ? positions.map((position) => (
            <CheckpointMarker
              key={position.id()}
              coordinates={position.coordinates()}
            >
              {position.inMotion() ? (
                <CheckpointMovingIcon
                  color={color}
                  rotation={position.heading().value()}
                />
              ) : (
                <CheckpointStationaryIcon color={color} />
              )}
            </CheckpointMarker>
          ))
        : null}
    </>
  );
}
