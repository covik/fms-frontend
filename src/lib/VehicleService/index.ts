import { fetchAll } from './VehicleService';
import { takeOnlyOperational, takeOnlyTimedOut } from './Filter';
import { NotFoundException, NoRouteSummary } from './Exception';
import {
  fetchInRange,
  fetchStopsInRange,
  fetchSummaryInRange,
} from './RouteService';
import { sortAscendingByName } from './Sort';

const Route = {
  fetchInRange,
  fetchStopsInRange,
  fetchSummaryInRange,
};

export const Vehicle = {
  fetchAll,
  takeOnlyOperational,
  takeOnlyTimedOut,
  NotFoundException,
  NoRouteSummary,
  Route,
  sortAscendingByName,
};
