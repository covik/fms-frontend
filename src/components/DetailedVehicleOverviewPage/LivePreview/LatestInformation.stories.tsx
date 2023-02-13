import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LatestInformation } from './LatestInformation';

export default {
  component: LatestInformation,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} as ComponentMeta<typeof LatestInformation>;

const Template: ComponentStory<typeof LatestInformation> = () => (
  <LatestInformation />
);

export const Default = Template.bind({});
