import { Component, OnInit } from '@angular/core';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Brand, BrandFormValues } from 'src/app/shared/models/brand';
import { BrandService } from './brand.service';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [FormsModule, CommonModule, BrandFormComponent],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
  showPopup = false;
  editingBrandId: number | null = null;
  editBrandFormValues: BrandFormValues = new BrandFormValues();

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe({
      next: (response: Brand[]) => {
        this.brands = response;
      },
      error: error => console.log(error)
    });
  }

  openPopup(id?: number) {
    if (id) {
      // Find the brand with id
      const brandToEdit = this.brands.find(brand => brand.id === id);
      if (brandToEdit) {
        // Set its values to the edit form
        this.editBrandFormValues = new BrandFormValues({
          brandName: brandToEdit.brandName
        });
        // Store the id of the brand being edited
        this.editingBrandId = id;
      }
    } else {
      // New brand and initialize empty values
      this.editBrandFormValues = new BrandFormValues();
      this.editingBrandId = null;
    }
    // Show the popup
    this.showPopup = true;
  }

  cancelPopup() {
    this.showPopup = false;
  }

  saveBrand(brandFormValues: BrandFormValues) {
    if (this.editingBrandId === null) {
      // Create brand
      this.brandService.createBrand(brandFormValues).subscribe(
        (response: Brand) => {
          this.brands.push(response);
          this.showPopup = false;
        },
        error => console.log(error)
      );
    } else {
      // Edit brand
      this.brandService.updateBrand(this.editingBrandId, brandFormValues).subscribe(
        (response: Brand) => {
          // Finds the index of the brand in the brands array that matches the updated brand's ID.
          const index = this.brands.findIndex(b => b.id === response.id);
          if (index !== -1) {
            this.brands[index] = response;
          }
          this.showPopup = false;
          this.editingBrandId = null;
        },
        error => console.log(error)
      );
    }
  }

  deleteBrand(id: number) {
    this.brandService.deleteBrand(id).subscribe(
      () => {
        this.brands = this.brands.filter(p => p.id !== id);
      },
      error => console.log(error)
    );
  }
}
