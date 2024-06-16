import { Component, OnInit } from '@angular/core';
import { Insurance, InsuranceFormValues } from 'src/app/shared/models/insurance';
import { InsuranceService } from './insurance.service';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [InsuranceFormComponent, FormsModule, CommonModule],
  templateUrl: './insurance.component.html',
  styleUrl: './insurance.component.scss'
})
export class InsuranceComponent implements OnInit {
  insurances!: Insurance[];
  showAddInsurancePopup = false;
  editingInsuranceId: number | null = null;
  editInsuranceFormValues: InsuranceFormValues = new InsuranceFormValues();

  constructor(private insuranceService: InsuranceService) { }

  ngOnInit(): void {
    this.getInsurances();
  }

  getInsurances() {
    this.insuranceService.getInsurances().subscribe({
      next: (response: Insurance[]) => {
        this.insurances = response;
      },
      error: error => console.log(error)
    });
  }

  openInsurancePopup(id?: number) {
    if (id) {
      const insuranceToEdit = this.insurances.find(insurance => insurance.id === id);
      if (insuranceToEdit) {
        this.editInsuranceFormValues = new InsuranceFormValues({
          insuranceName: this.editInsuranceFormValues.insuranceName,
          insurancePrice: this.editInsuranceFormValues.insurancePrice
        });
        this.editingInsuranceId = id;
      }
    } else {
      this.editInsuranceFormValues = new InsuranceFormValues();
      this.editingInsuranceId = null;
    }
    this.showAddInsurancePopup = true;
  }

  cancelAddInsurancePopup() {
    this.showAddInsurancePopup = false;
  }

  saveInsurance(insuranceFormValues: InsuranceFormValues) {
    if (this.editingInsuranceId) {
      this.insuranceService.updateInsurance(this.editingInsuranceId, insuranceFormValues).subscribe(
        (response: Insurance) => {
          const index = this.insurances.findIndex(insurance => insurance.id === response.id);
          if (index !== -1) {
            this.insurances[index] = response;
          }
          this.showAddInsurancePopup = false;
        },
        (error: any) => console.log(error)
      );
    } else {
      this.insuranceService.createInsurance(insuranceFormValues).subscribe(
        (response: Insurance) => {
          this.insurances.push(response);
          this.showAddInsurancePopup = false;
        },
        (error: any) => console.log(error)
      );
    }
  }

  deleteInsurance(id: number) {
    this.insuranceService.deleteInsurance(id).subscribe(
      () => {
        this.insurances = this.insurances.filter(insurance => insurance.id !== id);
      },
      error => console.log(error)
    );
  }
}
