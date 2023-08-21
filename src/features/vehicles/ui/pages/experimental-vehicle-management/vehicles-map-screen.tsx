import { useState } from 'react';
import {
  AppBar as RealAppBar,
  Box,
  IconButton,
  styled,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { Car, Menu } from 'mdi-material-ui';
import { AppMap } from '#core/map';
import { LayoutProvider } from '#core/layout';
import { PageLayout } from '../../templates/single-vehicle-tracking';
import { BrowseVehiclesView } from '../browse-vehicles';
import type { ReactNode } from 'react';
import type { BrowseVehiclesViewAttributes } from '../browse-vehicles';

export interface VehicleMapScreenAttributes
  extends BrowseVehiclesViewAttributes {}

export function VehiclesMapScreen({
  operationalVehicles,
  unavailableVehicles,
  vehicleRenderer,
  onShareRequest,
  loading,
}: VehicleMapScreenAttributes) {
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
          <BrowseVehiclesView
            operationalVehicles={operationalVehicles}
            unavailableVehicles={unavailableVehicles}
            vehicleRenderer={vehicleRenderer}
            onShareRequest={onShareRequest}
            loading={loading}
          />
        </ControlPanel>
      </PageLayout>
    </LayoutProvider>
  );
}

const drawerBleeding = 40;

const Puller = styled(Box)(({ theme }) => ({
  'backgroundColor': theme.palette.background.default,
  'borderRadius': '50% 50% 0 0',
  'color': theme.palette.primary.light,
  'boxShadow': theme.shadows['5'],
  'fontSize': '31px',
  'padding': '6px 8px 3px',

  'position': 'absolute',
  'left': '50%',
  'transform': 'translateX(-50%)',
  'top': '0',
  'zIndex': -1,

  '& > svg': {
    display: 'block',
  },
}));

export interface ControlPanelAttributes {
  children: ReactNode;
}

export function ControlPanel({ children }: ControlPanelAttributes) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    console.log('toggle', newOpen);
    setOpen(newOpen);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& > .MuiPaper-root': {
          height: `calc(auto - ${drawerBleeding}px)`,
          maxHeight: `calc(95% - ${drawerBleeding}px)`,
          overflow: 'visible',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: 'visible',
          right: 0,
          left: 0,
        }}
      >
        <Puller>
          <Car fontSize={'inherit'} />
        </Puller>
      </Box>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(1.5),
          height: '100%',
          overflow: 'auto',
        })}
      >
        {children}
      </Box>
    </SwipeableDrawer>
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
