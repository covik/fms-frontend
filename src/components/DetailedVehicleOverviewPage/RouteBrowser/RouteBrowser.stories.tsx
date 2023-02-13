import { RouteBrowser } from './RouteBrowser';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Box } from '@mui/material';

export default {
  component: RouteBrowser,
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
} as ComponentMeta<typeof RouteBrowser>;

const Template: ComponentStory<typeof RouteBrowser> = () => <RouteBrowser />;

export const Default = Template.bind({});
