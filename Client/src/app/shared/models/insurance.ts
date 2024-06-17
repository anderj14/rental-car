export interface Insurance {
  id: number
  insuranceName: string
  insurancePrice: number
}
export interface IInsuranceToCreate {
  insuranceName: string
  insurancePrice: number}

export class InsuranceFormValues implements IInsuranceToCreate {
  id?: number;
  insuranceName = '';  
  insurancePrice = 0; 

  constructor(init?: InsuranceFormValues) {
    Object.assign(this, init);
  }

}
