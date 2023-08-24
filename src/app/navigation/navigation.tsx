import { NavigationList, NavigationListItem } from './navigation-list';
import {
  Account as AccountIcon,
  Car as CarIcon,
  FileChart as FileChartIcon,
} from 'mdi-material-ui';

export function AppNavigation() {
  return (
    <NavigationList>
      <NavigationListItem
        label={'Vozila'}
        icon={<CarIcon />}
        to={'/vehicles'}
      />

      <NavigationListItem
        label={'Izvještaji'}
        icon={<FileChartIcon />}
        to={'/reports/mileage'}
      />

      <NavigationListItem
        label={'Profil'}
        icon={<AccountIcon />}
        to={'/account'}
      />
    </NavigationList>
  );
}
