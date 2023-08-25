import { AppBar, AreaControlCenter, AreaContent, AreaMenu } from './index';
import {
  Menu as MenuIcon,
  ChevronUp as ControlCenterIcon,
} from 'mdi-material-ui';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/App Bar',
  component: AppBar,
} satisfies Meta<typeof AppBar>;
type Story = StoryObj<typeof AppBar>;

export const Transparent: Story = {
  render: () => (
    <AppBar>
      <AreaMenu>
        <MenuIcon />
      </AreaMenu>
      <AreaContent>App Bar</AreaContent>
      <AreaControlCenter>
        <ControlCenterIcon />
      </AreaControlCenter>
    </AppBar>
  ),
};
