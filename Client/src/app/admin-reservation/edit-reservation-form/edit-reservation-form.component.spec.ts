import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReservationFormComponent } from './edit-reservation-form.component';

describe('EditReservationFormComponent', () => {
  let component: EditReservationFormComponent;
  let fixture: ComponentFixture<EditReservationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReservationFormComponent]
    });
    fixture = TestBed.createComponent(EditReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
