import { withNote } from '#storybook/decorators';
import {
  AppBarToolbar,
  AppBarAction,
  AppBarContent,
  AppBarMenu,
  AppBar,
} from '.';
import {
  Menu as MenuIcon,
  ChevronUp as ControlCenterIcon,
  ChevronLeft as BackIcon,
} from 'mdi-material-ui';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * This is the main component user interacts with in order to navigate the application.
 */
export default {
  title: 'Molecules/App Bar',
  component: AppBarToolbar,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof AppBarToolbar>;
type Story = StoryObj<typeof AppBarToolbar>;

export const Default: Story = {
  decorators: [
    withNote(
      `Assumption is that the bar will be positioned on the bottom of the page.
      If there is a need to move it to top/left/right, don't forget to adjust the border radius.`,
    ),
  ],
  render: () => (
    <AppBar>
      <AppBarToolbar>
        <AppBarMenu>
          <MenuIcon />
        </AppBarMenu>

        <AppBarContent>App Bar</AppBarContent>

        <AppBarAction>
          <ControlCenterIcon />
        </AppBarAction>
      </AppBarToolbar>
    </AppBar>
  ),
};

/**
 * Instead of menu we can display back button.
 */
export const BackButton: Story = {
  render: () => (
    <AppBar>
      <AppBarToolbar>
        <AppBarMenu>
          <BackIcon />
        </AppBarMenu>

        <AppBarContent>App Bar</AppBarContent>

        <AppBarAction>
          <ControlCenterIcon />
        </AppBarAction>
      </AppBarToolbar>
    </AppBar>
  ),
};

/**
 * Communicates content structure.
 */
export const Outline: Story = {
  decorators: [
    withNote(
      `Height is determined by content.In this example it's set to 70px so vertical alignment can be seen and tested.`,
    ),
  ],
  render: () => (
    <AppBar
      style={{ border: '1px solid #000', backgroundColor: 'transparent' }}
    >
      <AppBarToolbar style={{ height: '70px' }}>
        <AppBarMenu style={{ border: '1px solid red' }}>
          <MenuIcon />
        </AppBarMenu>

        <AppBarContent style={{ border: '1px solid green' }}>
          App Bar
        </AppBarContent>

        <AppBarAction style={{ border: '1px solid blue' }}>
          <ControlCenterIcon />
        </AppBarAction>
      </AppBarToolbar>
    </AppBar>
  ),
};
