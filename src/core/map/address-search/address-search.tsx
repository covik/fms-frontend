import { Coordinates } from '#lib/dimension';
import { MapAddressSearchControl } from './address-search-control';
import type { FC } from 'react';
import type { SearchImplementationAttributes } from './types';

export interface MapAddressSearchAttributes {
  onCoordinateChange: (coordinates: Coordinates) => void;
  Autocomplete: FC<SearchImplementationAttributes>;
}

export function MapAddressSearch({
  Autocomplete,
  onCoordinateChange,
}: MapAddressSearchAttributes) {
  const handlePlaceChange: SearchImplementationAttributes['onPlaceChanged'] = (
    place,
  ) => {
    if (place instanceof Coordinates) {
      onCoordinateChange(place);
      return;
    }

    const coordinates = handleStringInput(place);
    coordinates && onCoordinateChange(coordinates);
  };

  return (
    <Autocomplete onPlaceChanged={handlePlaceChange}>
      <MapAddressSearchControl />
    </Autocomplete>
  );
}

function handleStringInput(input: string): Coordinates | undefined {
  if (input.trim() === '') return undefined;

  const splitPlace = input.trim().split(/[, ]+/);

  if (splitPlace.length !== 2) return undefined;

  try {
    const latitude = splitPlace[0];
    const longitude = splitPlace[1];
    return new Coordinates(Number(latitude?.trim()), Number(longitude?.trim()));
  } catch {
    return undefined;
  }
}
