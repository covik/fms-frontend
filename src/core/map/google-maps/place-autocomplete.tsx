import { useCallback, useEffect, useState } from 'react';
import { Coordinates } from '#lib/dimension';
import type { SearchImplementationAttributes } from '../types';

export interface PlaceAutocompleteAttributes
  extends SearchImplementationAttributes {}

export function PlaceAutocomplete({
  children,
  onPlaceChanged,
}: PlaceAutocompleteAttributes) {
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null,
  );

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setInputElement(node.querySelector('input'));
    }
  }, []);

  useEffect(() => {
    if (inputElement === null || google.maps.places === undefined) return;

    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      fields: ['geometry.location'],
    });

    const placeSelectListener = autocomplete.addListener(
      'place_changed',
      () => {
        const place = autocomplete.getPlace();

        if (place.geometry && place.geometry.location) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
          onPlaceChanged(new Coordinates(latitude, longitude));
        } else onPlaceChanged(place.name ?? '');
      },
    );

    return () => {
      placeSelectListener.remove();
    };
  }, [inputElement]);

  return <div ref={containerRef}>{children}</div>;
}
PlaceAutocomplete.displayName = 'GoogleMaps.PlaceAutocomplete';
