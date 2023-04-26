import { fetchAll } from './VehicleService';
import { takeOnlyOperational, takeOnlyTimedOut } from './Filter';

export const Vehicle = {
  fetchAll,
  takeOnlyOperational,
  takeOnlyTimedOut,
};
