import { BaseVehicle } from './base-vehicle';
import { LocatedVehicle } from './located-vehicle';

export abstract class ProblematicVehicle extends BaseVehicle {}
export abstract class ProblematicLocatedVehicle extends LocatedVehicle {}

export class OperationalVehicle extends LocatedVehicle {}
export class DisabledVehicle extends ProblematicLocatedVehicle {}
export class UnavailableVehicle extends ProblematicLocatedVehicle {}
export class NoPositionVehicle extends ProblematicVehicle {}
