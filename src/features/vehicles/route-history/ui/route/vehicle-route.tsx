import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { RouteLine } from './route-line';
import { RoutePositionInfoWindow } from './route-position-info-window';
import {
  RouteCheckpointMarker,
  RouteFinishMarker,
  RouteStartMarker,
} from '../markers';
import {
  RouteCheckpointMovingIcon,
  RouteCheckpointStationaryIcon,
} from '../icons';
import type { CSSProperties } from 'react';
import type { RoutePosition } from '../../../../../models/Position';

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
  const { selectedPosition, changePosition, resetPosition } =
    usePositionSelection();

  useEffect(() => {
    if (!showCheckpoints) resetPosition();
  }, [showCheckpoints]);

  useEffect(() => {
    if (!positions.find((position) => position.id() === selectedPosition?.id()))
      resetPosition();
  }, [positions]);

  if (positions.length < 2) return null;

  const firstPosition = positions[0];
  const lastPosition = positions[positions.length - 1];

  return (
    <>
      <RouteLine checkpoints={positions} color={color} />
      <RouteStartMarker coordinates={firstPosition.coordinates()} />
      <RouteFinishMarker coordinates={lastPosition.coordinates()} />
      {showCheckpoints
        ? positions.map((position) => (
            <RouteCheckpointMarker
              key={position.id()}
              coordinates={position.coordinates()}
              onClick={() => changePosition(position)}
            >
              {position.inMotion() ? (
                <RouteCheckpointMovingIcon
                  color={color}
                  rotation={position.heading().value()}
                />
              ) : (
                <RouteCheckpointStationaryIcon color={color} />
              )}
            </RouteCheckpointMarker>
          ))
        : null}
      {selectedPosition !== undefined ? (
        <RoutePositionInfoWindow position={selectedPosition} />
      ) : null}
    </>
  );
}

function usePositionSelection() {
  const [selectedPosition, setSelectedPosition] = useState<
    RoutePosition | undefined
  >(undefined);

  function resetPosition() {
    setSelectedPosition(undefined);
  }

  function changePosition(newPosition: RoutePosition) {
    flushSync(() => {
      setSelectedPosition(() => undefined);
    });
    setSelectedPosition(() => newPosition);
  }

  return {
    selectedPosition,
    changePosition,
    resetPosition,
  };
}
