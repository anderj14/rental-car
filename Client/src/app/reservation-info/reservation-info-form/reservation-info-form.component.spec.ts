import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationInfoFormComponent } from './reservation-info-form.component';

describe('ReservationInfoFormComponent', () => {
  let component: ReservationInfoFormComponent;
  let fixture: ComponentFixture<ReservationInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationInfoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
