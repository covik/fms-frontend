import { Tile, TileListContent } from '#ui/molecules/tile';
import { IgnitionListItem } from '../../molecules/ignition-list-item';
import { MileageListItem } from '../../molecules/mileage-list-item';
import { MovementListItem } from '../../molecules/movement-list-item';
import { VehicleBatteryListItem } from '../../molecules/vehicle-battery-list-item';

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
