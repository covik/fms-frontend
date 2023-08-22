import { InformationVariant as InfoIcon } from 'mdi-material-ui';
import { BottomControlPanel } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Bottom Control Panel',
  component: BottomControlPanel,
  render: (args) => (
    <BottomControlPanel {...args}>
      <div>Control Panel</div>
    </BottomControlPanel>
  ),
  argTypes: {
    PullerIcon: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof BottomControlPanel>;
type Story = StoryObj<typeof BottomControlPanel>;

export const Visible: Story = {
  args: {
    visible: true,
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
  },
};

export const PullerIcon: Story = {
  args: {
    visible: true,
    PullerIcon: <InfoIcon fontSize={'medium'} />,
    bleeding: 33,
  },
};
