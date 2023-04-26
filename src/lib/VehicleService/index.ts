import { fetchAll } from './VehicleService';
import { takeOnlyOperational } from './Filter';

export const Vehicle = {
  fetchAll,
  takeOnlyOperational,
};
