import { MapInfoWindow } from '../map-info-window';
import { MapLocationInformation } from '../map-location-information';
import type { SelectedLocation } from './manage-selection';

export interface MapLocationSelectionAttributes {
  location: SelectedLocation;
}

export function MapLocationSelection({
  location,
}: MapLocationSelectionAttributes) {
  return location ? (
    <MapInfoWindow coordinates={location}>
      <MapLocationInformation
        latitude={location.latitude()}
        longitude={location.longitude()}
      />
    </MapInfoWindow>
  ) : null;
}
