import { VehicleListItem } from './vehicle-list-item';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Vehicle List Item',
  component: VehicleListItem,
  args: {
    variant: 'standard',
    mode: 'normal',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['Standard', 'Warning'],
      mapping: {
        Standard: 'standard',
        Warning: 'warning',
      },
    },
    mode: {
      control: { type: 'select' },
      options: ['Normal', 'Selected', 'Not selectable'],
      mapping: {
        'Normal': 'normal',
        'Selected': 'selected',
        'Not selectable': 'not-selectable',
      },
    },
  },
} satisfies Meta<typeof VehicleListItem>;
type Story = StoryObj<typeof VehicleListItem>;

export const Default: Story = {
  args: {
    name: 'Test',
    ignitionOn: true,
    moving: true,
  },
};

export const LongName: Story = {
  args: {
    ...Default.args,
    name: 'This is a very long vehicle name',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const VariantWarning: Story = {
  args: {
    ...Default.args,
    variant: 'warning',
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    mode: 'selected',
  },
};

export const WarningAndSelected: Story = {
  args: {
    ...VariantWarning.args,
    mode: 'selected',
  },
};

export const NotSelectable: Story = {
  args: {
    ...Default.args,
    mode: 'not-selectable',
  },
};
