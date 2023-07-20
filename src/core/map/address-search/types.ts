import type { ReactElement } from 'react';
import type { Coordinates } from '#lib/dimension';

export interface SearchHandler {
  (place: Coordinates | string): void;
}

export interface SearchImplementationAttributes {
  children: ReactElement;
  onPlaceChanged: SearchHandler;
}
