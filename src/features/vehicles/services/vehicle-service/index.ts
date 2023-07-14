import { fetchAll } from './vehicle-service';
import { takeOnlyOperational, takeOnlyUnavailable } from './filter';
import { NotFoundException } from './exception';
import { sortAscendingByName } from './sort';

export const VehicleService = {
  fetchAll,
  takeOnlyOperational,
  takeOnlyUnavailable,
  NotFoundException,
  sortAscendingByName,
};
