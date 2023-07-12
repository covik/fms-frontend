import { VehicleMileageTable } from '.';
import {
  MileageTableRow,
  MileageTableRowLoading,
  MileageTableRowNoData,
} from '../mileage-table-row';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Vehicle Mileage Table',
  component: VehicleMileageTable,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof VehicleMileageTable>;
type Story = StoryObj<typeof VehicleMileageTable>;

export const Default: Story = {
  render: () => (
    <VehicleMileageTable>
      <MileageTableRow
        name={'Test 1'}
        mileage={'12000 km'}
        odometer={'123000 km'}
        barColor={'green'}
        barWidthPercentage={100}
      />
      <MileageTableRow
        name={'Test 2'}
        mileage={'9000 km'}
        odometer={'94000 km'}
        barColor={'orange'}
        barWidthPercentage={70}
      />
    </VehicleMileageTable>
  ),
};

export const Loading: Story = {
  render: () => (
    <VehicleMileageTable>
      <MileageTableRowLoading />
      <MileageTableRowLoading />
      <MileageTableRowLoading />
    </VehicleMileageTable>
  ),
};

export const NoData: Story = {
  render: () => (
    <VehicleMileageTable noHeader>
      <MileageTableRowNoData />
    </VehicleMileageTable>
  ),
};
