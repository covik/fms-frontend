import { useEffect, useState } from 'react';
import { useGoogleMap } from '@react-google-maps/api';

export interface MapBoundsArguments {
  coordinates: google.maps.LatLngLiteral[];
  once?: boolean;
}

export function MapBounds({
  coordinates,
  once = false,
}: MapBoundsArguments): null {
  const map = useGoogleMap();
  const [boundsApplied, setBoundsApplied] = useState(false);

  useEffect(() => {
    if (!map) return;
    if (once && boundsApplied) return;
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0)
      return;

    const bounds = new google.maps.LatLngBounds();
    coordinates.forEach((coordinate) => bounds.extend(coordinate));
    map.fitBounds(bounds);
    setBoundsApplied(true);
  }, [map, coordinates, once, boundsApplied]);

  return null;
}
MapBounds.displayName = 'GoogleMaps.MapBounds';
