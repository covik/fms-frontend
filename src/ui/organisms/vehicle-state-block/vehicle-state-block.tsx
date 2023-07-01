import { Tile, TileListContent } from '#ui/molecules/tile';
import { IgnitionListItem } from '#ui/molecules/ignition-list-item';
import { MileageListItem } from '#ui/molecules/mileage-list-item';
import { MovementListItem } from '#ui/molecules/movement-list-item';
import { VehicleBatteryListItem } from '#ui/molecules/vehicle-battery-list-item';

export interface VehicleStateBlockAttributes {
  ignitionOn: boolean;
  mileage: string;
  moving: boolean;
  speed: string;
  voltage: string;
}

export function VehicleStateBlock({
  ignitionOn,
  mileage,
  moving,
  speed,
  voltage,
}: VehicleStateBlockAttributes) {
  return (
    <Tile label={'Vozilo'}>
      <TileListContent>
        <MovementListItem moving={moving} speed={speed} />
        <IgnitionListItem on={ignitionOn} />
        <VehicleBatteryListItem voltage={voltage} />
        <MileageListItem mileage={mileage} />
      </TileListContent>
    </Tile>
  );
}
