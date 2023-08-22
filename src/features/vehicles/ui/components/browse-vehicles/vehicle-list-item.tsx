import { Skeleton, styled } from '@mui/material';
import {
  VehicleCard,
  VehicleCardContent,
  VehicleCardHeader,
  VehicleCardIcon,
  VehicleCardTag,
  VehicleCardTags,
  VehicleCardTitle,
  VehicleCardAction,
} from './vehicle-card';
import { Truck, TruckFast } from 'mdi-material-ui';
import { useVehicleRenderer } from './vehicle-renderer';
import { ShareVehicle } from './share-vehicle';
import type { Vehicle } from './types';

export interface VehicleListItemAttributes {
  vehicle: Vehicle;
}

export function VehicleListItem({ vehicle }: VehicleListItemAttributes) {
  const { shareHandler } = useVehicleRenderer();

  const Icon = vehicle.inMotion ? TruckFast : Truck;
  const color = vehicle.ignitionOn ? 'green' : 'orange';
  const tags = {
    speed: vehicle.speed,
    power: vehicle.power,
  };
  const shareVehicle = () => shareHandler(vehicle);

  return (
    <VehicleCard>
      <VehicleCardHeader color={color}>
        <VehicleCardTitle>{vehicle.name}</VehicleCardTitle>

        <VehicleCardIcon>
          <Icon />
        </VehicleCardIcon>

        <VehicleCardAction>
          <ShareVehicle onShare={shareVehicle} />
        </VehicleCardAction>
      </VehicleCardHeader>

      <VehicleCardContent>
        <VehicleCardTags>
          {Object.entries(tags).map(([id, value]) => (
            <VehicleCardTag key={id}>{value}</VehicleCardTag>
          ))}
        </VehicleCardTags>
      </VehicleCardContent>
    </VehicleCard>
  );
}

const ChipSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 4,
}));

export function VehicleListItemLoading() {
  return (
    <VehicleCard>
      <VehicleCardHeader>
        <VehicleCardTitle>
          <Skeleton variant={'text'} width={'40%'} />
        </VehicleCardTitle>

        <VehicleCardIcon>
          <Skeleton variant={'rectangular'} height={'34px'} width={'34px'} />
        </VehicleCardIcon>

        <VehicleCardAction>
          <Skeleton variant={'rectangular'} height={'25px'} width={'25px'} />
        </VehicleCardAction>
      </VehicleCardHeader>

      <VehicleCardContent>
        <VehicleCardTags>
          <ChipSkeleton variant={'rounded'} width={'60px'} height={'25px'} />
          <ChipSkeleton variant={'rounded'} width={'40px'} height={'25px'} />
        </VehicleCardTags>
      </VehicleCardContent>
    </VehicleCard>
  );
}
