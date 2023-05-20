import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';

export function jsxToSVGDataURI(element: ReactElement<SVGElement>) {
  const iconString = renderToString(element);
  const urlEncodedIcon = encodeURIComponent(iconString);
  return `data:image/svg+xml,${urlEncodedIcon}`;
}
