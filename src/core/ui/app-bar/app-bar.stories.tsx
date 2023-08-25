import { withNote } from '#storybook/decorators';
import {
  AppBar,
  AreaAction,
  AreaContent,
  AreaMenu,
  AppBarBarContainer,
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
  component: AppBar,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof AppBar>;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  decorators: [
    withNote(
      `Assumption is that the bar will be positioned on the bottom of the page.
      If there is a need to move it to top/left/right, don't forget to adjust the border radius.`,
    ),
  ],
  render: () => (
    <AppBarBarContainer>
      <AppBar>
        <AreaMenu>
          <MenuIcon />
        </AreaMenu>

        <AreaContent>App Bar</AreaContent>

        <AreaAction>
          <ControlCenterIcon />
        </AreaAction>
      </AppBar>
    </AppBarBarContainer>
  ),
};

/**
 * Instead of menu we can display back button.
 */
export const BackButton: Story = {
  render: () => (
    <AppBarBarContainer>
      <AppBar>
        <AreaMenu>
          <BackIcon />
        </AreaMenu>

        <AreaContent>App Bar</AreaContent>

        <AreaAction>
          <ControlCenterIcon />
        </AreaAction>
      </AppBar>
    </AppBarBarContainer>
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
    <AppBarBarContainer
      style={{ border: '1px solid #000', backgroundColor: 'transparent' }}
    >
      <AppBar style={{ height: '70px' }}>
        <AreaMenu style={{ border: '1px solid red' }}>
          <MenuIcon />
        </AreaMenu>
        <AreaContent style={{ border: '1px solid green' }}>App Bar</AreaContent>
        <AreaAction style={{ border: '1px solid blue' }}>
          <ControlCenterIcon />
        </AreaAction>
      </AppBar>
    </AppBarBarContainer>
  ),
};
