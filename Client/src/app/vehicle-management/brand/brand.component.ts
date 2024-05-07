import { Component, OnInit } from '@angular/core';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Brand, BrandFormValues } from 'src/app/shared/models/brand';
import { BrandService } from './brand.service';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [FormsModule, CommonModule, BrandFormComponent],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
  showAddBrandPopup = false;
  showEditBrandPopup: boolean = false;
  editingBrandId: number | null = null;
  editBrandFormValues: BrandFormValues | null = null;

  constructor(private brandService: BrandService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe({
      next: (response: Brand[]) => {
        this.brands = response,
          console.log(this.brands);
      },
      error: error => console.log(error)
    })
  }

  openAddBrandPopup() {
    this.showAddBrandPopup = true;
    this.showEditBrandPopup = true;
  }

  cancelAddBrandPopup() {
    this.showAddBrandPopup = false;
    this.showEditBrandPopup = false;
  }

  saveBrand(brandFormValues: BrandFormValues) {
    this.brandService.createBrand(brandFormValues).subscribe(
      (response: Brand) => {
        this.brands.push(response);
        this.showAddBrandPopup = false;
      },
      error => console.log(error)
    );
  }

  editBrand(id: number) {
    const brandToEdit = this.brands.find(brand => brand.id === id);
    if (brandToEdit) {
      const brandFormValues = new BrandFormValues({
        brandName: brandToEdit.brandName
      });

      this.showEditBrandPopup = true;
      this.editingBrandId = id;
      this.editBrandFormValues = brandFormValues;
    } else {
      console.log('Marca no encontrada para editar');
    }
  }

  deleteBrand(id: number) {
    this.brandService.deleteBrand(id).subscribe(
      () => {
        this.brands = this.brands.filter(p => p.id !== id);
        console.log(this.brands);
      }
    );
  }

}
