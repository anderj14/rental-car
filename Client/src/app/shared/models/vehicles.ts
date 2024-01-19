export interface IVehicle {
    id: number;
    vehicleName: string;
    year: number;
    vin: string;
    passengers: number;
    transmission: string;
    doors: number;
    color: string;
    rentalPrice: number;
    fuelConsumption: number;
    pictureUrl: string;
    brand: string;
    model: string;
    fuel: string;
    status: string;
    vehicleType: string;
    photos: IPhoto[];
}

export interface IPhoto {
    id: number;
    pictureUrl: string;
    fileName: string;
    isMain: boolean;
}

export interface IVehicleToCreate {
    vehicleName: string
    year: number
    vin: string
    passengers: number
    transmission: string
    doors: number
    color: string
    rentalPrice: number
    fuelConsumption: number
    pictureUrl: string
    brandId: number
    modelId: number
    fuelId: number
    statusId: number
    vehicleTypeId: number
}

export class VehicleFormValues implements IVehicleToCreate {
    vehicleName = '';
    year = 0;
    vin = '';
    passengers = 0;
    transmission = '';
    doors = 0;
    color = '';
    rentalPrice = 0;
    fuelConsumption = 0;
    pictureUrl = '';
    brandId!: number;
    modelId!: number;
    fuelId!: number;
    statusId!: number;
    vehicleTypeId!: number;

    constructor(init?: VehicleFormValues) {
        Object.assign(this, init);
    }
}