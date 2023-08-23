import { useState } from 'react';
import { AppBar } from './app-bar';
import { Navigation, NavigationItem } from './app-navigation';
import { NavigationDrawer } from './navigation-drawer';
import {
  Account as AccountIcon,
  Car as CarIcon,
  FileChart as FileChartIcon,
} from 'mdi-material-ui';

export function PrimaryNavigation() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <AppBar onHamburgerClick={() => setVisible(true)} />

      <NavigationDrawer visible={visible} onHide={() => setVisible(false)}>
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
