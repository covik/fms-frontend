import { fetchAll } from './VehicleService';
import { takeOnlyOperational, takeOnlyTimedOut } from './Filter';
import { NotFoundException } from './Exception';
import { fetchInRange } from './RouteService';

const Route = {
  fetchInRange,
};

export const Vehicle = {
  fetchAll,
  takeOnlyOperational,
  takeOnlyTimedOut,
  NotFoundException,
  Route,
};
