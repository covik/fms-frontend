export { BaseVehicle } from './base-vehicle';
export { LocatedVehicle } from './located-vehicle';
export {
  OperationalVehicle,
  ProblematicVehicle,
  ProblematicLocatedVehicle,
  DisabledVehicle,
  NoPositionVehicle,
  UnavailableVehicle,
} from './vehicle';
export {
  isBaseVehicle,
  isDisabledVehicle,
  isOperationalVehicle,
  isUnavailableVehicle,
  isVehicleWithoutPosition,
} from './checker';
