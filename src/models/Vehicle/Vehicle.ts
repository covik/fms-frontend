import { BaseVehicle } from './BaseVehicle';
import { LocatedVehicle } from './LocatedVehicle';

export abstract class ProblematicVehicle extends BaseVehicle {}
export abstract class ProblematicLocatedVehicle extends LocatedVehicle {}

export class OperationalVehicle extends LocatedVehicle {}
export class DisabledVehicle extends ProblematicLocatedVehicle {}
export class TimedOutVehicle extends ProblematicLocatedVehicle {}
export class NoPositionVehicle extends ProblematicVehicle {}
