import { RouteViewer } from './RouteViewer';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Box } from '@mui/material';

export default {
  component: RouteViewer,
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
} as ComponentMeta<typeof RouteViewer>;

const Template: ComponentStory<typeof RouteViewer> = () => <RouteViewer />;

export const Today = Template.bind({});
