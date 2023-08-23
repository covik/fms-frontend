import {
  AppBar as RealAppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { Menu } from 'mdi-material-ui';
import { AppMap, MapFetchIndicator } from '#core/map';
import { LayoutProvider } from '#core/layout';
import { Content, Main, Page, Sidebar } from './layout';
import { VehiclesMap } from './map';
import { BrowseVehicles } from '../../components/browse-vehicles';
import type { ReactNode } from 'react';
import type { Vehicles } from './types';

export interface VehicleMapScreenAttributes {
  vehicles: Vehicles | undefined;
  refreshingData: boolean;
}

export function VehiclesMapScreen({
  vehicles,
  refreshingData,
}: VehicleMapScreenAttributes) {
  const theme = useTheme();
  const showRefreshIndicator = refreshingData && vehicles !== undefined;

  return (
    <Page>
      <Main>
        <Content>
          <AppMap sx={{ height: '100%' }}>
            <VehiclesMap vehicles={vehicles ?? []} />
            {showRefreshIndicator ? <MapFetchIndicator /> : null}
          </AppMap>
        </Content>

        <Sidebar>
          <BrowseVehicles vehicles={vehicles} />
        </Sidebar>
      </Main>
    </Page>
  );
}

/*
<LayoutProvider offsetTop={theme.spacing(APP_BAR_SIZE + APP_BAR_SPACING)}>
<AppBar>
          <HamburgerButton />
          <PageTitle>Vozila</PageTitle>
        </AppBar>
        </LayoutProvider>
 */

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
