import { LocatedVehicle } from '../../../models/vehicle';
import { useLength, useSpeed, useVoltage } from '#core/measurement-unit';
import { VehicleCard } from '../vehicle-card';
import { Truck, TruckFast } from 'mdi-material-ui';
import { ShareHandler } from './browse-vehicles';

export interface VehicleItemAttributes {
  vehicle: LocatedVehicle;
  shareHandler: ShareHandler;
}

export function VehicleItem({ vehicle, shareHandler }: VehicleItemAttributes) {
  const { formatLengthProgressive } = useLength();
  const { formatSpeed } = useSpeed();
  const { formatVoltage } = useVoltage();

  return (
    <VehicleCard
      title={vehicle.name()}
      icon={vehicle.isInMotion() ? TruckFast : Truck}
      color={vehicle.hasIgnitionTurnedOn() ? 'green' : 'orange'}
      meta={[
        formatSpeed(vehicle.speed()),
        formatLengthProgressive(vehicle.mileage()),
        formatVoltage(vehicle.power()),
      ]}
      onShare={(e) => {
        e.preventDefault();
        shareHandler(vehicle);
      }}
    />
  );
}
