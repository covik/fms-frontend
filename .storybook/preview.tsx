import { withDesignBaseline } from './decorators';
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
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
        locales: 'en-US',
      },
    },
  },
  decorators: [withDesignBaseline],
};

export default preview;
