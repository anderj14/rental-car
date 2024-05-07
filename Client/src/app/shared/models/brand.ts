export interface Brand {
    id: number
    brandName: string
}

export interface IBrandToCreate {
    brandName: string
}

export class BrandFormValues implements IBrandToCreate {
    id?: number;
    brandName = '';

    constructor(init?: BrandFormValues) {
        Object.assign(this, init);
    }

}
