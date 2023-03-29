import React from 'react';
import { DesignBaseline } from '../src/foundation';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) =>
    React.createElement(DesignBaseline, {}, [React.createElement(Story)]),
];
