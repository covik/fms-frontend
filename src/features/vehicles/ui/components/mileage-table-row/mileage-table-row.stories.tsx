import {
  MileageTableHeaderRow,
  MileageTableRow,
  MileageTableRowLoading,
  MileageTableRowNoData,
} from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Mileage Table Row',
  component: MileageTableRow,
  decorators: [
    (Story) => (
      <table style={{ width: '100%' }}>
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
} satisfies Meta<typeof MileageTableRow>;
type Story = StoryObj<typeof MileageTableRow>;

export const Default: Story = {
  args: {
    name: 'Test',
    mileage: '12000 km',
    odometer: '123000 km',
    barWidthPercentage: 60,
    barColor: 'green',
  },
};

export const Loading: Story = {
  render: () => <MileageTableRowLoading />,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export const NoData: Story = {
  render: () => <MileageTableRowNoData />,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export const Header: Story = {
  render: () => <MileageTableHeaderRow />,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};
