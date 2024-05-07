export interface Fuel {
    id: number
    fuelName: string
}

export interface IFuelToCreate {
    fuelName: string
}

export class FuelFormValues implements IFuelToCreate {
    id?: number; // Ahora la propiedad id es opcional
    fuelName = '';

    constructor(init?: FuelFormValues) {
        Object.assign(this, init);
    }

}
