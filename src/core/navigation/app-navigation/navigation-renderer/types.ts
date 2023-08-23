import type { ReactElement } from 'react';
import type { NavigationItemAttributes } from '../types';

export interface NavigationRendererAttributes {
  children: (selected: boolean) => ReactElement;
}

export interface NavigationImplementationRendererAttributes
  extends NavigationItemAttributes,
    NavigationRendererAttributes {}
