import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Box } from '@mui/material';
import { LivePreview } from './LivePreview';

export default {
  component: LivePreview,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Box sx={{ padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
} as ComponentMeta<typeof LivePreview>;

const Template: ComponentStory<typeof LivePreview> = () => <LivePreview />;

export const Default = Template.bind({});
