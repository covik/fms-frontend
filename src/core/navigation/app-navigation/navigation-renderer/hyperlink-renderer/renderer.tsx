import { Link, useMatches } from '@tanstack/router';
import type { ConcreteRendererProps } from '../types';

export function HyperlinkRenderer({
  children,
  ...props
}: ConcreteRendererProps) {
  const { label, icon, ...linkProps } = props;

  const fullPaths = useMatches().map(({ route }) => route.fullPath);
  const isActive = fullPaths.includes(linkProps.to);

  return (
    <Link
      {...linkProps}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {children(isActive)}
    </Link>
  );
}
