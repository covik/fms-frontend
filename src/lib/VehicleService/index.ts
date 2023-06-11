import { fetchAll } from './VehicleService';
import { takeOnlyOperational, takeOnlyUnavailable } from './Filter';
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
  takeOnlyUnavailable,
  NotFoundException,
  NoRouteSummary,
  Route,
  sortAscendingByName,
};
