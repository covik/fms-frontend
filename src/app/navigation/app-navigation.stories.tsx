import { withNavigation } from '#storybook/decorators';
import { Navigation, NavigationItem } from './app-navigation';
import {
  Account as AccountIcon,
  Car as CarIcon,
  FileChart as FileChartIcon,
} from 'mdi-material-ui';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/App Navigation',
  component: Navigation,
  decorators: [withNavigation(0)],
  render: () => (
    <Navigation>
      <NavigationItem label={'Vozila'} icon={<CarIcon />} to={'/vehicles'} />

      <NavigationItem
        label={'Izvještaji'}
        icon={<FileChartIcon />}
        to={'/vehicles/$vehicleId'}
      />

      <NavigationItem label={'Profil'} icon={<AccountIcon />} to={'/account'} />
    </Navigation>
  ),
} satisfies Meta<typeof Navigation>;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {};
