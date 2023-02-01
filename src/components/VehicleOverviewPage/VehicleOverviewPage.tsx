import { VehicleAttributes, VehicleCard } from '../VehicleCard';
import {
  Box,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import { Cog } from 'mdi-material-ui';
import { useState } from 'react';
import type { MouseEvent } from 'react';

const vehicles: (VehicleAttributes & { id: string })[] = [
  {
    id: 'test-01',
    name: 'ZD000AA',
    ignition: true,
    movement: 'moving',
  },
];

function PageTitle() {
  return (
    <Typography
      component="h1"
      variant="h3"
      color="grey"
      fontWeight="medium"
      lineHeight={1}
    >
      Vozila
    </Typography>
  );
}

function Settings() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchor);
  const openMenu = (e: MouseEvent<HTMLButtonElement>) =>
    void setAnchor(e.currentTarget);
  const closeMenu = () => void setAnchor(null);

  return (
    <>
      <IconButton size="medium" onClick={openMenu}>
        <Cog fontSize="medium" />
      </IconButton>
      <Menu id="basic-menu" anchorEl={anchor} open={isOpen} onClose={closeMenu}>
        <MenuItem disableRipple>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Prikaži kartu"
          />
        </MenuItem>
        <MenuItem disableRipple>
          <FormControlLabel control={<Switch />} label="Satelitske karte" />
        </MenuItem>
      </Menu>
    </>
  );
}

function PageHeader() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <PageTitle />
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <Settings />
      </Box>
    </Box>
  );
}

export function VehicleOverviewPage() {
  const theme = useTheme();

  return (
    <Box sx={{ padding: theme.spacing(1.4) }}>
      <PageHeader />
      <Box sx={{ marginTop: theme.spacing(2) }}>
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            name={vehicle.name}
            movement={vehicle.movement}
            ignition={vehicle.ignition}
          />
        ))}
      </Box>
    </Box>
  );
}
