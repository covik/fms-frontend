import { fetchAll } from './vehicle-service';
import { takeOnlyOperational, takeOnlyUnavailable } from './filter';
import { NoRouteSummary, NotFoundException } from './exception';
import {
  fetchInRange,
  fetchStopsInRange,
  fetchSummaryInRange,
} from './route-service';
import { sortAscendingByName } from './sort';

const RouteService = {
  fetchInRange,
  fetchStopsInRange,
  fetchSummaryInRange,
};

export const VehicleService = {
  fetchAll,
  takeOnlyOperational,
  takeOnlyUnavailable,
  NotFoundException,
  NoRouteSummary,
  RouteService,
  sortAscendingByName,
};
