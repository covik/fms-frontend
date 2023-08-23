import {
  AppBar as RealAppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { Menu } from 'mdi-material-ui';
import { AppMap } from '#core/map';
import { LayoutProvider } from '#core/layout';
import { Content, Main, Page, Sidebar } from './layout';
import { BrowseVehicles } from '../../components/browse-vehicles';
import type { ReactNode } from 'react';
import type { BrowseVehiclesAttributes } from '../../components/browse-vehicles';

export interface VehicleMapScreenAttributes extends BrowseVehiclesAttributes {}

export function VehiclesMapScreen({ vehicles }: VehicleMapScreenAttributes) {
  const theme = useTheme();

  return (
    <LayoutProvider offsetTop={theme.spacing(APP_BAR_SIZE + APP_BAR_SPACING)}>
      <Page>
        <AppBar>
          <HamburgerButton />
          <PageTitle>Vozila</PageTitle>
        </AppBar>

        <Main>
          <Content>
            <AppMap sx={{ height: '100%' }} />
          </Content>

          <Sidebar>
            <Box padding={1.5}>
              <BrowseVehicles vehicles={vehicles} />
            </Box>
          </Sidebar>
        </Main>
      </Page>
    </LayoutProvider>
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
