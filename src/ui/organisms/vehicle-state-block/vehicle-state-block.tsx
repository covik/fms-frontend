import { List } from '@mui/material';
import {
  IgnitionListItem,
  MileageListItem,
  MovementListItem,
  VehicleBatteryListItem,
} from '#ui/molecules';
import { Tile } from '../../../components/Tile';

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
      <List disablePadding dense>
        <MovementListItem moving={moving} speed={speed} />
        <IgnitionListItem on={ignitionOn} />
        <VehicleBatteryListItem voltage={voltage} />
        <MileageListItem mileage={mileage} />
      </List>
    </Tile>
  );
}
