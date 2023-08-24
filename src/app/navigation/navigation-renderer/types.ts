import type { FC, ReactElement, ReactNode } from 'react';
import type { NavigationItemAttributes } from '../types';

export interface RendererProps {
  children: (selected: boolean) => ReactElement;
}
export interface ItemProps extends NavigationItemAttributes {}
export interface ConcreteRendererProps extends RendererProps, ItemProps {}

export interface Renderer<Props extends RendererProps = RendererProps>
  extends FC<Props> {}

export interface ConcreteRenderer extends Renderer<ConcreteRendererProps> {}

export interface ConcreteRendererProviderAttributes {
  children: ReactNode;
}
