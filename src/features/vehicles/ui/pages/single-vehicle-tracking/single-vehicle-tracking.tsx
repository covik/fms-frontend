import { useMemo } from 'react';
import { VehicleMapIcon } from '../../components/vehicle-map-icon';
import { VehicleMapMarker } from '../../components/vehicle-map-marker';
import { VehicleWarning } from '../../components/vehicle-warning';
import { LocationStateBlock } from '../../components/location-state-block';
import { NetworkStateBlock } from '../../components/network-state-block';
import { VehicleStateBlock } from '../../components/vehicle-state-block';
import {
  Grid,
  GridContent,
  GridSidebar,
  PageContent,
  WarningContainer,
} from '../../templates/single-vehicle-tracking';
import { AppMap, MapSettingsProvider } from '#core/map';
import { Coordinates } from '#lib/dimension';
import type { VehicleWarningType } from '../../components/vehicle-warning';

type VehicleWarning =
  | Extract<VehicleWarningType, 'unavailable' | 'disabled'>
  | undefined;

export interface SingleVehicleTrackingAttributes {
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

export function SingleVehicleTracking({
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
}: SingleVehicleTrackingAttributes) {
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
                <VehicleMapIcon
                  ignitionOn={ignitionOn}
                  moving={moving}
                  angleInDegrees={courseInDegrees}
                />
              </VehicleMapMarker>
            </AppMap>
          </MapSettingsProvider>
        </GridContent>
      </Grid>
    </PageContent>
  );
}
