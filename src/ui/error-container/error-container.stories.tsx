import { ErrorContainer } from './index';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Error Container',
  component: ErrorContainer,
  parameters: {
    layout: 'fullscreen',
    controls: {
      hideNoControlsWarning: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ErrorContainer>;
type Story = StoryObj<typeof ErrorContainer>;

export const Default: Story = {
  render: () => (
    <ErrorContainer data-testid={'centered-screen-test-attribute'}>
      <div
        style={{ width: '400px', height: '400px', backgroundColor: '#000' }}
      />
    </ErrorContainer>
  ),
};
