import { MapBounds, useCreateMapBounds } from '#core/map';
import { Coordinates } from '#lib/dimension';
import { VehicleMapMarker } from '../../components/vehicle-map-marker';
import { VehicleMapIcon } from '../../components/vehicle-map-icon';
import type { Vehicles } from './types';

export interface VehiclesMapAttributes {
  vehicles: Vehicles;
}

export function VehiclesMap({ vehicles }: VehiclesMapAttributes) {
  const { bounds, key: boundsKey } = useCreateMapBounds(vehicles, 'vehicles');

  return (
    <>
      <MapBounds coordinates={bounds} key={boundsKey} once />
      {vehicles.map((vehicle) => (
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
    </>
  );
}
