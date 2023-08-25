import { withNote } from '#storybook/decorators';
import { AppBar, AreaControlCenter, AreaContent, AreaMenu } from '.';
import {
  Menu as MenuIcon,
  ChevronUp as ControlCenterIcon,
} from 'mdi-material-ui';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * This is the main component user interacts with in order to navigate the application.
 */
export default {
  title: 'Molecules/App Bar',
  component: AppBar,
} satisfies Meta<typeof AppBar>;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
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

/**
 * Communicates content outline.
 */
export const Outline: Story = {
  decorators: [
    withNote(
      `Height is determined by content.In this example it's set to 70px so vertical alignment can be seen and tested.`,
    ),
  ],
  render: () => (
    <AppBar
      style={{ border: '1px solid #000', padding: '8px', height: '70px' }}
    >
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
