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

export const Outline: Story = {
  render: () => (
    <AppBar style={{ border: '1px solid #000', padding: '8px' }}>
      <AreaMenu style={{ border: '1px solid red' }}>
        <MenuIcon />
      </AreaMenu>
      <AreaContent style={{ border: '1px solid green' }}>App Bar</AreaContent>
      <AreaControlCenter style={{ border: '1px solid blue' }}>
        <ControlCenterIcon />
      </AreaControlCenter>
    </AppBar>
  ),
};
