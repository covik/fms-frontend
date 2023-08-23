import { LinkOptions, RegisteredRoutesInfo } from '@tanstack/router';
import { ReactElement } from 'react';

export interface NavigationItem extends LinkOptions<RegisteredRoutesInfo> {
  label: string;
  icon: ReactElement;
}
