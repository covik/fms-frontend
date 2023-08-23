import { AppBar } from './app-bar';
import { Navigation, NavigationItem } from './app-navigation';
import { useDrawer } from './navigation-drawer';
import {
  Account as AccountIcon,
  Car as CarIcon,
  FileChart as FileChartIcon,
} from 'mdi-material-ui';
import { HyperlinkRendererProvider } from './app-navigation/navigation-renderer';

export function PrimaryNavigation() {
  const { visible, openDrawer, toggleDrawer, NavigationDrawer } = useDrawer();

  return (
    <>
      <AppBar onHamburgerClick={openDrawer} />

      <NavigationDrawer visible={visible} onVisibilityChange={toggleDrawer}>
        <HyperlinkRendererProvider>
          <Navigation>
            <NavigationItem
              label={'Vozila'}
              icon={<CarIcon />}
              to={'/vehicles'}
            />

            <NavigationItem
              label={'Izvještaji'}
              icon={<FileChartIcon />}
              to={'/reports/mileage'}
            />

            <NavigationItem
              label={'Profil'}
              icon={<AccountIcon />}
              to={'/account'}
            />
          </Navigation>
        </HyperlinkRendererProvider>
      </NavigationDrawer>
    </>
  );
}
