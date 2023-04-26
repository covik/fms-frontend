export * from './BaseVehicle';
export * from './Exception';
export { LocatedVehicle } from './LocatedVehicle';
export {
  OperationalVehicle,
  ProblematicVehicle,
  ProblematicLocatedVehicle,
  DisabledVehicle,
  NoPositionVehicle,
  TimedOutVehicle,
} from './Vehicle';
export {
  isBaseVehicle,
  isDisabledVehicle,
  isOperationalVehicle,
  isTimedOutVehicle,
  isVehicleWithoutPosition,
} from './Checker';

export type { LocatedVehicleAttributes } from './LocatedVehicle';
