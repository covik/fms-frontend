import { useMemo } from 'react';
import { VehicleWarning } from '#ui/molecules';
import {
  LocationStateBlock,
  NetworkStateBlock,
  VehicleStateBlock,
} from '#ui/organisms';
import {
  Grid,
  GridContent,
  GridSidebar,
  PageContent,
  WarningContainer,
} from '#ui/templates/vehicle-layout';
import { AppMap, MapSettingsProvider } from '../../../components/Map';
import { VehicleMapMarker } from '../../../components/VehicleMapMarker';
import {
  VehicleMapIconMoving,
  VehicleMapIconStationary,
} from '../../../components/VehicleMapIcon';
import { Coordinates } from '../../../lib/Dimension';
import type { VehicleWarningType } from '#ui/molecules';

type VehicleWarning =
  | Extract<VehicleWarningType, 'unavailable' | 'disabled'>
  | undefined;

export interface VehicleLiveViewAttributes {
  name: string;
  latitude: number;
  longitude: number;
  courseInDegrees: number;
  ignitionOn: boolean;
  moving: boolean;
  speed: string;
  mileage: string;
  voltage: string;
  updatedAt: string;
  humanReadableCourse: string;
  altitude: string;
  online: boolean;
  latency: string;
  warning: VehicleWarning;
}

export function VehicleLiveView({
  name,
  latitude,
  longitude,
  courseInDegrees,
  ignitionOn,
  moving,
  mileage,
  speed,
  voltage,
  updatedAt,
  humanReadableCourse,
  altitude,
  online,
  latency,
  warning,
}: VehicleLiveViewAttributes) {
  const coordinates = useMemo(
    () => new Coordinates(latitude, longitude),
    [latitude, longitude],
  );

  const warningElement = warning ? (
    <WarningContainer>
      <VehicleWarning type={warning} />
    </WarningContainer>
  ) : null;

  return (
    <PageContent>
      {warningElement}
      <Grid>
        <GridSidebar>
          <VehicleStateBlock
            ignitionOn={ignitionOn}
            mileage={mileage}
            moving={moving}
            speed={speed}
            voltage={voltage}
          />

          <LocationStateBlock
            altitude={altitude}
            coordinates={coordinates.toString()}
            course={humanReadableCourse}
            updatedAt={updatedAt}
          />

          <NetworkStateBlock active={online} latency={latency} />
        </GridSidebar>

        <GridContent>
          <MapSettingsProvider center={coordinates} zoom={8}>
            <AppMap
              gestureHandling={false}
              clickablePoi={false}
              sx={{ height: '100%' }}
            >
              <VehicleMapMarker position={coordinates} name={name}>
                {moving ? (
                  <VehicleMapIconMoving
                    active={ignitionOn}
                    angle={courseInDegrees}
                  />
                ) : (
                  <VehicleMapIconStationary active={ignitionOn} />
                )}
              </VehicleMapMarker>
            </AppMap>
          </MapSettingsProvider>
        </GridContent>
      </Grid>
    </PageContent>
  );
}
