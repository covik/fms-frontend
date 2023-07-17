import { createContext, useContext } from 'react';

const MeasurementUnitContext = createContext<MeasurementUnitAPI>({
  precision: 1,
});

export interface MeasurementUnitAPI {
  precision: number;
}

export function useMeasurementUnit(): MeasurementUnitAPI {
  return useContext(MeasurementUnitContext);
}

/* Implement provider when need arises */
