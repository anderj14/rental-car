export interface VehicleType {
    id: number
    vehicleTypeName: string
}

export interface IVehicleTypeToCreate {
    vehicleTypeName: string
}

export class VehicleTypeFormValues implements IVehicleTypeToCreate {
    id?: number;
    vehicleTypeName = '';

    constructor(init?: VehicleTypeFormValues) {
        Object.assign(this, init);
    }
}
