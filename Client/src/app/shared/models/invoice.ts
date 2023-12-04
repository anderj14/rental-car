export interface Invoice {
    id: number
    totalAmount: number
    date: string
    paymentType: string
    customer: string
    reservation: string
}

export interface IInvoiceToCreate {
    totalAmount: number
    date: string
    paymentType: string
    customerId: number
    reservationId: number
}

export class InvoiceFormValues implements IInvoiceToCreate {
    totalAmount = 0;
    date = '';
    paymentType = ''
    customerId!: number
    reservationId!: number

    constructor(init?: InvoiceFormValues) {
        Object.assign(this, init);
    }
}