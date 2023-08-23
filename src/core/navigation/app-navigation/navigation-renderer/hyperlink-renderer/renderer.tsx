import { Link } from '@tanstack/router';
import type { ConcreteRendererProps } from '../types';

export function HyperlinkRenderer({
  children,
  ...linkProps
}: ConcreteRendererProps) {
  return <Link {...linkProps}>{children(false)}</Link>;
}
