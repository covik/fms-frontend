import { forwardRef } from 'react';
import { Link as RouterLink } from '@tanstack/router';
import { Tab } from '@mui/material';
import type { LinkPropsOptions } from '@tanstack/router';
import type { TabProps } from '@mui/material';

export const RouterTab = forwardRef<any, LinkPropsOptions & TabProps>(
  (props, ref) => {
    const propsWithOverriddenComponent = {
      ...props,
      component: RouterLink,
    };
    return <Tab ref={ref} {...propsWithOverriddenComponent} />;
  },
);
