import {
  IgnitionListItem,
  MileageListItem,
  MovementListItem,
  Tile,
  TileListContent,
  VehicleBatteryListItem,
} from '#ui/molecules';

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
