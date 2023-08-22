import { useState } from 'react';
import {
  AppBar as RealAppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { Car, Menu } from 'mdi-material-ui';
import { AppMap } from '#core/map';
import { LayoutProvider } from '#core/layout';
import { PageLayout } from '../../templates/single-vehicle-tracking';
import { BrowseVehicles } from '../../components/browse-vehicles';
import { BottomControlPanel } from '../../components/bottom-control-panel';
import type { ReactNode } from 'react';
import type { BrowseVehiclesAttributes } from '../../components/browse-vehicles';

export interface VehicleMapScreenAttributes extends BrowseVehiclesAttributes {}

export function VehiclesMapScreen({ vehicles }: VehicleMapScreenAttributes) {
  const theme = useTheme();

  return (
    <LayoutProvider offsetTop={theme.spacing(APP_BAR_SIZE + APP_BAR_SPACING)}>
      <PageLayout>
        <AppBar>
          <HamburgerButton />
          <PageTitle>Vozila</PageTitle>
        </AppBar>

        <AppMap sx={{ height: '100%' }} />

        <ControlPanel>
          <Box padding={1.5}>
            <BrowseVehicles vehicles={vehicles} />
          </Box>
        </ControlPanel>
      </PageLayout>
    </LayoutProvider>
  );
}

interface ControlPanelAttributes {
  children: ReactNode;
}

function ControlPanel({ children }: ControlPanelAttributes) {
  const [visible, setVisible] = useState(false);

  return (
    <BottomControlPanel
      bleeding={33}
      PullerIcon={<Car fontSize={'medium'} />}
      visible={visible}
      onVisibilityChange={setVisible}
    >
      {children}
    </BottomControlPanel>
  );
}

const APP_BAR_SIZE = 7.5;
const APP_BAR_SPACING = 1;

export interface AppBarAttributes {
  children: ReactNode;
}

function AppBar({ children }: AppBarAttributes) {
  return (
    <RealAppBar
      position={'fixed'}
      elevation={1}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
        color: 'text.primary',
        margin: APP_BAR_SPACING,
        width: 'auto',
        left: 0,
        right: 0,
      })}
    >
      <Toolbar
        sx={(theme) => ({
          height: `${theme.spacing(APP_BAR_SIZE)} !important`,
          minHeight: '0 !important',
        })}
      >
        {children}
      </Toolbar>
    </RealAppBar>
  );
}

export interface PageTitleAttributes {
  children: string;
}

export function PageTitle({ children }: PageTitleAttributes) {
  return (
    <Typography
      variant="h6"
      component="div"
      fontWeight={(theme) => theme.typography.fontWeightRegular}
      sx={{
        letterSpacing: 1,
        flexGrow: 1,
        color: 'inherit',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      {children}
    </Typography>
  );
}

export function HamburgerButton() {
  return (
    <IconButton
      size="large"
      edge="start"
      color={'inherit'}
      aria-label="menu"
      sx={{ marginRight: 2 }}
    >
      <Menu />
    </IconButton>
  );
}
