export type ToggleKeys = keyof typeof defaultToggles;
export type AllToggles = Record<ToggleKeys, boolean>;

export const defaultToggles = {
  'vehicle.list': true,
  'vehicle.live': true,
  'vehicle.route_history': true,
  'report': false,
  'report.mileage': false,
  'users': false,
  'map.address_search': true,
  'map.location_info': true,
};
