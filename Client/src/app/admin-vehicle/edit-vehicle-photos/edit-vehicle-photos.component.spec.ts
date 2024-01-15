import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehiclePhotosComponent } from './edit-vehicle-photos.component';

describe('EditVehiclePhotosComponent', () => {
  let component: EditVehiclePhotosComponent;
  let fixture: ComponentFixture<EditVehiclePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVehiclePhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditVehiclePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
