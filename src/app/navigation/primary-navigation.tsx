import { Navigation, NavigationItem } from './app-navigation';
import {
  Account as AccountIcon,
  Car as CarIcon,
  FileChart as FileChartIcon,
} from 'mdi-material-ui';
import { HyperlinkRendererProvider } from './navigation-renderer';

export function PrimaryNavigation() {
  return (
    <HyperlinkRendererProvider>
      <Navigation>
        <NavigationItem label={'Vozila'} icon={<CarIcon />} to={'/vehicles'} />

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
  );
}
