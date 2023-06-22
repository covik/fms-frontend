import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { RouteLine } from './RouteLine';
import { StartMarker } from './StartMarker';
import { FinishMarker } from './FinishMarker';
import { CheckpointMarker } from './CheckpointMarker';
import {
  CheckpointMovingIcon,
  CheckpointStationaryIcon,
} from './CheckpointIcons';
import { RoutePositionInfoWindow } from './RoutePositionInfoWindow';
import type { CSSProperties } from 'react';
import type { RoutePosition } from '../../models/Position';

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
              onClick={() => changePosition(position)}
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
