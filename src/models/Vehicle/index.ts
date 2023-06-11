export { BaseVehicle } from './BaseVehicle';
export { LocatedVehicle } from './LocatedVehicle';
export {
  OperationalVehicle,
  ProblematicVehicle,
  ProblematicLocatedVehicle,
  DisabledVehicle,
  NoPositionVehicle,
  UnavailableVehicle,
} from './Vehicle';
export {
  isBaseVehicle,
  isDisabledVehicle,
  isOperationalVehicle,
  isUnavailableVehicle,
  isVehicleWithoutPosition,
} from './Checker';
