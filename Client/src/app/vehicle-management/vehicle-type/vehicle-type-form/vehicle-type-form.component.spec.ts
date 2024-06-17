import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeFormComponent } from './vehicle-type-form.component';

describe('VehicleTypeFormComponent', () => {
  let component: VehicleTypeFormComponent;
  let fixture: ComponentFixture<VehicleTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
