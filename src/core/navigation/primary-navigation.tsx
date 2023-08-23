import { AppBar } from './app-bar';
import { Navigation, NavigationItem } from './app-navigation';
import { useDrawer } from './navigation-drawer';
import {
  Account as AccountIcon,
  Car as CarIcon,
  FileChart as FileChartIcon,
} from 'mdi-material-ui';

export function PrimaryNavigation() {
  const { visible, openDrawer, toggleDrawer, NavigationDrawer } = useDrawer();

  return (
    <>
      <AppBar onHamburgerClick={openDrawer} />

      <NavigationDrawer visible={visible} onVisibilityChange={toggleDrawer}>
        <Navigation>
          <NavigationItem
            label={'Vozila'}
            icon={<CarIcon />}
            to={'/vehicles'}
          />

          <NavigationItem
            label={'Izvještaji'}
            icon={<FileChartIcon />}
            to={'/vehicles/$vehicleId'}
          />

          <NavigationItem
            label={'Profil'}
            icon={<AccountIcon />}
            to={'/account'}
          />
        </Navigation>
      </NavigationDrawer>
    </>
  );
}
