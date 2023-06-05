import { renderToString } from 'react-dom/server';
import type { ReactElement, ReactNode } from 'react';

export function jsxToSVGDataURI(element: ReactElement<SVGElement>) {
  const iconString = renderToString(element);
  const urlEncodedIcon = encodeURIComponent(iconString);
  return `data:image/svg+xml,${urlEncodedIcon}`;
}

export function areChildrenNonEmptyArray(children: ReactNode): boolean {
  if (!Array.isArray(children)) return false;

  return children.length !== 0;
}
