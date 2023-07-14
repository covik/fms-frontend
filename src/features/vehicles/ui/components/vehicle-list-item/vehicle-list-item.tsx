import { styled, useTheme } from '@mui/material';
import {
  Truck,
  AlertCircle as Warning,
  CheckCircle as Checked,
} from 'mdi-material-ui';
import { IgnitionIcon } from '../ignition-icon';
import { MovementIcon } from '../movement-icon';
import { Grid } from './container';
import { root } from './selectors';

const VehicleName = styled('div')({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

type Variant = 'standard' | 'warning';

type Mode = 'normal' | 'selected' | 'not-selectable';

export interface VehicleListItemAttributes {
  name: string;
  ignitionOn: boolean;
  moving: boolean;
  variant?: Variant;
  mode?: Mode;
  onClick?: () => void;
}

export function VehicleListItem({
  name,
  ignitionOn,
  moving,
  variant = 'standard',
  mode = 'normal',
  onClick,
}: VehicleListItemAttributes) {
  return (
    <Grid
      data-testid={root}
      onClick={mode === 'not-selectable' ? undefined : onClick}
      sx={{ ...(mode === 'not-selectable' ? {} : { cursor: 'pointer' }) }}
    >
      <div>
        <VehicleIcon variant={variant} mode={mode} />
      </div>
      <VehicleName>{name}</VehicleName>
      <div>
        <IgnitionIcon on={ignitionOn} />
      </div>
      <div>
        <MovementIcon moving={moving} />
      </div>
    </Grid>
  );
}

interface VehicleIconAttributes {
  variant: Variant;
  mode: Mode;
}

function VehicleIcon({ variant, mode }: VehicleIconAttributes) {
  const theme = useTheme();

  if (mode === 'selected')
    return <Checked htmlColor={theme.palette.info.light} />;
  if (variant === 'warning')
    return <Warning htmlColor={theme.palette.warning.main} />;
  return <Truck />;
}
