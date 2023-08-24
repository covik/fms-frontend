import { LinkOptions, RegisteredRoutesInfo } from '@tanstack/router';
import { ReactElement } from 'react';

export interface NavigationItemAttributes
  extends LinkOptions<RegisteredRoutesInfo> {
  label: string;
  icon: ReactElement;
}
