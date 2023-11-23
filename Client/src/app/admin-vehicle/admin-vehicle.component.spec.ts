import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVehicleComponent } from './admin-vehicle.component';

describe('AdminVehicleComponent', () => {
  let component: AdminVehicleComponent;
  let fixture: ComponentFixture<AdminVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminVehicleComponent]
    });
    fixture = TestBed.createComponent(AdminVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
