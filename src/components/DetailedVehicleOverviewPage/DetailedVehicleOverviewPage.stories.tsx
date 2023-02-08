import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DetailedVehicleOverviewPage } from './DetailedVehicleOverviewPage';

export default {
  title: 'DetailedVehicleOverviewPage',
  component: DetailedVehicleOverviewPage,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DetailedVehicleOverviewPage>;

const Template: ComponentStory<typeof DetailedVehicleOverviewPage> = (args) => (
  <DetailedVehicleOverviewPage {...args} />
);

export const LiveUpdates = Template.bind({});
