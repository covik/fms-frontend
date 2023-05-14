import { fetchAll } from './VehicleService';
import { takeOnlyOperational, takeOnlyTimedOut } from './Filter';
import { NotFoundException } from './Exception';

export const Vehicle = {
  fetchAll,
  takeOnlyOperational,
  takeOnlyTimedOut,
  NotFoundException,
};
