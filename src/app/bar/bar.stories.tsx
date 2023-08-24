import { AppBar } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/App Bar',
  component: AppBar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppBar>;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {};

/**
 * Content should not be partially hidden because of AppBar
 */
export const WithContent: Story = {
  render: (args) => {
    return (
      <>
        <AppBar onHamburgerClick={args.onHamburgerClick} />
        <div>
          <div>This content should be visible</div>
        </div>
      </>
    );
  },
};
