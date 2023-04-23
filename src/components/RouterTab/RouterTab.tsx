import { Link as RouterLink } from '@tanstack/router';
import { forwardRef } from 'react';
import { Tab, TabProps } from '@mui/material';

type RouterLinkProps = Pick<Parameters<typeof RouterLink>[0], 'to'>;

export const RouterTab = forwardRef<any, RouterLinkProps & TabProps>(
  (props, ref) => {
    const propsWithOverriddenComponent = {
      ...props,
      component: RouterLink,
    };
    return <Tab ref={ref} {...propsWithOverriddenComponent} />;
  },
);
