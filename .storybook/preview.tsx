import { DesignBaseline } from '../src/foundation';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <DesignBaseline>
        <Story />
      </DesignBaseline>
    ),
  ],
};

export default preview;
