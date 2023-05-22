import { fetchAll } from './VehicleService';
import { takeOnlyOperational, takeOnlyTimedOut } from './Filter';
import { NotFoundException } from './Exception';
import { fetchInRange, fetchStopsInRange } from './RouteService';

const Route = {
  fetchInRange,
  fetchStopsInRange,
};

export const Vehicle = {
  fetchAll,
  takeOnlyOperational,
  takeOnlyTimedOut,
  NotFoundException,
  Route,
};
