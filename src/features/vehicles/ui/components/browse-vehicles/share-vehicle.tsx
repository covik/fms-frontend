import { IconButton } from '@mui/material';
import { ShareVariant } from 'mdi-material-ui';
import { selectors } from './selectors';

export interface ShareVehicleButtonAttributes {
  onShare: () => void;
}

export function ShareVehicle({ onShare }: ShareVehicleButtonAttributes) {
  return (
    <IconButton
      onClick={(e) => {
        e.preventDefault();
        onShare();
      }}
      data-testid={selectors.share}
    >
      <ShareVariant fontSize="medium" />
    </IconButton>
  );
}
