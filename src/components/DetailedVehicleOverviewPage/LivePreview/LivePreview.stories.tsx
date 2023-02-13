import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LivePreview } from './LivePreview';

export default {
  component: LivePreview,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} as ComponentMeta<typeof LivePreview>;

const Template: ComponentStory<typeof LivePreview> = () => <LivePreview />;

export const Default = Template.bind({});
