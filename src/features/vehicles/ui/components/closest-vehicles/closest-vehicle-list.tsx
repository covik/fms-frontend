import { Checkbox, Chip, Paper, Stack, styled } from '@mui/material';
import type { MinimalVehicle } from '../../types/vehicle';

const Item = styled(Paper)(({ theme }) => ({
  'display': 'grid',
  'gridTemplateColumns':
    'max-content 17fr minmax(4rem, max-content) minmax(4rem, max-content)',
  'gap': theme.spacing(1 / 2),
  'padding': theme.spacing(1 / 2),
  'alignItems': 'center',

  '& svg': {
    display: 'block',
  },
}));

const Name = styled('div')({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const Distance = styled('div')({
  justifySelf: 'flex-end',
});

const Duration = styled('div')({
  justifySelf: 'flex-start',
});

export interface Vehicle extends MinimalVehicle {
  distance: string;
  travelTime: string;
  selected: boolean;
}

export interface ClosestVehicleListAttributes {
  vehicles: Vehicle[];
  onSelectionChange: (changedVehicle: Vehicle) => void;
}

export function ClosestVehicleList({
  vehicles,
  onSelectionChange,
}: ClosestVehicleListAttributes) {
  if (vehicles.length === 0) return null;

  return (
    <Stack spacing={1}>
      {vehicles.map((vehicle) => (
        <Item key={vehicle.id}>
          <div>
            <Checkbox
              size={'small'}
              checked={vehicle.selected}
              onClick={() => onSelectionChange(vehicle)}
            />
          </div>
          <Name>{vehicle.name}</Name>
          <Distance>
            <Chip size={'small'} label={vehicle.distance} />
          </Distance>
          <Duration>
            <Chip size={'small'} label={vehicle.travelTime} />
          </Duration>
        </Item>
      ))}
    </Stack>
  );
}
