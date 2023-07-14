import { useMemo } from 'react';
import { Stack } from '@mui/material';
import { AppMap, MapBounds, MapFetchIndicator } from '#core/map';
import { Coordinates } from '#lib/dimension';
import { Tile, TileNoContent, TileRawContent } from '#ui/molecules/tile';
import {
  Grid,
  GridContent,
  GridSidebar,
  PageLayout,
} from '../../templates/multiple-vehicles-tracking';
import {
  VehicleListItem,
  VehicleListItemLoading,
} from '../../components/vehicle-list-item';
import { VehicleMapMarker } from '../../components/vehicle-map-marker';
import { VehicleMapIcon } from '../../components/vehicle-map-icon';
import { RouteDateSelection } from '../../components/route-date-selection';
import {
  CombinedRoute,
  useRouteCheckpoints,
  useRouteMapBounds,
} from '../../components/route-map-elements';
import {
  NoRouteSummaryData,
  RouteDistanceSummary,
  RouteDurationSummary,
  RouteSpeedSummary,
  RouteSummary,
} from '../../components/route-summary';
import type {
  MinimalVehicle,
  VehicleCondition,
  VehicleCourse,
  VehicleIgnitionState,
  VehicleLocation,
  VehicleMovementState,
} from '../../types/vehicle';
import type {
  RoutePositionData,
  RouteStopData,
  RouteSummaryData,
} from '../../types/route';

export interface Vehicle
  extends MinimalVehicle,
    VehicleLocation,
    VehicleIgnitionState,
    VehicleMovementState,
    VehicleCourse,
    VehicleCondition {}

export interface MultipleVehiclesTrackingAttributes {
  vehicles: Vehicle[] | undefined;
  routeDate: Date;
  onRouteDateChange?: (date: Date) => void;
  selectedVehicleId?: Vehicle['id'];
  onSelectionChange?: (vehicleId: Vehicle['id']) => void;
  routeSummary?: RouteSummaryData | null | undefined;
  routePositions?: RoutePositionData[];
  routeStops?: RouteStopData[];
  dataRefreshInProgress?: boolean;
}

export function MultipleVehiclesTracking({
  vehicles,
  routeDate = new Date(),
  onRouteDateChange = () => void 0,
  selectedVehicleId = '',
  onSelectionChange = () => void 0,
  routeSummary = undefined,
  routePositions = [],
  routeStops = [],
  dataRefreshInProgress = false,
}: MultipleVehiclesTrackingAttributes) {
  const vehiclesArray = vehicles ?? [];
  const vehicleBounds = useMemo(
    () =>
      vehiclesArray.map(
        (vehicle) => new Coordinates(vehicle.latitude, vehicle.longitude),
      ),
    [vehiclesArray],
  );
  const isVehicleSelected = vehiclesArray.some(
    (vehicle) => vehicle.id === selectedVehicleId,
  );

  const hasRoutePositions = routePositions && routePositions.length > 0;
  const hasRouteStops = routeStops && routeStops.length > 0;
  const routeBounds = useRouteMapBounds(routePositions, routeStops);

  const bounds =
    hasRoutePositions || hasRouteStops ? routeBounds.bounds : vehicleBounds;
  const boundsKey =
    bounds === routeBounds.bounds ? routeBounds.key : 'vehicles';

  const { checkpointsVisible, showCheckpointsOnDetailedMap } =
    useRouteCheckpoints();

  return (
    <PageLayout>
      <Grid>
        <GridSidebar>
          <Tile label={'Vozila'}>
            {vehicles !== undefined && vehicles.length === 0 ? (
              <TileNoContent>Nema vozila</TileNoContent>
            ) : (
              <TileRawContent>
                <Stack spacing={1}>
                  {vehicles !== undefined ? (
                    vehiclesArray.map((vehicle) => (
                      <VehicleListItem
                        key={vehicle.id}
                        ignitionOn={vehicle.ignitionOn}
                        moving={vehicle.inMotion}
                        name={vehicle.name}
                        mode={
                          vehicle.id === selectedVehicleId
                            ? 'selected'
                            : 'normal'
                        }
                        variant={
                          vehicle.condition === 'unavailable'
                            ? 'warning'
                            : 'standard'
                        }
                        onClick={() => onSelectionChange(vehicle.id)}
                      />
                    ))
                  ) : (
                    <>
                      <VehicleListItemLoading />
                      <VehicleListItemLoading />
                      <VehicleListItemLoading />
                    </>
                  )}
                </Stack>
              </TileRawContent>
            )}
          </Tile>

          {vehicles !== undefined && vehiclesArray.length > 0 ? (
            <>
              <Tile>
                {isVehicleSelected ? (
                  <RouteDateSelection
                    targetDate={routeDate}
                    onChange={onRouteDateChange}
                  />
                ) : (
                  <TileNoContent>Za prikaz rute odaberite vozilo</TileNoContent>
                )}
              </Tile>

              {isVehicleSelected ? (
                <RouteSummary>
                  {routeSummary === null ? (
                    <NoRouteSummaryData />
                  ) : (
                    <>
                      <RouteDurationSummary
                        driving={routeSummary?.drivingDuration}
                        stopped={routeSummary?.stopDuration}
                        total={routeSummary?.totalDuration}
                      />
                      <RouteDistanceSummary
                        total={routeSummary?.distance}
                        odometerStart={routeSummary?.startOdometer}
                        odometerEnd={routeSummary?.endOdometer}
                      />
                      <RouteSpeedSummary
                        average={routeSummary?.averageSpeed}
                        max={routeSummary?.maxSpeed}
                      />
                    </>
                  )}
                </RouteSummary>
              ) : null}
            </>
          ) : null}
        </GridSidebar>

        <GridContent>
          <AppMap
            sx={{ height: '100%' }}
            onZoomChanged={showCheckpointsOnDetailedMap}
          >
            <MapBounds coordinates={bounds} key={boundsKey} once />
            {dataRefreshInProgress ? <MapFetchIndicator /> : null}
            {vehiclesArray.map((vehicle) => (
              <VehicleMapMarker
                key={vehicle.id}
                position={new Coordinates(vehicle.latitude, vehicle.longitude)}
                name={vehicle.name}
              >
                <VehicleMapIcon
                  ignitionOn={vehicle.ignitionOn}
                  moving={vehicle.inMotion}
                  angleInDegrees={vehicle.courseInDegrees}
                />
              </VehicleMapMarker>
            ))}

            {hasRoutePositions || hasRouteStops ? (
              <CombinedRoute
                checkpoints={routePositions}
                stops={routeStops}
                showCheckpoints={checkpointsVisible}
              />
            ) : null}
          </AppMap>
        </GridContent>
      </Grid>
    </PageLayout>
  );
}
