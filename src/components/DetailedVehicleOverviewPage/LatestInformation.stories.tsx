import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LatestInformation } from './LatestInformation';
import { Box } from '@mui/material';

export default {
  component: LatestInformation,
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
} as ComponentMeta<typeof LatestInformation>;

const Template: ComponentStory<typeof LatestInformation> = () => (
  <LatestInformation />
);

export const Default = Template.bind({});
