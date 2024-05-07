export interface Fuel {
    id: number
    fuelName: string
}

export interface IFuelToCreate {
    fuelName: string
}

export class FuelFormValues implements IFuelToCreate {
    id?: number;
    fuelName = '';

    constructor(init?: FuelFormValues) {
        Object.assign(this, init);
    }

}
