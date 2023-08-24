import type { RendererProps } from './types';

export interface BaseRendererProps extends RendererProps {
  selected: boolean;
}

export function BaseRenderer({ selected, children }: BaseRendererProps) {
  return children(selected);
}
