import { Coordinates } from '#lib/dimension';
import { RouteCheckpointMarker } from './markers';
import {
  RouteCheckpointMovingIcon,
  RouteCheckpointStationaryIcon,
} from './icons';
import type { CSSProperties } from 'react';
import type { RoutePositionData } from './interface';
import { PositionInfoWindow } from '../../../ui/organisms/position-info-window';

export interface RouteCheckpointsAttributes {
  checkpoints: RoutePositionData[];
  color: CSSProperties['color'];
  selectedCheckpointId?: string;
  onClick?: (checkpoint: RoutePositionData) => void;
}

export function RouteCheckpoints({
  checkpoints,
  color,
  selectedCheckpointId = '',
  onClick = undefined,
}: RouteCheckpointsAttributes) {
  const selectedCheckpoint = checkpoints.find(
    (checkpoint) => checkpoint.id === selectedCheckpointId,
  );

  return (
    <>
      {checkpoints.map((checkpoint) => (
        <RouteCheckpointMarker
          key={checkpoint.id}
          coordinates={
            new Coordinates(checkpoint.latitude, checkpoint.longitude)
          }
          onClick={onClick ? () => onClick(checkpoint) : undefined}
        >
          {checkpoint.inMotion ? (
            <RouteCheckpointMovingIcon
              color={color}
              rotation={checkpoint.courseInDegrees}
            />
          ) : (
            <RouteCheckpointStationaryIcon color={color} />
          )}
        </RouteCheckpointMarker>
      ))}

      {selectedCheckpoint ? (
        <PositionInfoWindow
          coordinates={
            new Coordinates(
              selectedCheckpoint.latitude,
              selectedCheckpoint.longitude,
            )
          }
          date={selectedCheckpoint.timestamp}
          speed={selectedCheckpoint.speed}
          voltage={selectedCheckpoint.power}
          mileage={selectedCheckpoint.mileage}
          ignition={selectedCheckpoint.ignitionOn}
          movement={selectedCheckpoint.inMotion}
        />
      ) : null}
    </>
  );
}
