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
  insurances: Insurance[] = [];
  showAddInsurancePopup = false;
  editingInsuranceId: number | null = null;
  editInsuranceFormValues: InsuranceFormValues | null = null;

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

  openAddInsurancePopup() {
    this.showAddInsurancePopup = true;
    this.editingInsuranceId = null;
    this.editInsuranceFormValues = null;
  }

  cancelAddInsurancePopup() {
    this.showAddInsurancePopup = false;
  }

  saveInsurance(insuranceFormValues: InsuranceFormValues) {
    if (this.editingInsuranceId) {
      // Update existing insurance
      this.insuranceService.updateInsurance(this.editingInsuranceId, insuranceFormValues).subscribe(
        (response: Insurance) => {
          // Update insurance in the list
          const index = this.insurances.findIndex(insurance => insurance.id === response.id);
          if (index !== -1) {
            this.insurances[index] = response;
          }
          this.showAddInsurancePopup = false;
        },
        (error: any) => console.log(error)
      );
    } else {
      // Create new insurance
      this.insuranceService.createInsurance(insuranceFormValues).subscribe(
        (response: Insurance) => {
          this.insurances.push(response);
          this.showAddInsurancePopup = false;
        },
        (error: any) => console.log(error)
      );
    }
  }

  editInsurance(id: number) {
    const insuranceToEdit = this.insurances.find(insurance => insurance.id === id);
    if (insuranceToEdit) {
      const insuranceFormValues = new InsuranceFormValues({
        insuranceName: insuranceToEdit.insuranceName,
        insurancePrice: insuranceToEdit.insurancePrice
      });

      this.editingInsuranceId = id;
      this.editInsuranceFormValues = insuranceFormValues;
      this.showAddInsurancePopup = true;
    } else {
      console.log('Seguro no encontrado para editar');
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
