export interface Status {
    id: number
    statusName: string
}

export interface IStatusToCreate {
    statusName: string
}

export class StatusFormValues implements IStatusToCreate {
    id?: number;
    statusName = '';

    constructor(init?: StatusFormValues) {
        Object.assign(this, init);
    }

}
