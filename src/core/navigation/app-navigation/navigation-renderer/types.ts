import type { FC, ReactElement } from 'react';
import type { NavigationItemAttributes } from '../types';

export interface PublicRendererAttributes {
  children: (selected: boolean) => ReactElement;
}

export interface PrivateRendererAttributes
  extends PublicRendererAttributes,
    NavigationItemAttributes {}

export interface PublicRenderer<
  OtherProps extends PublicRendererAttributes = PublicRendererAttributes,
> extends FC<OtherProps> {}

export interface PrivateRenderer
  extends PublicRenderer<PrivateRendererAttributes> {}
